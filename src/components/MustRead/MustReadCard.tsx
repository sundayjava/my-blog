import { DoDisturbOn } from "@mui/icons-material";

const MustReadCard = (props:{index:any}) => {
  return (
    <div className="flex gap-2 mb-4 mr-2 border lg:border-none p-2 justify-center rounded-lg">
      <img
        className="w-[11vw] h-[5vw] object-cover rounded-md"
        src="https://th.bing.com/th?id=ORMS.71179e246969323f1312c4087f8c0fae&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0"
      />
      <div>
        <div className="flex justify-between items-center">
          <p className="text-[12px] text-yellow-600">
            {props.index % 2 ? (
              <DoDisturbOn sx={{ color: "gray", fontSize: 18 }} />
            ) : (
              "ON"
            )}
          </p>{" "}
          <span className="text-[14px] font-normal">Newstopedia</span>{" "}
          <span className="text-[14px] text-black/40">1hrs ago</span>
        </div>
        <h2 className="mt-2 text-[15px] font-[500]">
          CNN chairman and Chrislig is out
        </h2>
        <p className="mt-2 text-[13px] text-yellow-600 font-[500]">
          Category <span className="text-black/40 text-[12px]">-</span>{" "}
          <span className="text-black/40 text-[12px]">2 min read</span>
        </p>
      </div>
    </div>
  );
};

export default MustReadCard;
