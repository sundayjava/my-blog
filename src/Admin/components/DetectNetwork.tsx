import { Detector } from "react-detect-offline";
import { CircularProgress } from "@mui/material";

const DetectNetwork = (props: { children: any }) => {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div className="sm:py-24 py-5 flex flex-col items-center justify-center">
              <CircularProgress />
            </div>
          )
        }
      />
    </>
  );
};

export default DetectNetwork;
