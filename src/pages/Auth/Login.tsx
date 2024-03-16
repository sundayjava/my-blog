import { useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );
      setIsLoading(false);
      navigate('/')
    } catch (err) {
      setError('Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="uppercase text-[20px] font-normal text-center">
          Log in
        </h1>
        <div className="flex gap-5 justify-center shadow-md items-center my-5 cursor-pointer">
          <img className="w-[8vw] h-[8vw] md:w-[3vw] md:h-[3vw]" src={google} />
          <span className="font-normal">Continue with Google</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-[45%] h-[2px] bg-gray-300" />
          <div className="text-[13px] text-black/60">OR</div>
          <div className="w-[45%] h-[2px] bg-gray-300" />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={inputData.email}
            onChange={handleChange}
            className="rounded-md text-[13px] border-gray-300 border w-full px-2 py-2 mb-4"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={inputData.password}
            onChange={handleChange}
            className="rounded-md text-[13px] border-gray-300 border w-full px-2 py-2 mb-4"
          />
        </div>

        <div className="flex justify-between items-center pb-6 pt-2">
          <div className="flex items-center ml-2 gap-1">
            <input type="checkbox" />
            <span className="text-[12px]">Remember me</span>
          </div>
          <p className="text-[12px] text-yellow-500 cursor-pointer">
            Forgot Password?
          </p>
        </div>
        {error && (
          <p className="text-red-700 line-clamp-1 italic text-[14px] text-center w-full my-4">
            {error}
          </p>
        )}
        <div className="w-full flex justify-center">
          {isLoading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <button className="px-8 py-1 rounded-lg bg-yellow-500 text-[13px]">
              Log in
            </button>
          )}
        </div>
      </form>
      <hr className="mt-3" />
      <p className="text-[14px] font-normal my-7 text-center">
        No Account? No problem,{" "}
        <span
          className="text-yellow-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Sign Up Here
        </span>
      </p>
    </div>
  );
};

export default Login;
