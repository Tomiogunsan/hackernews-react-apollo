import React from 'react'

export default function LinkList() {
     const linksToRender = [
       {
         id: "link-id-1",
         description: "Prisma gives you a powerful database toolkit 😎",
         url: "https://prisma.io",
       },
       {
         id: "link-id-2",
         description: "The best GraphQL client",
         url: "https://www.apollographql.com/docs/react/",
       },
     ];
  return (
    <div>
        {linksToRender?.map((link) => (
            <link key={link.id} link={link} />
        ))}
    </div>
  )
}
