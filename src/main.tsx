import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import NavBar from "./components/NavBar";
import LaserFlow from "./components/LaserFlow";
import ViewData from "./pages/ViewData";
import DataBases from "./pages/DataBases";
import { Toaster } from "sonner";

// Componente para manejar el estado dinámico
function DynamicApp() {
  const [serverStatus, setServerStatus] = useState<boolean>(
    localStorage.getItem("statusServer") === "true"
  );
  useEffect(() => {
    const checkServerHealth = () => {
      fetch(`http://localhost:3030/health`)
        .then((response) => response.json())
        .then((data) => {
          setServerStatus(data.status === "ok");
          localStorage.setItem("statusServer", data.status === "ok" ? "true" : "false");
        })
        .catch((error) => {
          console.error("Error checking server health:", error);
          setServerStatus(false);
          localStorage.setItem("statusServer", "false");
        });
    };

    // Ejecutar inmediatamente
    checkServerHealth();

    // Configurar intervalo para ejecutar cada 3 segundos
    const interval = setInterval(checkServerHealth, 3000);

    return () => clearInterval(interval);
  }, []);
  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setServerStatus(localStorage.getItem("statusServer") === "true");
    };

    // Escuchar eventos de storage para cambios desde otras pestañas
    window.addEventListener("storage", handleStorageChange);

    // Opcional: Polling cada cierto tiempo para detectar cambios locales
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/databases",
      element: <DataBases />,
    },
    {
      path: "/view/:id",
      element: <ViewData />,
    },
  ]);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 h-screen">
        <LaserFlow
          color={serverStatus ? "#0b510b" : "#710b0b"}
        />
      </div>
      <div className="relative z-10">
        <NavBar />
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DynamicApp />
  </React.StrictMode>,
);
