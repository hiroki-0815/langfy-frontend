import { Checkbox } from "../ui/checkbox";

// type Props = {};

const OnlyWithAudioCheckbox = () => {
  const handleConnectionTypeChange = () => {};
  return (
    <div className="flex items-center gap-3">
      <Checkbox checked onClick={handleConnectionTypeChange} />
      <p>Only audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
