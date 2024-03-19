// import React, { useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { app } from "../config/firebase.config";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { useStateValue } from "../Context/StateProvider";
// import { actionType } from "../Context/reducer";
// import { validateUser } from "../api";
// import { useForm } from "react-hook-form";
// import { FaGithub } from "react-icons/fa6";

// const Signup = ({ setAuth }) => {
//   const firebaseAuth = getAuth(app);
//   const googleProvider = new GoogleAuthProvider();
//   const [{ user }, dispatch] = useStateValue();
//   const navigate = useNavigate();

//   const signupWithEmailPassword = async (email, password) => {
//     await createUserWithEmailAndPassword(firebaseAuth, email, password)
//       .then((userCred) => {
//         handleAuthResult(userCred);
//       })
//       .catch((error) => {
//         console.error(
//           "Error signing up with email and password:",
//           error.message
//         );
//       });
//   };

//   const loginWithGoogle = async () => {
//     await signInWithPopup(firebaseAuth, googleProvider).then((userCred) => {
//       handleAuthResult(userCred);
//     });
//   };

//   const handleAuthResult = (userCred) => {
//     if (userCred) {
//       setAuth(true);
//       window.localStorage.setItem("auth", "true");
//       firebaseAuth.onAuthStateChanged((userCred) => {
//         if (userCred) {
//           userCred.getIdToken().then((token) => {
//             validateUser(token).then((data) => {
//               dispatch({
//                 type: actionType.SET_USER,
//                 user: data,
//               });
//             });
//           });
//           navigate("/", { replace: true });
//         } else {
//           setAuth(false);
//           dispatch({
//             type: actionType.SET_USER,
//             user: null,
//           });
//           navigate("/login");
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     if (window.localStorage.getItem("auth") === "true")
//       navigate("/", { replace: true });
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = ({ email, password }) => {
//     signupWithEmailPassword(email, password);
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="px-14 py-12 border border-white bg-[#141718]">
//         <h1 className="text-white text-center text-4xl">Sign Up</h1>
//         <div className="flex flex-col items-center gap-5 mt-5">
//           <div
//             className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all w-full"
//             onClick={loginWithGoogle}
//           >
//             <FcGoogle className="text-xl" />
//             <p>Signup with Google</p>
//           </div>
//           <div className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all w-full">
//             <FaGithub className="text-xl" />
//             <p>Signup with Github</p>
//           </div>
//         </div>
//         <form
//           className="flex flex-col gap-3 mt-5"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <div>
//             <p className="text-white text-[14px] mb-3">
//               Full Name<span className="text-red-500">*</span>
//             </p>
//             <input
//               className="w-[360px] p-4 bg-transparent border border-gray-700 text-textColor outline-none"
//               type="text"
//               {...register("text", { required: true })}
//               placeholder="Name"
//             />
//           </div>
//           <div>
//             <p className="text-white text-[14px] mb-3">
//               Email Address<span className="text-red-500">*</span>
//             </p>
//             <input
//               className="w-[360px] p-4 bg-transparent border border-gray-700 text-textColor outline-none"
//               type="text"
//               {...register("email", { required: true })}
//               placeholder="Email"
//             />
//           </div>
//           <div>
//             <p className="text-white text-[14px] mb-3">
//               Password <span className="text-red-500">*</span>
//             </p>
//             <input
//               className="w-[360px] p-4 bg-transparent border border-gray-700 text-textColor outline-none"
//               type="password"
//               {...register("password", { required: true })}
//               placeholder="Type Your Password"
//             />
//           </div>
//           {errors.exampleRequired && <span>This field is required</span>}
//           <input
//             className="bg-white p-4 flex items-center justify-center"
//             type="submit"
//             value="Submit"
//           />
//           <button
//             type="submit"
//             className="overflow-hidden rounded-[37px] bg-[#25a56a] flex items-center justify-center mt-5"
//           >
//             <span className="white-text">Sign up now</span>
//             <b></b>
//           </button>
//           <span className="text-textColor text-center mt-3">
//             Already have an account?{" "}
//             <Link to="/login" className="text-[#25a56a]">
//               Login Now
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { validateUser } from "../api";
import { useForm } from "react-hook-form";
import { IoMdMusicalNotes } from "react-icons/io";

const Signup = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const signupWithEmailPassword = async (name, email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCred) => {
        console.log("userCred", userCred);
        updateProfile(firebaseAuth.currentUser, { displayName: name }) // Update user's display name
          .then(() => {
            handleAuthResult(userCred);
          })
          .catch((error) => {
            console.error("Error updating profile:", error.message);
          });
      })
      .catch((error) => {
        console.error(
          "Error signing up with email and password:",
          error.message
        );
      });
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleProvider).then((userCred) => {
      console.log("userCred", userCred);
      handleAuthResult(userCred);
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
              console.log("data", data);
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

  const onSubmit = ({ name, email, password }) => {
    localStorage.setItem("userName", name);
    signupWithEmailPassword(name, email, password);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-14 py-12 border border-white bg-[#141718]">
        <IoMdMusicalNotes className="mx-auto text-red-500 text-4xl" />
        <h1 className="text-white text-center text-4xl">
          Sign up to relaxa music
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
        <form
          className="flex flex-col gap-3 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <p className="text-white text-[14px] mb-3">
              Full Name<span className="text-red-500">*</span>
            </p>
            <input
              className="w-[360px] p-4 bg-transparent border border-gray-700 text-textColor outline-none"
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
            />
          </div>
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
          <div>
            <p className="text-white text-[14px] mb-3">
              Password <span className="text-red-500">*</span>
            </p>
            <input
              className="w-[360px] p-4 bg-transparent border border-gray-700 text-textColor outline-none"
              type="password"
              {...register("password", { required: true })}
              placeholder="Type Your Password"
            />
          </div>
          {errors.exampleRequired && <span>This field is required</span>}
          <input
            className="p-3 flex items-center justify-center mt-5 bg-[#25a56a] text-white font-semibold cursor-pointer"
            type="submit"
            value="Sign In"
          />
          <span className="text-textColor text-center mt-3">
            have an account?{" "}
            <Link to="/login" className="text-[#25a56a]">
              Sign In Now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
