import { useState } from 'react';

export default function PromptInput({
  chatMessages,
  setChatMessages,
  setIsLoading,
  setIsWinner,
}) {
  const [promptText, setPromptText] = useState('');
  const [id, setId] = useState(null);

  function handleChange(e) {
    setPromptText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const userMessage = {
      role: 'user',
      content: promptText,
    };
    const updatedChatMessages = [...chatMessages, userMessage];
    const requestBody = { chatMessages: updatedChatMessages, id };

    fetchData(requestBody);

    setChatMessages(updatedChatMessages);
    setPromptText('');
  }

  async function fetchData(request) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();

        if (id === null) setId(result.id);
        setChatMessages(result.chatMessages);
        // setIsWinner(result.isWinner); //What are you going to do when the winner is found?
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="container border fixed-bottom bg-white pb-3 pt-3 ps-5 pe-5"
      onSubmit={handleSubmit}
    >
      <div className="input-group input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Ask a yes-or-no question..."
          maxLength="100"
          value={promptText}
          onChange={handleChange}
        />
        <button className="btn btn-dark" type="submit" disabled={!promptText.trim()}>
          <i className="bi bi-send"></i>
        </button>
      </div>
    </form>
  );
}
