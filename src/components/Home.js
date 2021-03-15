import React from 'react'
import Profile from "./Profile";
export default function Home({user_data}) {
    return (
        <div>
            <Profile data={user_data}/>
        </div>
    )
}
