const API_BASE_URL_KEY = "sarychdbApiBaseUrl";
const DEFAULT_APP_BASE_URL = "http://127.0.0.1:4040";

type RuntimeMode = "web" | "app";
type QueryValue = string | number | boolean | undefined | null;

declare global {
    interface Window {
        __TAURI__?: unknown;
        __TAURI_INTERNALS__?: unknown;
    }
}

function trimTrailingSlash(value: string): string {
    return value.replace(/\/+$/, "");
}

function getStorageValue(key: string): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem(key);
}

export function getRuntimeMode(): RuntimeMode {
    if (typeof window === "undefined") {
        return "web";
    }

    return window.__TAURI__ || window.__TAURI_INTERNALS__ ? "app" : "web";
}

export function getApiBaseUrl(): string {
    const envBase = import.meta.env.VITE_SARYCHDB_API_URL?.trim();
    if (envBase) {
        return trimTrailingSlash(envBase);
    }

    const storedBase = getStorageValue(API_BASE_URL_KEY)?.trim();
    if (storedBase) {
        return trimTrailingSlash(storedBase);
    }

    if (getRuntimeMode() === "app") {
        return DEFAULT_APP_BASE_URL;
    }

    if (typeof window !== "undefined") {
        return trimTrailingSlash(window.location.origin);
    }

    return DEFAULT_APP_BASE_URL;
}

export function setApiBaseUrl(url: string) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(API_BASE_URL_KEY, trimTrailingSlash(url.trim()));
}

export function clearClientCache() {
    // Compatibility no-op: old SDK cache was removed.
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
    const url = new URL(path, `${getApiBaseUrl()}/`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                url.searchParams.set(key, String(value));
            }
        });
    }

    return url.toString();
}

async function requestJson<T>(
    path: string,
    options: {
        method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        query?: Record<string, QueryValue>;
        headers?: Record<string, string>;
        body?: unknown;
    } = {}
): Promise<T> {
    const { method = "GET", query, headers, body } = options;
    const response = await fetch(buildUrl(path, query), {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(headers || {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    const raw = await response.text();
    let payload: unknown = null;

    if (raw) {
        try {
            payload = JSON.parse(raw);
        } catch {
            payload = raw;
        }
    }

    const errorMessage =
        (typeof payload === "object" && payload !== null && "error" in payload && typeof (payload as { error?: unknown }).error === "string"
            ? (payload as { error: string }).error
            : null) || `Request failed with status ${response.status}`;

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    if (typeof payload === "object" && payload !== null && "error" in payload && (payload as { error?: unknown }).error) {
        throw new Error(String((payload as { error: unknown }).error));
    }

    return (payload ?? {}) as T;
}

function buildProtocolUrl(params: {
    user: string;
    password: string;
    dbName: string;
    operation: string;
    query?: string;
}): string {
    const auth = `${encodeURIComponent(params.user)}@${encodeURIComponent(params.password)}`;
    const dbName = encodeURIComponent(params.dbName);
    const operation = encodeURIComponent(params.operation);
    const query = params.query ? `?query=${encodeURIComponent(params.query)}` : "";
    return `sarychdb://${auth}/${dbName}/${operation}${query}`;
}

async function bridgeProtocol<T>(message: Record<string, unknown>): Promise<T> {
    return requestJson<T>("/sarych", {
        method: "POST",
        body: message,
    });
}

function normalizeDatabasesResponse(result: any) {
    const rawList = Array.isArray(result?.databases)
        ? result.databases
        : Array.isArray(result?.data)
            ? result.data
            : [];

    const databases = rawList.map((item: any) => {
        if (typeof item === "string") {
            return { namedb: item };
        }

        if (item && typeof item === "object") {
            return {
                ...item,
                namedb: item.namedb || item.db_name || item.name || item.database || "",
            };
        }

        return { namedb: String(item || "") };
    });

    return {
        ...(result || {}),
        databases,
    };
}

function normalizeBrowseResponse(result: any, page: number, limit: number) {
    const listData = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.results)
            ? result.results
            : [];
    const totalRecords =
        typeof result?.pagination?.total_records === "number"
            ? result.pagination.total_records
            : typeof result?.count === "number"
                ? result.count
                : listData.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / Math.max(limit, 1)));

    return {
        ...(result || {}),
        data: listData,
        pagination: {
            page: result?.pagination?.page ?? page,
            limit: result?.pagination?.limit ?? limit,
            returned: result?.pagination?.returned ?? listData.length,
            total_records: totalRecords,
            total_pages: result?.pagination?.total_pages ?? totalPages,
            has_next: result?.pagination?.has_next ?? page < totalPages,
            has_prev: result?.pagination?.has_prev ?? page > 1,
            mode: result?.pagination?.mode ?? "paginated",
        },
    };
}

function isUuidLike(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function checkUser({ user, password }: { user: string; password: string }) {
    await requestJson("/api/databases", {
        query: {
            username: user,
            password,
        },
    });

    return true;
}

export async function createUser({ username, password }: { username: string; password: string }) {
    return requestJson("/api/users", {
        method: "POST",
        body: {
            username,
            password,
        },
    });
}

export async function createDB({ user, password, dbName }: { user: string; password: string; dbName: string }) {
    return requestJson("/api/databases", {
        method: "POST",
        body: {
            username: user,
            password,
            db_name: dbName,
        },
    });
}

export async function listDatabases({ user, password }: { user: string; password: string }) {
    const result = await requestJson<any>("/api/databases", {
        query: {
            username: user,
            password,
        },
    });

    return normalizeDatabasesResponse(result);
}

export async function getDatabaseStats({ user, password, dbName }: { user: string; password: string; dbName: string }) {
    return requestJson(`/api/databases/${encodeURIComponent(dbName)}/stats`, {
        query: {
            username: user,
            password,
        },
    });
}

export async function getDatabasesContent({
    user,
    password,
    dbName,
    limit = 100,
    page = 1,
}: {
    user: string;
    password: string;
    dbName: string;
    limit?: number;
    page?: number;
}) {
    const result = await requestJson<any>(`/api/databases/${encodeURIComponent(dbName)}/browse`, {
        query: {
            username: user,
            password,
            limit,
            page,
        },
    });

    return normalizeBrowseResponse(result, page, limit);
}

export async function listDatabaseContent({
    user,
    password,
    dbName,
    page = 1,
    limit = 100,
    sortBy,
    sortOrder = "asc",
    filters,
}: {
    user: string;
    password: string;
    dbName: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: Record<string, any>;
}) {
    const query: Record<string, QueryValue> = {
        username: user,
        password,
        page,
        limit,
        sortBy,
        sortOrder,
    };

    if (filters && Object.keys(filters).length > 0) {
        query.filters = JSON.stringify(filters);
    }

    const result = await requestJson<any>(`/api/databases/${encodeURIComponent(dbName)}/list`, {
        query,
    });

    return normalizeBrowseResponse(result, page, limit);
}

export async function insertDocument({
    user,
    password,
    dbName,
    data,
}: {
    user: string;
    password: string;
    dbName: string;
    data: any;
}) {
    return requestJson(`/api/databases/${encodeURIComponent(dbName)}/records`, {
        method: "POST",
        headers: {
            username: user,
            password,
        },
        body: data,
    });
}

export async function searchDocuments({
    user,
    password,
    dbName,
    query,
    queryType = "value",
}: {
    user: string;
    password: string;
    dbName: string;
    query: string;
    queryType?: "key" | "value" | "icontains";
}) {
    return requestJson(`/api/databases/${encodeURIComponent(dbName)}/records`, {
        query: {
            username: user,
            password,
            query,
            queryType,
        },
    });
}

export async function searchByKey({
    user,
    password,
    dbName,
    keyName,
}: {
    user: string;
    password: string;
    dbName: string;
    keyName: string;
}) {
    return searchDocuments({
        user,
        password,
        dbName,
        query: keyName,
        queryType: "key",
    });
}

export async function searchByValue({
    user,
    password,
    dbName,
    value,
}: {
    user: string;
    password: string;
    dbName: string;
    value: string;
}) {
    return searchDocuments({
        user,
        password,
        dbName,
        query: value,
        queryType: "value",
    });
}

export async function updateDocumentById({
    user,
    password,
    dbName,
    recordId,
    updateData,
}: {
    user: string;
    password: string;
    dbName: string;
    recordId: string;
    updateData: any;
}) {
    return bridgeProtocol({
        url: buildProtocolUrl({
            user,
            password,
            dbName,
            operation: "update_records",
        }),
        body: {
            idUpdate: recordId,
            updateData,
        },
    });
}

export async function updateDocumentsByQuery({
    user,
    password,
    dbName,
    query,
    updateData,
}: {
    user: string;
    password: string;
    dbName: string;
    query: string;
    updateData: any;
}) {
    return bridgeProtocol({
        url: buildProtocolUrl({
            user,
            password,
            dbName,
            operation: "put",
            query,
        }),
        body: updateData,
    });
}

export async function deleteDocuments({
    user,
    password,
    dbName,
    query,
}: {
    user: string;
    password: string;
    dbName: string;
    query: string;
}) {
    if (isUuidLike(query)) {
        return bridgeProtocol({
            url: buildProtocolUrl({
                user,
                password,
                dbName,
                operation: "delete_by_id",
            }),
            body: {
                _id: query,
            },
        });
    }

    return bridgeProtocol({
        url: buildProtocolUrl({
            user,
            password,
            dbName,
            operation: "delete",
            query,
        }),
    });
}

/**
 * Get user credentials from localStorage
 */
export function getStoredCredentials(): { user: string; password: string } | null {
    const user = localStorage.getItem("userServer");
    const password = localStorage.getItem("passwordServer");
    
    if (!user || !password) {
        return null;
    }
    
    return { user, password };
}

/**
 * Clear stored credentials and cache
 */
export function logout() {
    localStorage.removeItem("userServer");
    localStorage.removeItem("passwordServer");
    localStorage.removeItem("isLoged");
    clearClientCache();
}