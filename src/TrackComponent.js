// TrackComponent.js
import "./App.css";
import React from "react";
import vinylImage from "./images/vinyl.png";
import trackaddImage from "./images/trackadd.png";
import resizeImage from "./images/trackMinimize.png";
import previousImage from "./images/trackprevious.png";
import playImage from "./images/trackplay.png";
import NextImage from "./images/tracknext.png";
import shuffleImage from "./images/trackshuffle.png";
import WaveformComponent from "./waveform";
import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";

function TrackComponent({
  trackArray,
  user,
  accessToken,
  currentTrackUrl,
  setCurrentTrackUrl,
  setUpdate,
  update,
  setTrackArray,
}) {
  const [currentState, setcurrentState] = useState({});
  useEffect(() => {
    const getQueue = async () => {
      const queueEndpoint = "https://api.spotify.com/v1/me/player/queue";
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await fetch(queueEndpoint, requestOptions);
        const data = await response.json();
        setTrackArray(data["queue"].map((item) => item["uri"]));
      } catch (err) {
        console.error(err);
      }
    };
    getQueue();
  }, [accessToken, setTrackArray]);

  function handlePlayback(state) {
    setCurrentTrackUrl(state["track"]["image"]);
    if (
      currentState &&
      currentState["track"] &&
      currentState["track"]["uri"] &&
      currentState["track"]["uri"] !== state["track"]["uri"]
    ) {
      setcurrentState(state);
    }
  }
  return (
    <div className="col-md-6 col-lg-5 col-sm-6 d-flex flex-column align-items-center">
      <img
        src={currentTrackUrl ? currentTrackUrl : vinylImage}
        id="currentTrackHeader"
        alt="vinyl"
      />
      {accessToken !== "" && user !== {} && trackArray.length !== 0 ? (
        <div className="spotify-player">
          <SpotifyPlayer
            styles={{
              color: "black",
              saveColor: "black",
              // bgColor: "#e5e4e500",
              bgColor: "#e5e4e5",
              // sliderColor: "black",
              trackNameColor: "#323232",
              trackArtistColor: "#5c12c4",
              sliderTrackColor: "#e5e4e480",
              sliderColor: "black",
              sliderHandleBorderRadius: "1px",
              sliderTrackBorderRadius: "1px",
            }}
            autoPlay={true}
            // hideAttribution="true"
            hideCoverArt="true"
            inlineVolume="false"
            token={accessToken}
            layout="compact"
            uris={trackArray}
            name="Flux Player"
            showSaveIcon="true"
            callback={(state) => handlePlayback(state)}
          />
        </div>
      ) : (
        <>
          <h3 id="trackTitle" className="d-flex align-items-center">
            Track Title
            <a className="ms-auto trackLinks" href="#f">
              <span id="addBtn" className="d-flex align-items-center">
                <img
                  src={trackaddImage}
                  id="trackadd"
                  alt="total favourites"
                  className="me-2"
                ></img>{" "}
                <span id="count">123</span>
              </span>
            </a>
          </h3>
          <div className="tags">
            <span className="tagItem">Classic</span>
            <span className="tagItem">Classic</span>
            <span className="tagItem">Classic</span>
          </div>
          <div className="track">
            <WaveformComponent accessToken={accessToken} />
            <div className="controls">
              <button className="controls-item-btn" id="minimizeId">
                <img
                  src={resizeImage}
                  className="controls-item"
                  alt="minimize"
                ></img>
              </button>
              <button className="controls-item-btn">
                <img
                  src={previousImage}
                  className="controls-item"
                  alt="previous"
                  id="prevT"
                ></img>
              </button>
              <button className="controls-item-btn">
                <img
                  src={playImage}
                  className="controls-item"
                  alt="play/pause"
                  id="playId"
                ></img>
              </button>
              <button className="controls-item-btn">
                <img
                  src={NextImage}
                  className="controls-item"
                  alt="next"
                  id="nextT"
                ></img>
              </button>
              <button className="controls-item-btn" id="shuffleId">
                <img
                  src={shuffleImage}
                  className="controls-item"
                  alt="shuffle"
                ></img>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TrackComponent;
