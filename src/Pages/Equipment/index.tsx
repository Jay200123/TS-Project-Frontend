import { useEquipmentStore } from "../../state/store";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Equipment } from "../../interface";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import DataTable, { TableColumn } from "react-data-table-component";
import { FadeLoader } from "react-spinners";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { equipments, loading, getAllEquipments, deleteEquipmentById } =
    useEquipmentStore();

  useQuery({
    queryKey: ["equipments"],
    queryFn: getAllEquipments,
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      await deleteEquipmentById(id);
      toast.success("Equipment deleted successfully");
    }
  };

  const columns: TableColumn<Equipment>[] = [
    {
      name: "Equipment Name",
      selector: (row) => row?.equipment_name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => `${row?.quantity} pcs.`,
      sortable: true,
    },
    {
      name: "Borrowed Quantity",
      selector: (row) => `${row?.borrowedQuantity} pcs.`,
      sortable: true,
    },
    {
      name: "Damaged Quantity",
      selector: (row) => `${row?.damagedQuantity} pcs.`,
      sortable: true,
    },
    {
      name: "Lost Quantity",
      selector: (row) => `${row?.lostQuantity} pcs.`,
      sortable: true,
    },
    {
      name: "Images",
      cell: (row) => {
        const randomImage =
          row?.image?.length > 0
            ? row.image[Math.floor(Math.random() * row.image?.length)]
            : null;

        return (
          <div className="grid items-center justify-center">
            {randomImage && (
              <img
                className="object-center w-10 h-10 rounded-full"
                src={randomImage?.url}
                alt={randomImage?.originalname}
              />
            )}
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center text-center">
          <FaEye
            className="mr-2 text-xl text-green-300"
            onClick={() => navigate(`/equipment/${row._id}`)}
          />
          <FaPencilAlt
            className="mr-2 text-xl text-blue-500"
            onClick={() => navigate(`/equipment/edit/${row._id}`)}
          />
          <FaTrash
            className="text-xl text-red-500"
            onClick={() => handleDelete(row._id)}
          />
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
                onClick={() => navigate("/equipment/create")}
                className="text-[16px] bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700"
              >
                Create Equipment <i className="fa fa-plus"></i>
              </button>
            </div>
            <DataTable
              title="Equipment Records"
              columns={columns}
              data={equipments}
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
