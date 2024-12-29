import Navbar from "../../components/shared/Navbar";
import bodyImage from "../../assets/images/body-image.png";
import SignInForm from "../../components/form/SignInForm";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  function handleNavigate() {
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
            SignUp
          </button>
        }
      />
      <div className="absolute top-32 -right-56 w-[30%] h-[30%] rounded-full bg-[#4F59A8] mix-blend-screen filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-16 -left-44 w-[35%] h-[60%] rounded-full bg-[#CCF575] mix-blend-screen filter blur-3xl opacity-25 overflow-hidden"></div>
      <div className="flex justify-center z-20 relative">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-auto md:h-[90vh] p-4">
          <img
            src={bodyImage}
            alt="body image"
            className="h-60 w-full md:h-[83vh] md:w-auto object-cover"
          />
          <div className="w-full">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
