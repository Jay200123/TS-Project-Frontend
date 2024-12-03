import HomeImage from "../../assets/Helpdesk-3.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  
  const signup = () => {  
    navigate("/signup");
  }
  
  return (
    <>
      <div className='flex items-center justify-between max-w-full max-h-full bg-transparent'>
        {/* div for home page information */}
        <div className='flex flex-col w-1/2 p-4 text-left'>
          <h1 className='text-sm  text-gray-700 font-bold md:text-3xl mb-[6px]'>
            Resolve Your IT Issues with Ease
          </h1>
          <p className="md:text-[17px] p-[6px] text-black sm:text-sm sm:p-1">
            Welcome to our IT Helpdesk Portal. This system is designed to
            streamline your support requests and provide timely resolutions to
            all your IT needs. Whether you’re reporting an issue, requesting
            access, or following up on a ticket, we’re here to assist you. Let
            us help you stay productive and connected.
          </p>
          <div className='flex items-center justify-center mt-[12px]'>
          <button onClick={signup} className="p-2 text-xl text-white transition-all duration-500 bg-gray-700 border border-gray-700 rounded-3xl hover:bg-white hover:text-gray-700">
            Get Started
            </button>
          </div>
        </div>
        {/* div for home page image */}
        <div className='flex items-center justify-center w-1/2'>
          <img
            className='object-cover items'
            src={HomeImage}
            alt='image.jpeg'
          />
        </div>
      </div>
    </>
  )
}
