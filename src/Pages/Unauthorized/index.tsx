const back = ()=>{
    window.history.back();  
}

export default function(){
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold"> :( Unauthorized 401</h1>
            <button onClick={back} className="p-4 bg-gray-700 text-white text-lg transition-all duration-500 border rounded-md border-gray-700 hover:bg-white hover:text-black">Go Back</button>
        </div>
    )
};