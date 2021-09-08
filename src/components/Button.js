import React from 'react';

const Button = ({ children, handleBtnClick, cmd, btnStyle }) => {
  return (
    <button 
      type="button"
      data-cmd={cmd}
      className={btnStyle}
      onClick={handleBtnClick} 
    >
      {children}
    </button>
  )  
}
export default Button;
