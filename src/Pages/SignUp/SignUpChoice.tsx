import { 
   TechnicianImage,
   EmployeeImage
} from '../../components';
import { useNavigate } from 'react-router-dom';


export default function () {

  const navigate = useNavigate();

  const employee = ()=>{
    navigate('/employee/signup');
  }

  const technician = ()=>{
    navigate('/technician/signup');
  }

  return (
    <>
      <h1 className='sm:text-lg md:text-3xl lg:text-4xl font-bold'>Sign Up as</h1>
      <div className='flex items-center justify-center shadow-md rounded-md md:m-6'>
        <div className='flex flex-col w-full max-w-5xl p-6 space-y-6 bg-transparent rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6 '>
        <div className='relative max-h-96 w-full md:w-1/2 md:block rounded-md'>
            <EmployeeImage />
            <button onClick={employee} className='p-5 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent transition-all duration-500 hover:bg-white hover:text-black  text-white rounded-lg border border-gray-400'>
              Employee<i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </div>
          <div className='relative max-h-96 w-full md:w-1/2 md:block rounded-md'>
            <TechnicianImage />
            <button onClick={technician} className='p-5 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent transition-all duration-500 hover:bg-white hover:text-black  text-white rounded-lg border border-gray-400'>
              Technician<i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}