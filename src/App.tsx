import "./App.css";
import DataBases from "./pages/DataBases";
import LogIn from "./pages/LogIn";

function App() {
  const getLog = localStorage.getItem("isLoged") === "true" ? false : true;
  if (getLog) {
    return (
      <LogIn />
    );
  } else {
    return (
      <DataBases />
    );
  }

}

export default App;
