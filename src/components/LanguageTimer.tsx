import { useSocket } from "@/context/SocketContext";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function TimerApp() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [firstLanguage, setFirstLanguage] = useState("Japanese");
  const [secondLanguage, setSecondLanguage] = useState("Spanish");
  const durations = [10, 15, 20, 30];
  const setsOptions = [1, 2, 3];
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [selectedSets, setSelectedSets] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [isFirstLanguageActive, setIsFirstLanguageActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(selectedDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { socket } = useSocket();

  const [searchParams] = useSearchParams();

  // Determine which query parameter is present:
  const callerIdFromUrl = searchParams.get("callerId");
  const receiverIdFromUrl = searchParams.get("receiverId");

  // If on the caller side, the URL carries receiverId.
  // If on the callee side, the URL carries callerId.
  const role = receiverIdFromUrl ? "caller" : "callee";
  const targetId = receiverIdFromUrl ? receiverIdFromUrl : callerIdFromUrl;

  console.log("TimerApp role:", role, "targetId:", targetId);

  // --- Listening for incoming events remains unchanged ---
  useEffect(() => {
    const languageUpdateHandler = ({
      language: newLang,
      languageType,
    }: {
      language: string;
      languageType: "first" | "second";
    }) => {
      if (languageType === "first") {
        setFirstLanguage(newLang);
      } else {
        setSecondLanguage(newLang);
      }
    };

    socket?.on("languageUpdate", languageUpdateHandler);
    return () => {
      socket?.off("languageUpdate", languageUpdateHandler);
    };
  }, [socket]);

  useEffect(() => {
    const durationUpdateHandler = (data: { selectedDuration: number }) => {
      setSelectedDuration(data.selectedDuration);
      setTimeLeft(data.selectedDuration * 60);
    };

    socket?.on("durationUpdate", durationUpdateHandler);
    return () => {
      socket?.off("durationUpdate", durationUpdateHandler);
    };
  }, [socket, isRunning]);

  useEffect(() => {
    const setsUpdateHandler = (data: { selectedSets: number }) => {
      setSelectedSets(data.selectedSets);
    };

    socket?.on("setsUpdate", setsUpdateHandler);
    return () => {
      socket?.off("setsUpdate", setsUpdateHandler);
    };
  }, [socket]);

  useEffect(() => {
    let timerId: number | null = null;

    if (isRunning && !isPaused && timeLeft > 0) {
      timerId = window.setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      if (isFirstLanguageActive) {
        setIsFirstLanguageActive(false);
        setTimeLeft(selectedDuration * 60);
      } else {
        if (currentSet < selectedSets) {
          setIsFirstLanguageActive(true);
          setTimeLeft(selectedDuration * 60);
          setCurrentSet((prev) => prev + 1);
        } else {
          setIsRunning(false);
        }
      }
    }

    return () => {
      if (timerId) window.clearInterval(timerId);
    };
  }, [
    isRunning,
    isPaused,
    timeLeft,
    selectedDuration,
    selectedSets,
    currentSet,
    isFirstLanguageActive,
  ]);

  useEffect(() => {
    const timerControlUpdateHandler = (data: {
      isRunning: boolean;
      isPaused: boolean;
      timeLeft: number;
    }) => {
      setIsRunning(data.isRunning);
      setIsPaused(data.isPaused);
      setTimeLeft(data.timeLeft);
      console.log("Received timer control update:", data);
    };

    socket?.on("timerControlUpdate", timerControlUpdateHandler);
    return () => {
      socket?.off("timerControlUpdate", timerControlUpdateHandler);
    };
  }, [socket]);

  // --- Emit events using only the targetId (the remote party) ---
  const handleStartPause = () => {
    let newIsRunning: boolean;
    let newIsPaused: boolean;

    if (!isRunning) {
      newIsRunning = true;
      newIsPaused = false;
      setIsRunning(true);
      setIsPaused(false);
      setIsFirstLanguageActive(true);
      setTimeLeft(selectedDuration * 60);
      setCurrentSet(1);
    } else {
      newIsRunning = isRunning;
      newIsPaused = !isPaused;
      setIsPaused(!isPaused);
    }

    socket?.emit("timerControlUpdate", {
      isRunning: newIsRunning,
      isPaused: newIsPaused,
      timeLeft: newIsRunning ? timeLeft : 0,
      targetId,
      role,
    });
  };

  const handleLanguageChange = (
    newLang: string,
    languageType: "first" | "second"
  ) => {
    if (languageType === "first") {
      setFirstLanguage(newLang);
    } else {
      setSecondLanguage(newLang);
    }
    socket?.emit("languageUpdate", {
      language: newLang,
      languageType,
      targetId,
      role,
    });
  };

  const handleDurationChange = (newDuration: number) => {
    setSelectedDuration(newDuration);
    setTimeLeft(newDuration * 60);
    socket?.emit("durationUpdate", {
      selectedDuration: newDuration,
      targetId,
      role,
    });
  };

  const handleSetsChange = (newSets: number) => {
    setSelectedSets(newSets);
    socket?.emit("setsUpdate", { selectedSets: newSets, targetId, role });
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="p-4 font-sans max-w-sm mx-auto bg-white rounded">
      <div className="mb-4 flex flex-col items-center ">
        <div className="flex items-center mb-4">
          <span className="mr-2">Time to speak:</span>
          <strong className="mr-2 text-lg">
            {isFirstLanguageActive ? firstLanguage : secondLanguage}
          </strong>
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-sky-500 text-white px-3 py-1 rounded"
          >
            set
          </button>
        </div>

        <div className="text-4xl font-bold ">{formatTime(timeLeft)}</div>

        <div className="mt-2 text-sm text-gray-700 mb-4">
          Set {currentSet} of {selectedSets}
        </div>

        <button
          onClick={handleStartPause}
          className={`px-4 py-2 rounded w-full ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-sky-500 hover:bg-sky-600"
          } text-white`}
        >
          {isRunning ? (isPaused ? "Resume" : "Pause") : "Start"}
        </button>
      </div>

      {dialogOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 p-4 border border-gray-300 bg-white rounded shadow-md w-64 text-center">
          <h4 className="text-lg font-semibold mb-2">Pick Languages & Time</h4>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              First language:
            </label>
            <input
              type="text"
              value={firstLanguage}
              onChange={(e) => handleLanguageChange(e.target.value, "first")}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Language to switch:
            </label>
            <input
              type="text"
              value={secondLanguage}
              onChange={(e) => handleLanguageChange(e.target.value, "second")}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Duration (minutes):
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => handleDurationChange(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              {durations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Sets:</label>
            <select
              value={selectedSets}
              onChange={(e) => handleSetsChange(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              {setsOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setDialogOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
