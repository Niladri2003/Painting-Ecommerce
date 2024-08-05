
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRoute({children}) {
    let token=null;
    if(localStorage.getItem("token")){
         token = JSON.parse(localStorage.getItem("token"));
    }
    //const token=useSelector((state)=>state.auth.token)
    //const username=useSelector((state)=>state.auth.username)
   //console.log("Token=>",token)
    //console.log("UserID=>",username)

    if(token !==null){
        return children
    }else {
        return <Navigate to={"/"}/>
    }

}
export default PrivateRoute;