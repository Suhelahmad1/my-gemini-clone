import React, { useContext, useEffect, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Markdown from "react-markdown"; // ✅ Imported Library

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const resultEndRef = useRef(null);

  // Auto scroll logic to view typing changes
  useEffect(() => {
    if (resultEndRef.current) {
      resultEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultData, loading]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I Help you today</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Suggest beautiful places to see on an upcoming road trip.",
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Briefly summarize this concept: urban planning and smart cities.",
                  )
                }
              >
                <p>
                  Briefly summarize this concept: urban planning and smart
                  cities.
                </p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Brainstorm bonding activities for our work anniversary celebration.",
                  )
                }
              >
                <p>
                  Brainstorm bonding activities for our work anniversary
                  celebration.
                </p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Improve the readability of the following complex JavaScript code.",
                  )
                }
              >
                <p>
                  Improve the readability of the following complex JavaScript
                  code.
                </p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                // ✅ Code Block dynamic markdown rendering wrapper panel
                <div className="markdown-body-wrapper">
                  <Markdown>{resultData}</Markdown>
                </div>
              )}
            </div>
            <div ref={resultEndRef} />
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  onSent();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img
                  onClick={() => {
                    if (input.trim() !== "") {
                      onSent();
                    }
                  }}
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double check its response. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
