import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span>
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant="ghost"
          className="font-bold outline outline-2 outline-blue-400 rounded-sm text-blue-400 hover:text-white hover:bg-blue-400 duration-300 ease-in-out"
          onClick={async () => await loginWithRedirect()}
        >
          Let's get Started
        </Button>
      )}
    </span>
  );
};

export default MainNav;
