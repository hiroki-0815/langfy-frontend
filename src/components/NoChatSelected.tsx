import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoChatSelected = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/search-language-partners");
  };
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-white shadow-md">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2
          onClick={handleNavigation}
          className="text-2xl font-bold hover:text-blue-400 cursor-pointer animate-bounce"
        >
          Find a Language Partner
        </h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
