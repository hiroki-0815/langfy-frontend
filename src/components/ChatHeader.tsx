type Props = {
  userName: string;
};

const ChatHeader = ({ userName }: Props) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{userName}</h2>
    </div>
  );
};

export default ChatHeader;
