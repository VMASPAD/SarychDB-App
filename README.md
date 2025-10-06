# SarychDB Manager 🚀

<div align="center">

![SarychDB](https://img.shields.io/badge/SarychDB-Manager-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Tauri](https://img.shields.io/badge/Tauri-2+-FFC131?style=for-the-badge&logo=tauri)

**A modern desktop application for managing SarychDB databases**

Similar to MongoDB Compass, but for SarychDB

[📚 Complete Guide](./USER_GUIDE.md) • [⚡ Quick Start](./QUICK_START.md)

</div>

---

## ✨ Features

- 🗄️ **Database Management**: Create, view, and manage your databases
- 📝 **Complete CRUD**: Create, Read, Update, and Delete documents
- 🔍 **Real-time Search**: Filter documents instantly
- 📊 **Statistics**: View database metrics
- 🎨 **Modern UI**: Professional interface with light/dark theme
- ⚡ **High Performance**: Lazy loading and optimized pagination
- 🔐 **Secure**: Safe credential management

---

## 🚀 Getting Started

### Prerequisites
- SarychDB server running
- Valid access credentials

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
cd sarychdb-app
npm install

# Run in development
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Build Tauri application
npm run tauri build
```

---

## 📖 Documentation

### For Users

- **[📚 Complete User Guide](./USER_GUIDE.md)** - Detailed step-by-step documentation
- **[⚡ Quick Start](./QUICK_START.md)** - Quick reference and essential commands
- **[📝 JSON Examples](./JSON_EXAMPLES.md)** - Templates and valid document examples

### For Developers

#### Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Animations**: Framer Motion
- **Desktop**: Tauri 2
- **Client**: sarychdb-client
- **Editor**: Monaco Editor (JSON)
- **Notifications**: Sonner

#### Project Structure

```
sarychdb-app/
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # Base UI components
│   │   ├── NavBar.tsx  # Navigation bar
│   │   └── ...
│   ├── pages/          # Main pages
│   │   ├── DataBases.tsx   # Database list
│   │   ├── ViewData.tsx    # Data view
│   │   ├── LogIn.tsx       # Login
│   │   └── ViewsData/
│   │       └── Models.tsx  # Document CRUD
│   ├── lib/
│   │   ├── operations.ts   # API operations
│   │   └── utils.ts        # Utilities
│   └── App.tsx         # Main app
├── src-tauri/          # Tauri configuration
├── USER_GUIDE.md       # Complete guide
└── QUICK_START.md      # Quick start
```

---

## 🎯 Main Features

### 1. Database Management
- ✅ List all databases
- ✅ Create new databases
- ✅ Search and filtering
- ✅ Statistics and metrics

### 2. CRUD Operations
- ✅ **Create**: Insert new documents with JSON editor
- ✅ **Read**: View documents with expandable format
- ✅ **Update**: Edit existing documents
- ✅ **Delete**: Delete documents with confirmation

### 3. Advanced Features
- ✅ Pagination with customizable limits
- ✅ Local search in documents
- ✅ Lazy loading for optimal performance
- ✅ Copy documents to clipboard
- ✅ JSON validation
- ✅ Success/error notifications

---

## 🔧 API Operations

La aplicación utiliza todas las funciones disponibles de SarychDB:

```typescript
// Bases de datos
- createDB()
- listDatabases()
- getDatabaseStats()

// Documentos
- getDatabasesContent()      // Browse
- listDatabaseContent()      // Advanced list
- insertDocument()           // Create
- updateDocumentById()       // Update
- updateDocumentsByQuery()   // Bulk update
- deleteDocuments()          // Delete

// Búsqueda
- searchDocuments()
- searchByKey()
- searchByValue()

// Usuario
- checkUser()
- createUser()
- logout()
```

---

## 📝 Available Scripts

```bash
npm run dev          # Development with Vite
npm run build        # Production build
npm run preview      # Preview build
npm run tauri dev    # Tauri development
npm run tauri build  # Build desktop application
```

---

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Report Issues

If you find any bug or have suggestions:

1. Verify that a similar issue doesn't exist
2. Create a new issue with:
   - Detailed problem description
   - Steps to reproduce
   - Screenshots (if applicable)
   - Application version

---

## 📄 License

This project is under the MIT License.

---

## 🙏 Acknowledgments

- SarychDB for the excellent database
- Shadcn/ui for the UI components
- Tauri for the desktop framework
- The React and TypeScript community

---

## 📞 Support

- 📚 Documentation: [USER_GUIDE.md](./USER_GUIDE.md)
- ⚡ Quick Start: [QUICK_START.md](./QUICK_START.md)
- 📝 JSON Examples: [JSON_EXAMPLES.md](./JSON_EXAMPLES.md)

---

<div align="center">

**Made with ❤️ using React, TypeScript and Tauri**

⭐ If you like this project, give it a star on GitHub!

</div>

---

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

