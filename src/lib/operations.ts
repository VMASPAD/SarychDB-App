import SarychDB from "sarychdb-client"

// Singleton instance cache
let cachedClient: SarychDB | null = null;
let cachedCredentials: { user: string; password: string } | null = null;

/**
 * Get or create a cached SarychDB client instance
 */
function getClient(user: string, password: string): SarychDB {
    if (cachedClient && 
        cachedCredentials?.user === user && 
        cachedCredentials?.password === password) {
        return cachedClient;
    }
    
    cachedClient = new SarychDB({
        baseUrl: 'http://localhost:3030',
        username: user,
        password: password
    });
    
    cachedCredentials = { user, password };
    return cachedClient;
}

/**
 * Clear the cached client (useful for logout)
 */
export function clearClientCache() {
    cachedClient = null;
    cachedCredentials = null;
}

/**
 * Authenticate user credentials
 */
export async function checkUser({user, password}: {user: string, password: string}) {
    const db = getClient(user, password);
    const ok = await db.authenticate();
    if (!ok) {
        clearClientCache();
        throw new Error('Invalid credentials');
    }
    return ok;
}

/**
 * Create a new user (static method, no auth required)
 */
export async function createUser({username, password}: {username: string, password: string}) {
    return await SarychDB.createUser({
        username,
        password,
        baseUrl: 'http://localhost:3030'
    });
}

/**
 * Create a new database
 */
export async function createDB({user, password, dbName}: {user: string, password: string, dbName: string}) {
    const db = getClient(user, password);
    return await db.createDatabase(dbName);
}

/**
 * List all databases for the authenticated user
 */
export async function listDatabases({user, password}: {user: string, password: string}) {
    const db = getClient(user, password);
    return await db.listDatabases();
}

/**
 * Get database statistics
 */
export async function getDatabaseStats({user, password, dbName}: {user: string, password: string, dbName: string}) {
    const db = getClient(user, password);
    return await db.getStats(dbName);
}

/**
 * Browse database with pagination (simple)
 */
export async function getDatabasesContent({
    user, 
    password, 
    dbName, 
    limit = 100, 
    page = 1
}: {
    user: string, 
    password: string, 
    dbName: string, 
    limit?: number, 
    page?: number
}) {
    const db = getClient(user, password);
    console.log(`Fetching ${dbName} - page: ${page}, limit: ${limit}`);
    return await db.browse(dbName, { limit, page });
}

/**
 * List database with advanced filtering and sorting
 */
export async function listDatabaseContent({
    user,
    password,
    dbName,
    page = 1,
    limit = 100,
    sortBy,
    sortOrder = 'asc',
    filters
}: {
    user: string,
    password: string,
    dbName: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    filters?: Record<string, any>
}) {
    const db = getClient(user, password);
    return await db.list(dbName, {
        page,
        limit,
        sortBy,
        sortOrder,
        filters
    });
}

/**
 * Insert a new document
 */
export async function insertDocument({
    user,
    password,
    dbName,
    data
}: {
    user: string,
    password: string,
    dbName: string,
    data: any
}) {
    const db = getClient(user, password);
    return await db.insert(dbName, data);
}

/**
 * Search documents by query
 */
export async function searchDocuments({
    user,
    password,
    dbName,
    query,
    queryType = 'value'
}: {
    user: string,
    password: string,
    dbName: string,
    query: string,
    queryType?: 'key' | 'value'
}) {
    const db = getClient(user, password);
    return await db.search(dbName, query, { queryType });
}

/**
 * Search documents by key name
 */
export async function searchByKey({
    user,
    password,
    dbName,
    keyName
}: {
    user: string,
    password: string,
    dbName: string,
    keyName: string
}) {
    const db = getClient(user, password);
    return await db.searchByKey(dbName, keyName);
}

/**
 * Search documents by value
 */
export async function searchByValue({
    user,
    password,
    dbName,
    value
}: {
    user: string,
    password: string,
    dbName: string,
    value: string
}) {
    const db = getClient(user, password);
    return await db.searchByValue(dbName, value);
}

/**
 * Update document by ID
 */
export async function updateDocumentById({
    user,
    password,
    dbName,
    recordId,
    updateData
}: {
    user: string,
    password: string,
    dbName: string,
    recordId: string,
    updateData: any
}) {
    const db = getClient(user, password);
    return await db.updateById(dbName, recordId, updateData);
}

/**
 * Update documents by query
 */
export async function updateDocumentsByQuery({
    user,
    password,
    dbName,
    query,
    updateData
}: {
    user: string,
    password: string,
    dbName: string,
    query: string,
    updateData: any
}) {
    const db = getClient(user, password);
    return await db.updateByQuery(dbName, query, updateData);
}

/**
 * Delete documents by query
 */
export async function deleteDocuments({
    user,
    password,
    dbName,
    query
}: {
    user: string,
    password: string,
    dbName: string,
    query: string
}) {
    const db = getClient(user, password);
    return await db.delete(dbName, query);
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