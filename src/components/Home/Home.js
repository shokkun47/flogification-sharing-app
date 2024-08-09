import React from 'react';
import Sidebar from '../Sidebar/Sidebar'; // パスとファイル名を修正
import Timeline from '../Timeline/Timeline'; // パスとファイル名を修正
import Widgets from '../Widget/Widgets'; // パスとファイル名を確認
import './Home.css'; // 必要に応じてスタイルを追加

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Timeline />
      <Widgets />
    </div>
  );
}

export default Home;
