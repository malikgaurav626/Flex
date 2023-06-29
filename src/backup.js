import "./App.css";
import spotifyLogo from "./images/spotifyLogo.png";
import { useEffect, useState } from "react";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPE,
} from "./Constants";
export let ACCESS_TOKEN = "";

export default function Login() {
  const [authCode, setAuthCode] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const authEndpoint = "https://accounts.spotify.com/authorize";
    const queryParams = new URLSearchParams();
    queryParams.append("client_id", SPOTIFY_CLIENT_ID);
    queryParams.append("response_type", "code");
    queryParams.append("redirect_uri", SPOTIFY_REDIRECT_URI);
    queryParams.append("scope", SPOTIFY_SCOPE);

    const authUrl = `${authEndpoint}?${queryParams.toString()}`;

    try {
      const authWindow = window.open(authUrl, "_blank", "width=500,height=600");

      const handleAuthResponse = (event) => {
        if (
          event.origin === window.location.origin &&
          event.data.type === "authCode"
        ) {
          setAuthCode(event.data.code);
          window.removeEventListener("message", handleAuthResponse);
          authWindow.close();
        }
      };

      window.addEventListener("message", handleAuthResponse);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const tokenEndpoint = "https://accounts.spotify.com/api/token";
      const bodyParams = new URLSearchParams();
      bodyParams.append("grant_type", "authorization_code");
      bodyParams.append("code", authCode);
      bodyParams.append("redirect_uri", SPOTIFY_REDIRECT_URI);
      bodyParams.append("client_id", SPOTIFY_CLIENT_ID);

      try {
        const response = await fetch(tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyParams.toString(),
        });

        const responseData = await response.json();
        const accessToken = responseData.access_token;
        ACCESS_TOKEN = accessToken; // Store the access token in the exported variable
        console.log("Access Token:", accessToken);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    if (authCode) {
      fetchAccessToken();
    }
  }, [authCode]);

  return (
    <div
      className="offcanvas offcanvas-end"
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
          <div className="spotifyLogin">Login Using Spotify</div>
          <div className="form-group">
            <input className="LoginBtn" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
