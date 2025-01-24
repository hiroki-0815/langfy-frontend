import ActionButtons from "@/components/video-call/ActionButtons";

const MainVideoPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="">
        <video
          className="bg-black h-[100vh] w-full cale-x-[-1]"
          autoPlay
          controls
          playsInline
        ></video>
        <video
          className="absolute border border-white right-[50px] top-[100px] rounded-[10px] w-[320px]"
          autoPlay
          controls
          playsInline
        ></video>

        <ActionButtons />
      </div>
    </div>
  );
};

export default MainVideoPage;
