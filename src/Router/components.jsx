import React, { lazy, Suspense } from 'react';
const LazyLogin = lazy(() => import('../components/Login'));
const LazyDashboard = lazy(() => import('../components/Dashboard'));

export const Login = () => (
  <Suspense fallback={<div className="app--suspense">Cargando...</div>}>
    <LazyLogin/>
  </Suspense>
);

export const DashboardPage = () => (
  <Suspense fallback={<div className="app--suspense">Cargando...</div>}>
    <LazyDashboard/>
  </Suspense>
);
