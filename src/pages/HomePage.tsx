import ellipseBullet from "../assets/bulletpoint/Ellipse.png";
import person1 from "../assets/users/person-1.jpeg";
import person2 from "../assets/users/person-2.jpeg";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <main className="flex justify-center flex-col min-h-full px-2 py-3 pt-10 pb-20 md:pt-20 md:px-20">
      <div>
        <h1 className="mb-15 text-2xl text-left py-10 font-extrabold md:text-4xl lg:text-5xl text-sky-400">
          {t("headline_part1")} <span>{t("headline_part2")}</span>
          {t("headline_question1")} <br />
          {t("headline_question2")}
          <span>{t("headline_question3")}</span>
          {t("headline_question4")}
        </h1>

        <div>
          <ul className="mb-5">
            <li className="flex flex-row items-center mb-2">
              <div className="mr-1">
                <img
                  src={ellipseBullet}
                  width={5}
                  height={5}
                  alt="blue bullet point"
                />
              </div>
              <span className="text-base">{t("benefits.find_partner")}</span>
            </li>
            <li className="flex flex-row items-center mb-2">
              <div className="mr-1">
                <img
                  src={ellipseBullet}
                  width={5}
                  height={5}
                  alt="blue bullet point"
                />
              </div>
              <span>{t("benefits.chat_with_them")}</span>
            </li>
            <li className="flex flex-row items-center mb-2">
              <div className="mr-1 w-[4px] h-[4px] md:w-[5px] md:h-[5px]">
                <img
                  src={ellipseBullet}
                  className="w-full h-full"
                  alt="blue bullet point"
                />
              </div>
              <span className="text-base">
                {t("benefits.casual_conversation")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col justify-between my-8">
        <h2 className="font-bold text-2xl md:text-4xl mb-5">
          {t("thoughts_section.title")}
        </h2>
        <div className="bg-gray-50 px-8 py-4 rounded-md mb-3 flex items-center">
          <img
            src={person1}
            width={60}
            height={60}
            alt="A woman complaining"
            className="rounded-full mr-4 order-2 md:order-1"
          />
          <div className="flex-1 order-1 md:order-2 text-left">
            <p>{t("thoughts_section.thought1")}</p>
          </div>
        </div>
        <div className="bg-gray-50 px-8 py-4 rounded-md mb-3 flex items-center">
          <img
            src={person2}
            width={60}
            height={60}
            alt="A woman complaining"
            className="rounded-full mr-4 order-2 md:order-1"
          />
          <div className="flex-1 order-1 md:order-2 text-left">
            <p>{t("thoughts_section.thought2")}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl md:text-4xl font-bold pb-5">
          {t("langfy_benefits.title")}
        </h2>
        <div>
          <p className="font-semibold py-2">
            {t("langfy_benefits.reasoning_title")}
          </p>
          <ul className="list-disc pl-5">
            <li>
              <p>{t("langfy_benefits.no_messaging")}</p>
            </li>
            <li>
              <p>{t("langfy_benefits.free_usage")}</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
