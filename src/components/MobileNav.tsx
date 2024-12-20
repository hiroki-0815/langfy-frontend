import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserIcon, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-400" />
      </SheetTrigger>
      <SheetContent className="space-x-4">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex flex-row items-center gap-2">
              <CircleUserIcon className="text-blue-500" />
              <span>{user?.nickname}</span>
            </span>
          ) : (
            <span className="font-bold"> Welcom to Langfy!</span>
          )}
        </SheetTitle>
        <Separator className="my-4" />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={async () => loginWithRedirect()}
              className="flex-1 font-bold bg-blue-500 w-full "
            >
              Log in
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
