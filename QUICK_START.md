# 🚀 Quick Start - SarychDB Manager

## 📋 Table of Contents
- [Login](#-1-login)
- [View Databases](#-2-view-databases)
- [CRUD Operations](#-3-crud-operations)
- [Quick Shortcuts](#-quick-shortcuts)

---

## 🔑 1. Login

```
1. Open the application
2. Enter username and password
3. Click "Login"
```

---

## 🗄️ 2. View Databases

### Create New DB
```
"+ Create Database" button → Name → Create
```

### Search DB
```
Search bar → Type name
```

### Open DB
```
Click on card → Data view
```

---

## ⚡ 3. CRUD Operations

### ➕ Create Document
```
"Add Document" → JSON Editor → "Insert Document"
```

**Example:**
```json
{
  "name": "John",
  "age": 25,
  "active": true
}
```

### 📖 Read Document
```
Click arrow (▼) to expand
```

### ✏️ Update Document
```
Pencil icon (blue) → Edit JSON → "Update Document"
```

### 🗑️ Delete Document
```
Trash icon (red) → Confirm → "Delete"
```

### 📋 Copy Document
```
Copy icon → JSON to clipboard
```

---

## ⚡ Quick Shortcuts

| Action | Location | Icon |
|--------|----------|------|
| Create DB | Main screen | + Create Database |
| Search | Top bar | 🔍 |
| Add Doc | Toolbar | ➕ Add Document |
| Copy | Each document | 📋 |
| Edit | Each document | ✏️ (blue) |
| Delete | Each document | 🗑️ (red) |
| Pagination | Toolbar | ◀️ ▶️ |
| Limit | Toolbar | Numeric input |
| Theme | Top nav | 🌓 |
| Logout | Top nav | 🚪 |
| Help | Top nav | ❓ |

---

## 🎯 Typical Workflow

```mermaid
Login → View DBs → Select DB → View Documents → CRUD Operations → Logout
```

1. **Login** with credentials
2. **Search/Create** database
3. **Open** database
4. **View** documents (with search and pagination)
5. **Perform operations**: Create/Edit/Delete
6. **Log out** when finished

---

## 💡 Quick Tips

✅ **DO:**
- Validate JSON before inserting/editing
- Use reasonable limits (50-100 docs)
- Log out on shared PCs
- Copy important documents as backup

❌ **DON'T:**
- Delete without confirming
- Use invalid JSON
- Load +1000 documents simultaneously
- Share credentials

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Verify credentials and server |
| JSON error | Use online JSON validator |
| Slow app | Reduce document limit |
| Don't see DBs | Log out and log back in |

---

## 🔐 Security

- ✅ Local credentials (browser)
- ✅ Secure transmission
- ✅ Logout clears data
- ⚠️ Delete is permanent

---

## 📚 Complete Documentation

For detailed information, see: **[USER_GUIDE.md](./USER_GUIDE.md)**

---

**Version:** 1.0.0  
**Last updated:** October 2025
