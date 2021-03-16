/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState, useContext } from "react";
import { Item, List, Icon } from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import AlertMessage from "./AlertMessage";
export default function Profile({ data }) {
  const { update_user, user_data ,loading} = useContext(GlobalContext);

  const [repo_list, setRepoList] = useState([]);
  const [alert,setAlert] = useState({alert:false,info:""})
  useEffect(() => {
    async function fetchrepos() {
      loading();
      axios
        .get(`https://api.github.com/users/${data.login}/repos?per_page=100`)
        .then((res) => {
          loading();
          setRepoList(res.data);
        })
        .catch((err) => {
          loading();
      })
    }
    fetchrepos();
  }, []);
  async function addToList() {
    loading();
    setAlert({ alert: false, info:"" });
    const token = await localStorage.getItem("githu_token");
    axios
      .post(
        `https://github-wishlist.herokuapp.com/user/${
          user_data.mylist.includes(data.id)
            ? `removefromlist/${data.id}`
            : `addtolist`
        }`,
        { response: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        loading();
        if (!alert.alert) {
          setAlert({ alert: true, info: res.data.message });
          setTimeout(function () {
            setAlert({ alert: false, info:"" });
          },1000)
        }
        
        update_user(res.data.user_);
      })
    .catch((err)=>{loading();})
  }
  return (
    <div className="profile-comp">
      <div style={{ margin: 0,padding:0}}>
        {alert.alert && <AlertMessage message={alert.info} />}
        </div>
      <Item.Group>
        <Item className="img-pro">
          <Item.Image size="small"  circular src={data.avatar_url} />

          <Item.Content style={{ margin: "2rem" }}>
            <Item.Header as="a">
              {data.name}{" "}
              {data.list && (
                <>
                  {user_data.mylist.includes(data.id) ? (
                    <Icon
                      onClick={() => addToList()}
                      name="star"
                      color="yellow"
                    />
                  ) : (
                    <Icon
                      onClick={() => addToList()}
                      name="star outline"
                      color="yellow"
                    />
                  )}
                </>
              )}
            </Item.Header>
            <Item.Meta>{data.email}</Item.Meta>
            <Item.Description>{data.bio}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>

      <List horizontal>
        <List.Item>
          <List.Content>
            <List.Header> {data.followers} Followers</List.Header>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content>
            <List.Header>{data.following} Following</List.Header>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content>
            <List.Header>{data.public_repos} Repos</List.Header>
          </List.Content>
        </List.Item>
      </List>
      <List divided relaxed>
        {repo_list.map((item) => (
          <List.Item key={item.full_name}>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>
                <a
                  href={`https://github.com/${item.full_name}`}
                  target="_blank"
                >
                  {item.full_name}
                </a>
              </List.Header>
              <List.Description as="a">{item.language}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
