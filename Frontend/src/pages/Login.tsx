import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

  const [ username, setUsername ] = useState<string|null>(null);
  const [ password, setPassword ] = useState<string|null>(null);
  const [ loader, setLoader ] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e:FormEvent){
    e.preventDefault();
    try {
      setLoader(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {username, password});
      localStorage.setItem("token", res.data.access_token);
      navigate("/");
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
        className="p-10 flex-center flex-col rounded-lg gap-5 w-[350px] bg-sky-200"
        onSubmit={(e)=>handleSubmit(e)}
    >
        <h1 className="text-center font-semibold text-xl py-2">Login to Continue</h1>

        {error && <span className="text-red-400 font-semibold text-sm">*{error}</span>}

        <input
            className="input py-2 px-4 rounded"
            type="text" placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
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
                {loader?"Loading":"Login"}
            </button>
        </div>
        <span>Do not Have Account? <Link to={"/auth/register"} className="text-blue-500 underline">Register</Link></span>
    </form>
  )
}

export default Login