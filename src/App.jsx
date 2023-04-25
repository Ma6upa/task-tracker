import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/authPage";
import { TasksPage } from "./pages/tasksPage";
import { ErrorPage } from "./pages/errorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
