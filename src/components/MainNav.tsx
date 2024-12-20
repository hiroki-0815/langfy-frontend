import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const MainNav = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="ghost"
      className="font-bold text-blue-400 hover:bg-blue-400 hover:text-white duration-300 ease-in-out"
      onClick={async () => await loginWithRedirect()}
    >
      Log in
    </Button>
  );
};

export default MainNav;
