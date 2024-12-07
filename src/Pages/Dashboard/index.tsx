import DeviceCountChart from "./DeviceCountChart";
import DeviceTypeChart from "./DeviceTypeChart";
import TicketPieChart from "./TicketPieStatus";
import CategoryPieChart from "./TicketCategoryChart";
import TicketLevelChart from "./TicketLevelChart";

export default function () {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-4">
      <div className="flex flex-col items-center justify-between w-full p-4 md:flex-row">
        <DeviceCountChart />
        <DeviceTypeChart />
      </div>
      <div className="flex flex-col items-center justify-between w-full p-4 md:flex-row">
        <TicketPieChart />
        <CategoryPieChart />
      </div>
      <div className="flex flex-col items-center justify-center w-full p-4 md:flex-row">
        <TicketLevelChart />
      </div>
    </div>
  );
}
