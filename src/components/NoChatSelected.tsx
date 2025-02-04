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
        <div className="flex justify-center gap-4 mb-4 animate-[bounce_1s_infinite]">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <h2
          onClick={handleNavigation}
          className="text-2xl font-bold text-white bg-blue-500 px-6 py-3 rounded-lg shadow-md cursor-pointer 
             hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out 
             "
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
