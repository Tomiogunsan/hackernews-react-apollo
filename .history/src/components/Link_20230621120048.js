import React from "react";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants";
import { timeDifferenceForDate } from "./utils";
import { gql, useMutation } from "@apollo/client";
import { FEED_QUERY } from "./LinkList";
import 

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export default function Link({link}) {
  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: "desc" };
   const [vote] = useMutation(VOTE_MUTATION, {
     variables: {
       linkId: link.id,
     },
     update: (cache, {data: {vote}}) => {
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      const updatedLinks = feed.links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote]
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
        variables: {
          take,
          skip,
          orderBy,
        },
      });
    }
  });
   
 
   const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{link.index + 1}.</span>
        {authToken && (
          <button
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={vote}
          >
            <AiFillHeart />
          </button>
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
