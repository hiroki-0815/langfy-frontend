type Props = {
  roomId: string;
};

const RoomLabel = ({ roomId }: Props) => {
  return (
    <div>
      <p>ID: {roomId}</p>
    </div>
  );
};

export default RoomLabel;
