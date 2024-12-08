import { Navigate, Outlet } from 'react-router-dom';

const APrivateRoute = () => {
  const isAuth = !!localStorage.getItem('adminToken'); 
  return isAuth ? <Outlet /> : <Navigate to="/admin" />;
};

export default APrivateRoute;
