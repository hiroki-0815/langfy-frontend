import hero from "../assets/online-lesson-image.png";

const Hero = () => {
  return (
    <div className="w-full max--h-[600px] object-cover">
      <img src={hero} />
    </div>
  );
};

export default Hero;
