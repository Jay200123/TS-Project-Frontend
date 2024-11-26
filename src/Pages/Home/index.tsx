// import HomeImage from '../../assets/ticketing-home-icon.jfif'
import HomeImage from "../../assets/test-hd.webp";

export default function () {
  return (
    <>
      <div className='max-h-full max-w-full bg-white flex items-center justify-between'>
        {/* div for home page information */}
        <div className='w-1/2 flex flex-col text-left p-4'>
          <h1 className='text-sm font-bold md:text-3xl mb-[6px]'>
            Resolve Your IT Issues with Ease
          </h1>
          <p className="md:text-[17px] p-[6px] sm:text-sm sm:p-1">
            Welcome to our IT Helpdesk Portal. This system is designed to
            streamline your support requests and provide timely resolutions to
            all your IT needs. Whether you’re reporting an issue, requesting
            access, or following up on a ticket, we’re here to assist you. Let
            us help you stay productive and connected.
          </p>
          <div className='flex items-center justify-center mt-[12px]'>
          <button className="rounded-3xl border border-black p-2 text-xl bg-black text-white transition-all duration-500 hover:bg-white hover:text-black">Get Started</button>
          </div>
        </div>
        {/* div for home page image */}
        <div className='w-1/2 flex items-center justify-center'>
          <img
            className=' object-cover items'
            src={HomeImage}
            alt='image.jpeg'
          />
        </div>
      </div>
    </>
  )
}
