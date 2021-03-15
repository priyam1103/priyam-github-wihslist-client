import React from 'react'
import {  Message} from "semantic-ui-react";

export default function ErrorMessage({message}) {
    return (
        <div style={{margin:"1rem"}}>
             <Message
                error
                header={message}
            />
        </div>
    )
}
