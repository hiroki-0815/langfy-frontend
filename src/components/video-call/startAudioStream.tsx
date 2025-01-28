import { StreamsType } from "@/redux-elements/type";

function startAudioStream(streams: StreamsType) {
  const localStream = streams.localStream;
  for (const key in streams) {
    if (key !== "localStream") {
      const curStream = streams[key];
      localStream.stream.getAudioTracks().forEach((track) => {
        curStream.peerConnection?.addTrack(track, streams.localStream.stream);
      });
    }
  }
}

export default startAudioStream;
