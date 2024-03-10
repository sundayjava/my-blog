import { Mail } from "@mui/icons-material";
import { footerData } from "../data/category";

const Footer = () => {
  const date = new Date();
  return (
    <div className="mt-16 bg-gray-100 lg:px-14 py-8">
      <div className="flex md:flex-row flex-col justify-between items-center mb-5">
        <div className="lg:w-[50%] lg:px-0 px-2">
          <h1 className="font-bold uppercase mb-2 text-[20px]">Newstopedia</h1>
          <p className="w-[50%] text-black/50 text-[14px]">
            Craft narratives that ignite inspiration, knowledge and
            entertainment
          </p>
          <div className="flex gap-1 items-center mt-4">
            <div className="border rounded-md py-1 px-2 bg-white text-[14px] flex items-center gap-1">
              <Mail sx={{fontSize:20}}/>
              <input type="text" placeholder="send us a mail" className="bg-transparent outline-none"/>
            </div>
            <button className="border py-1 px-3 bg-yellow-500 text-[13px] rounded-md font-normal">Subscribe</button>
          </div>
        </div>
        <hr className="lg:hidden"/>
        <div className="lg:w-[50%] w-full lg:px-0 px-2 flex flex-wrap lg:mt-0 mt-5 items-center justify-between">
          {footerData.map((items) => (
            <div key={items.id}>
              <h1 className="font-bold mb-2 text-[15px]">{items.name}</h1>
              <ul>
                {items.child.map((child) => (
                  <li key={child.id} className="text-black/70 text-[14px] mt-1 cursor-pointer hover:text-yellow-500">{child.name}</li>
                ))}
              </ul>
            </div>
          ))}
       </div>
      </div>
      <hr />
      <div className="flex lg:flex-row flex-col lg:justify-between justify-center items-center mt-3">
        <p className="text-[13px] text-black/70 lg:mb-0 mb-3">&copy; {date.getFullYear()} Newstopedia, All Rights Reserved</p>
        <ul className="flex lg:justify-between gap-5 text-[13px] text-black/70 cursor-pointer ">
          <li className="hover:underline">Trems of Service</li>
          <li className="hover:underline">Privacy Policy</li>
          <li className="hover:underline">Cookie Policy</li>
          <li className="hover:underline">Partners</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
