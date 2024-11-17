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
  SignUp,
  Dashboard
} from './Pages'
import { ProtectedRoute } from './components'
import { HomeLayout, AdminLayout, CustomerLayout } from './layout'

function App () {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<HomeLayout />}>
          {/* Public Routes  */}
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        {/* Customer Private Routes */}
        <Route element={<CustomerLayout />}>
          <Route
            path='/test'
            index
            element={
              <ProtectedRoute userRole={['customer']}>
                <AuthenticatedTest />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Admin Private Routes */}
        <Route element={<AdminLayout />}>
          <Route
            path='/dashboard'
            index
            element={
              <ProtectedRoute userRole={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
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
