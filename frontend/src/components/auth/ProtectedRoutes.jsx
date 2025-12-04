import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../../pages/Auth/LoginPage";
import AppLayout from "../layout/AppLayout";

const ProtectedRoutes = () => {
  const isAuthenticated = false;
  const isLoading = false;
  if (isLoading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to={<LoginPage />} />
  );
};

export default ProtectedRoutes;
