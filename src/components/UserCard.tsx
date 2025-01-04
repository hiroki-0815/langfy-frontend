import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

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
}: UserCardProps) => {
  const [showFullIntroduction, setShowFullIntroduction] = useState(false);

  const badgeColor =
    gender === "male" ? "bg-blue-400 text-white" : "bg-pink-400 text-white";

  const shortenedIntroduction =
    selfIntroduction && selfIntroduction.length > 100
      ? `${selfIntroduction.slice(0, 100)}...`
      : selfIntroduction || "No self-introduction provided.";

  const toggleIntroduction = () => {
    setShowFullIntroduction(!showFullIntroduction);
  };
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
        <button className="px-2 py-1 font-bold outline outline-2 outline-blue-400 bg-white rounded-full text-blue-400 hover:text-white hover:bg-blue-400 duration-300 ease-in-out text-[12px]">
          Chat
        </button>
      </div>
      <div className="flex flex-wrap mt-2 text-sm text-gray-600">
        <div className="grid grid-rows-1 grid-cols-3 gap-4 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] bg-blue-100 text-blue-600 py-[2px] px-[4px] rounded-xl">
              Speaks: {nativeLanguage}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-600 py-[2px] px-[4px] rounded-xl">
              Motivation: {motivation}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] bg-purple-100 text-purple-600 py-[2px] px-[4px] rounded-xl">
              Learning: {learningLanguage}
            </span>
            {countryOrigin && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] bg-red-100 text-red-600 py-[2px] px-[4px] rounded-xl">
                  From: {countryOrigin}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {country && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] bg-orange-100 text-orange-600 py-[2px] px-[4px] rounded-xl">
                  Lives: {country}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Self-Introduction</h3>
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
                <ChevronUp className="w-4 h-4" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> Show More
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
