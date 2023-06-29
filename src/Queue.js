import "./App.css";
import vinylImage from "./images/vinyl.png";

export default function Queue({
  actualTracks,
  setCurrentTrackImageUrl,
  setCurrentTrackUrl,
  setTrackArray,
  trackArray,
}) {
  function handleMouseup(track) {
    setCurrentTrackImageUrl(track["album"]["images"][0]["url"]);
    setCurrentTrackUrl(track["album"]["images"][0]["url"]);
    setTrackArray((trackArray) => [track["uri"], ...trackArray]);
  }
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="queueOffcanvas"
      aria-labelledby="queueOffcanvasLabel"
    >
      <div className="offcanvas-header" id="queueOffcanvasHeader">
        <h5 className="offcanvas-title" id="queueOffcanvasLabel">
          Queue
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          style={{ color: "black" }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body" id="queueOffcanvasBody">
        <div className="smallqueue">
          {actualTracks &&
            actualTracks.map(
              (track, i) =>
                i !== 0 && (
                  <div
                    className="smallqueueElement"
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
                      className="smallqueueImg"
                      alt="up next"
                    ></img>
                    <div className="smallqueuetrackDescription">
                      <div className="smallqueueTitle">
                        {track["name"] ? track["name"] : "Song Name"}
                      </div>
                      <div className="smallqueueArtist">
                        by{" "}
                        {track["artists"]
                          ? track["artists"].map(
                              (artist) => artist["name"] + ", "
                            )
                          : "Artist Name"}
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}
