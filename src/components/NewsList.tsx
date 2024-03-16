import {  NavigateNext } from "@mui/icons-material";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";
type BlogData = {
  createdAt:any;
  id:string,
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
};

const NewsList = (props:{blog:BlogData[]}) => {
  const navigate = useNavigate()
  return (
    <div className="w-full mt-8 px-5">
      <div className="flex justify-between items-center py-8">
        <h1 className="text-[17px] font-[500]">Latest News</h1>
        <span className="text-yellow-500 cursor-pointer" onClick={()=>navigate("/specific/Latest")}>
          See all <NavigateNext />
        </span>
      </div>
      <div className="flex gap-5 md:flex-row flex-col">
        {props.blog.slice(0,3).map((items) => (
          <NewsCard item={items}/>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
