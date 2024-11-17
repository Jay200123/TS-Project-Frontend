import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import { 
  Home,
  Login,
  AuthenticatedTest,
  Unauthorized,
  SignUp
 } from './Pages'
 import { ProtectedRoute } from './components';
import MainLayout from './layout';

function App () {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        {/* Public Routes  */}
        <Route index element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        {/* Private Routes */}
        <Route
         path='/test'
          element={
          <ProtectedRoute userRole={["admin"]}>
          <AuthenticatedTest/>
          </ProtectedRoute>
          }
          />

      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
