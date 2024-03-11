import { Detector } from "react-detect-offline";
import bad from "../../assets/network.png";

const DetectNetwork = (props: { children: any }) => {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div className="sm:py-24 py-5 flex flex-col items-center justify-center">
              <img src={bad} />
              <h1 className="font-bold text-[24px] mt-5">404</h1>
              <span className="block text-black/40 text-[14px]">
                Oops! It seems you`re currently offline`.
              </span>
            </div>
          )
        }
      />
    </>
  );
};

export default DetectNetwork;
