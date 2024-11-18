export default function () {
  return (
    <>
      <footer className='w-full max-h-80 bg-black flex items-center md:flex-col overflow-hidden'>
        <div className='flex items-center justify-between p-2 border-b border-t border-white w-full max-h-12'>
          <div className='md:w-1/2'>
            <p className='text-white'>
              Get connected with us on{' '}
              <span className='text underline underline-offset-4 cursor-pointer'>
                {' '}
                Social Networks
              </span>
            </p>
          </div>
          <ul className='md:w-1/2 flex flex-col md:flex-row md:justify-end items-center space-y-2 md:space-y-0 md:space-x-4 py-4'>
            <li className='text-white text-base m-2'>
              <i className='fa-brands fa-facebook hover:text-blue-500 transition-colors'></i>
            </li>
            <li className='text-white text-base m-2'>
              <i className='fa-brands fa-twitter hover:text-blue-400 transition-colors'></i>
            </li>
            <li className='text-white text-base m-2'>
              <i className='fa-brands fa-instagram hover:text-pink-500 transition-colors'></i>
            </li>
            <li className='text-white text-base m-2'>
              <i className='fa-brands fa-linkedin hover:text-blue-600 transition-colors'></i>
            </li>
            <li className='text-white text-base m-2'>
              <i className='fa-brands fa-google hover:text-red-500 transition-colors'></i>
            </li>
          </ul>
        </div>

        <div className='flex flex-wrap justify-between gap-4 gap-y-4 w-full mt-1'>
          <ul className='w-full sm:w-1/2 md:w-1/4 flex-shrink-0 text-left text-white flex flex-col'>
            <li className='text-lg font-semibold ml-1'>
              Important Information
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-solid fa-house mr-1'></i>Home
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-solid fa-circle-info mr-1'></i>About
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-solid fa-phone mr-1'></i>Contact Us
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-solid fa-question mr-1'></i>FAQs
            </li>
          </ul>

          <ul className='w-full sm:w-1/2 md:w-1/4 flex-shrink-0 text-left text-white flex flex-col'>
            <li className='text-lg font-semibold ml-1'>Social Media Links</li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-brands fa-facebook mr-1'></i>Facebook
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-brands fa-twitter mr-1'></i>Twitter
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-brands fa-instagram mr-1'></i>Instagram
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-brands fa-linkedin mr-1'></i>LinkedIn
            </li>
          </ul>

          <ul className='w-full sm:w-1/2 md:w-1/4 flex-shrink-0 text-left text-white flex flex-col'>
            <li className='text-lg font-semibold ml-1'>Legal Information</li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-solid fa-headphones mr-1'></i>Customer Support
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-solid fa-shield-halved mr-1'></i>Privacy Policy
            </li>
            <li className='text-sm m-2 p-1'>
              <i className='fa-solid fa-file-contract mr-1'></i>Terms &
              Conditions
            </li>
          </ul>
        </div>
        <div className="w-full max-h-6 border-t border-white flex justify-end items-center p-4">
          <p className="text-lg text-white">Copyright<span className="mr-1 ml-1"><i className="fa-regular fa-copyright"></i></span>2023 - Renyel Jay Sioc</p>
        </div>
      </footer>
    </>
  )
}
