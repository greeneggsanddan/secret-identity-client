import { useEffect, useRef } from "react";
import "./Chat.css";

export default function Chat({
  chatMessages,
  setChatMessages,
  setId,
  isLoading,
  isWinner,
  setIsWinner,
}) {
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView();
  }, [chatMessages]);

  const messages = chatMessages.map((message, index) => (
    <div
      className={`d-flex ${message.role === "user" && "flex-row-reverse"}`}
      key={index}
    >
      {message.role === "assistant" ? (
        <div className="secret avatar">
          <img src="./incognito.svg" alt="Secret Avatar" />
        </div>
      ) : (
        <div className="player avatar">
          <img src="./search.svg" alt="Player Avatar" />
        </div>
      )}
      <div
        className={`card mb-3 ${
          message.role === "assistant"
            ? "text-bg-secondary"
            : "text-black bg-warning-subtle"
        }`}
      >
        <div className="card-body">{message.content}</div>
      </div>
    </div>
  ));

  function handleReset() {
    setChatMessages([]);
    setId(null);
    setIsWinner(false);
  }

  return (
    <div>
      <div className="d-flex">
        <div className="secret avatar">
          <img src="./incognito.svg" alt="Secret Avatar" />
        </div>
        <div className="card text-bg-secondary mb-3">
          <div className="card-body">
            Try to guess my secret identity by asking &quot;Yes-or-No&quot;
            questions.
          </div>
        </div>
      </div>
      {messages}
      {isLoading && (
        <div className="d-flex align-items-center mb-3">
          <div className="secret avatar">
            <img src="./incognito.svg" alt="Secret Avatar" />
          </div>
          <div className="spinner-border ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {isWinner && (
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className="btn btn-lg btn-dark"
            onClick={handleReset}
          >
            Play again!
          </button>
        </div>
      )}
      <div ref={chatRef} />
    </div>
  );
}
