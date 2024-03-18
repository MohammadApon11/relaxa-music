import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { getAllSongs, validateUser } from "./api";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { Dashboard, Home, Login } from "./pages/inejx";
import { MusicPlayer } from "./components";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth" === "true")
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
          validateUser(token).then((data) => {
            // console.log(data);
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-[680px] bg-primary">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
