const HomePage = () => {
  return (
    <main className="flex justify-center flex-col min-h-full px-3 py-3 pt-10 pb-20 md:pt-20 md:px-20">
      <div>
        <h1 className="mb-15 text-2xl text-left py-10 font-extrabold md:text-4xl lg:text-5xl">
          Looking for a<span className="text-sky-400"> language partner</span>
          ?? <br />
          Want to improve
          <span className="text-sky-400"> your speaking skills</span>??
        </h1>
        <div>
          <ul className="mb-5">
            <li className="flex flex-row items-center ">
              <div className="mr-1">
                <img
                  src="/src/assets/bulletpoint/Ellipse 2.png"
                  width={7}
                  height={7}
                  alt="blue bullet point"
                />
              </div>
              <span className="text-base">
                You can easily find your language partner
              </span>
            </li>
            <li className="flex flex-row items-center">
              <div className="mr-1">
                <img
                  src="/src/assets/bulletpoint/Ellipse 2.png"
                  width={7}
                  height={7}
                  alt="blue bullet point"
                />
              </div>
              <span>Have a chat with them</span>
            </li>
            <li className="flex flex-row items-center">
              <div className="mr-1">
                <img
                  src="/src/assets/bulletpoint/Ellipse 2.png"
                  width={7}
                  height={7}
                  alt="blue bullet point"
                />
              </div>
              <span className="text-base">
                You can have casual conversation with them because they are not
                tutors
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col justify-between my-8">
        <h2 className="font-bold text-2xl	md:text-4xl mb-5">
          Have you ever thought about these?
        </h2>
        <div className="bg-gray-50 px-8 py-4 rounded-md mb-3 flex items-center">
          <img
            src="/src/assets/users/person-1.jpeg"
            width={60}
            height={60}
            alt="A woman complaining"
            className="rounded-full mr-4 order-2 md:order-1"
          />
          <div className="flex-1 order-1 md:order-2 text-left">
            <p>
              I&#39;m taking Japanese classes from tutors <br />
              but the classes are boring and want to have more casual
              conversation.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-8 py-4 rounded-md mb-3 flex items-center">
          <img
            src="/src/assets/users/person-2.jpeg"
            width={60}
            height={60}
            alt="A woman complaining"
            className="rounded-full mr-4 order-2 md:order-1"
          />
          <div className="flex-1 order-1 md:order-2 text-left">
            <p>
              I&#39;m looking for a language partner on a language exchange app
              but it&#39;s a pain to send messages to random people
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl md:text-4xl font-bold pb-5">
          If you have <br />
          Langfy is for you!
        </h2>
        <div>
          <p className="font-semibold py-2">Because</p>
          <ul className="list-disc pl-5">
            <li>
              <p>
                You don&#39;t have to
                <span className="text-sky-400">
                  {" "}
                  send a message to people
                </span>{" "}
                for a call.
              </p>
            </li>
            <li>
              <p>
                All you can do on this platform is{" "}
                <span className="text-sky-400">for free</span>.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
