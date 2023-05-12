import React from "react";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";

export default function Link({link}) {
 
  const authToken = localStorage.getItem("authToken");
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{link.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("Clicked vote button");
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
}
