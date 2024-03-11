import React from "react";
import moment from "moment";

interface MomentTimeDisplayProps {
  timestamp: string; // Assuming timestamp is a string in the format 'Mon Mar 11 2024 00:57:57 GMT+0100 (West Africa Standard Time)'
}

const MomentTimeDisplay: React.FC<MomentTimeDisplayProps> = ({
  timestamp,
}) => {
  // Parse the timestamp string using moment
  const parsedTimestamp = moment(timestamp, "ddd MMM DD YYYY HH:mm:ss");

  // Calculate relative time using fromNow() function
  const relativeTime = parsedTimestamp.fromNow();

  return <p className="text-[12px] text-gray-400">{relativeTime}</p>;
};

export default MomentTimeDisplay;