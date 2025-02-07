import { LANGUAGES } from "@/model/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next"; // ✅ Import i18n

type Props = {
  onChange: (language: string) => void;
};

const LearningLanguageFilter = ({ onChange }: Props) => {
  const { t } = useTranslation(); // ✅ Use i18n for translations

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          {t("learningLanguageLabel")} {/* ✅ Translated dropdown label */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <DropdownMenuItem onClick={() => onChange("")}>
            {t("all")} {/* ✅ Translated "All" option */}
          </DropdownMenuItem>
          {LANGUAGES.map((language) => (
            <DropdownMenuItem key={language} onClick={() => onChange(language)}>
              {t(`languages.${language}`)}{" "}
              {/* ✅ Translated language options */}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LearningLanguageFilter;
