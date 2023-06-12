import { Navigate } from 'react-router-dom';

const AuthGuard = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("Token");

  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;
