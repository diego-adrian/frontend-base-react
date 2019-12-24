import React, { lazy, Suspense } from 'react';

/* Login Component */
const LazyLogin = lazy(() => import('../components/Login/Login'));
export const Login = () => (
  <Suspense fallback={<div className="app--suspense">Cargando...</div>}>
    <LazyLogin/>
  </Suspense>
);
