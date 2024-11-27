import technicianImage from "../../assets/test-technician.jfif";   

export default function(){
    return(
        <div className="w-full h-full">
        <img
          className="object-cover w-full max-h-screen rounded-l-lg"
          src={technicianImage}
          alt="Register Background"
        />
      </div>
    )
}