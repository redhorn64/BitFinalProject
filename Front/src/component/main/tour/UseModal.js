import { useState } from 'react';
import './kakaomap.css';
import store from '../../../redux/store';

const UseModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    if(!store.getState().logged){
      alert("로그인이 필요한 서비스입니다.");
    }
    else{

      setIsShowing(!isShowing);
    }
  }

  return {
    isShowing,
    toggle,
  }
};

export default UseModal;