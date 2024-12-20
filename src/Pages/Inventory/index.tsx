import { useDeviceStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { status } from "../../utils/arrays";

export default function () {
  const { getAllDevices } = useDeviceStore();
  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: getAllDevices,
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const defaultStatuses = status.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {} as Record<string, number>);

  const reducedData = data?.reduce((acc, device) => {
    if (!acc[device.type]) {
      acc[device.type] = { ...defaultStatuses };
    }

    if (!acc[device.type][device.status]) {
      acc[device.type][device.status] = 0;
    }

    acc[device.type][device.status] += 1;

    return acc;
  }, {} as Record<string, Record<string, number>>);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[82rem] flex flex-col items-center h-full  md:grid md:grid-cols-4 p-4 m-2">
        <h3 className="absolute text-sm font-bold top-1 left-1 md:text-lg">
          Device Inventory
        </h3>
        {reducedData &&
          Object.entries(reducedData).map(([type, statuses]) => (
            <div
              key={type}
              className="w-[250px] h-auto shadow-lg border border-black rounded-md p-4 m-4"
            >
              <h3 className="text-sm text-center md:text-[16px] font-bold">
                {type}
              </h3>
              {Object.entries(statuses).map(([status, count]) => (
                <p key={status} className="mt-1 text-xs text-left md:text-sm">
                  {status}:<span className="ml-[2px]">{count}</span>
                </p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
