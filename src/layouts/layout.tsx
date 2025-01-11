import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
  showFooter?: boolean;
};

const layout = ({ children, showHero = false, showFooter = true }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {showHero && <Hero />}
      <div>{children}</div>
      {showFooter && <Footer />}
    </div>
  );
};

export default layout;
