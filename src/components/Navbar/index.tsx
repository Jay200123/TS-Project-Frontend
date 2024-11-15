export default function () {
  return (
    <>
      <nav className='w-full h-14 items-center flex justify-between'>
        <div className='m-2 p-2'>
          <h3 className='text-lg'>Navbar Project</h3>
        </div>
        <div className='m-2 p-2'>
          <ul className='flex items-center justify-start'>
            <li className='inline-block p-2 text-sm cursor-pointer'>Home</li>
            <li className='inline-block p-2 text-sm cursor-pointer'>About</li>
            <li className='inline-block p-2 text-sm cursor-pointer'>
              Contact Us
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
