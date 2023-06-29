import "./App.css";
import { useState, useEffect } from "react";
import { USER_TOP_ENDPOINT } from "./Constants";
export default function Topartist({ user, accessToken }) {
  const [tops, setTops] = useState();

  useEffect(() => {
    const getTops = async () => {
      const queryParams = new URLSearchParams();
      const topartist_endpoint = `${USER_TOP_ENDPOINT}/artists`;
      queryParams.append("limit", "25");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await fetch(
          `${topartist_endpoint}?${queryParams}`,
          requestOptions
        );
        const data = await response.json();
        setTops(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (
      accessToken !== "" &&
      accessToken !== undefined &&
      accessToken !== null
    ) {
      getTops();
    }
  }, [accessToken]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="sideMusicOffcanvas"
      aria-labelledby="sideMusicOffcanvasLabel"
    >
      <div className="offcanvas-header topartists" id="topartistsid">
        <h5 className="offcanvas-title" id="sideMusicOffcanvasLabel">
          Top Artists
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          style={{
            color: "black",
          }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {tops ? (
          <ul className="music-list">
            {tops["items"].map((ele, i) => (
              <a
                key={"topLink-" + i}
                href={ele["external_urls"]["spotify"]}
                className="topLinks"
              >
                <li
                  className="d-flex music-list-item"
                  id={"topItem-" + i}
                  key={"topItem-" + i}
                >
                  <img
                    className="artistImage"
                    src={ele["images"][2]["url"]}
                    alt="artist"
                  />
                  <div className="d-flex flex-column justContent">
                    <div className="artistName">{ele["name"]}</div>
                    <div className="genres">
                      {ele["genres"].map((genre) => {
                        return genre + ", ";
                      })}
                    </div>
                  </div>
                </li>
              </a>
            ))}
          </ul>
        ) : (
          <div className="prelogin">
            Please login to see your top artists/tracks
          </div>
        )}
      </div>
    </div>
  );
}
