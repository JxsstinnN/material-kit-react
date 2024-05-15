import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Manual from 'src/pages/manual';
import CreateManual from 'src/pages/create-manual';
import DashboardLayout from 'src/layouts/dashboard';
import EditManualForm from 'src/pages/edit-manual-form';
import CreateManualForm from 'src/pages/create-manual-form';

export const IndexPage = lazy(() => import('src/pages/app'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'manual/:id', element: <Manual /> },
        { path: 'crearmanualdaite', element: <CreateManual /> },
        { path: 'crearmanualdaite/:id', element: <EditManualForm />},
        { path: 'crearmanualdaite/nuevo', element: <CreateManualForm /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
