import { useTicketStore } from '../../state/store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function () {
  const { id } = useParams<{ id: string }>()
  const { ticket, getOneTicket } = useTicketStore()

  useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getOneTicket(id!),
    enabled: !ticket
  })

  const back = () => {  
    window.history.back()
  }

  return(
    <div>
        <h3> this is view ticket page!</h3>
    </div>
  ) 
}
