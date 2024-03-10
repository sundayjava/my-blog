import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

type BlogData = {
  id: string;
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
};

const RelatedFeeds = (props: { blog: BlogData[] }) => {
  const navigate = useNavigate();
  
  return (
    <div className="border-t mt-5 bg-gray-700">
      <h1 className="text-[20px] font-[500] lg:ml-20 py-4 text-white">Related Feeds</h1>
      <div className="flex flex-wrap justify-center items-center gap-2">
        {props.blog.map((items) => (
          <div onClick={()=>navigate(`/news/${items.id}`)} key={items.id} className="lg:w-[30%] border mb-2 border-gray-500 w-full flex-wrap h-full p-2 rounded-lg hover:shadow-lg cursor-pointer hover:bg-gray-400">
            <img
              className="w-full h-[50%] object-cover rounded-md"
              src={items.photoURL}
            />
            <div>
              <div className="flex justify-around items-center pt-5 pb-2">
                <Avatar
                  className="text-white"
                  aria-hashpopup="true"
                  sx={{
                    bgcolor: deepPurple[500],
                    color: "white",
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    padding: 2,
                  }}
                >
                  {items.category[0].toUpperCase()}
                </Avatar>
                <p className="text-[15px] font-normal text-yellow-600">
                  {items.category} News
                </p>
                <span className="text-white/30">10 hours ago</span>
              </div>
              <h2 className="font-[500] text-[15px] text-white/60 hover:font-bold cursor-pointer">
                {items.heading.slice(0, 50)}
              </h2>
              <p className="text-yellow-500 font-normal text-[13px]">
                {items.category}{" "}
                <span className="text-[13px] text-black/300 font-light">-</span>{" "}
                <span className="text-[13px] text-black/300 font-light">
                  1 min ago
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedFeeds;
