import "./App.css";
import { useState, useEffect } from "react";
import { SEARCH_ENDPOINT } from "./Constants";
import vinylImage from "./images/vinyl.png";
import smallSearchImage from "./images/search-interface-symbol.png";
export default function SearchBar({
  user,
  accessToken,
  trackArray,
  setTrackArray,
  setCurrentTrackImageUrl,
  setCurrentTrackUrl,
}) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    setQuery(event.target.value);
  }
  function handleFocus() {
    setIsFocused(true);
  }
  function handleBlur() {
    setIsFocused(false);
  }
  function handlePlay(ele) {
    setCurrentTrackImageUrl(ele["album"]["images"][0]["url"]);
    setCurrentTrackUrl(ele["album"]["images"][0]["url"]);
    setTrackArray((trackArray) => [ele["uri"], ...trackArray]);
  }

  useEffect(() => {
    const getSearch = async () => {
      const queryParams = new URLSearchParams();
      queryParams.append("q", query);
      queryParams.append("type", "artist,track");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await fetch(
          `${SEARCH_ENDPOINT}?${queryParams}`,
          requestOptions
        );
        const data = await response.json();
        setQueryResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (
      user !== {} &&
      accessToken !== null &&
      accessToken !== undefined &&
      accessToken !== ""
    ) {
      getSearch();
    }
  }, [query, accessToken, user]);

  return (
    <>
      <form id="smallformId">
        <a
          id="smallSearch"
          data-bs-toggle="offcanvas"
          href="#searchOffcanvas"
          role="button"
          aria-controls="searchOffcanvas"
          aria-current="page"
        >
          <img
            src={smallSearchImage}
            className="smallSearchImage"
            alt="notifications"
          ></img>
        </a>
      </form>
      <div
        className="offcanvas offcanvas-start d-lg-none"
        tabIndex="-1"
        id="searchOffcanvas"
        aria-labelledby="searchOffcanvasLabel"
      >
        <div className="offcanvas-header searchs">
          <h5 className="offcanvas-title" id="searchOffcanvasLabel">
            Search
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
        <div className="offcanvas-body smallsearchBody">
          <form
            className="d-flex justify-content-center align-items-center"
            onChange={handleSubmit}
            onSubmit={handleSubmit}
          >
            <div className="mb-3" id="smallsearchField">
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Search for tracks, artists"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              id="smallsearchBtn"
            >
              Search
            </button>
          </form>
          <div className="drop-menu">
            <ul className="dropList">
              {queryResults["tracks"] && queryResults["tracks"]["items"] ? (
                queryResults["tracks"]["items"].map((ele, i) => (
                  <li
                    className="searchItem"
                    key={"searchItem-" + i}
                    onMouseDown={() => handlePlay(ele)}
                  >
                    <img
                      src={
                        ele["album"] &&
                        ele["album"]["images"] &&
                        ele["album"]["images"][0] &&
                        ele["album"]["images"][0]["url"]
                          ? ele["album"]["images"][0]["url"]
                          : vinylImage
                      }
                      className="coverImg1"
                      alt="cover art"
                    />
                    <div className="searchItemHeading1">
                      {ele["name"]}
                      <br />
                      <div className="searchItemSubHeading1">
                        by{" "}
                        {ele["artists"].map((artist) => artist["name"] + ", ")}
                      </div>
                    </div>
                  </li>
                ))
              ) : user && accessToken && query === "" ? (
                <div className="inSearch">.....</div>
              ) : (
                <div className="prelogin">Please login to Search</div>
              )}
            </ul>
          </div>
        </div>
      </div>
      <form
        id="formId"
        className="d-flex me-auto position-relative flex-column justify-content-center"
        onChange={handleSubmit}
        onSubmit={handleSubmit}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input
          className="form-control icon-input"
          type="search"
          placeholder="Search for songs, artists"
          aria-label="Search"
          id="largeSearch"
        />
        <div
          className="drop"
          style={{
            display: isFocused ? "block" : "none",
          }}
        >
          <div className="drop-menu">
            <ul className="dropList">
              {queryResults["tracks"] && queryResults["tracks"]["items"] ? (
                queryResults["tracks"]["items"].map((ele, i) => (
                  <li
                    className="searchItem"
                    key={"searchItem-" + i}
                    onMouseDown={() => handlePlay(ele)}
                  >
                    <img
                      src={
                        ele["album"] &&
                        ele["album"]["images"] &&
                        ele["album"]["images"][0] &&
                        ele["album"]["images"][0]["url"]
                          ? ele["album"]["images"][0]["url"]
                          : vinylImage
                      }
                      className="coverImg"
                      alt="cover art"
                    />
                    <div className="searchItemHeading">
                      {ele["name"]}
                      <br />
                      <div className="searchItemSubHeading">
                        by{" "}
                        {ele["artists"].map((artist) => artist["name"] + ", ")}
                      </div>
                    </div>
                  </li>
                ))
              ) : user && accessToken && query === "" ? (
                <div className="inSearch">Search</div>
              ) : (
                <div className="prelogin">Please login to Search</div>
              )}
            </ul>
          </div>
        </div>
      </form>
    </>
  );
}
