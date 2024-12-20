import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {
  Home,
  Login,
  SignUpChoice,
  Unauthorized,
  SignUp,
  Dashboard,
  UsersTable,
  GetUserById,
  EditUser,
  DepartmentTable,
  CreateDepartment,
  EditDepartment,
  GetDepartmentById,
  PositionTable,
  CreatePosition,
  GetPositionById,
  EditPosition,
  GetAllBranch,
  CreateBranch,
  GetBranchById,
  EditBranch,
  TechnicianSignup,
  DeviceTable,
  GetDeviceById,
  CreateDevice,
  EditDevice,
  UserDevices,
  TicketForm,
  TicketTable,
  AssignTicket,
  TechnicianTickets,
  GetTicketById,
  EditTicketByTechnician,
  EmployeeTicket,
  HistoryTable,
  GetHistoryById,
  GetTicketDepartment,
  ChangePassword,
  GetHistoryByDeviceId,
  GetTechnicianTickets,
  EquipmentTable,
  CreateEquipment,
  GetEquipmentById,
  EditEquipment,
  BorrowTable,
  CreateBorrow,
  EditBorrow,
  GetBorrowById,
  TechnicianBorrow,
   Inventory,
} from "./Pages";
import { ProtectedRoute } from "./components";
import {
  HomeLayout,
  AdminLayout,
  EmployeeLayout,
  TechnicianLayout,
} from "./layout";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<HomeLayout />}>
          {/* Public Routes  */}
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/change/password"
            element={
              <ProtectedRoute userRole={["Employee", "Technician", "Admin"]}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Customer Private Routes */}
        <Route element={<EmployeeLayout />}>
          <Route
            path="/employee/device"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <UserDevices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket/create"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <TicketForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/ticket/:id"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <GetTicketById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/tickets"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <EmployeeTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/department/tickets"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <GetTicketDepartment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/history/device/:id"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <GetHistoryByDeviceId />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrow/employee"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <BorrowTable />
              </ProtectedRoute>
            }
          />
           <Route
            path="/employee/borrow/create"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <CreateBorrow />
              </ProtectedRoute>
            }
          />
           <Route
            path="/employee/borrow/:id"
            element={
              <ProtectedRoute userRole={["Employee"]}>
                <GetBorrowById />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Technician Private Routes */}
        <Route element={<TechnicianLayout />}>
          <Route
            path="/technician/tickets"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <TechnicianTickets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/technician/ticket/:id"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <GetTicketById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/technician/ticket/edit/:id"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <EditTicketByTechnician />
              </ProtectedRoute>
            }
          />
          <Route
            path="/technician/all-tickets"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <TicketTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/technician/ticket/:id"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <GetTicketById />
              </ProtectedRoute>
            }
          />
            <Route
            path="/technician/borrows"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <TechnicianBorrow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/technician/borrow/create"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <CreateBorrow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/technician/borrow/:id"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <GetBorrowById />
              </ProtectedRoute>
            }
          />
           <Route
            path="/technician/borrow/edit/:id"
            element={
              <ProtectedRoute userRole={["Technician"]}>
                <EditBorrow />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Private Routes */}
        <Route element={<AdminLayout />}>
          {/* SIGN UP ROUTES  */}
          <Route
            path="/admin/signup"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <SignUpChoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employee/signup"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <SignUp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/technician/signup"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <TechnicianSignup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            index
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            index
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <UsersTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:id"
            index
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetUserById />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/edit/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          {/* Department Routes */}
          <Route
            path="/departments"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <DepartmentTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/department/create"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <CreateDepartment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/department/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetDepartmentById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/department/edit/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EditDepartment />
              </ProtectedRoute>
            }
          />

          {/* Position Routes */}
          <Route
            path="/positions"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <PositionTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/position/create"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <CreatePosition />
              </ProtectedRoute>
            }
          />
          <Route
            path="/position/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetPositionById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/position/edit/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EditPosition />
              </ProtectedRoute>
            }
          />

          {/* Branch Routes */}
          <Route
            path="/branches"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetAllBranch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/branch/create"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <CreateBranch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branch/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetBranchById />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branch/edit/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EditBranch />
              </ProtectedRoute>
            }
          />

          {/* Device Routes */}
          <Route
            path="/devices"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <DeviceTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/device/create"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <CreateDevice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/device/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetDeviceById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/device/edit/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EditDevice />
              </ProtectedRoute>
            }
          />
          {/* Ticket Routes  */}
          <Route
            path="/tickets"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <TicketTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket/assign/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <AssignTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetTicketById />
              </ProtectedRoute>
            }
          />
          {/* History Routes  */}
          <Route
            path="/histories"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <HistoryTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetHistoryById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history/device/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetHistoryByDeviceId />
              </ProtectedRoute>
            }
          />
          {/* Ticket Reports  */}
          <Route
            path="admin/tickets/reports"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetTechnicianTickets />
              </ProtectedRoute>
            }
          />
          {/* Equipment Routes */}
          <Route
            path="/equipments"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EquipmentTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment/create"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <CreateEquipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetEquipmentById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment/edit/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EditEquipment />
              </ProtectedRoute>
            }
          />
          {/* Borrow Routes */}
          <Route
            path="/borrows"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <BorrowTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrow/create"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <CreateBorrow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrow/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <GetBorrowById />
              </ProtectedRoute>
            }
          />
           <Route
            path="/borrow/edit/:id"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <EditBorrow />
              </ProtectedRoute>
            }
          />
           <Route
            path="/inventories"
            element={
              <ProtectedRoute userRole={["Admin"]}>
                <Inventory />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
