import DataTable, { TableColumn } from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useBorrowStore } from "../../state/store";
import { toast } from "react-toastify";
import { Borrow } from "../../interface";
import { FadeLoader } from "react-spinners";
import { tableCustomStyles } from "../../utils/tableCustomStyles";

export default function () {
  const navigate = useNavigate();
  const { borrows, loading, getAllBorrows, deleteBorrowById } =
    useBorrowStore();

  useQuery({
    queryKey: ["borrows"],
    queryFn: getAllBorrows,
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this borrow records")) {
      await deleteBorrowById(id);
      toast.error("Borrow Record Deleted Successfully");
    }
  };

  const columns: TableColumn<Borrow>[] = [
    {
      name: "No.",
      selector: (row) => row?.borrowNumber,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.user?.fullname,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row?.user?.position?.department?.department_name,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row) => row?.user?.position?.position_name,
      sortable: true,
    },
    {
      name: "Lend By:",
      selector: (row) => row?.lender?.fullname,
      sortable: true,
    },
    {
      name: "Equipment",
      selector: (row) => row?.equipment?.equipment_name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row?.quantity,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row?.reason,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
    },
    {
      name: "Date Borrowed",
      selector: (row) =>
        new Date(row?.borrow_date?.toLocaleString())
          .toISOString()
          .split("T")[0],
      sortable: true,
    },
    {
      name: "Date Returned",
      selector: (row) =>
        row?.return_date
          ? new Date(row?.return_date?.toLocaleString())
              .toISOString()
              .split("T")[0]
          : "Not Returned",
      sortable: true,
    },
    {
      name: "E-Signature",
      cell: (row) => (
        <img src={row?.signature} alt="signature" className="m-1 w-14 h-14" />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center text-center">
          <>
            <FaEye
              className="mr-2 text-xl text-green-500"
              onClick={() => navigate(`/technician/borrow/${row._id}`)}
            />
            <FaPencilAlt
              className="mr-2 text-xl text-blue-500"
              onClick={() => navigate(`/technician/borrow/edit/${row._id}`)}
            />
            <FaTrash
              className="text-xl text-red-500"
              onClick={() => handleDelete(row._id)}
            />
          </>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FFB6C1" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="max-w-full p-4 overflow-hidden rounded-lg bg-none sm:p-6 lg:p-8 md:w-full">
            <div className="flex items-center justify-end m-2">
              <button
                onClick={() => navigate("/technician/borrow/create")}
                className="text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700"
              >
                Borrow Forms <i className="fa fa-plus"></i>
              </button>
            </div>
            <DataTable
              title="Technician Borrow Records"
              columns={columns}
              data={borrows}
              pagination
              highlightOnHover
              pointerOnHover
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30]}
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
      )}
    </>
  );
}
