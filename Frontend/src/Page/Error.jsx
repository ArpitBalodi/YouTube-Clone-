import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function Error(){
    const err = useRouteError();

    return(
        
        <div className="flex flex-col justify-center items-center h-[384px] mt-[44px]">
            <h2 className="text-[24px]">{err.status} Page Not Found</h2>
            <p className=" text-[18px] my-[25px]">Sorry, but we can not find the page you are looking for...</p>
            <Link to="/" className="bg-[rgb(107,107,237)] text-white p-[13px]">
                Go Back
            </Link>
        </div>
    )
}

export default Error;