import "./App.css";

export default function About() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="AppOffcanvas"
      aria-labelledby="AppOffcanvasLabel"
    >
      {/* <div className="offcanvas-header" id="AppOffcanvasHeader">
        <h5 className="offcanvas-title" id="AppOffcanvasLabel">
          About My App
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div> */}
      <button
        type="button"
        className="btn-close btn-close-white ms-auto"
        id="closeBtn"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <div className="offcanvas-body" id="AppOffcanvasBody">
        <h1 className="gradientText aboutHeading text-center">FLUX</h1>
        <p className="gradientText subHeading">
          Welcome to Flux! Flux is a captivating music web player that
          seamlessly integrates with the Spotify API.
        </p>
        <p className="gradientText content">
          Just login using your spotify account and enjoy
        </p>
        <div className="row">
          <div className="col-6 text-end">
            <a
              href="https://github.com/malikgaurav626/Flux"
              rel="noreferrer"
              target="_blank"
            >
              <button className="btn btn-outline-dark">Source Code</button>
            </a>
          </div>
          <div className="col-6">
            <a
              href="https://github.com/malikgaurav626"
              rel="noreferrer"
              target="_blank"
            >
              <button className="btn btn-outline-light">Other Projects</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
