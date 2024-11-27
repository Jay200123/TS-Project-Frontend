import EmployeeImage from "../../assets/bg-test-1.jpg";   

export default function(){
    return(
        <div className="h-full">
        <img
          className="max-h-screen w-full object-cover rounded-l-lg"
          src={EmployeeImage}
          alt="Register Background"
        />
      </div>
    )
}