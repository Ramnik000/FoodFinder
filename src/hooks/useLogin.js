import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { message } from "antd";

const useLogin= ()=>{

    const {login} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading]= useState(false);

    const loginUser= async(value)=>{
        if(value.password !== value.confirmPassword){
          return setError("Passwords are not same");  
        }
        try{
            setError(null);
            setLoading(true);
            const res= await fetch('http://localhost:3000/login',{
                method: 'POST',
                body:JSON.stringify(value),
            });

            const data = await res.json();
      if (res.ok) {
        message.success(data.message); 
        login(data.token, data.user);
      } else if (res.status === 400) { 
        setError(data.message); 
      } else {
        setError(data.message);
      }
    } catch (error) {
     console.error(error);
    } finally {
      setLoading(false); 
    }
  };
    return{loading,error, loginUser};
}
export default useLogin;