import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { message } from "antd";

const useSignup= ()=>{

    const {login} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading]= useState(null);

    const registerUser= async(value)=>{
        if(value.password !== value.confirmPassword){
          return setError("Passwords are not same");  
        }
        try{
            setError(null);
            setLoading(true);
            const res= await fetch('http://localhost:3000/signup',{
                method: 'POST',
                body:JSON.stringify(value),
            });

            const data = await res.json();
      if (res.status === 201) {
        message.success(data.message); 
        login(data.token, data.user);
      } else if (res.status === 400) { 
        setError(data.message); 
      } else {
        message.error("Signup failed");
      }
    } catch (error) {
      message.error(error.message); 
    } finally {
      setLoading(false); 
    }
  };
    return{loading,error,registerUser};
}
export default useSignup;