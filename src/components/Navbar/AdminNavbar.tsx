import { useState } from "react";
import { useAuthenticationStore } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const { logout, user } = useAuthenticationStore();

  const login = () => {
    navigate("/login");
  };

  const dashboard = () => {
    navigate("/dashboard");
  };

  const users = () => {
    navigate("/users");
  };

  const departments = () => {
    navigate("/departments");
  };

  const positions = () => {
    navigate("/positions");
  };

  const branches = () => {
    navigate("/branches");
  };

  const devices = () => {
    navigate("/devices");
  };

  const tickets = () => {
    navigate("/tickets");
  };

  const histories = () => {
    navigate("/histories");
  };

  const equipments = () => {
    navigate("/equipments");
  };

  const borrow = ()=>{
    navigate("/borrows");
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Successfully Log Out");
    } catch (error) {
      toast.error("Error Logging Out");
    }
  };

  const technicianTickets = () => {
    navigate("admin/tickets/reports");
  };

  return (
    <nav className="flex items-center justify-between w-full text-black shadow-sm h-14 shadow-slate-400">
      <div className="p-2 m-2">
        <h3 className="text-lg">IT Support</h3>
      </div>

      <div className="p-2 m-2 md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <div className="space-y-1 cursor-pointer">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </div>

      <div className={`m-2 p-2 ${isOpen ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-row items-start justify-start md:flex-row md:items-center">
          <li
            onClick={technicianTickets}
            className="p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm"
          >
            <i className="fa-solid fa-clipboard"></i> Ticket Performance Reports
          </li>
          <li
            onClick={dashboard}
            className="p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm"
          >
            <i className="fa-solid fa-chart-simple"></i>Dashboard
          </li>

          <li
            onClick={tickets}
            className="p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm"
          >
            <i className="m-1 fas fa-ticket"></i> Tickets
          </li>
          <li
            onClick={borrow}
            className="p-2 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm"
          >
           <i className="mr-1 fa-solid fa-handshake"></i>Borrow Items
          </li>

          <li
            onClick={() => setIsTableOpen(!isTableOpen)}
            className="relative p-3 m-2 text-sm transition duration-300 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm"
          >
            <span>
              <i className="m-1 fa-solid fa-table"></i>Tables
            </span>
            {user ? (
              <div
                className={`absolute top-full left-0 bg-gray-700 rounded shadow-md z-10 mt-2 p-2 transition-all duration-300 ease-in-out transform ${
                  isTableOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <ul
                  className="flex flex-col gap-1"
                  onClick={() => setIsTableOpen(false)}
                >
                  <li
                    onClick={users}
                    className="flex items-center gap-2 p-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-circle-user"></i> Users
                  </li>

                  <li
                    onClick={branches}
                    className="flex items-center gap-2 p-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-code-branch"></i> Branch
                  </li>

                  <li
                    onClick={departments}
                    className="flex items-center gap-2 p-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-building"></i> Department
                  </li>

                  <li
                    onClick={positions}
                    className="flex items-center gap-2 p-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-location-dot"></i> Position
                  </li>

                  <li
                    onClick={devices}
                    className="flex items-center gap-2 p-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-computer"></i> Devices
                  </li>
                  <li
                    onClick={equipments}
                    className="flex items-center gap-2 p-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  >
                      <i className="fa-solid fa-toolbox"></i> Equipments
                  </li>

                  <li
                    onClick={histories}
                    className="flex items-center gap-2 p-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-hourglass-start"></i> History
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </li>
          {user ? (
            <li
              onClick={handleLogout}
              className="p-2 text-sm text-black transition-all duration-500 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-white"
            >
              <i className="m-1 fa-solid fa-arrow-right-from-bracket"></i> Sign
              Out
            </li>
          ) : (
            <li
              onClick={login}
              className="p-2 m-2 text-sm text-gray-700 transition duration-500 rounded cursor-pointer hover:bg-gray-700 hover:text-white md:text-sm"
            >
              <i className="fa-solid fa-right-to-bracket"></i> Sign In
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
