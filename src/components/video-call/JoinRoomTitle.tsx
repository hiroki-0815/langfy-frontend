type Props = {
  isRoomHost: boolean;
};

const JoinRoomTitle = ({ isRoomHost }: Props) => {
  const titleText = isRoomHost ? "Host meeting" : "Join meeting";
  return <p className="">{titleText}</p>;
};

export default JoinRoomTitle;
