import { Language, LANGUAGES } from "@/model/constants";
import { Label } from "./ui/label";
import { Check } from "lucide-react";

type Props = {
  selectedLanguage: Language | "";
  onLanguageChange: (language: Language) => void;
};

const LanguageFilterSidebar = ({
  selectedLanguage,
  onLanguageChange,
}: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Filter By Your Target Lanuage!</h2>
      {LANGUAGES.map((lang) => {
        const isChecked = selectedLanguage === lang;
        return (
          <div key={lang}>
            <input
              type="checkbox"
              className="hidden"
              id={lang}
              name="nativeLanguage"
              value={lang}
              checked={isChecked}
              onChange={() => onLanguageChange(lang)}
            />
            <Label
              htmlFor={lang}
              className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 mb-2 font-semibold gap-2 hover:font-bold hover:shadow-sm ${
                isChecked ? "bg-blue-400 text-white" : "border border-slate-300"
              }`}
            >
              {isChecked && <Check size={20} strokeWidth={3} />}
              {lang}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageFilterSidebar;
