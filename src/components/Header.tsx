// Header.tsx
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import LanguageSwitcher from "@/translation/LanguageSwitcher";

const Header = () => {
  return (
    <div className="border-b-2 shadow-sm py-6 px-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/search-language-partners"
          className="text-3xl font-bold tracking-tight text-blue-400"
        >
          Langfy.com
        </Link>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
