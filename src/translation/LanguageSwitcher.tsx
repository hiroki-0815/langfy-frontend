import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path based on your project
import { useTranslation } from "react-i18next";

// Define your language options
const languages = [
  { value: "en", label: "EN" },
  { value: "ja", label: "JP" },
  { value: "zh", label: "中文" },
  { value: "es", label: "ES" },
  { value: "fr", label: "FR" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select defaultValue="en" onValueChange={handleChangeLanguage}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
