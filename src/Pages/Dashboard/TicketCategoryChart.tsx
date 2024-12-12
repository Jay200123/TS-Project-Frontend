import { useTicketStore } from "../../state/store";
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { TicketCategoryCount } from "../../interface";

export default function () {
  const { tickets, getAllTickets } = useTicketStore();
  useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
  });

  const categoryCounts = tickets?.reduce<TicketCategoryCount>(
    (acc, ticket) => {
      acc[ticket?.category] = (acc[ticket?.category] || 0) + 1;
      return acc;
    },
    {
      network: 0,
      hardware: 0,
      software: 0,
    }
  );

  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Ticket Category",
        data: Object.values(categoryCounts),
        backgroundColor: ["#4caf50", "#2196f3", "#f44336", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex items-center justify-center w-1/2 h-[350px]">
      <Pie
        data={pieData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
