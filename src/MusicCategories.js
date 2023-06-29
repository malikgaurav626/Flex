import React from "react";
import "./App.css";
import vinylImage from "./images/vinyl.png";
import playlistImage from "./images/playlistbutton.png";
import { useState, useEffect } from "react";
import { USER_ENDPOINT } from "./Constants";
import { spotifyApi } from "react-spotify-web-playback";
const MusicCategories = ({
  setTrackArray,
  trackArray,
  user,
  accessToken,
  update,
  setCurrentTrackUrl,
  setCurrentTrackImageUrl,
  playlists,
  setPlaylists,
  actualTracks,
  setactualTracks,
}) => {
  useEffect(() => {});
  useEffect(() => {
    const getPlaylists = async () => {
      const queryParams = new URLSearchParams();
      queryParams.append("limit", "20");
      const playlist_endpoint = `${USER_ENDPOINT}/playlists`;
      const requestParams = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await fetch(
          `${playlist_endpoint}?${queryParams}`,
          requestParams
        );
        const data = await response.json();
        setPlaylists(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user !== {} && accessToken !== "" && accessToken !== undefined) {
      getPlaylists();
    }
  }, [user, accessToken]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const trackUris = trackArray.join(",");
        const trackIds = trackArray.map((uri) => uri.split(":")[2]).join(",");
        const response = await fetch(
          `https://api.spotify.com/v1/tracks?ids=${trackIds}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response["ok"]) {
          const data = await response.json();
          setactualTracks(data.tracks);
        } else {
          console.error("Error fetching tracks:", response.status);
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, [accessToken, trackArray]);

  function handlemouseDown(ele) {
    const fetchTracks = async () => {
      const tracksEndpoint = ele["tracks"]["href"];
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await fetch(tracksEndpoint, requestOptions);
        const data = await response.json();
        let newTrackArray = data["items"].map((item) => item["track"]["uri"]);
        setTrackArray(newTrackArray);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTracks();
  }
  function handleMouseup(track) {
    setCurrentTrackImageUrl(track["album"]["images"][0]["url"]);
    setCurrentTrackUrl(track["album"]["images"][0]["url"]);
    setTrackArray((trackArray) => [track["uri"], ...trackArray]);
  }

  return (
    <div className="col-sm-6 rightportion">
      <h2 className="rightHeading">Music Categories</h2>
      <div className="tags" id="categoryTags">
        <a href="#" className="taglinks">
          <span className="tagItem tagactive">Classic</span>
        </a>
        <a href="#" className="taglinks">
          <span className="tagItem tagpassive">90's</span>
        </a>
        <a href="#" className="taglinks">
          <span className="tagItem tagpassive">Instrumental</span>
        </a>
        <a href="#" className="taglinks">
          <span className="tagItem tagpassive">New</span>
        </a>
        <a href="#" className="taglinks">
          <span className="tagItem tagpassive">Cyberpunk</span>
        </a>
        <a href="#" className="taglinks">
          <span className="tagItem tagpassive">Lo-Fi</span>
        </a>
        <a href="#" className="taglinks">
          <span className="tagItem tagpassive">Vaporwave</span>
        </a>
      </div>
      <div className="queue">
        {actualTracks &&
          actualTracks.map(
            (track, i) =>
              i !== 0 && (
                <div
                  className="queueElement"
                  onMouseUp={() => handleMouseup(track)}
                >
                  <img
                    src={
                      track &&
                      track["album"] &&
                      track["album"]["images"] &&
                      track["album"]["images"][0]["url"]
                        ? track["album"]["images"][0]["url"]
                        : vinylImage
                    }
                    className="queueImg"
                    alt="up next"
                  ></img>
                  <div className="queueTitle">
                    {track["name"] ? track["name"] : "Song Name"}
                  </div>
                  <div className="queueArtist">
                    by{" "}
                    {track["artists"]
                      ? track["artists"].map((artist) => artist["name"] + ", ")
                      : "Artist Name"}
                  </div>
                </div>
              )
          )}
      </div>
      <div className="playlists">
        <h2>Playlists</h2>
        <div className="playlistContainer">
          {playlists && playlists["items"] ? (
            playlists["items"].map((ele, i) => (
              <a
                // href={ele["external_urls"]["spotify"]}
                onMouseDown={() => handlemouseDown(ele)}
                className="playlistLinks"
                key={i}
              >
                <div className="playlist">
                  <img
                    src={
                      ele["images"] &&
                      ele["images"][1] &&
                      ele["images"][1]["url"]
                        ? ele["images"][1]["url"]
                        : vinylImage
                    }
                    className="playlistImage"
                    alt="playlistImage"
                  />
                  <div className="playlistHeading">
                    {ele["name"]}
                    <br />
                    <div className="playlistSubHeading">
                      {ele["tracks"]["total"]} songs
                    </div>
                  </div>
                  <button className="playlistBtn">
                    <img
                      src={playlistImage}
                      className="playlistPlayImg"
                      alt="start playlist"
                    ></img>
                  </button>
                </div>
              </a>
            ))
          ) : (
            <div className="prelogin">
              Please Login (top left) To See Your Playlists
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicCategories;
