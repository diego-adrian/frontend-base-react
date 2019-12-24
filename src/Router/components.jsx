import React, { lazy, Suspense } from 'react';
/* Login Component */
const LazyLogin = lazy(() => import('../components/Login/Login'));
export const Login = () => (
  <Suspense fallback={<div>Cargando información...</div>}>
    <LazyLogin/>
  </Suspense>
);
