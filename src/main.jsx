import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error from './Page/Error.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import LoginPage from './Page/LoginPage.jsx'
import Home from './Page/Home.jsx'
import Video from './Page/Video.jsx'

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
    ],
    errorElement: <Error/>
  },
  
  {
    path: "/login",
    element: <LoginPage/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
