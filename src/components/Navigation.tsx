import { Link, useLocation } from "react-router-dom";
import {
  Search,
  SearchIcon,
  MessageSquare,
  MessageSquareIcon,
  User,
  UserIcon,
  Clock,
  ClockIcon,
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-blue-400 py-3 border-t">
      <ul className="flex flex-row place-content-around items-center">
        <li className="flex flex-col items-center">
          <Link
            to="/search-language-partners"
            className="cursor-pointer transition-colors flex flex-col items-center"
          >
            {location.pathname === "/search-language-partners" ? (
              <SearchIcon className="w-6 h-6 text-black" />
            ) : (
              <Search className="w-6 h-6 text-white hover:text-black transition-colors" />
            )}
            <div
              className={`text-xs ${
                location.pathname === "/search-language-partners"
                  ? "text-black"
                  : "text-white"
              }`}
            >
              Search
            </div>
          </Link>
        </li>

        <li className="flex flex-col items-center">
          <Link
            to="/chat"
            className="cursor-pointer transition-colors flex flex-col items-center"
          >
            {location.pathname.startsWith("/chat") ? (
              <MessageSquareIcon className="w-6 h-6 text-black" />
            ) : (
              <MessageSquare className="w-6 h-6 text-white hover:text-black transition-colors" />
            )}
            <div
              className={`text-xs ${
                location.pathname.startsWith("/chat")
                  ? "text-black"
                  : "text-white"
              }`}
            >
              Chat
            </div>
          </Link>
        </li>

        {/* New Moments Nav Item */}
        <li className="flex flex-col items-center">
          <Link
            to="/moments"
            className="cursor-pointer transition-colors flex flex-col items-center"
          >
            {location.pathname === "/moments" ? (
              <ClockIcon className="w-6 h-6 text-black" />
            ) : (
              <Clock className="w-6 h-6 text-white hover:text-black transition-colors" />
            )}
            <div
              className={`text-xs ${
                location.pathname === "/moments" ? "text-black" : "text-white"
              }`}
            >
              Moments
            </div>
          </Link>
        </li>

        <li className="flex flex-col items-center">
          <Link
            to="/user-page"
            className="cursor-pointer transition-colors flex flex-col items-center"
          >
            {location.pathname === "/user-page" ? (
              <UserIcon className="w-6 h-6 text-black" />
            ) : (
              <User className="w-6 h-6 text-white hover:text-black transition-colors" />
            )}
            <div
              className={`text-xs ${
                location.pathname === "/user-page" ? "text-black" : "text-white"
              }`}
            >
              Profile
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
