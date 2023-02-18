import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  LoginPage,
  PasswordRecoveryPage,
  RegisterPage,
  HomePage,
  MainPage,
} from "./components";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/password-recovery' element={<PasswordRecoveryPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/home'
            element={<ProtectedRoute component={<HomePage />} />}
          />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
