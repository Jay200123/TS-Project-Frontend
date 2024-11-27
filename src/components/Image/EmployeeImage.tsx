import EmployeeImage from "../../assets/bg-test-1.jpg";   

export default function(){
    return(
        <div className="w-full h-full">
        <img
          className="object-cover w-full max-h-screen rounded-l-lg"
          src={EmployeeImage}
          alt="Register Background"
        />
      </div>
    )
}