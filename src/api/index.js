import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import {ref} from 'vue'
import { firestore } from "../firebase";
const lineupRef = collection(firestore, "lineups");
const songsRef = collection(firestore, "songs");
/**
 * TODO: GET all lineups
 */
export const getAllLineups = async () => {
  const querySnapshot = await getDocs(lineupRef);
  const lineups = [];
  querySnapshot.forEach((doc) => {
    const lineup_data = { ...doc.data(), id: doc.id}
    lineups.push(lineup_data);
  });
  return lineups;
};

/**
 * TODO: Get song
 */
export const getSong = async ({ song }) => {
  if (song?.id) {
    try {
      const ref = doc(songsRef, song.id);
      const songData = await getDoc(ref);

      if (songData.exists()) {
        return songData.data();
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const getAllSongs = async () => {
  const querySnapshot = await getDocs(songsRef);
  const songs = [];
  querySnapshot.forEach((doc) => {
    songs.push(doc.data());
  });

  return songs;
};

/**
 * TODO: REALTIME lineups
 */
export const realtimeLineups = () => {
  // const [data, setData] = useState([]);
  const data = ref([])

  try {
    onSnapshot(lineupRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (docs.length > 0) {
        data.value = docs
      }
    });
  } catch (error) {
    throw new Error(error);
  }

  return data;
};