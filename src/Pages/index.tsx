import Home from "./Home";
import Login from "./Login";
import AuthenticatedTest from "./AuthenticatedTest";
import Unauthorized from "./Unauthorized";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import UsersTable from "./Users";
import GetUserById from "./Users/getUserById";
import EditUser from "./Users/editUser";
import DepartmentTable from "./Department";
import CreateDepartment from "./Department/createDepartment";
import GetDepartmentById from "./Department/getDepartmentById";
import EditDepartment from "./Department/editDepartment";
import PositionTable from "./Position";
import CreatePosition from "./Position/createPosition";
import GetPositionById from "./Position/getPositionById";
import EditPosition from "./Position/editPosition";
import GetAllBranch from "./Branch";
import CreateBranch from "./Branch/createBranch";
import GetBranchById from "./Branch/getBranchById";
import EditBranch from "./Branch/editBranch";
import TechnicianSignup from "./SignUp/TechnicianSignup";
import SignUpChoice from "./SignUp/SignUpChoice";
import DeviceTable from "./Device";
import GetDeviceById from "./Device/getDeviceById";
import CreateDevice from "./Device/createDevice";
import EditDevice from "./Device/editDevice";
import UserDevices from "./UserDevices";
import TicketForm from "./CreateTicket";
import TicketTable from "./Ticket";
import AssignTicket from "./Ticket/assignTicket";
import TechnicianTickets from "./TechnicianTicket";
import GetTicketById from "./Ticket/getTicketById";
import EditTicketByTechnician from "./Ticket/editTicketByTechnician";
import EmployeeTicket from "./EmployeeTicket";
import HistoryTable from "./History";
import GetHistoryById from "./History/getHistoryById";
import GetTicketDepartment from "./DeparmentTicket";
import ChangePassword from "./ChangePassword";
import GetHistoryByDeviceId from "./History/getHistoryByDeviceId";
import GetTechnicianTickets from "./TicketPerformance";
import EquipmentTable from "./Equipment";
import CreateEquipment from "./Equipment/createEquipment";
import GetEquipmentById from "./Equipment/getEquipmentById";
import EditEquipment from "./Equipment/editEquipment";
import BorrowTable from "./Borrow";
import CreateBorrow from "./Borrow/createBorrow";
import EditBorrow from "./Borrow/editBorrow";
import GetBorrowById from "./Borrow/getBorrowById";
import TechnicianBorrow from "./Borrow/technicianBorrow";

export {
  Home,
  Login,
  AuthenticatedTest,
  Unauthorized,
  SignUp,
  Dashboard,
  UsersTable,
  GetUserById,
  EditUser,
  DepartmentTable,
  GetDepartmentById,
  EditDepartment,
  CreateDepartment,
  PositionTable,
  CreatePosition,
  GetPositionById,
  EditPosition,
  GetAllBranch,
  CreateBranch,
  GetBranchById,
  EditBranch,
  TechnicianSignup,
  SignUpChoice,
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
};
