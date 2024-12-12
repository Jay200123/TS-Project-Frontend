import { useTicketStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { TicketLevelCount } from "../../interface";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function () {
  const { tickets, getAllTickets } = useTicketStore();

  useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
  });

  const levelCounts = tickets?.reduce<TicketLevelCount>(
    (acc, tickets) => {
      acc[tickets.level] = (acc[tickets.level] || 0) + 1;
      return acc;
    },
    {
        urgent: 0,
        priority: 0,
        "non-urgent": 0,
    }
  );

  const barData = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        label: "Ticket Level Count",
        data: Object.values(levelCounts),
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
        data={barData}
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
