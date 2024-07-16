import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PokemonCard from './components/PokemonCard/index.jsx';
import PokemonPage from './components/PokemonPage/index.jsx';
import { ThemeProvider } from './context/theme-context.jsx';
import ErrorPage from './components/ErrorPage/index.jsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PokemonCard />
      },
      {
        path: "pokemon/:id",
        element: <PokemonPage />
      },
      {
        path: "/type/:type",
        element: <PokemonCard />
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
