import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import { 
  Home,
  Login,
  AuthenticatedTest
 } from './Pages'
import MainLayout from './layout';

function App () {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        {/* Public Routes  */}
        <Route index element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element={<AuthenticatedTest/>}/>

        {/* Private Routes */}
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
