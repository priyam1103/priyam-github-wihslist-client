import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
export default function Gitfetch({loading}) {
  let history = useHistory();

  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  async function check(val) {
  
    setInput(val);

    if (val.trim().length > 4) {
      loading();
      await axios
        .get(
          `https://api.github.com/users/${val}?client_id=dbd7943996a3d0024d34&client_secret=7c70aa79c72861d9dc030fbb73a03ab5701d7c93`
        )
        .then((res) => {
          if (res.status === 200) {
            loading();
            console.log(res.data);
            setData(res.data);
          }
        })
        .catch((err) => {loading();});
    } else {
      if (data.login) {
        setData({});
      }
    }
  }
  return (
    <div className="finduser-comp">
      <Input
        fluid
        placeholder="Search for github users..."
        value={input}
        onChange={(e) => check(e.target.value)}
      />

      {data.login ? (
        <div className="center" style={{ marginTop: "1rem" }}>
          <Card
            onClick={() => {
              history.push(`/gitprofile/${data.login}`);
            }}
            image={data.avatar_url}
            header={data.login}
            meta="Friend"
            description={data.bio}
          />
        </div>
      ) : (
        <p className="center one-bold">
          Search for the users and you will see the details here.
        </p>
      )}
    </div>
  );
}
