import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    deletePrompt,
    clearAllPrompts,
    darkMode,
    setDarkMode,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="recent-title">Recent</p>
              {prevPrompts.length > 0 && (
                <span
                  onClick={clearAllPrompts}
                  style={{
                    fontSize: "11px",
                    color: "#ff5546",
                    cursor: "pointer",
                    fontWeight: "600",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Clear All
                </span>
              )}
            </div>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0, 15)}...</p>
                  </div>
                  <span
                    onClick={(e) => deletePrompt(e, item)}
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      padding: "0 5px",
                      color: "#888",
                    }}
                    className="delete-bin"
                  >
                    ✕
                  </span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        {/* Toggle Dark Mode switch trigger */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="bottom-item recent-entry"
        >
          <img src={darkMode ? assets.light : assets.dark} alt="Theme Icon" />
          {extended ? <p>{darkMode ? "Light Mode" : "Dark Mode"}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
