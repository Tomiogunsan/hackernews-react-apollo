import React from 'react'
import Link from './Link';
import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`
;

export default function LinkList() {
     const { data } = useQuery(FEED_QUERY);
  return (
    <div>
        {data.feed.map((link) => (
            <Link key={link.id} link={link} />
        ))}
    </div>
  )
}
