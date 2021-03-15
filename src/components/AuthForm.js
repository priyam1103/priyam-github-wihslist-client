import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Button, Form } from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";

export default function AuthForm() {
  const { update_user, loading } = useContext(GlobalContext);
  const [authstate, setAuthState] = useState("login");
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errordata, setErrorData] = useState({ error: false, info: "" });
  function changeAuthState() {
    if (authstate === "login") {
      setAuthState("signup");
    } else {
      setAuthState("login");
    }
  }
  async function authenticate() {
    loading();
    if (errordata.error) {
      setErrorData({ error: false, info: "" });
    }
    if (formdata.username.trim() === "" || formdata.password === "") {
      loading();
      setErrorData({ error: true, info: "Please enter the data" });
      setTimeout(function () {
        setErrorData({ error: false, info: "" });
      }, 5000);
    } else {
      await axios
        .post(
          `https://github-wishlist.herokuapp.com/user/${authstate}`,
          formdata
        )
        .then(async (res) => {
          if (res.status === 200) {
            await localStorage.setItem("githu_token", res.data.token);
            loading();

            update_user(res.data.user_);
          }
        })
        .catch((err) => {
          console.log(err.response);
          if (!errordata.error) {
            setErrorData({ error: true, info: err.response.data.message });
            loading();
            setTimeout(function () {
              setErrorData({ error: false, info: "" });
            }, 5000);
          }
        });
    }
  }
  return (
    <div className="authform center">
      <Form>
        <Form.Field>
          <p className="auth-form-header">
            {" "}
            {authstate === "login"
              ? "Github Wishlist Login"
              : "Github Wishlist Sign up"}
          </p>
        </Form.Field>
        <Form.Field>
          <label>Username (Github)</label>
          <input
            placeholder="Github username"
            value={formdata.username}
            onChange={(e) =>
              setFormData({ ...formdata, username: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            value={formdata.password}
            onChange={(e) =>
              setFormData({ ...formdata, password: e.target.value })
            }
          />
        </Form.Field>

        <Button type="submit" onClick={authenticate}>
          {" "}
          {authstate === "login" ? "Login" : "Sign up"}
        </Button>
        <Button type="submit" onClick={changeAuthState}>
          {authstate === "login" ? "Sign up" : "Login"}
        </Button>
      </Form>
      {errordata.error && <ErrorMessage message={errordata.info} />}
    </div>
  );
}
