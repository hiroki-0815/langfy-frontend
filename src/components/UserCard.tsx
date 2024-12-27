type UserCardProps = {
  name: string;
  gender: string;
  age: number;
  nativeLanguage: string;
  countryOrigin: string;
  selfIntroduction?: string;
  imageUrl: string;
  motivation: string;
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
}: UserCardProps) => {
  const badgeColor =
    gender === "male" ? "bg-blue-400 text-white" : "bg-pink-400 text-white";

  const truncatedIntroduction =
    selfIntroduction && selfIntroduction.length > 100
      ? `${selfIntroduction.slice(0, 60)}...`
      : selfIntroduction || "No self-introduction provided.";

  return (
    <div className="py-6 px-3 flex flex-col bg-white shadow rounded-lg border border-gray-200 max-w-[750px]">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={imageUrl}
            alt={`${name}'s pic`}
            className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full object-cover outline outline-1 outline-gray-300"
          />
          <div>
            <h2 className="text-sm md:text-xl font-bold mr-3">{name}</h2>
            <span className={`px-2 rounded-full text-[12px] ${badgeColor}`}>
              {age}
            </span>
          </div>
        </div>
        <button className="px-2 py-1 font-bold outline outline-2 outline-blue-400 bg-white rounded-full text-blue-400 hover:text-white hover:bg-blue-400 duration-300 ease-in-out text-[12px]">
          Chat
        </button>
      </div>
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
        <span className="text-[10px] bg-emerald-100 text-emerald-600 py-[2px] px-[8px] rounded-xl">
          Speaks: {nativeLanguage}
        </span>
        <span className="text-[10px] bg-emerald-100 text-emerald-600 py-[2px] px-[8px] rounded-xl">
          From: {countryOrigin}
        </span>
        <span className="text-[10px] bg-orange-100 text-orange-600 py-[2px] px-[8px] rounded-xl">
          {motivation}
        </span>
      </div>
      <div className="mt-4 hidden md:block">
        <h3 className="font-semibold">Self-Introduction</h3>
        <p className="text-gray-700 mt-2">{truncatedIntroduction}</p>
      </div>
    </div>
  );
};

export default UserCard;
