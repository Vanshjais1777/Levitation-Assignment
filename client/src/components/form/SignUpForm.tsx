import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "../../api/post/signUp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const { register, handleSubmit } = useForm<SignupFormValues>();
  const { setLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      const res = await signUp(data.name, data.email, data.password);
      if (res?.data?.success) {
        setLogin(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        navigate("/home");
      } else {
        alert(res?.data?.error || "Signup failed");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.response?.data?.error || "Error during signup");
    }
  };

  return (
    <div className="text-white w-[90%] md:w-[80%] mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold my-3 text-center md:text-left">
        Sign up to begin journey
      </h1>
      <h4 className="text-[#B8B8B8] mb-6 text-sm md:text-base text-center md:text-left">
        This is basic signup page which is used for levitation{" "}
        <br className="hidden md:block" />
        assignment purpose.
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="text-white">
        {/* Name Field */}
        <div className="my-4">
          <label className="block my-1 text-sm md:text-base">
            Enter your name
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: 3,
            })}
            placeholder="Enter Email ID"
            className="border p-3 md:p-4 w-full rounded bg-[#1F1F1F] border-[#424647] placeholder:font-thin outline-none"
          />
          <span className="text-[#B8B8B8] font-thin text-xs md:text-sm">
            This name will be displayed with your inquiry
          </span>
        </div>

        {/* Email Field */}
        <div className="my-4">
          <label className="block my-1 text-sm md:text-base">
            Email Address
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter Email ID"
            className="border border-[#424647] p-3 md:p-4 w-full rounded bg-[#1F1F1F] placeholder:font-thin outline-none"
          />
          <span className="text-[#B8B8B8] font-thin text-xs md:text-sm">
            This email will be displayed with your inquiry
          </span>
        </div>

        {/* Password Field */}
        <div className="my-4">
          <label className="block my-1 text-sm md:text-base">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            placeholder="Enter the Password"
            className="border border-[#424647] p-3 md:p-4 w-full rounded bg-[#1F1F1F] placeholder:font-thin outline-none"
          />
          <span className="text-[#B8B8B8] font-thin text-xs md:text-sm">
            Any further updates will be forwarded on this Email ID
          </span>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex flex-col md:flex-row items-center md:items-start">
          <button
            type="submit"
            className="bg-[#1F1F1F] py-3 px-4 md:py-4 md:px-6 rounded-lg text-[#CCF575] transition-all ease-in-out duration-500 hover:bg-gradient-to-r hover:from-black hover:to-[#1F1F1F] transform w-full md:w-auto"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
