import React from 'react'
import { useMutation, gql } from "@apollo/client";

const CREATE_LINK_MUTATION = gql`
mutation PostMutation($description: String!, $url: String!) {}
`

export default function CreateLink() {
    const [formState, setFormState] = React.useState({
        description: '',
        url: ''
    });


  return (
    <div>
      <form>
        <div>
          <input
            className=""
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
