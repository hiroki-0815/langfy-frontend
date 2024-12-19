import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-400" />
      </SheetTrigger>
      <SheetContent className="space-x-3">
        <SheetHeader>
          <SheetTitle>Welcom to Langfy!</SheetTitle>
          <Separator />
          <SheetDescription>
            <Button className="flex-1 font-bold bg-blue-500 w-full ">
              Log in
            </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
