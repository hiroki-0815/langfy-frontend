import { setShowOverlay } from "@/store/actions";
import store from "../store/store";

const defaultConstraints: MediaStreamConstraints = {
  audio: true,
  video: true,
};

let localStream: MediaStream;

type Props = {
  isRoomHost: boolean;
  identity: string;
  roomId: string | null;
  createNewRoom: (identity: string) => void;
  joinRoom: (roomId: string, identity: string) => void;
};

export const getLocalPreviewAndInitRoomConnection = async ({
  isRoomHost,
  identity,
  roomId = null,
  createNewRoom,
  joinRoom,
}: Props): Promise<void> => {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia(
      defaultConstraints
    );
    localStream = stream;
    showLocalVideoPreview(localStream);

    store.dispatch(setShowOverlay(false));

    if (isRoomHost) {
      createNewRoom(identity);
    } else if (roomId) {
      joinRoom(roomId, identity);
    } else {
      console.error("Error: roomId is required for joining a room.");
    }
  } catch (err) {
    console.error("Error occurred when trying to access local stream:", err);
  }
};

const showLocalVideoPreview = (stream: MediaStream): void => {};
