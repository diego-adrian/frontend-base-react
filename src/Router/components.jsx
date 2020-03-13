import React, { lazy, Suspense } from 'react';

const LazyLogin = lazy(() => import('../components/Login'));
const LazyDashboard = lazy(() => import('../components/Dashboard'));
const LazyUser = lazy(() => import('../components/User'));

export const Login = () => (
  <Suspense fallback={<div className="app--suspense">Cargando el login, espere unos segudos por favor...</div>}>
    <LazyLogin/>
  </Suspense>
);
export const User = () => (
  <Suspense fallback={<div className="app--suspense">Cargando...</div>}>
    <LazyUser/>
  </Suspense>
);

export const DashboardPage = () => (
  <Suspense fallback={<div className="app--suspense">Cargando el dashboard, espere unos segundos por favor ...</div>}>
    <LazyDashboard/>
  </Suspense>
);
