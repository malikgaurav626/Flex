import "./App.css";
import Navbar from "./Navbar.js";
import SideBar from "./SideBar";
import TrackComponent from "./TrackComponent";
import MusicCategories from "./MusicCategories";
import { useState } from "react";
import Topartist from "./Topartist";
import Liked from "./Liked";
import About from "./About";
import Notification from "./Notification";
import Playlists from "./Playlists";
import Messages from "./Messages";
import Queue from "./Queue";
import ReactLoading from "react-loading";

function App() {
  const [user, setUser] = useState({});
  const [ACCESS_TOKEN, setACCESS_TOKEN] = useState("");
  const [trackArray, setTrackArray] = useState([]);
  const [currentTrackImageurl, setCurrentTrackImageUrl] = useState("");
  const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
  const [update, setUpdate] = useState(false);
  const [playlists, setPlaylists] = useState({});
  const [actualTracks, setactualTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);
  return (
    <div className="psuedobody">
      <div className="containerr" id="bodyContainerId">
        {isLoading && (
          <div className="loadingContainer">
            <ReactLoading
              type="cubes"
              color="#7f00ff"
              height={"80%"}
              width={"80%"}
            />
          </div>
        )}
        <Navbar
          user={user}
          setUser={setUser}
          accessToken={ACCESS_TOKEN}
          setaccessToken={setACCESS_TOKEN}
          setTrackArray={setTrackArray}
          trackArray={trackArray}
          setCurrentTrackImageUrl={setCurrentTrackImageUrl}
          setCurrentTrackUrl={setCurrentTrackUrl}
          playlists={playlists}
          actualTracks={actualTracks}
        />
        <div className="row midBody">
          <SideBar />
          <TrackComponent
            trackArray={trackArray}
            user={user}
            accessToken={ACCESS_TOKEN}
            currentTrackImageurl={currentTrackImageurl}
            currentTrackUrl={currentTrackUrl}
            setCurrentTrackUrl={setCurrentTrackUrl}
            setUpdate={setUpdate}
            update={update}
            setTrackArray={setTrackArray}
          />
          <MusicCategories
            user={user}
            accessToken={ACCESS_TOKEN}
            trackArray={trackArray}
            setTrackArray={setTrackArray}
            update={update}
            setCurrentTrackUrl={setCurrentTrackUrl}
            setCurrentTrackImageUrl={setCurrentTrackImageUrl}
            playlists={playlists}
            setPlaylists={setPlaylists}
            actualTracks={actualTracks}
            setactualTracks={setactualTracks}
          />
        </div>
      </div>
      <Notification />
      <Messages />
      <Playlists
        playlists={playlists}
        accessToken={ACCESS_TOKEN}
        setTrackArray={setTrackArray}
      />
      <Queue
        actualTracks={actualTracks}
        setCurrentTrackImageUrl={setCurrentTrackImageUrl}
        setCurrentTrackUrl={setCurrentTrackUrl}
        setTrackArray={setTrackArray}
        trackArray={trackArray}
      />
      <About />
      <Liked
        user={user}
        accessToken={ACCESS_TOKEN}
        setCurrentTrackImageUrl={setCurrentTrackImageUrl}
        trackArray={trackArray}
        setTrackArray={setTrackArray}
        setCurrentTrackUrl={setCurrentTrackUrl}
      />
      <Topartist user={user} accessToken={ACCESS_TOKEN} />
    </div>
  );
}

export default App;
