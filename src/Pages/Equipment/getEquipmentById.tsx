import { useEquipmentStore } from "../../state/store";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function () {
  const { id } = useParams<{ id: string }>();
  const { equipment, getOneEquipment } = useEquipmentStore();

  useQuery({
    queryKey: ["equipment", id],
    queryFn: () => getOneEquipment(id!),
    enabled: !!id,
  });

  const randomImage =
    equipment?.image && equipment?.image?.length > 0
      ? equipment?.image[Math.floor(Math.random() * equipment?.image?.length)]
      : null;

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex items-center justify-center p-4 m-4">
        <div className="relative flex flex-col w-full max-w-2xl  xl p-6 space-y-6 bg-white border border-gray-400 rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 overflow-hidden min-h-[24rem]">
          <h2 className="absolute text-xl font-bold text-center text-gray-800 md:text-3xl md:text-left">
            <i
              onClick={back}
              className="mr-2 transition-all duration-500 cursor-pointer fa-solid fa-arrow-left hover:opacity-80"
            ></i>
          </h2>
          <div className="hidden w-full md:w-1/2 md:block min-h-[20rem]">
            <img
              className="object-cover max-w-sm rounded-l-lg max-h-sm"
              src={randomImage?.url}
              alt={randomImage?.originalname}
            />
          </div>
          <div className="flex flex-col w-full space-y-4 md:w-1/2">
            <h2 className="text-2xl font-bold text-center text-gray-800 md:text-left">
              Equipment Details
            </h2>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-barcode"></i> Equipment
              </label>
              <input
                type="text"
                id="equipment_name"
                name="equipment_name"
                placeholder={equipment?.equipment_name}
                className="p-2 border border-gray-400 rounded-md placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                <i className="fa-solid fa-peso-sign"></i> Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder={equipment?.price?.toString()}
                className="p-2 border border-gray-400 rounded-md placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
              <i className="fa-solid fa-boxes-stacked"></i> Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder={equipment?.quantity?.toString()}
                className="p-2 border border-gray-400 rounded-md placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
