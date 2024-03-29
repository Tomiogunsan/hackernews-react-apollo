import React from 'react'
import Link from './Link';
import { useQuery, gql } from "@apollo/client";
import { useLocation } from 'react-router-dom';
export const FEED_QUERY = gql`
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export default function LinkList() {
    const location = useLocation();
    const isNewPage = location.pathname.includes("new");
    const pageIndexParams = location.pathname.split("/");
    const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
  const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY {
    variables: getQueryVariables(isNewPage, page),);
  // ...

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });
  return (
    <div>
      {data && (
        <>
          {data?.feed?.links?.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
}
