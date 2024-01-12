import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'

export default function PromptInput({
  chatMessages,
  setChatMessages,
  id,
  setId,
  setIsLoading,
  setIsWinner,
}) {
  const [promptText, setPromptText] = useState('');

  function handleChange(e) {
    setPromptText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const msgId = uuidv4();
    const userMessage = {
      msgId,
      role: 'user',
      content: promptText,
    };
    setChatMessages([...chatMessages, userMessage])
    const requestBody = { chatMessages, id };

    try {
      const response = await fetch('api_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();

        if (id === null) setId(result.id);
        setChatMessages(result.chatMessages);
        setIsWinner(result.isWinner); //What are you going to do when the winner is found?
      }
        
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          placeholder="Ask a yes-or-no question..."
          maxLength="100"
          value={promptText}
          onChange={handleChange}
        />
        <button className="btn btn-dark" type="submit">Submit</button>
      </div>
    </form>
  );
}
