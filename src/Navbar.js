// Navbar.js
import "./App.css";
import React from "react";
import emailImage from "./images/email.png";
import notificationImage from "./images/notification.png";
import profileImage from "./images/profile.png";
import sidePlaylistImage from "./images/playlist.png";
import sideHeartImage from "./images/heart.png";
import sideMusicImage from "./images/sidemusic.png";
import sideQueImage from "./images/queue.png";
import sideWhoImage from "./images/sidewho.png";
import menuImage from "./images/menu.png";
import Login from "./Login";
import SearchBar from "./SearchBar";

function Navbar({
  user,
  setUser,
  accessToken,
  setaccessToken,
  trackArray,
  setTrackArray,
  setCurrentTrackImageUrl,
  setCurrentTrackUrl,
  playlists,
  actualTracks,
}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://github.com/malikgaurav626">
            FLUX
            <span className="vaporSquad">by vaporSquad</span>
          </a>
          <SearchBar
            user={user}
            accessToken={accessToken}
            trackArray={trackArray}
            setTrackArray={setTrackArray}
            setCurrentTrackImageUrl={setCurrentTrackImageUrl}
            setCurrentTrackUrl={setCurrentTrackUrl}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarBody"
            aria-controls="navbarBody"
            aria-expanded="false"
            aria-label="Toggle navigation"
            id="togglerBtn"
          >
            <img src={menuImage} id="togglerBtnSpan" alt="menu"></img>
            {/* <span className="navbar-toggler-icon" id="togglerBtnSpan"></span> */}
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarBody"
          >
            <ul className="navbar-nav mb-2 me-auto mb-lg-0 sideNavHidden">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  href="#playlistsOffcanvas"
                  role="button"
                  aria-controls="playlistsOffcanvas"
                  aria-current="page"
                >
                  <img
                    src={sidePlaylistImage}
                    className="navLinks"
                    alt="playlists"
                    id="navHome"
                  ></img>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  href="#likedSongsOffcanvas"
                  role="button"
                  aria-controls="likedSongsOffcanvas"
                  aria-current="page"
                >
                  <img
                    src={sideHeartImage}
                    className="navLinks"
                    alt="liked songs"
                  ></img>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  href="#sideMusicOffcanvas"
                  role="button"
                  aria-controls="sideMusicOffcanvas"
                  aria-current="page"
                >
                  <img
                    src={sideMusicImage}
                    className="navLinks"
                    alt="side Music"
                  ></img>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  href="#queueOffcanvas"
                  role="button"
                  aria-controls="queueOffcanvas"
                  aria-current="page"
                >
                  <img
                    src={sideQueImage}
                    className="navLinks"
                    alt="side Queue"
                    id="navQue"
                  ></img>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  href="#AppOffcanvas"
                  role="button"
                  aria-controls="AppOffcanvas"
                  aria-current="page"
                >
                  <img
                    src={sideWhoImage}
                    className="navLinks"
                    alt="who made website"
                    id="navWho"
                  ></img>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  href="#messagesOffcanvas"
                  role="button"
                  aria-controls="messagesOffcanvas"
                  aria-current="page"
                >
                  <img
                    src={emailImage}
                    className="navIcons"
                    alt="messages"
                  ></img>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="offcanvas"
                  href="#notificationOffcanvas"
                  role="button"
                  aria-controls="notificationOffcanvas"
                  aria-current="page"
                >
                  <img
                    src={notificationImage}
                    className="navIcons"
                    alt="notifications"
                  ></img>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className=" nav-link"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasId"
                  role="button"
                  aria-controls="offcanvasId"
                  aria-current="page"
                >
                  <img
                    src={
                      user && user.images && user.images[0]
                        ? user.images[0].url
                        : profileImage
                    }
                    // src={profileImage}
                    className="navIcons"
                    alt="profile"
                    id="profileImgId"
                  ></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Login user={user} setUser={setUser} setat={setaccessToken} />
    </>
  );
}

export default Navbar;
