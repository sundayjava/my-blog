import { useState } from "react";
import AdminCreatePost from "./AdminCreatePost";

const AdminLogin = () => {
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState("");
  const [openAdmin, setOpenAdmin] = useState(false);

  const adminLogin = () => {
    if (inputData !== "zhaghathat") {
      setError("Incorrect password");
    } else {
      setOpenAdmin(true);
    }
  };

  return (
    <div>
      {!openAdmin ? (
        <div className="flex justify-center items-center h-[60vh]">
          <form onSubmit={adminLogin} className="border">
            <div className="bg-gray-800 text-white py-5 text-center">
              <h1 className="text-[14px] px-16">NEWSTOPEDIA ADMIN</h1>
            </div>
            <div className="flex flex-col gap-2 px-4 py-4">
              <label htmlFor="password" className="text-[13px] text-black/70">Admin password</label>
              <input
                value={inputData}
                onChange={(event) => setInputData(event.target.value)}
                placeholder="****************"
                type="password"
                required
                className="border rounded-md outline-none px-4 py-1"
              />
              <span className="text-[13px] text-red-500 italic">{error}</span>
            </div>
            <div className=" px-4 pb-2 flex justify-center">
              <button className="bg-yellow-500 px-5 text-[12px] font-bold py-1 rounded-md">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        <AdminCreatePost />
      )}
    </div>
  );
};

export default AdminLogin;
