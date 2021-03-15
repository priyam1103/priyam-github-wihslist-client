import React,{useContext} from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { GlobalContext } from "../context/GlobalState";
export default function Navbar() {
    const {logout} = useContext(GlobalContext)


    return (
        <div className="navbar">
             <Menu secondary>
        <Menu.Item><a href="/"> <Icon  name='home' size="large" /></a></Menu.Item>
        <Menu.Item><a href="/findusers"><Icon  name='users' size="large" /></a></Menu.Item>
                <Menu.Item><a href="/mylist"><Icon  name='star' size="large" /></a></Menu.Item>
                <Menu.Item><a href="/" onClick={logout}><Icon  name='power' size="large" /></a></Menu.Item>
              
                
       
      </Menu>
        </div>
    )
}
