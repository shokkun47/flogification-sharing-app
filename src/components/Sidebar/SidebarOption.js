import React from 'react';
import './SidebarOption.css';

function SidebarOption({ Icon, text, active, onClick }) {
  return (
    <div className={`sidebarOption ${active && 'sidebarOption--active'}`} onClick={onClick}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
