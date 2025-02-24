import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Register = () => {

  const [ username, setUsername ] = useState<string|null>(null);
  const [ email, setEmail ] = useState<string|null>(null);
  const [ password, setPassword ] = useState<string|null>(null);
  const [ loader, setLoader ] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e:FormEvent){
    e.preventDefault();
    try {
      setLoader(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, {username, email, password});
      navigate("/auth/login");
    } catch (error) {
      if(error instanceof AxiosError){
        setError(error.response?.data.detail)
      }
    }finally{
      setLoader(false);
    }
  }


  return (
    <form 
      className="p-8 flex-center flex-col rounded-lg gap-5 w-[350px] bg-sky-200" 
      onSubmit={(e)=>handleSubmit(e)}>

        <h1 className="text-center font-semibold text-xl py-2">Register to Continue</h1>

        {error && <span className="text-red-400 font-semibold text-sm">*{error}</span>}

        <input 
          className="input py-2 px-4 rounded" 
          type="text" placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
          required
          />

        <input 
          className="input py-2 px-4 rounded" 
          type="text" placeholder="email"
          onChange={(e)=>setEmail(e.target.value)}
          required
          />

        <input 
          className="input py-2 px-4 rounded" 
          type="password" placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
          required
          />

        <div className="flex-center">
            <button className="btn  py-2 px-4 font-semibold text-balck bg-white rounded">
              {loader?"Loading...":"Register"}
            </button>
        </div>
        <span>Already Have Account? <Link to={"/auth/login"} className="text-blue-500 underline">Login</Link></span>
    </form>
  )
}

export default Register