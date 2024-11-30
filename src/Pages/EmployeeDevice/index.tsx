import { useQuery } from "@tanstack/react-query";
import {
  useAuthenticationStore,
  useDeviceStore,
  useUserStore,
} from "../../state/store";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { user: auth } = useAuthenticationStore();
  const { user, getOneUser } = useUserStore();
  const { devices, getAllDevices } = useDeviceStore();

  useQuery({
    queryKey: ["user", auth?._id],
    queryFn: () => getOneUser(auth?._id || ""),
    enabled: !!auth?._id,
  });

  useQuery({
    queryKey: ["devices"],
    queryFn: getAllDevices,
  });

  const filteredDevices = devices.filter(
    (device) => device.owner?._id === user?._id
  );

  if (devices.length === 0) {
    <h3 className="text-center text-sm md:text-[18px]">No Devices Found</h3>;
  }

  return (
    <div className=" p-7">
      <div className="flex items-center justify-end m-2 top-1 right-1">
        <button
          onClick={() => navigate("/employee/create-device")}
          className="text-sm bg-gray-700 text-white p-[15px] rounded-md transition-all duration-500  hover:bg-white hover:text-black border border-gray-700"
        >
          Add New Device<i className="fa fa-plus ml-[2px]"></i>
        </button>
      </div>
      {filteredDevices.map((d) => (
        <div key={d?._id} className="relative flex flex-col justify-evenly">
          <div className="flex-col flex md:flex-row items-center justify-start p-1 m-4 sm:h-[300px] md:h-[250px] overflow-hidden rounded-md shadow-lg border border-gray">
            <div className="flex flex-col items-center justify-center w-1/4 p-2 m-2">
              <h3
                className={`flex items-center justify-start text-sm font-bold md:text-lg ${
                  d?.status === "Available" || d?.status === "Used"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {" "}
                <li className="text-[28px]"></li> Status:{" "}
                <span className="ml-1">{d?.status} </span>
              </h3>
              {d?.image?.length > 1 ? (
                <img
                  className="w-[130px] h-[130px] md:w-[180px] md:h-[180px] shadow-md"
                  src={
                    d?.image[Math.floor(Math.random() * d?.image.length)]?.url
                  }
                  alt="test image"
                />
              ) : (
                <img
                  className="rounded-sm md:w-52 md:h-52"
                  src={d?.image[0]?.url || ""}
                  alt="image"
                />
              )}
            </div>
            <div className="w-9/12 p-1">
              <h1 className="font-bold text-[14px] md:text-[18px] m-1">
                Type:{" "}
                <span className="text-[14px] md:text-[17px] font-medium">
                  {d?.type}
                </span>
              </h1>
              <h3 className="font-bold text-[14px] md:text-[17px] m-1">
                Description:
              </h3>
              <p className="text-[12px] md:text-[16px] m-1 p-1">
                {d?.description}
              </p>
              <h3 className="font-bold text-[12px] md:text-[16px] mb-1">
                Serial Number:{" "}
                <span className="font-medium underline">
                  {d?.serial_number}
                </span>
              </h3>
              <div className="flex items-center justify-between">
                <p className="font-bold text-[12px] md:text-[17px]">
                  Date Requested:
                  <span className="underline font-medium text-[10px] md:text-[16px] m-1">
                    {
                      new Date(d?.date_requested.toLocaleString())
                        .toISOString()
                        .split("T")[0]
                    }
                  </span>
                </p>
                <p className="font-bold text-[12px] md:text-[17px]">
                  Date Purchased:
                  <span className="underline font-medium text-[10px] md:text-[16px] m-1">
                    {
                      new Date(d?.date_purchased.toLocaleString())
                        .toISOString()
                        .split("T")[0]
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
