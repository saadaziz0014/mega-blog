import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import { ProtectedLayout } from './components/index.js'
import Signup from './pages/Signup.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedLayout authStatus={false}>
        <Login />
      </ProtectedLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedLayout authStatus={false} forSignup={true}>
        <Signup />
      </ProtectedLayout>
    )
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedLayout authStatus={true}>
            <App />
          </ProtectedLayout>
        ),
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
