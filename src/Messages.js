import "./App.css";

export default function Messages() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="messagesOffcanvas"
      aria-labelledby="messagesOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="messagesOffcanvasLabel">
          Messages
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
        <ul className="message-list">
          <li>
            <div className="message-info">
              <div className="message-sender">John Doe</div>
              <div className="message-time">2 hours ago</div>
            </div>
            <div className="message-content">Hey, how are you doing?</div>
          </li>
          <li>
            <div className="message-info">
              <div className="message-sender">Jane Smith</div>
              <div className="message-time">1 day ago</div>
            </div>
            <div className="message-content">Just wanted to say hi!</div>
          </li>
          <li>
            <div className="message-info">
              <div className="message-sender">Mike Johnson</div>
              <div className="message-time">3 days ago</div>
            </div>
            <div className="message-content">
              Are you available for a meeting tomorrow?
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
