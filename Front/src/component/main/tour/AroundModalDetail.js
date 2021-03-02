import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {URL} from '../../../redux/config';
import './kakaomap.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import UseModal from './UseModal';
import {Route, Link} from "react-router-dom";
import store from '../../../redux/store';

const AroundModalDetail=(props)=> {

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSetOpen, setAlertSetOpen] = useState(false);
  const [aroundwishday, setWishday] = useState('');
  const [aroundwishtime, setWishtime] = useState('');
  const [aroundwishmoney, setWishmoney] = useState('');

    const {isShowing, toggle} = UseModal();

    const insertAround=()=>{
        let url = URL + "/wish/insertaround";
        let memId = store.getState().loginId;
        let category = props.category=='FD6'?'음식점':props.category=='CE7'?'카페':'숙박';
        let aroundId = props.wishTitle;
        let content = category + "," + props.wishContent;
        let wishday = aroundwishday;
        let wishtime = aroundwishtime;
        let money = aroundwishmoney==''?null:aroundwishmoney;

        // console.log(wishday);
        if(wishday == '' || wishtime == '')
            alert("날짜와 시간을 모두 선택해주세요.");
        else{
            axios.post(url, {memId, aroundId, content, wishday, wishtime, money})
            .then(res=>{
              toggle();
              handleAlertOpen();
            }).catch(err=>{
                console.log("aroundwish insert 오류 : " + err);
            })
        }
    }

     // alert 함수
     const handleAlertOpen = () => {
      setAlertOpen(true);
    };

     const handleAlertClose = () => {
      setAlertOpen(false);
    };

    const wishdayChange=(e)=>{
        setWishday(e.target.value);
    }

    const wishtimeChange=(e)=>{
      setWishtime(e.target.value);
  }    
    const wishmoneyChange=(e)=>{
      setWishmoney(e.target.value);
  }

    return (
      <div>
          <div className="aroundpaper">
            <span className="aroundmodalTitle">일정 추가</span><br/>
              🏰&nbsp;&nbsp;{props.wishTitle}<br/>
              🗺&nbsp;&nbsp;{props.wishContent}<br/>
              🗓&nbsp;&nbsp;여행 날짜
              <input type="date" class="form-control form-control-sm" value={aroundwishday} onChange={wishdayChange}></input>
              ⏰&nbsp;&nbsp;예정 시간
              <input type="time" class="form-control form-control-sm" value={aroundwishtime} onChange={wishtimeChange}></input>
              💰&nbsp;&nbsp;<b>비용</b>
              <input type="text" class="form-control form-control-sm" value={aroundwishmoney} onChange={wishmoneyChange}/><br/>
              <div style={{textAlign: 'center'}}>
                <button type="button" class="btn btn-dark-green aroundmodalBtn" onClick={insertAround}>추가</button>
            </div>
          </div>

        
                    <Dialog
                      open={alertOpen}
                      onClose={handleAlertClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                  >
                      <DialogTitle id="alert-dialog-title">{"일정 추가 완료"}</DialogTitle>
                      <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                          Mypage로 이동하여 확인하시겠습니까?
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={handleAlertClose} color="primary">
                          NO
                      </Button>
                      <Link to="/mypage" style={{marginRight: '10px'}} color="primary">
                        YES
                      </Link>
                      </DialogActions>
                  </Dialog>
      
        </div>
      
      );
}

export default AroundModalDetail;