import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Modified import
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { validateUser } from "../api";
import { useForm } from "react-hook-form";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Signup = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  console.log(error);
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      handleAuthResult(userCred);
    });
  };

  const loginWithEmailPassword = async (email, password) => {
    setError("");
    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCred) => {
        handleAuthResult(userCred);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setError(
            "Email or Password is Incorrect! Please Provide Valid Credential"
          );
        } else {
          setError(error.message);
          console.log(error.message);
        }
      });
  };

  const handleAuthResult = (userCred) => {
    if (userCred) {
      setAuth(true);
      window.localStorage.setItem("auth", "true");
      firebaseAuth.onAuthStateChanged((userCred) => {
        if (userCred) {
          userCred.getIdToken().then((token) => {
            validateUser(token).then((data) => {
              dispatch({
                type: actionType.SET_USER,
                user: data,
              });
            });
          });
          navigate("/", { replace: true });
        } else {
          setAuth(false);
          dispatch({
            type: actionType.SET_USER,
            user: null,
          });
          navigate("/login");
        }
      });
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true")
      navigate("/", { replace: true });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    loginWithEmailPassword(email, password);
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="px-14 py-6 bg-[#141718]">
        <IoMdMusicalNotes className="mx-auto text-red-500 text-4xl" />
        <h1 className="text-white text-center text-4xl mt-3">
          Sign in to relaxa music
        </h1>
        <div className="flex flex-col items-center gap-5 mt-5">
          <div
            className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all w-full"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            <p>Signup with Google</p>
          </div>
        </div>
        <div className=" mt-5 text-textColor flex items-center justify-between border">
          <div className="border p-3">
            <p>Admin credentials:</p>
            <p>email: wegro@admin.com</p>
            <p>email: 12345aA!</p>
          </div>
          <div className="border p-3">
            <p>Member credentials:</p>
            <p>email: wegro@member.com</p>
            <p>email: 12345aA!</p>
          </div>
        </div>
        <form
          className="flex flex-col gap-3 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <p className="text-white text-[14px] mb-3">
              Email Address<span className="text-red-500">*</span>
            </p>
            <input
              className="w-[360px] p-4 bg-transparent border border-gray-700 text-textColor outline-none"
              type="text"
              {...register("email", { required: true })}
              placeholder="Email"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm -mt-2">
              Email is required
            </span>
          )}
          {error && <span className="text-red-500 text-sm -mt-2">{error}</span>}
          <div>
            <p className="text-white text-[14px] mb-3">
              Password <span className="text-red-500">*</span>
            </p>
            <div className="w-[360px] relative">
              <input
                className="w-full p-4 bg-transparent border border-gray-700 text-textColor outline-none"
                type={type}
                {...register("password", { required: true })}
                placeholder="Type Your Password"
              />
              <div className="absolute top-5 text-white text-xl right-8">
                {type === "password" ? (
                  <FaRegEyeSlash
                    className="cursor-pointer"
                    onClick={() => setType("text")}
                  />
                ) : (
                  <FaRegEye
                    className="cursor-pointer"
                    onClick={() => setType("password")}
                  />
                )}
              </div>
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm -mt-2">
              Password is required
            </span>
          )}
          {error && <span className="text-red-500 text-sm -mt-2">{error}</span>}
          <input
            className="p-3 flex items-center justify-center mt-5 bg-[#25a56a] text-white font-semibold cursor-pointer"
            type="submit"
            value="Sign In"
          />
          <span className="text-textColor text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#25a56a]">
              Sign Up Now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
