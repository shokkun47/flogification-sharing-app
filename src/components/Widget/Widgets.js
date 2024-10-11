import { Search } from '@mui/icons-material';
import React, { useState } from 'react';
import './Widgets.css';
import Ranking from './Ranking';

function Widgets() {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  const handleToggleWidget = () => {
    setIsWidgetVisible(!isWidgetVisible);
  };

  return (
    <div className='widgets-container'>
      {/* スマホ用トグルボタン */}
      <button className='widgets-toggleButton' onClick={handleToggleWidget}>
        {isWidgetVisible ? 'ホーム' : 'ランキング'}
      </button>

      {/* Widgetsコンポーネント */}
      <div className={`widgets ${isWidgetVisible ? 'show' : 'hide'}`}>
        <div className='widgets--input'>
          <Search className='widgets--searchIcon' />
          <input placeholder='キーワード検索' type='text' />
        </div>

        <div className='widgets--widgetContainer'>
          <Ranking />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
