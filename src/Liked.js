import "./App.css";
import { useState, useEffect } from "react";
import vinylImage from "./images/vinyl.png";

export default function Liked({
  user,
  accessToken,
  setCurrentTrackImageUrl,
  setCurrentTrackUrl,
  setTrackArray,
  trackArray,
}) {
  const [likedSongs, setlikedSongs] = useState([]);
  useEffect(() => {
    const getLiked = async () => {
      const likedEndpoint = "https://api.spotify.com/v1/me/tracks";
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const queryParams = new URLSearchParams();
      queryParams.append("limit", 50);
      try {
        const response = await fetch(
          `${likedEndpoint}?${queryParams}`,
          requestOptions
        );
        const data = await response.json();
        setlikedSongs(data["items"]);
      } catch (err) {
        console.error(err);
      }
    };

    if (
      accessToken !== "" &&
      accessToken !== undefined &&
      accessToken !== null
    ) {
      getLiked();
    }
  }, [accessToken]);

  function handleMouseup(track) {
    setCurrentTrackImageUrl(track["track"]["album"]["images"][0]["url"]);
    setCurrentTrackUrl(track["track"]["album"]["images"][0]["url"]);
    setTrackArray((trackArray) => [track["track"]["uri"], ...trackArray]);
  }
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="likedSongsOffcanvas"
      aria-labelledby="likedSongsOffcanvasLabel"
    >
      <div className="offcanvas-header" id="likedSongsOffcanvasHeader">
        <h5 className="offcanvas-title" id="likedSongsOffcanvasLabel">
          Liked Songs
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body" id="likedSongsOffcanvasBody">
        {likedSongs.map((track, i) => (
          <div className="likedElement" onMouseUp={() => handleMouseup(track)}>
            <img
              className="likedImage"
              src={
                track["track"]["album"]["images"][0]["url"]
                  ? track["track"]["album"]["images"][0]["url"]
                  : vinylImage
              }
              alt={`liked song ${i}`}
            />
            <div className="descript">
              <div className="likedsongTitle">{track["track"]["name"]}</div>
              <div className="likedsongArtist">
                {track["track"]["artists"].map(
                  (artist) => artist["name"] + ","
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
