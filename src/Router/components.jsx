import React, { lazy, Suspense } from 'react';

const LazyLogin = lazy(() => import('../components/Login'));
const LazyUsuarios = lazy(() => import('../components/User'));
const LazyDashboard = lazy(() => import('../components/Dashboard'));

export const Login = () => (
  <Suspense fallback={<div className="app--suspense">Cargando login, espere unos segundos por favor...</div>}>
    <LazyLogin/>
  </Suspense>
);
export const Usuarios = () => (
  <Suspense fallback={<div className="app--suspense">Cargando usuarios, espere unos segundos por favor ...</div>}>
    <LazyUsuarios/>
  </Suspense>
);
export const Dashboard = () => (
  <Suspense fallback={<div className="app--suspense">Cargando el dashboard, espere unos segundos por favor ...</div>}>
    <LazyDashboard/>
  </Suspense>
);
