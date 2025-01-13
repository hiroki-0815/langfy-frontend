import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const VideoCallPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const createAndJoin = () => {
    const roomId = uuidv4();
    navigate(`/video-call/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      navigate(`/video-call/${roomId}`);
    } else {
      alert("Please provide a valid room ID");
    }
  };

  return (
    <div className="bg-slate-50 h-screen py-6 flex justify-center items-start">
      <div className="flex flex-col items-center rounded-md bg-white py-10 px-4 shadow md:w-[600px]">
        <h1 className="mb-4">Google Meet Clone</h1>
        <div className="flex gap-3 text-center">
          <Input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e?.target?.value)}
          />
          <Button onClick={joinRoom} className="bg-blue-400 mb-4">
            Join room
          </Button>
        </div>
        <span>-------------- OR --------------</span>
        <Button className="bg-blue-400 mt-4" onClick={createAndJoin}>
          Create a new Room
        </Button>
      </div>
    </div>
  );
};

export default VideoCallPage;
