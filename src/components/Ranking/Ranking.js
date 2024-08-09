// src/components/Ranking/Ranking.js

import React, { useEffect, useState } from 'react';
import { getPlaceRanking } from '../../utils/getRanking';
import './Ranking.css';

function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const placeRanking = await getPlaceRanking();
      setRanking(placeRanking);
    };

    fetchRanking();
  }, []);

  return (
    <div className="ranking">
      <h3>ランキング</h3>
      <ul>
        {ranking.map((place, index) => (
          <li key={index}>
            <span>{index + 1}. {place.place}</span>
            <span>{place.count} 件</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
