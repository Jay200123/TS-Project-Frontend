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
  Dashboard,
  UsersTable,
  ApproveUserTable,
  GetUserById,
  AdminProfile,
  EditUser,
  DepartmentTable,
  CreateDepartment,
  EditDepartment,
  GetDepartmentById,
  PositionTable,
  CreatePosition,
  GetPositionById,
  EditPosition
} from './Pages'
import { ProtectedRoute } from './components'
import { 
  HomeLayout,
  AdminLayout,
  CustomerLayout
} from './layout'

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
              <ProtectedRoute userRole={['Employee']}>
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
              <ProtectedRoute userRole={['Admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/users'
            index
            element={
              <ProtectedRoute userRole={['Admin']}>
                <UsersTable />
              </ProtectedRoute>
            }
          />
          <Route
            path='/approve-users'
            index
            element={
              <ProtectedRoute userRole={['Admin']}>
                <ApproveUserTable />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/:id'
            index
            element={
              <ProtectedRoute userRole={['Admin']}>
                <GetUserById />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin-profile'
            index
            element={
              <ProtectedRoute userRole={['Admin']}>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='user/edit/:id'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          {/* Department Routes */}
          <Route
            path='/departments'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <DepartmentTable />
              </ProtectedRoute>
            }
          />
          <Route
            path='/department/create'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <CreateDepartment />
              </ProtectedRoute>
            }
          />
          <Route
            path='/department/:id'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <GetDepartmentById />
              </ProtectedRoute>
            }
          />
          <Route
            path='/department/edit/:id'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <EditDepartment />
              </ProtectedRoute>
            }
          />

          {/* Position Routes */}
          <Route
            path='/positions'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <PositionTable />
              </ProtectedRoute>
            }
          />
          <Route
            path='/position/create'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <CreatePosition />
              </ProtectedRoute>
            }
          />
          <Route
            path='/position/:id'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <GetPositionById />
              </ProtectedRoute>
            }
          />
            <Route
            path='/position/edit/:id'
            element={
              <ProtectedRoute userRole={['Admin']}>
                <EditPosition />
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
