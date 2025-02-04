import { Link, useLocation } from "react-router-dom";
import {
  Search,
  SearchIcon,
  MessageSquare,
  MessageSquareIcon,
  User,
  UserIcon,
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

        <li className="flex flex-col items-center">
          <Link
            to="/user-profile"
            className="cursor-pointer transition-colors flex flex-col items-center"
          >
            {location.pathname === "/user-profile" ? (
              <UserIcon className="w-6 h-6 text-black" />
            ) : (
              <User className="w-6 h-6 text-white hover:text-black transition-colors" />
            )}
            <div
              className={`text-xs ${
                location.pathname === "/user-profile"
                  ? "text-black"
                  : "text-white"
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
