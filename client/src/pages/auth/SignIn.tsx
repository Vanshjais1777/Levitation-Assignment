import Navbar from "../../components/shared/Navbar";
import bodyImage from "../../assets/images/body-image.png";
import SignInForm from "../../components/form/SignInForm";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  function handleNavigate() {
    // console.log("click from nav");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Blue circle */}
      <Navbar
        navButton={
          <button
            onClick={handleNavigate}
            className="bg-transparent text-[#CCF575] border border-[#CCF575] rounded-lg px-6 relative transform transition-transform duration-300 hover:translate-x-4 hover:bg-[#CCF575] hover:text-black"
          >
            Connect People With Technology
          </button>
        }
      />
      <div className="absolute top-32 -right-56  w-[30%] h-[30%] rounded-full bg-[#4F59A8] mix-blend-screen filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-16 -left-44  w-[35%] h-[60%] rounded-full bg-[#CCF575] mix-blend-screen filter blur-3xl opacity-25 overflow-hidden"></div>
      <div className="flex justify-center z-20 relative">
        <div className="container grid grid-cols-2 gap-10 items-center h-[90vh]">
          <img src={bodyImage} alt="body image" className="h-[83vh]" />
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
