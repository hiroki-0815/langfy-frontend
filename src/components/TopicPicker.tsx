import { useSocket } from "@/context/SocketContext";
import React, { useState, useEffect } from "react";

const TopicPicker: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [isRouletteRunning, setIsRouletteRunning] = useState<boolean>(false);
  const { socket } = useSocket();

  // Define topics on the client
  const topics = [
    "What is your name?",
    "What are your hobbies?",
    "Tell us about your favorite language learning experience",
    "How do you say 'hello' in your language?",
    "What is a fun fact about you?",
  ];

  useEffect(() => {
    if (!socket) return;

    // Listen for topicPicked events from the server
    socket.on("topicPicked", (topic: string) => {
      setCurrentTopic(topic);
      setIsRouletteRunning(false);
    });

    return () => {
      socket.off("topicPicked");
    };
  }, [socket]);

  const handlePickClick = () => {
    if (!socket) return;

    setIsRouletteRunning(true);
    setCurrentTopic("");

    setTimeout(() => {
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];

      socket.emit("topicPicked", randomTopic);

      setCurrentTopic(randomTopic);
      setIsRouletteRunning(false);
    }, 1000);
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">🎡 Topic Picker</h2>
      <button
        onClick={handlePickClick}
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
      >
        Pick a Topic
      </button>
      <div className="mt-6 text-lg">
        {isRouletteRunning ? (
          <p className="animate-pulse">⏳ The roulette is spinning...</p>
        ) : currentTopic ? (
          <p className="text-xl font-semibold">
            👉 Your topic: <span className="text-sky-600">{currentTopic}</span>
          </p>
        ) : (
          <p className="text-gray-600">Click the button to pick a topic!</p>
        )}
      </div>
    </div>
  );
};

export default TopicPicker;
