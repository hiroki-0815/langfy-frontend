import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {showHero && <Hero />}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
