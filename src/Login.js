import { useEffect, useState, useRef } from "react";
import spotifyLogo from "./images/spotifyLogo.png";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPE,
  AUTH_ENDPOINT,
  SPOTIFY_CLIENT_SECRET,
  TOKEN_ENDPOINT,
  USER_ENDPOINT,
} from "./Constants";

export let ACCESS_TOKEN = "";
export let REFRESH_TOKEN = "";

export default function Login({ user, setUser, setat }) {
  const [authCode, setAuthCode] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [initialTokenObtained, setInitialTokenObtained] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    queryParams.append("client_id", SPOTIFY_CLIENT_ID);
    queryParams.append("response_type", "code");
    queryParams.append("redirect_uri", SPOTIFY_REDIRECT_URI);
    queryParams.append("scope", SPOTIFY_SCOPE);

    const redirectURL = `${AUTH_ENDPOINT}?${queryParams.toString()}`;
    window.location.href = redirectURL;
  };

  const handleEvent = (event) => {
    try {
      if (event.target.code !== "" && event.target.code !== undefined) {
        setAuthCode(event.target.code);
        setIsLogged(true);
        console.log("here");
      }
    } catch (err) {
      console.error(err);
    }
    window.removeEventListener("message", handleEvent);
  };

  useEffect(() => {
    window.addEventListener("message", handleEvent);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code !== "" && code !== undefined && code !== null) {
      setAuthCode(code);
      setIsLogged(true);
    }
  }, []);
  useEffect(() => {
    const getToken = async () => {
      const bodyParams = new URLSearchParams();
      bodyParams.append("grant_type", "authorization_code");
      bodyParams.append("code", authCode);
      bodyParams.append("redirect_uri", SPOTIFY_REDIRECT_URI);
      const base64String = btoa(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      );
      const authorizationHeader = `Basic ${base64String}`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: authorizationHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      };

      try {
        const response = await fetch(TOKEN_ENDPOINT, requestOptions);
        const data = await response.json();
        console.log(data);
        ACCESS_TOKEN = data.access_token;
        setat(ACCESS_TOKEN);
        REFRESH_TOKEN = data.refresh_token;

        // Set the flag to indicate that the initial token has been obtained
        setInitialTokenObtained(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (
      authCode !== "" &&
      authCode !== undefined &&
      authCode !== null &&
      !initialTokenObtained
    ) {
      getToken();
    }
  }, [authCode, initialTokenObtained, setat]);

  useEffect(() => {
    const refreshToken = async () => {
      const bodyParams = new URLSearchParams();
      bodyParams.append("grant_type", "refresh_token");
      bodyParams.append("refresh_token", REFRESH_TOKEN);
      const base64String = btoa(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      );
      const authorizationHeader = `Basic ${base64String}`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: authorizationHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      };

      try {
        let response = await fetch(TOKEN_ENDPOINT, requestOptions);
        const data = await response.json();
        ACCESS_TOKEN = data.access_token;
        setat(ACCESS_TOKEN);
        console.log("refreshed AccessToken", ACCESS_TOKEN);
      } catch (err) {
        console.error(err);
      }
    };

    const interval = setInterval(refreshToken, 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };
      const response = await fetch(USER_ENDPOINT, requestOptions);
      const data = await response.json();
      console.log(data);
      setUser(data);
    };

    if (
      ACCESS_TOKEN !== undefined &&
      ACCESS_TOKEN !== null &&
      ACCESS_TOKEN !== ""
    ) {
      console.log("here");
      getUser();
    }
  }, [ACCESS_TOKEN]);

  return (
    <div
      className="offcanvas offcanvas-start"
      data-bs-backdrop="false"
      data-bs-scroll="false"
      tabIndex="-1"
      id="offcanvasId"
      aria-labelledby="offcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">
          Login
        </h5>
        <button
          type="button"
          className="btn-close"
          style={{ color: "black" }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <form className="spotifyLoginForm" onSubmit={handleLogin}>
          <div className="spotifyLogoContainer">
            <img className="spotifyLogo" alt="login logo" src={spotifyLogo} />
          </div>
          {isLogged ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                }}
              >
                You are logged In
              </div>
              <div className="credentials">
                <div className="userName">{user["display_name"]}</div>
                <div className="email">{user["email"]}</div>
                <div className="product">{user["product"]}</div>
              </div>
            </>
          ) : (
            <>
              <div className="spotifyLogin">Login Using Spotify</div>
              <div className="form-group">
                <input className="LoginBtn" type="submit" value="Login" />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
