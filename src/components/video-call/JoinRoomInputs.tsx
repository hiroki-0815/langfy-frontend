import { Input } from "../ui/input";

type Props = {
  roomIdValue: string;
  setRoomIdValue: (value: string) => void;
  nameValue: string;
  setNameValue: (value: string) => void;
  isRoomHost: boolean;
};

const JoinRoomInputs = ({
  roomIdValue,
  setRoomIdValue,
  nameValue,
  setNameValue,
  isRoomHost,
}: Props) => {
  const handleRoomIdValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRoomIdValue(event.target.value);
  };
  const handleNameValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameValue(event.target.value);
  };
  return (
    <div className="">
      {!isRoomHost && (
        <Input
          value={roomIdValue}
          onChange={handleRoomIdValueChange}
          placeholder="Enter meeting ID"
        />
      )}
      <Input
        value={nameValue}
        onChange={handleNameValueChange}
        placeholder="Enter your Name"
      />
    </div>
  );
};

export default JoinRoomInputs;
