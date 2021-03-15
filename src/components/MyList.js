import axios from "axios";
import React, { useEffect, useState ,useContext} from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";
export default function MyList() {
  let history = useHistory();
  const {loading} = useContext(GlobalContext)
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetch() {
      loading();
      const token = await localStorage.getItem("githu_token");
      await axios
        .get("https://github-wishlist.herokuapp.com/user/mylist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          loading();
          setData(res.data.data_list);
        })
          .catch((err) => {
            loading();
          });
    }
    fetch();
  }, []);
  return (
    <div className="mylist-comp">
      {data.length > 0 ? (
        <div className="list">
          {data.map((item) => (
              <Card style={{ cursor: "pointer" }} onClick={()=>{history.push({pathname:`/gitprofile/${item.username}`,state:item});}}>
              <Image src={item.avatar_url} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>
                  <span className="date">{item.username}</span>
                </Card.Meta>
                <Card.Description>{item.bio}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                
                  <Icon name="user" />
                  {item.public_repos} Public Repos
                
              </Card.Content>
            </Card>
          ))}
        </div>
      ) :  <p className="center one-bold">
      There is no profiles in your list.
    </p>}
    </div>
  );
}
