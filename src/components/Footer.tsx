const Footer = () => {
  return (
    <footer className="bg-sky-500 text-white py-4 flex justify-between items-center px-6 md:px-20">
      <div className="text-lg font-semibold">langfy.com</div>
      <div className="flex space-x-6 text-sm font-medium">
        <div className="hover:underline">Privacy Policy</div>
        <div className="hover:underline">Terms of Service</div>
      </div>
    </footer>
  );
};

export default Footer;
