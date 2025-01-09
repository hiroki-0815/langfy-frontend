import { useEffect, useRef } from "react";

type Props = {
  url: string | MediaStream;
  muted?: boolean;
  playing?: boolean;
};

const Player = ({ url, muted = false, playing = false }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = async () => {
      try {
        await videoElement.play();
      } catch (error) {
        console.error("Error attempting to play the video:", error);
      }
    };

    if (url instanceof MediaStream) {
      if (videoElement.srcObject !== url) {
        videoElement.srcObject = url;
      }
    } else {
      if (videoElement.src !== url) {
        videoElement.src = url;
      }
    }

    if (playing) {
      handlePlay();
    }
  }, [url, playing]);

  return (
    <div>
      <video
        ref={videoRef}
        muted={muted}
        controls
        style={{ width: "700px", height: "auto" }}
      />
    </div>
  );
};

export default Player;
