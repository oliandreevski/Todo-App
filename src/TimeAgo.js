import { parseISO, formatDistanceToNow, format } from "date-fns";
import React from "react";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = format(date, "yyyy-MM-dd' 'HH:mm:ss", new Date());
    timeAgo = timePeriod;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
