type Props = {
  setConnectOnlyWithAudio: (onlyWithAudio: boolean) => void;
  connectOnlyWithAudio: boolean;
};

const OnlyWithAudioCheckbox = ({
  setConnectOnlyWithAudio,
  connectOnlyWithAudio,
}: Props) => {
  const handleConnectionTypeChange = () => {
    setConnectOnlyWithAudio(!connectOnlyWithAudio);
  };
  return (
    <label>
      <div className="flex flex-row gap-1">
        <input
          type="checkbox"
          checked={connectOnlyWithAudio}
          onChange={handleConnectionTypeChange}
        />
        <span>Audio Only</span>
      </div>
    </label>
  );
};

export default OnlyWithAudioCheckbox;
