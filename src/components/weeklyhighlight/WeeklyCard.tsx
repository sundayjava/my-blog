
const WeeklyCard = () => {
  return (
    <div className="lg:w-[33%] w-full h-full p-2 rounded-lg hover:shadow-lg cursor-pointer hover:bg-yellow-50">
      <img
        className="w-full h-[50%] object-cover rounded-md"
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
          Russia attacked strong Ukrainian positions using Chinese golf carts
        </h2>
        <p className="text-yellow-500 font-normal text-[13px]">
          Sport <span className="text-[13px] text-black/300 font-light">-</span>{" "}
          <span className="text-[13px] text-black/300 font-light">
            1 min ago
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeeklyCard;
