import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainPage, LoginOrRegisterPage } from "./components";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginOrRegisterPage
                endpoint="login"
                redirectEndpoint="register"
                submitButtonContent="Login"
                question="Don't you have account?"
                redirectContent="Sign up"
              />
            }
          />
          <Route
            path="/register"
            element={
              <LoginOrRegisterPage
                endpoint="register"
                redirectEndpoint="login"
                submitButtonContent="Sign up"
                question="Already have an account."
                redirectContent="Login"
              />
            }
          />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
