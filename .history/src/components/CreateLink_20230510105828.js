import React from 'react'

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
                className=''
                value={formState.description}
                onChange={(e)}
                />
            </div>
        </form>
    </div>
  )
}
