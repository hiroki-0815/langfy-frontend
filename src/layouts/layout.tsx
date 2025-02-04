import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
};

const Layout = ({
  children,
  showHero = false,
  showFooter = true,
  showNavigation = false,
}: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {showHero && <Hero />}
      <div>{children}</div>
      {showNavigation && <Navigation />}
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
