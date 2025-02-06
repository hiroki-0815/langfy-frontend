import { useSocket } from "@/context/SocketContext";
import { RootState } from "@/redux-elements/reducers/rootReducers";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
  const [caller, setCaller] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<string | null>(null);
  const { socket } = useSocket();

  const callerId = useSelector((state: RootState) => state.callStatus.callerId);
  const receiverId = useSelector(
    (state: RootState) => state.callStatus.receiverId
  );

  useEffect(() => {
    if (callerId) setCaller(callerId);
    if (receiverId) setReceiver(receiverId);
    console.log(caller, receiver);
  }, [callerId, receiverId]);

  // Listen for incoming language update events
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
      } else if (languageType === "second") {
        setSecondLanguage(newLang);
      }
    };

    socket?.on("languageUpdate", languageUpdateHandler);

    // Cleanup the event listener on component unmount.
    return () => {
      socket?.off("languageUpdate", languageUpdateHandler);
    };
  }, [socket]);

  useEffect(() => {
    const durationUpdateHandler = (data: { selectedDuration: number }) => {
      setSelectedDuration(data.selectedDuration);
      // If the timer is not running, update the timeLeft immediately:
      setTimeLeft(data.selectedDuration * 60);
    };

    socket?.on("durationUpdate", durationUpdateHandler);

    return () => {
      socket?.off("durationUpdate", durationUpdateHandler);
    };
  }, [socket, isRunning]);

  // --- Listen for Sets Update ---
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
        // Switch to second language
        setIsFirstLanguageActive(false);
        setTimeLeft(selectedDuration * 60);
      } else {
        // One full set completed, check if more sets remain
        if (currentSet < selectedSets) {
          setIsFirstLanguageActive(true);
          setTimeLeft(selectedDuration * 60);
          setCurrentSet((prev) => prev + 1);
        } else {
          setIsRunning(false); // Stop when all sets are complete
        }
      }
    }

    return () => {
      if (timerId) {
        window.clearInterval(timerId);
      }
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

  const handleStartPause = () => {
    let newIsRunning: boolean;
    let newIsPaused: boolean;

    if (!isRunning) {
      // Starting the timer:
      newIsRunning = true;
      newIsPaused = false;
      setIsRunning(true);
      setIsPaused(false);
      setIsFirstLanguageActive(true);
      setTimeLeft(selectedDuration * 60);
      setCurrentSet(1);
    } else {
      // Toggling pause/resume:
      newIsRunning = isRunning;
      newIsPaused = !isPaused;
      setIsPaused(!isPaused);
    }

    // Emit the new timer control state to the other peer
    socket?.emit("timerControlUpdate", {
      isRunning: newIsRunning,
      isPaused: newIsPaused,
      timeLeft: newIsRunning ? timeLeft : 0, // you might want to send the current timeLeft
      callerId,
      receiverId,
    });
  };

  const handleLanguageChange = (
    newLang: string,
    languageType: "first" | "second"
  ) => {
    if (languageType === "first") {
      setFirstLanguage(newLang);
    } else if (languageType === "second") {
      setSecondLanguage(newLang);
    }

    // Emit the change along with the type so the other peer knows which one to update.
    socket?.emit("languageUpdate", {
      language: newLang,
      languageType,
      callerId,
      receiverId,
    });
  };

  const handleDurationChange = (newDuration: number) => {
    setSelectedDuration(newDuration);

    setTimeLeft(newDuration * 60);

    socket?.emit("durationUpdate", {
      selectedDuration: newDuration,
      callerId,
      receiverId,
    });
  };

  // --- Sets Change ---
  const handleSetsChange = (newSets: number) => {
    setSelectedSets(newSets);
    socket?.emit("setsUpdate", {
      selectedSets: newSets,
      callerId,
      receiverId,
    });
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
      <div className="mb-4 flex flex-col items-center">
        <div className="flex items-center">
          <span className="mr-2">Time to speak:</span>
          <strong className="mr-2">
            {isFirstLanguageActive ? firstLanguage : secondLanguage}
          </strong>
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            set
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-700">
          Set {currentSet} of {selectedSets}
        </div>
      </div>

      <div className="text-3xl font-bold mb-4">{formatTime(timeLeft)}</div>

      <button
        onClick={handleStartPause}
        className={`px-4 py-2 rounded ${
          isRunning
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {isRunning ? (isPaused ? "Resume" : "Pause") : "Start"}
      </button>

      {dialogOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 p-4 border border-gray-300 bg-white rounded shadow-md w-64">
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
