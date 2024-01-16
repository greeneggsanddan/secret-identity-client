import { useState } from 'react';

export default function PromptInput({
  chatMessages,
  setChatMessages,
  id,
  setId,
  isLoading,
  setIsLoading,
  isWinner,
  setIsWinner,
}) {
  const [promptText, setPromptText] = useState('');

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
      const response = await fetch(
        'https://secret-identity-server.azurewebsites.net/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
          mode: 'cors',
        }
      );

      if (response.ok) {
        const result = await response.json();

        if (id === null) setId(result.id);
        setChatMessages(result.chatMessages);
        setIsWinner(result.isWinner);
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
          disabled={isWinner}
        />
        <button className="btn btn-dark" type="submit" disabled={!promptText.trim() || isLoading || isWinner}>
          <i className="bi bi-send"></i>
        </button>
      </div>
    </form>
  );
}
