import { useEffect, useRef } from "react";

type Props = {
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
};

const Player = ({ url, muted, playing = false }: Props) => {
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
    <div className="w-full aspect-[9/16] md:aspect-video">
      <video
        ref={videoRef}
        muted={muted}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default Player;
