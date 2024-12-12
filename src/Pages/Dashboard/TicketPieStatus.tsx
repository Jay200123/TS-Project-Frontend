import { useTicketStore } from '../../state/store';
import { useQuery } from '@tanstack/react-query';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';   
ChartJS.register(ArcElement, Tooltip, Legend);
import { TicketStatusCount } from '../../interface'; 

export default function () {
    const { tickets, getAllTickets } = useTicketStore();    
    useQuery({
        queryKey: ['tickets'],
        queryFn: getAllTickets,
    }); 


    const statusCounts = tickets?.reduce<TicketStatusCount>(
        (acc, ticket) => {
            acc[ticket?.status] = (acc[ticket?.status] || 0) + 1;
            return acc;
        },
        {
            new: 0,
            pending: 0,
            resolved: 0,
            "in-progress": 0,
            closed: 0,
        }
    );

    const pieData = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: 'Ticket Status',
                data: Object.values(statusCounts),
                backgroundColor: [
                    '#4caf50',
                    '#2196f3',
                    '#f44336',
                    '#ff9800',
                ],
                borderWidth: 1,
            },
        ],
    }

    return(
        <div className='flex items-center justify-center w-1/2 h-[350px]'>
             <Pie
                data={pieData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                }}
            />
        </div>
    )
}