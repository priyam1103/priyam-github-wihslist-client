import React, { useEffect, useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import Gitfetch from "./components/Gitfetch";
import Authentication from "./components/Authentication";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import MyList from "./components/MyList";
import Home from "./components/Home";
import Tempgituser from "./components/Tempgituser";
import Loading from "./components/Loading"
function App() {
  const {user_data,authenticated,update_user,loader,loading,logout} = useContext(GlobalContext)
 
  useEffect(() => {
    async function check() {
      const token = await localStorage.getItem("githu_token");
      if (token) {
        axios.get("https://github-wishlist.herokuapp.com/user/me", {
          headers: {
             Authorization:`Bearer ${token}`
           }
        }).then((res) => {
          update_user(res.data.user_)
         })
      } else {
        logout()
       }
    }
    check()

  },[])
  return (
    <div style={{paddingBottom:"1rem"}}>
      {loader && (<>
      <Backdrop/><Loading/></>)}
{/* <AlertMessage/> */}
      {authenticated ? (<>
        <Navbar/>
        <Router>
        <Switch>
          <Route path="/" exact>
              <Home user_data={user_data}/>
          </Route>
          <Route path="/findusers" exact>
            <Gitfetch loading={loading}/>
          </Route>
          <Route path="/mylist" exact>
            <MyList />
            </Route>
            <Route path="/gitprofile/:username" exact>
              <Tempgituser loading={loading}/>
          </Route>
        </Switch>
        </Router>
       
        
      </>) : <Authentication />}
      
   </div>
  );
}

export default App;
