/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Profile from "./Profile";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
export default function Tempgituser({ loading }) {
  const [data, setData] = useState({});
  const { username } = useParams();
  const location = useLocation();
  const fetch = useCallback(async () => {
    loading();
    if (location.state) {
      setData(location.state);
      loading();
      return;
    }
    await axios
      .get(
        `https://api.github.com/users/${username}?client_id=dbd7943996a3d0024d34&client_secret=7c70aa79c72861d9dc030fbb73a03ab5701d7c93`
      )
      .then((res) => {
        if (res.status === 200) {
          loading();
          setData(res.data);
        }
      })
      .catch((err) => {
        loading();
      });
  }, [loading,location.state,username]);
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div style={{ marginTop: "5rem" }}>
      <Profile data={{ ...data, login: username, list: true }} />
    </div>
  );
}
