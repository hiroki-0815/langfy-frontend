import { Lightbulb } from "lucide-react";

type TopicPickerToggleButtonProps = {
  onToggle: (newVisibility: boolean) => void;
  currentVisibility: boolean;
};

export default function TopicPickerToggleButton({
  onToggle,
  currentVisibility,
}: TopicPickerToggleButtonProps) {
  const handleClick = () => {
    const newVisibility = !currentVisibility;
    onToggle(newVisibility);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${
        currentVisibility ? "bg-green-500" : "bg-gray-700"
      } rounded-full`}
    >
      <Lightbulb
        className={`w-6 h-6 ${currentVisibility ? "text-black" : "text-white"}`}
      />
    </button>
  );
}
