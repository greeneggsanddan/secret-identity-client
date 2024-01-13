import { useEffect, useRef } from 'react';
import './Chat.css';

export default function Chat({ chatMessages, isLoading }) {
  const chatRef = useRef(null);
  
  useEffect(() => {
    chatRef.current?.scrollIntoView();
  }, [chatMessages]);

  const messages = chatMessages.map((message) => (
    <div className={`d-flex ${message.role === 'user' && 'flex-row-reverse'}`} key={message}>
      {message.role === 'assistant' ? (
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
          message.role === 'assistant'
          ? 'text-bg-secondary'
          : 'text-black bg-warning-subtle'
        }`}
        >
        <div className="card-body">{message.content}</div>
      </div>
    </div>
  ));
  

  return (
    <div>
      <div className="d-flex">
        <div className="secret avatar">
          <img src="./incognito.svg" alt="Secret Avatar" />
        </div>
        <div className="card text-bg-secondary mb-3">
          <div className="card-body">
            Try to guess my secret identity by asking &quot;Yes-or-No&quot; questions.
          </div>
        </div>
      </div>
      {messages}
      <div ref={chatRef} />
    </div>
  );
}
