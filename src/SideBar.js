// SideBar.js
import "./App.css";
import React from "react";
import sidePlaylistImage from "./images/playlist.png";
import sideQueImage from "./images/queue.png";
import sideHeartImage from "./images/heart.png";
import sideMusicImage from "./images/sidemusic.png";
import sideEquImage from "./images/sideEquilizer.png";
import sideWhoImage from "./images/sidewho.png";

function SideBar() {
  return (
    <div className="col-1" id="sideBar">
      <a
        className="active"
        data-bs-toggle="offcanvas"
        href="#playlistsOffcanvas"
        role="button"
        aria-controls="playlistsOffcanvas"
        aria-current="page"
      >
        <img
          src={sidePlaylistImage}
          className="sideLinks"
          alt="side Home"
          id="sidePlaylist"
        ></img>
      </a>
      <a
        data-bs-toggle="offcanvas"
        href="#likedSongsOffcanvas"
        role="button"
        aria-controls="likedSongsOffcanvas"
        aria-current="page"
      >
        <img src={sideHeartImage} className="sideLinks" alt="side Liked"></img>
      </a>
      <a
        data-bs-toggle="offcanvas"
        href="#sideMusicOffcanvas"
        role="button"
        aria-controls="sideMusicOffcanvas"
        aria-current="page"
      >
        <img src={sideMusicImage} className="sideLinks" alt="side Music"></img>
      </a>
      <a
        data-bs-toggle="offcanvas"
        href="#queueOffcanvas"
        role="button"
        aria-controls="queueOffcanvas"
        aria-current="page"
      >
        <img
          src={sideQueImage}
          className="sideLinks"
          alt="side Equalizer"
          id="sideQue"
        ></img>
      </a>
      <a
        data-bs-toggle="offcanvas"
        href="#AppOffcanvas"
        role="button"
        aria-controls="AppOffcanvas"
        aria-current="page"
      >
        <img
          src={sideWhoImage}
          className="sideLinks"
          alt="who made website"
          id="sideWho"
        ></img>
      </a>
    </div>
  );
}

export default SideBar;
