import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));

const PageVideoList = lazy(() => import('src/pages/content/video/list'));
const PageVideoRanking = lazy(() => import('src/pages/content/video/ranking'));

// ----------------------------------------------------------------------

export const contentRoutes = [
  {
    path: 'content',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'video',
        children: [
          { element: <PageVideoList />, index: true },
          { path: 'list', element: <PageVideoList /> },
          { path: 'ranking', element: <PageVideoRanking /> },
        ],
      },
    ],
  },
];
