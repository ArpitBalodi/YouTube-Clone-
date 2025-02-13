import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error from './Page/Error.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import LoginPage from './Page/LoginPage.jsx'
import Video from './Page/Video.jsx'
import { AuthProvider } from './utils/authContext.jsx'
import Home from './Page/home.jsx'
import CreateChannel from './Page/CreateChannel.jsx'
import MyChannel from './Page/MyChannel.jsx'

//Creating Routing Configuration

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/watch/:id",
        element:<Video/>
      },
      {
        path: "/my-channel",
        element: <MyChannel/>
      }
    ],
    errorElement: <Error/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/create",
    element: <CreateChannel/>
  }
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
</StrictMode>
)
