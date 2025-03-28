import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetChatUser } from "@/api/UseChatApi";
import { useTranslation } from "react-i18next";

type UserCardProps = {
  name: string;
  gender?: string;
  age?: number;
  nativeLanguage: string;
  countryOrigin?: string;
  selfIntroduction?: string;
  imageUrl: string;
  motivation: string;
  country?: string;
  learningLanguage: string;
  userId?: string;
};

const UserCard = ({
  name,
  gender,
  age,
  nativeLanguage,
  countryOrigin,
  selfIntroduction,
  imageUrl,
  motivation,
  country,
  learningLanguage,
  userId,
}: UserCardProps) => {
  const { t } = useTranslation();
  const [showFullIntroduction, setShowFullIntroduction] = useState(false);
  const navigate = useNavigate();

  const { chatUser, isLoading } = useGetChatUser(userId);

  const badgeColor =
    gender === "male" ? "bg-blue-400 text-white" : "bg-pink-400 text-white";

  const shortenedIntroduction =
    selfIntroduction && selfIntroduction.length > 100
      ? `${selfIntroduction.slice(0, 100)}...`
      : selfIntroduction || t("noSelfIntroduction");

  const toggleIntroduction = () => {
    setShowFullIntroduction(!showFullIntroduction);
  };

  const handleChatButtonClick = () => {
    if (userId) {
      console.log("Navigating to chat with userId:", userId);
      navigate(`/chat/${userId}`);
    } else {
      console.error("UserId is undefined");
    }
  };

  useEffect(() => {
    if (!isLoading && chatUser) {
      console.log("Fetched chat users including clicked user:", chatUser);
    }
  }, [chatUser, isLoading]);

  return (
    <div className="py-9 px-3 flex flex-col bg-white shadow rounded-lg border border-gray-200 max-w-[750px] overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={imageUrl}
            alt={`${name}'s pic`}
            className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full object-cover outline outline-1 outline-gray-300"
          />
          <div>
            <h2 className="text-sm md:text-xl font-bold mr-3">{name}</h2>
            {gender && (
              <span
                className={`px-2 py-1 rounded-full text-[12px] ${badgeColor}`}
              >
                {age}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleChatButtonClick}
          className="px-2 py-1 font-bold outline outline-2 outline-blue-400 bg-white rounded-full text-blue-400 hover:text-white hover:bg-blue-400 duration-300 ease-in-out text-[12px]"
        >
          {t("chat")}
        </button>
      </div>
      <div className="flex flex-wrap mt-2 text-sm text-gray-600">
        <div className="grid grid-rows-1 grid-cols-3 gap-4 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] bg-blue-100 text-blue-600 py-[2px] px-[4px] rounded-xl">
              {t("speaks")}:{" "}
              {t(`languages.${nativeLanguage}`, {
                defaultValue: nativeLanguage,
              })}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-600 py-[2px] px-[4px] rounded-xl">
              {t("motivation")}:{" "}
              {t(`motivations.${motivation}`, { defaultValue: motivation })}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] bg-purple-100 text-purple-600 py-[2px] px-[4px] rounded-xl">
              {t("learning")}:{" "}
              {t(`languages.${learningLanguage}`, {
                defaultValue: learningLanguage,
              })}
            </span>
            {countryOrigin && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] bg-red-100 text-red-600 py-[2px] px-[4px] rounded-xl">
                  {t("from")}:{" "}
                  {t(`originCountries.${countryOrigin}`, {
                    defaultValue: countryOrigin,
                  })}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {country && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] bg-orange-100 text-orange-600 py-[2px] px-[4px] rounded-xl">
                  {t("lives")}:{" "}
                  {t(`originCountries.${country}`, { defaultValue: country })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">{t("selfIntroductionLabel")}</h3>
        <p className="text-gray-700 mt-2 break-words">
          {showFullIntroduction ? selfIntroduction : shortenedIntroduction}
        </p>
        {selfIntroduction && selfIntroduction.length > 100 && (
          <button
            onClick={toggleIntroduction}
            className="flex items-center gap-2 text-blue-400 hover:underline mt-2 text-sm"
          >
            {showFullIntroduction ? (
              <>
                <ChevronUp className="w-4 h-4" /> {t("showLess")}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> {t("showMore")}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
