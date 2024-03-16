import google from '../../assets/google.png'

const Login = () => {
  return (
    <div>
      <form>
        <h1 className="uppercase text-[20px] font-normal text-center">Log in</h1>
        <div className='flex justify-around shadow-md items-center my-5 cursor-pointer'>
          <img className='w-[8vw] h-[8vw] md:w-[3vw] md:h-[3vw]' src={google}/><span className='font-normal'>Continue with Google</span>
        </div>
        <div className='flex items-center justify-between mb-4'>
          <div className='w-[45%] h-[2px] bg-gray-300' />
          <div className='text-[13px] text-black/60'>OR</div>
          <div className='w-[45%] h-[2px] bg-gray-300' />
        </div>

        <div>
          <input type="email" placeholder="Email address" className='rounded-md text-[13px] border-gray-300 border w-full px-2 py-2 mb-4'/>
        </div>
        <div>
          <input type="password" placeholder="Password" className='rounded-md text-[13px] border-gray-300 border w-full px-2 py-2 mb-4'/>
        </div>

        <div className='flex justify-between items-center pb-6 pt-2'>
          <div className='flex items-center ml-2 gap-1'>
            <input type="checkbox" />
            <span className='text-[12px]'>Remember me</span>
          </div>
          <p className='text-[12px] text-yellow-500 cursor-pointer'>Forgot Password?</p>
        </div>
        <div className='w-full flex justify-center'>
        <button className='px-8 py-1 rounded-lg bg-yellow-500 text-[13px]'>Log in</button>
        </div>
      </form>
        <hr className='mt-3'/>
      <p className='text-[14px] font-normal my-7 text-center'>
        No Account? No problem, <span className='text-yellow-500 cursor-pointer'>Sign Up Here</span>
      </p>
    </div>
  );
};

export default Login;
