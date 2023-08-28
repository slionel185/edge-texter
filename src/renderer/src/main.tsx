import './styles/globals.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Index from '@/routes/Index'
import Login from '@/routes/auth/Login'
import TextListener from '@/components/listeners/TextListener'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import ErrorListener from '@/components/listeners/ErrorListener'

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
            <Toaster />
            <TextListener />
            <ErrorListener />
        </ThemeProvider>
    </StrictMode>
)