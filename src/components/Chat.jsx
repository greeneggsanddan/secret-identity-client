import './Chat.css';

export default function Chat({ chatMessages, isLoading }) {
  const messages = chatMessages.map((message) => (
    <div className={`d-flex ${message.role === 'user' && 'flex-row-reverse'}`} key={message.msgId}>
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
    <>
      <div className="d-flex">
        <div className="secret avatar">
          <img src="./incognito.svg" alt="Secret Avatar" />
        </div>
        <div className="card text-bg-secondary mb-3">
          <div className="card-body">
            Try to guess my identity by asking "Yes-or-No" questions.
          </div>
        </div>
      </div>
      {messages}
    </>
  );
}
