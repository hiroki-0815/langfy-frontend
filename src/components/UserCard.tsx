import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type UserCardProps = {
  name: string;
  gender: string; // Include gender
  age: number;
  nativeLanguage: string;
  nationality: string;
  country: string;
  selfIntroduction: string;
  imageUrl: string;
  onStartChat: () => void;
};

const UserCard: React.FC<UserCardProps> = ({
  name,
  gender,
  age,
  nativeLanguage,
  nationality,
  country,
  selfIntroduction,
  imageUrl,
  onStartChat,
}) => {
  const badgeColor =
    gender === "male" ? "bg-blue-400 text-white" : "bg-pink-400 text-white";

  return (
    <div className="flex flex-col max-w-[600px] lg:flex-row lg:items-center bg-white shadow p-4 rounded-lg mb-4 border border-gray-200">
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-[60px] h-[60px] rounded-full object-cover outline outline-1 outline-gray-300"
          style={{ filter: "blur(1px)" }}
        />
      </div>
      <div className="flex-1 lg:ml-6 mt-4 lg:mt-0">
        <div className="flex items-center justify-between">
          <div className="flex">
            <h2 className="text-xl font-bold mr-3">{name}</h2>
            <span
              className={`px-3 py-1 rounded-full text-[12px] ${badgeColor}`}
            >
              {age}
            </span>
          </div>
          <Button className="font-bold outline outline-2 outline-blue-400 bg-white rounded-sm text-blue-400 hover:text-white hover:bg-blue-400 duration-300 ease-in-out text-[12px]">
            Start Chatting
          </Button>
        </div>
        <Separator className="m-2" />
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <p>Native in: {nativeLanguage}</p>
          <p>From: {country}</p>
          <p>Nationality: {nationality}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Self-Introduction</h3>
          <p className="text-gray-700 mt-2">{selfIntroduction}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
