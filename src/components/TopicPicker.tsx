import { useSocket } from "@/context/SocketContext";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const TopicPicker: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [isRouletteRunning, setIsRouletteRunning] = useState<boolean>(false);
  const { socket } = useSocket();

  const { t } = useTranslation();

  const topics = [
    t("topic1"),
    t("topic2"),
    t("topic3"),
    t("topic4"),
    t("topic5"),
  ];

  useEffect(() => {
    if (!socket) return;

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
      <h2 className="text-2xl font-bold mb-4">🎡 {t("title")}</h2>
      <button
        onClick={handlePickClick}
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
      >
        {t("pickTopicButton")}
      </button>
      <div className="mt-6 text-lg">
        {isRouletteRunning ? (
          <p className="animate-pulse">⏳ {t("rouletteSpinning")}</p>
        ) : currentTopic ? (
          <p className="text-xl font-semibold">
            {t("yourTopic")}{" "}
            <span className="text-sky-600">{currentTopic}</span>
          </p>
        ) : (
          <p className="text-gray-600">{t("clickToPick")}</p>
        )}
      </div>
    </div>
  );
};

export default TopicPicker;
