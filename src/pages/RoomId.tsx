// import { useSocket } from "@/context/SocketContext";
// import usePeer from "@/hooks/usePeer";
// import useMediaStream from "@/hooks/useMediaStream";
// import Player from "@/components/Player";
// import { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";
// import VideoCallBottom from "@/components/VideoCallBottom";
// import usePlayer from "@/hooks/usePlayer";

// const RoomId = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const { socket } = useSocket();
//   const { myId, peer } = usePeer();
//   const { stream } = useMediaStream();
//   const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);

//   const {
//     setPlayers,
//     playerHighlighted,
//     nonHighlightedPlayers,
//     toggleAudio,
//     toggleVideo,
//   } = usePlayer(myId, roomId, stream);

//   useEffect(() => {
//     if (stream && !currentStream) {
//       stream.getTracks().forEach((track) => {
//         console.log(
//           `Local track [${track.kind}] readyState: ${track.readyState}`
//         );
//         track.onended = () => console.log(`Local track [${track.kind}] ended`);
//       });
//       setCurrentStream(stream);
//     }
//   }, [stream, currentStream]);

//   useEffect(() => {
//     if (!socket || !peer || !stream) {
//       console.log("RoomId Component - Socket or Peer not ready");
//       return;
//     }

//     console.log("RoomId Component - Adding user-connected listener");

//     const handleUserConnected = (newUser: string) => {
//       console.log(`User connected with ID: ${newUser}`);
//       const call = peer.call(newUser, stream);

//       call.on("stream", (incomingStream: MediaStream) => {
//         const callerId = call.peer;
//         console.log(`Incoming stream from user ${callerId}`);

//         setPlayers((prev) => ({
//           ...prev,
//           [newUser]: {
//             url: incomingStream,
//             muted: true,
//             playing: true,
//           },
//         }));
//       });

//       call.on("error", (error: any) => {
//         console.error(`Peer call error with user ${newUser}:`, error);
//       });
//     };

//     socket.on("user-connected", handleUserConnected);

//     return () => {
//       console.log("RoomId Component - Removing user-connected listener");
//       socket.off("user-connected", handleUserConnected);
//     };
//   }, [socket, peer, stream, setPlayers]);

//   useEffect(() => {
//     if (!peer || !stream) return;

//     const handleCall = (call: any) => {
//       const { peer: callerId } = call;
//       call.answer(stream);

//       call.on("stream", (incomingStream: MediaStream) => {
//         console.log(`Incoming stream from ${callerId}`);
//         setPlayers((prev) => ({
//           ...prev,
//           [callerId]: {
//             url: incomingStream,
//             muted: true,
//             playing: true,
//           },
//         }));
//       });

//       call.on("error", (error: any) => {
//         console.error(`Error in incoming call from ${callerId}:`, error);
//       });
//     };

//     peer.on("call", handleCall);

//     return () => {
//       peer.off("call", handleCall);
//     };
//   }, [peer, stream, setPlayers]);

//   useEffect(() => {
//     if (!stream || !myId) return;
//     console.log(`Setting local user stream with ID: ${myId}`);
//     setPlayers((prev) => ({
//       ...prev,
//       [myId]: {
//         url: stream,
//         muted: true,
//         playing: true,
//       },
//     }));
//   }, [stream, myId, setPlayers]);

//   const getGridClass = (playerCount: number) => {
//     if (playerCount === 1) return "grid-cols-1";
//     if (playerCount === 2) return "grid-cols-2";
//     if (playerCount >= 3) return "grid-cols-3";
//     return "";
//   };

//   const gridClass = `grid ${getGridClass(
//     Object.keys(nonHighlightedPlayers).length
//   )} gap-4`;

//   return (
//     <div className="h-[800px] md:h-screen bg-gray-900 relative flex justify-center items-center pt-3 px-3">
//       <div className={`${gridClass} max-w-[1000px] w-full`}>
//         {Object.keys(nonHighlightedPlayers).length > 0 ? (
//           Object.keys(nonHighlightedPlayers).map((playerId) => {
//             const { url, muted, playing } = nonHighlightedPlayers[playerId];
//             return (
//               <div>
//                 <Player url={url} muted={muted} playing={playing} />
//               </div>
//             );
//           })
//         ) : (
//           <div className=" h-full">
//             <p className="text-white">No other players connected.</p>
//           </div>
//         )}
//       </div>
//       {playerHighlighted && (
//         <div className="absolute bottom-[5%] right-[5%] z-50 w-20 md:w-[250px] border-2 border-blue-400 rounded-xl overflow-hidden">
//           <Player
//             url={playerHighlighted.url}
//             muted={playerHighlighted.muted}
//             playing={playerHighlighted.playing}
//           />
//         </div>
//       )}
//       <div className="fixed left-10 bottom-10">
//         {playerHighlighted && (
//           <VideoCallBottom
//             muted={playerHighlighted.muted}
//             playing={playerHighlighted.playing}
//             toggleAudio={toggleAudio}
//             toggleVideo={toggleVideo}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomId;

import { useSocket } from "@/context/SocketContext";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCallBottom from "@/components/VideoCallBottom";
import usePlayer from "@/hooks/usePlayer";

const RoomId = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { socket } = useSocket();
  const { myId, peer } = usePeer();
  const { stream } = useMediaStream();
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);

  const {
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
  } = usePlayer(myId, roomId, stream);

  useEffect(() => {
    if (stream && !currentStream) {
      stream.getTracks().forEach((track) => {
        console.log(
          `Local track [${track.kind}] readyState: ${track.readyState}`
        );
        track.onended = () => console.log(`Local track [${track.kind}] ended`);
      });
      setCurrentStream(stream);
    }
  }, [stream, currentStream]);

  useEffect(() => {
    if (!socket || !peer || !stream) {
      console.log("RoomId Component - Socket or Peer not ready");
      return;
    }

    console.log("RoomId Component - Adding user-connected listener");

    const handleUserConnected = (newUser: string) => {
      console.log(`User connected with ID: ${newUser}`);
      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream: MediaStream) => {
        const callerId = call.peer;
        console.log(`Incoming stream from user ${callerId}`);

        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });

      call.on("error", (error: any) => {
        console.error(`Peer call error with user ${newUser}:`, error);
      });
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      console.log("RoomId Component - Removing user-connected listener");
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream) return;

    const handleCall = (call: any) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream: MediaStream) => {
        console.log(`Incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });

      call.on("error", (error: any) => {
        console.error(`Error in incoming call from ${callerId}:`, error);
      });
    };

    peer.on("call", handleCall);

    return () => {
      peer.off("call", handleCall);
    };
  }, [peer, stream, setPlayers]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Setting local user stream with ID: ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [stream, myId, setPlayers]);

  const getGridClass = (playerCount: number) => {
    if (playerCount === 1) return "grid-cols-1";
    if (playerCount === 2) return "grid-cols-2";
    if (playerCount >= 3) return "grid-cols-3";
    return "";
  };

  // Safeguard nonHighlightedPlayers with an empty object if it's falsy.
  const gridClass = `grid ${getGridClass(
    Object.keys(nonHighlightedPlayers || {}).length
  )} gap-4`;

  return (
    <div className="h-[800px] md:h-screen bg-gray-900 relative flex justify-center items-center pt-3 px-3">
      <div className={`${gridClass} max-w-[1000px] w-full`}>
        {Object.keys(nonHighlightedPlayers || {}).length > 0 ? (
          Object.keys(nonHighlightedPlayers).map((playerId) => {
            const { url, muted, playing } = nonHighlightedPlayers[playerId];
            return (
              <div key={playerId}>
                <Player url={url} muted={muted} playing={playing} />
              </div>
            );
          })
        ) : (
          <div className="h-full">
            <p className="text-white">No other players connected.</p>
          </div>
        )}
      </div>
      {playerHighlighted && (
        <div className="absolute bottom-[5%] right-[5%] md:bottom-[15%] z-50 w-20 md:w-[250px] border-2 border-blue-400 rounded-xl overflow-hidden">
          {/* Always mute local playback to avoid echo */}
          <Player
            url={playerHighlighted.url}
            muted={true}
            playing={playerHighlighted.playing}
          />
        </div>
      )}
      <div className="fixed left-10 bottom-10">
        {playerHighlighted && (
          <VideoCallBottom
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
          />
        )}
      </div>
    </div>
  );
};

export default RoomId;
