import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error from './Page/Error.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from './Page/LoginPage.jsx'
import { AuthProvider } from './utils/authContext.jsx'
import CreateChannel from './Page/CreateChannel.jsx'

// Lazy loading for pages
const Home = lazy(() => import('./Page/Home.jsx'));
const Video = lazy(() => import('./Page/Video.jsx'));
const MyChannel = lazy(() => import('./Page/MyChannel.jsx'));

// Creating Routing Configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "/watch/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Video />
          </Suspense>
        )
      },
      {
        path: "/my-channel",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MyChannel />
          </Suspense>
        )
      }
    ],
    errorElement: <Error />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/create",
    element: <CreateChannel />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </StrictMode>
)
