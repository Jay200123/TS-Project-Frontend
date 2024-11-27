import LoginImage from "../../assets/test-bg-5.jpg";   

export default function(){
    return(
        <div className="h-full">
        <img
          className="max-h-screen w-full object-cover rounded-l-lg"
          src={LoginImage}
          alt="Register Background"
        />
      </div>
    )
}