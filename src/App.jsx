import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/authPage";
import { TasksPage } from "./pages/tasksPage";
import { ErrorPage } from "./pages/errorPage";
import { SignUpPage } from "./pages/signUpPage";

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([{
    login: 'admin',
    password: 'admin'
  }]))
}

if (!localStorage.getItem('tasks')) {
  localStorage.setItem('tasks', JSON.stringify([]))
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
