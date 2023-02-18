import { Cookies, useCookies } from "react-cookie";

interface ProtectedRouteProps {
  component: JSX.Element;
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const [cookies, _] = useCookies(["isLogged"]);

  return cookies.isLogged == "true" ? (
    component
  ) : (
    <div>Nieautoryzowanym wstęp wzbroniony</div>
  );
};

export default ProtectedRoute;
