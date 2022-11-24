import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "./components";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
