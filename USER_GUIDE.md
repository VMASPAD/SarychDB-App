# 📚 User Guide - SarychDB Manager

## 🎯 Introduction

SarychDB Manager is a desktop application for managing SarychDB databases, similar to MongoDB Compass. With a modern and easy-to-use interface, it allows you to manage databases, documents, and perform complete CRUD operations.

---

## 🚀 Login

### 1. Login Screen
When you open the application, you'll see a login screen where you must enter:

- **User**: Your SarychDB server username
- **Password**: Your SarychDB server password

### 2. Connect
1. Enter your credentials
2. Click the **"Login"** button
3. If credentials are correct, you'll be redirected to the main screen

> ⚠️ **Note**: Credentials are stored securely in your browser for future sessions.

---

## 🏠 Main Screen - Databases

After logging in, you'll see a list of all your databases.

### Available Functions:

#### 📋 View Databases
- Each card displays:
  - Database **Name**
  - **Status** (connected/disconnected)
  - Visual connection indicator

#### 🔍 Search Databases
- Use the search bar at the top
- Type the name of the database you're looking for
- Results are filtered automatically

#### ➕ Create New Database
1. Click the **"+ Create Database"** button
2. Enter the name of the new database
3. Click **"Create"**
4. The new database will appear in the list

#### 👁️ View Database Content
- Click on any database card
- You'll be redirected to that database's data view

---

## 📊 Data View

When you select a database, you access the detailed view with three tabs:

### 📄 "Models" Tab

This is the main view for working with documents.

#### **Statistics Information**
At the top you'll see:
- **Total records**: Total number of documents
- **Size**: Database size in KB

#### **Toolbar**
- 🔍 **Search**: Search text in any document field
- ➕ **Add Document**: Add new document
- **Limit**: Controls how many documents are shown per page
- **Pagination**: Navigate between result pages

#### **Document Operations**

Each document has three action buttons:

##### 1️⃣ **Copy Document** 📋
- Click the **copy** icon
- The complete document is copied in JSON format to clipboard
- You'll see a green checkmark when successfully copied

##### 2️⃣ **Edit Document** ✏️
- Click the **pencil/edit** icon (blue)
- A dialog opens with the document's JSON
- Modify the fields you need
- Click **"Update Document"**
- The document will be updated in the database
- You'll see a success notification

> 💡 **Tip**: JSON must be valid. If there are format errors, you'll receive a notification.

##### 3️⃣ **Delete Document** 🗑️
- Click the **trash** icon (red)
- A confirmation dialog appears
- Confirm deletion by clicking **"Delete"**
- The document will be permanently deleted
- The list updates automatically

> ⚠️ **Warning**: Deletion is permanent and cannot be undone.

##### ➕ **Insert New Document**
1. Click the **"Add Document"** button in the top toolbar
2. A JSON editor opens
3. Write the JSON for the new document:
   ```json
   {
     "name": "Example",
     "value": 123,
     "active": true
   }
   ```
4. Click **"Insert Document"**
5. The document is added to the database
6. The list updates showing the new document

#### **Expand/Collapse Documents**
- Click the arrow next to the document number
- The document expands showing all its fields
- Click again to collapse it

#### **Page Navigation**
- Use the ◀️ ▶️ buttons to navigate between pages
- Change the document limit per page (1-1000)

---

### 🔧 "Operations" Tab

*Future functionality for advanced operations*

---

### 📈 "Metrics" Tab

*Future functionality for metrics and analysis*

---

## ⚙️ Top Navigation Bar

At the top of the application you'll find:

### 🌓 **Change Theme**
- Click the theme icon (sun/moon)
- Toggle between light and dark mode
- Your preference is saved automatically

### 🚪 **Log Out**
1. Click the **Log Out** icon
2. Confirm in the dialog that appears
3. You'll be redirected to the login screen
4. Your credentials are removed from the browser

### ❓ **Help**
- Click the **question mark** icon
- Access additional information about the application

---

## 💡 Tips and Best Practices

### ✅ Valid JSON Format
When inserting or editing documents, make sure the JSON is valid:
```json
{
  "field": "value",
  "number": 123,
  "boolean": true,
  "array": [1, 2, 3],
  "object": {
    "nested": "value"
  }
}
```

### 🔍 Effective Search
- Search is **case-insensitive**
- Searches in all document fields
- Results are filtered in real-time

### 📊 Performance Optimization
- Use a reasonable document limit (50-100) for better performance
- If you have many documents, use pagination
- Local search only works on loaded documents

### 💾 Backups
- Regularly copy important documents using the copy button
- Save the JSON in external files as backup

---

## 🐛 Troubleshooting

### ❌ Can't log in
- Verify that username and password are correct
- Make sure the SarychDB server is active and accessible

### ❌ Don't see my databases
- Log out and log back in
- Verify you have permissions to access the databases

### ❌ Error inserting/editing document
- Verify the JSON is valid (use an online JSON validator)
- Make sure data types are correct
- Check that no commas or braces are missing

### ❌ Application is slow
- Reduce the document limit per page
- Use search to filter results
- Log out and log back in

---

## ⌨️ Keyboard Shortcuts

- **Enter** in limit field: Applies the new limit
- **Escape** in dialogs: Closes the dialog
- **Tab**: Navigate between form fields

---

## 🔐 Security

- Credentials are stored only in your local browser
- Never share your credentials with third parties
- Log out when using shared computers
- Data is transmitted securely to the server

---

## 📞 Support

If you have problems or questions:
1. Review this complete guide
2. Check the SarychDB documentation
3. Contact your system administrator

---

## 🎨 User Interface

### Visual Elements
- **Green**: Positive actions (create, update)
- **Red**: Destructive actions (delete)
- **Blue**: Edit actions
- **Gray**: Neutral information

### Animations
- Cards have smooth animations when loading
- Buttons have hover effects for better feedback
- Transitions are fluid for a better experience

---

## 📝 CRUD Operations Summary

| Operation | Location | Action |
|-----------|----------|--------|
| **Create** | "Add Document" button | Inserts new document |
| **Read** | Document list | Views content |
| **Update** | Pencil icon | Edits existing document |
| **Delete** | Trash icon | Deletes document |

---

Enjoy using SarychDB Manager! 🚀
