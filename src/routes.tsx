import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShellV2 } from './components/layout-v2/AppShellV2';
import { ProjectListV2 } from './pages/v2/ProjectListV2';
import { ProjectDetailV2 } from './pages/v2/ProjectDetailV2';
import { TemplatesV2 } from './pages/v2/TemplatesV2';
import { LoginPage } from './pages/LoginPage';
import { RequireAuth } from './components/auth/RequireAuth';

export const router = createBrowserRouter([
  { path: 'login', element: <LoginPage /> },
  { index: true, element: <RequireAuth><Navigate to="/projects" replace /></RequireAuth> },
  {
    path: '/',
    element: <RequireAuth><AppShellV2 /></RequireAuth>,
    children: [
      { path: 'projects', element: <ProjectListV2 /> },
      { path: 'projects/:projectId', element: <ProjectDetailV2 /> },
      { path: 'templates', element: <TemplatesV2 /> },
    ],
  },
]);
