import { FLUENCY_LEVELS } from "@/model/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";

type Props = {
  onChange: (fluencyLevel: string) => void;
};

const FluencyFilter = ({ onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          {t("fluencyLabel")}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <DropdownMenuItem onClick={() => onChange("")}>
            {t("all")}
          </DropdownMenuItem>
          {FLUENCY_LEVELS.map((level) => (
            <DropdownMenuItem key={level} onClick={() => onChange(level)}>
              {t(`fluencyLevels.${level}`)}{" "}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FluencyFilter;
