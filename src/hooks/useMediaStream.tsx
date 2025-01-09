import { useEffect, useRef, useState } from "react";

const useMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const isStreamSet = useRef(false);

  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;

    let localStream: MediaStream | null = null;

    const initStream = async () => {
      try {
        const st = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("Setting your stream");
        localStream = st;
        setStream(st);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initStream();

    return () => {
      console.log("useMediaStream cleanup starting...");
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
          console.log("Stopped track:", track);
        });
      }
      console.log("Cleaned up media stream");
    };
  }, []);

  return { stream };
};

export default useMediaStream;
