import { Language, LANGUAGES } from "@/model/constants";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  selectedLanguage: Language | "";
  onLanguageChange: (language: Language) => void;
};

const LanguageFilterSidebar = ({
  selectedLanguage,
  onLanguageChange,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">{t("filterByLanguage")}</h2>
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
              className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 mb-2 font-semibold gap-2 bg-white hover:text-blue-400 hover:shadow-sm ${
                isChecked
                  ? "border border-blue-600 text-blue-600"
                  : "border border-slate-300"
              }`}
            >
              {isChecked && <Check size={20} strokeWidth={3} />}
              {t(`languages.${lang}`)}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageFilterSidebar;
