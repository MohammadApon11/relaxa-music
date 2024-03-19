import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Pop", value: "pop" },
  { id: 3, name: "Rock", value: "rock" },
  { id: 4, name: "Hip-hop", value: "hip-hop" },
  { id: 5, name: "Country", value: "country" },
];

export const filterByLanguage = [
  { id: 1, name: "Bangla", value: "tamil" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "Hindi", value: "hindi" },
  { id: 4, name: "Urdu", value: "urdu" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
