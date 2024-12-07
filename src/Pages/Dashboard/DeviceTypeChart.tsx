import { useDeviceStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { DeviceType } from "../../interface";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function () {
  const { devices, getAllDevices } = useDeviceStore();

  useQuery({
    queryKey: ["devices"],
    queryFn: getAllDevices,
  });

  type TypeCount = Record<DeviceType, number>;

  const typeCounts = devices?.reduce<TypeCount>(
    (acc, device) => {
      acc[device.type] = (acc[device.type] || 0) + 1;
      return acc;
    },  
    {
      Printer: 0,
      "System Unit": 0,
      Laptop: 0,
      Monitor: 0,
      Mobile: 0,
      Keyboard: 0,
      Mouse: 0,
      AVR: 0,
      UPS: 0,
      Router: 0,
      Switch: 0,
      Hub: 0,
      "Access Point": 0,
      Cable: 0,
    }
  );

  const chartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: "Device Count by their types",
        data: Object.values(typeCounts),
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#f44336",
          "#ff9800",
          "#9c27b0",
          "#795548",
          "#607d8b",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-1/2 m-4 flex items-center justify-center max-h-[250px] md:h-[350px]">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  );
}
