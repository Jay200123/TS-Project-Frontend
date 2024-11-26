import ticketImage from "../../assets/picture-1.jpeg";   

export default function(){
    return(
        <>
        <div className="m-6 p-2">
            <img className="h-full w-full object-cover rounded-l-lg" src={ticketImage}/>
        </div>
        </>
    )
}