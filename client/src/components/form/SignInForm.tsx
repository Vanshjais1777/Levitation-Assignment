import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "../../api/post/signIn";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

type SigninFormValues = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const { register, handleSubmit } = useForm<SigninFormValues>();
  const { setLogin } = useContext(UserContext);
  const navigation = useNavigate();

  const onSubmit: SubmitHandler<SigninFormValues> = async (data) => {
    try {
      const res = await signIn(data.email, data.password);
      if (res?.message === "user login successfully.") {
        console.log(res);
        navigation("/home");
        // console.log(data);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(res.data));
        setLogin(true);
      }
    } catch (error) {
      console.log("Signin error: ", error);
    }
  };

  return (
    <div className="text-white w-[80%]">
      <h1 className="text-4xl font-bold my-3">Let the Journey Begin!</h1>
      <h4 className="text-[#B8B8B8] mb-6">
        This is basic signup page which is used for levitation <br /> assignment
        purpose.
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="text-white">
        {/* Email Field */}
        <div className="my-4">
          <label className="block my-1">Email Address</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            className="border border-[#424647] p-4 w-full rounded bg-[#1F1F1F] placeholder:font-thin outline-none"
            placeholder="Enter Email ID"
          />
          {/* {errors.email && <span className="text-red-600">{errors.email.message}</span>} */}
          <span className="text-[#B8B8B8] font-thin">
            This email will be displayed with your inquiry
          </span>
        </div>

        {/* Password Field */}
        <div className="my-4">
          <label className="block my-1">Current Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="border border-[#424647] p-4 w-full rounded bg-[#1F1F1F] placeholder:font-thin outline-none"
            placeholder="Enter the password"
          />
          {/* {errors.password && <span className="text-red-600">{errors.password.message}</span>} */}
          {/* <span className='text-[#B8B8B8] font-thin'>Any further updates will be forwarded on this Email ID</span> */}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-[#1F1F1F] py-4 px-6 rounded-lg text-[#CCF575] transition-all ease-in-out duration-500 hover:bg-gradient-to-r hover:from-black hover:to-[#1F1F1F] transform"
          >
            Login now
          </button>
          <span className="text-[#B8B8B8] px-5">Forget password?</span>
        </div>
      </form>
    </div>
  );
}
