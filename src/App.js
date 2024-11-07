
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import './styles/App.css';
import DashboardPage from './pages/DashboardPage';

function App() {
  const myRouter = createBrowserRouter([
    {path: '', Component:Login},
    {path: '/login' , Component: Login},
    {path: '/signup' , Component: Signup},
    {path: '/dashboard' , Component: DashboardPage},
  ])
  return (
    <>
      <RouterProvider router={myRouter}>
        <Login/>
      </RouterProvider>
    </>
  );
}

export default App;
