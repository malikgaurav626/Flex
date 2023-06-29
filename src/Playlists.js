import "./App.css";
import vinylImage from "./images/vinyl.png";
import playlistImage from "./images/playlistbutton.png";
export default function Playlists({ playlists, accessToken, setTrackArray }) {
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
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="playlistsOffcanvas"
      aria-labelledby="playlistsOffcanvasLabel"
    >
      <div className="offcanvas-header" id="playlistsOffcanvasHeader">
        <h5 className="offcanvas-title" id="playlistsOffcanvasLabel">
          Playlists
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          style={{ color: "black" }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body" id="playlistsOffcanvasBody">
        <div className="playlistContainerr">
          {playlists && playlists["items"] ? (
            playlists["items"].map((ele, i) => (
              <a
                // href={ele["external_urls"]["spotify"]}
                onMouseDown={() => handlemouseDown(ele)}
                className="playlistLinks smallplaylistLinks"
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
                      id="offcanvasplaylistimage"
                    ></img>
                  </button>
                </div>
              </a>
            ))
          ) : (
            <div className="prelogin">Please Login To See Your Playlists</div>
          )}
        </div>
      </div>
    </div>
  );
}
