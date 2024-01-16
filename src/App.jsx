import { useState } from "react";
import Chat from "./components/Chat";
import PromptInput from "./components/PromptInput";

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  return (
    <div
      className="container d-flex flex-column border ps-md-5 pe-md-5 ps-3 pe-3"
      style={{ minHeight: "100vh", paddingBottom: "72px" }}
    >
      <div
        className="align-self-center"
        style={{ width: "100px", height: "100px", margin: "24px" }}
      >
        <img
          src="./incognito.svg"
          alt="Secret Avatar"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Chat
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        setId={setId}
        isLoading={isLoading}
        isWinner={isWinner}
        setIsWinner={setIsWinner}
      />
      <PromptInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        id={id}
        setId={setId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isWinner={isWinner}
        setIsWinner={setIsWinner}
      />
    </div>
  );
}

export default App;
