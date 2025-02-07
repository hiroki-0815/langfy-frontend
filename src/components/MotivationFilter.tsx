import { MOTIVATIONS } from "@/model/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";

type Props = {
  onChange: (motivation: string) => void;
};

const MotivationFilter = ({ onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          {t("motivationLabel")}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <DropdownMenuItem onClick={() => onChange("")}>
            {t("all")}
          </DropdownMenuItem>
          {MOTIVATIONS.map((motivation) => (
            <DropdownMenuItem
              key={motivation}
              onClick={() => onChange(motivation)}
            >
              {t(`motivations.${motivation}`)}{" "}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MotivationFilter;
