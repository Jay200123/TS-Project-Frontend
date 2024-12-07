import { useDeviceStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { DeviceStatus } from "../../interface";
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

  type StatusCount = Record<DeviceStatus, number>;

  const statusCounts = devices?.reduce<StatusCount>(
    (acc, device) => {
      acc[device.status] = (acc[device.status] || 0) + 1;
      return acc;
    },
    {
      Available: 0,
      Used: 0,
      Repair: 0,
      Replacement: 0,
      Disposal: 0,
      Return: 0,
    }
  );

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Device Count by Status",
        data: Object.values(statusCounts),
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
    <div className="w-1/2 m-4 flex items-center justify-center h-[350px]">
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
