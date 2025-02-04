import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link to="/user-profile" className="font-bold hover:text-blue-500">
        User Profile
      </Link>
      <Link
        to="/search-language-partners"
        className="font-bold hover:text-blue-500"
      >
        Search Langaage Partner
      </Link>
      <Link to="/chat" className="font-bold hover:text-blue-500">
        Chat People
      </Link>
      <Button
        onClick={() => logout()}
        className="flex-1 font-bold bg-blue-500 w-full "
      >
        Log out
      </Button>
    </>
  );
};

export default MobileNavLinks;
