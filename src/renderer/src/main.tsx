import './styles/globals.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Index from '@/routes/Index'
import Login from '@/routes/auth/Login'
import TextListener from '@/components/TextListener'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const router = createBrowserRouter([
  {
      path: '/',
      element: <Index />
  },
  {
      path: '/auth/login',
      element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider defaultTheme='dark'>
            <RouterProvider router={router} />
            <TextListener />
        </ThemeProvider>
    </StrictMode>
)