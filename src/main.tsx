import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/ui/ThemeProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <RouterProvider router={router} />
     <Toaster position="top-center" />
      </ThemeProvider>
     
     </Provider>
  </StrictMode>,
)
