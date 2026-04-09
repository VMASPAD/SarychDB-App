# SarychDB Manager 🚀

<div align="center">

![SarychDB](https://img.shields.io/badge/SarychDB-Manager-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Tauri](https://img.shields.io/badge/Tauri-2+-FFC131?style=for-the-badge&logo=tauri)

**A modern desktop and web application for managing SarychDB databases**

Similar to MongoDB Compass, but for SarychDB

[📚 Complete Guide](./USER_GUIDE.md) • [⚡ Quick Start](./QUICK_START.md)

</div>

---

## ✨ Features

- 🗄️ **Database Management**: Create, view, and manage your databases
- 📝 **Complete CRUD**: Create, Read, Update, and Delete documents
- 🔍 **Real-time Search**: Filter documents instantly
- 📊 **Statistics**: View database metrics
- 🌐 **Web + App Modes**: Single codebase for browser deployments and Tauri desktop
- 🔁 **REST vNext Ready**: Uses SarychDB REST API endpoints and protocol bridge
- 🎨 **Modern UI**: Professional interface with light/dark theme
- ⚡ **High Performance**: Lazy loading and optimized pagination
- 🔐 **Secure**: Safe credential management

---

## 🚀 Getting Started

### Prerequisites
- SarychDB server running in REST mode
- Valid access credentials

Example start command:

```bash
cargo run -- --rest --port 4040
```

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
- **Data Layer**: Native fetch HTTP client (REST + /sarych compatibility bridge)
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

La aplicación utiliza la API REST de SarychDB y, para operaciones avanzadas de actualización/borrado, usa el bridge de compatibilidad `/sarych`.

### Runtime Modes and API URL Resolution

El frontend selecciona automáticamente la URL base de la API con este orden de prioridad:

1. `VITE_SARYCHDB_API_URL`
2. `localStorage["sarychdbApiBaseUrl"]`
3. Modo App (Tauri): `http://127.0.0.1:4040`
4. Modo Web: `window.location.origin`

Esto permite desplegar solo frontend web y consumir la API en el mismo host del despliegue sin cambios de código.

### Endpoint Mapping

- `GET /health` para estado del servidor
- `POST /api/users` para crear usuario
- `POST /api/databases` para crear base de datos
- `GET /api/databases` para listar bases
- `GET /api/databases/{db}/stats` para estadísticas
- `GET /api/databases/{db}/browse` para paginación simple
- `GET /api/databases/{db}/list` para filtros/sort/paginación avanzada
- `GET/POST /api/databases/{db}/records` para búsqueda/inserción
- `POST /sarych` para compatibilidad de operaciones tipo protocolo

### Frontend Operations

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

### Health Check

El chequeo de salud visual de la UI usa `${getApiBaseUrl()}/health` y actualiza el estado del fondo en tiempo real.

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

