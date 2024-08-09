// src/utils/getRanking.js

import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../firebase';

export const getPlaceRanking = async () => {
  const placeCounts = {};
  const postsCollection = collection(db, "posts");
  const q = query(postsCollection);

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const place = data.place || "その他";
    if (placeCounts[place]) {
      placeCounts[place] += 1;
    } else {
      placeCounts[place] = 1;
    }
  });

  const sortedPlaces = Object.keys(placeCounts).sort((a, b) => placeCounts[b] - placeCounts[a]);

  return sortedPlaces.map(place => ({ place, count: placeCounts[place] }));
};
