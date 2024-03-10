import { NavigateNext } from "@mui/icons-material";
import MustReadCard from "./MustReadCard";

const MustReadList = () => {
  return (
    <div className="w-full mt-3 px-5">
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[17px] font-[500]">Must Read</h1>
        <span className="text-yellow-500">
          See all <NavigateNext />
        </span>
      </div>
      <div className="flex lg:flex-row flex-col gap-5 justify-center items-start">
        <div className="lg:w-[50%]">
          <div className="p-2 rounded-lg hover:shadow-lg cursor-pointer hover:bg-yellow-50">
            <img
              className="w-full h-[40%] object-cover rounded-md"
              src="https://th.bing.com/th?id=ORMS.71179e246969323f1312c4087f8c0fae&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0"
            />
            <div>
              <div className="flex justify-around items-center pt-5 pb-2">
                <img
                  src="https://th.bing.com/th?id=ORMS.71179e246969323f1312c4087f8c0fae&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0"
                  className="w-5 h-5 rounded-full"
                />
                <p className="text-[15px] font-normal">CNN News</p>
                <span className="text-black/30">10 hours ago</span>
              </div>
              <h2 className="font-[500] text-[15px] hover:text-yellow-600 hover:font-bold cursor-pointer">
                Russia attacked strong Ukrainian positions using Chinese golf
                carts
              </h2>
              <p className="mt-2 text-black/50 text-[12px]">
                Russia attacked strong Ukrainian positions using Chinese golf
                carts The Russian Armed Forces used Chinese golf carts to storm
                Ukrainian positions on the frontlines near Lyman. However, the
                attack did not go well according to a video released by the
                military unit that fended off the assault.
              </p>
              <p className="text-yellow-500 font-normal text-[13px]">
                Sport{" "}
                <span className="text-[13px] text-black/300 font-light">-</span>{" "}
                <span className="text-[13px] text-black/300 font-light">
                  1 min ago
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[50%] lg:block flex flex-wrap justify-center">
          {[1, 1, 1, 1].map((items, index) => (
            <MustReadCard index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MustReadList;
