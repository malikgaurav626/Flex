import "./App.css";

export default function Notification() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="notificationOffcanvas"
      aria-labelledby="notificationOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="notificationOffcanvasLabel">
          Notifications
        </h5>
        <button
          type="button"
          className="btn-close"
          style={{
            color: "black",
          }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="notification-list">
          <li>
            <h6 className="notification-title">Version 0.5.0 Live</h6>
            <p className="notification-description">
              Flux Version 0.5.0 is live and available to everyone.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
