import { useState } from 'react';
import Chat from './components/Chat';
import PromptInput from './components/PromptInput';
import './App.css';

function App() {
  const demoConvo = [
    {
      role: 'user',
      content: 'Can you help me understand more about black holes?',
    },
    {
      role: 'assistant',
      content:
        "Absolutely! A black hole is a region in space where the gravitational pull is very strong.",
    },
    {
      role: 'user',
      content: "That's fascinating! What happens inside a black hole?",
    },
    {
      role: 'assistant',
      content:
        "The truth is, we don't know for sure what happens inside a black hole due to the limitations of our current understanding and technology.",
    },
  ];

  const [chatMessages, setChatMessages] = useState(demoConvo);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  return (
    <div className='container'>
      <Chat chatMessages={chatMessages} isLoading={isLoading} />
      <PromptInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        id={id}
        setId={setId}
        setIsLoading={setIsLoading}
        setIsWinner={setIsWinner}
      />
    </div>
  );
}

export default App;
