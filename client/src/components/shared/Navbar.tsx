import logo from "../../assets/images/logo.png";


interface props {
  navButton: React.ReactElement
}

const Navbar: React.FC<props>= ({navButton}) => {

  return (
    <div className="bg-[#1F1F1F] py-3 flex justify-center align-middle">
      <div className="container flex justify-between">
        <img src={logo} alt="logo" className="h-12" />
        {navButton}
      </div>
    </div>
  );
};

export default Navbar;
