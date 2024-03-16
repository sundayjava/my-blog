import React from "react";
import MomentTimeDisplay from "../utils/dateFormatted";
import { useNavigate } from "react-router-dom";
type BlogData = {
  id: string;
  createdAt: string;
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
};

const ReadMoreCard: React.FC<{ item: BlogData }> = (props) => {
  const { item } = props;
  const navigate = useNavigate()

  return (
    <div
      className="flex md:flex-row flex-col gap-2 cursor-pointer md:h-[12vh] h-[34vh] border p-2"
      onClick={() => navigate(`/news/${item.id}`)}
    >
      <div className="xl:w-[30%]">
        <img src={item.photoURL} className="w-full md:h-full h-[20vh] object-cover" />
      </div>
      <div className="xl:w-[70%]">
        <div className="flex justify-between md:border-b-0 border-b-2">
          <p className="text-[13px] text-yellow-700">{item.category}</p>
          <p>
            {item.createdAt ? (
              <MomentTimeDisplay timestamp={item.createdAt} />
            ) : null}
          </p>
        </div>
        <h1 className="line-clamp-2 font-bold text-[14px]">{item.heading}</h1>
        <p className="line-clamp-2 text-[12px] text-black/60">
          {item.subheading}
        </p>
      </div>
    </div>
  );
};

export default ReadMoreCard;
