import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Ranking.css';

function Ranking() {
  const [placeRanking, setPlaceRanking] = useState([]);
  const [likeRanking, setLikeRanking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const placeCounts = {};
      const likeCounts = [];

      const snapshot = await getDocs(collection(db, 'posts'));
      snapshot.forEach((doc) => {
        const data = doc.data();
        const place = data.place;
        const likes = data.likes || 0;

        // 場所のカウント
        if (place) {
          placeCounts[place] = (placeCounts[place] || 0) + 1;
        }

        // いいね数のカウント
        likeCounts.push({ text: data.text, likes });
      });

      // 場所のランキング
      const sortedPlaceRanking = Object.entries(placeCounts).sort((a, b) => b[1] - a[1]);
      setPlaceRanking(sortedPlaceRanking);

      // いいね数のランキング（上位10件）
      const sortedLikeRanking = likeCounts.sort((a, b) => b.likes - a.likes).slice(0, 10);
      setLikeRanking(sortedLikeRanking);
    };

    fetchData();
  }, []);

  return (
    <div className='ranking'>
      <div className='ranking--section'>
        <h3>場所ランキング</h3>
        <ol>
          {placeRanking.map(([place, count], index) => (
            <li key={index}>{place}: {count}</li>
          ))}
        </ol>
      </div>

      <div className='ranking--section'>
        <h3>いいね数ランキング</h3>
        <ol>
          {likeRanking.map((post, index) => (
            <li key={index}>{post.text}: {post.likes}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Ranking;
