import technicianImage from "../../assets/test-technician.jfif";   

export default function(){
    return(
        <div className="h-full">
        <img
          className="max-h-screen w-full object-cover rounded-l-lg"
          src={technicianImage}
          alt="Register Background"
        />
      </div>
    )
}