import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

// Redirect authenticated users away from auth pages (login/register)
export default function AuthRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/dashboard" replace />;
  return children;
}
