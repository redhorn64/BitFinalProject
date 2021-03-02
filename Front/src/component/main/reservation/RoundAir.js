import React, {Component} from "react";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PersonIcon from '@material-ui/icons/Person';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import img from './dd.PNG';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Reservation.css';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import store from '../../../redux/store';
import axios from 'axios';
import {URL} from '../../../redux/config';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class RoundAir extends Component {

    constructor(props) {
        super(props);

        this.state = {
          tabValue:0,
            adult: 0,
            child:0,
            infant:0,
            seat: '',
            person:0,
            open: false,
            departDate: '',
            startdepartDate:'',
            arrivaldepartDate:'',
            seatopen: false,
            anchorEl: null,
            all: 0,
            general: 0,
            business: 0,
            wishtime1: '',
            wishtime2: '',
            money1: ''

          }

    }
   
    // 인원 선택버튼 숫자증가
    state = {
      value: 0
    }
    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    };
  
    decrease = () => {
      this.setState({ value: this.state.value - 1 });
    }
  
    increase = () => {
      this.setState({ value: this.state.value + 1 });
    }


    handleClick = (event) => {
      this.setState({
        anchorEl : event.currentTarget
      })
    }
    
    handleClose = () => {
        this.setState({
          anchorEl : null
        })
      };
    
    handleOpen = () => {
        this.setState({
            open : true
        })
      };
      handleSeatClose = () => {
        this.setState({
            seatopen : false
        })
      };
    
    handleSeatOpen = () => {
        this.setState({
          seatopen : true
        })
      };

    

      insertWish=()=>{
        let url = URL + "/wish/insertcontent";
        let memId = store.getState().loginId;
        let content1 = '항공,김포→제주';
        let content2 = '항공,제주→김포';
        let startdepartDate = this.refs.startdepartDate.value;
        let arriverdepartDate = this.refs.arriverdepartDate.value;
        let wishtime1 = this.state.wishtime1;
        let wishtime2 = this.state.wishtime2;
        let money1 = this.state.money1==''?null:this.state.money1;
        // let money2 = this.state.money2==''?null:this.state.money2;

        if(store.getState().logged==false){
            if(window.confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?"))
                this.props.history.push("/login");
        }
        else{
            if(startdepartDate == '' || arriverdepartDate == '' || wishtime1 == '' || wishtime2 == '')
                alert("날짜와 시간을 모두 선택해주세요.");
            else{
                axios.post(url, {memId, content: content1, wishday: startdepartDate, wishtime:wishtime1, money: money1})
                .then(res=>{
                    
                }).catch(err=>{
                    console.log("air 일정 insert 오류 : " + err);
                })

                axios.post(url, {memId, content: content2, wishday: arriverdepartDate, wishtime:wishtime2})
                .then(res=>{
                    this.setState({
                        alertOpen: true
                    })
                }).catch(err=>{
                    console.log("air 일정 insert 오류 : " + err);
                })
            }
        }
        
    }


    render() {

        const open = Boolean(this.state.anchorEl);
        const id = open ? "simple-popover" : undefined;


        return (
            <div>
                <div style={{textAlign:'center'}} className="AirTabTitle">
                    <b>김포</b>
                        <FlightTakeoffIcon style={{color:'#00bfff'}}  />
                    <b>제주</b>
                </div>
                <br/>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width="100%"
                    className="AirTabContent"
                >
                    <Box m={1} style={{textAlign: 'left'}}>
                        <Tooltip title="가는날" arrow>
                            <div style={{display: 'inline-block'}}>
                            <input type="date" name="startdepartDate" onChange={this.handleChange.bind(this)} ref="startdepartDate" style={{border: '0.1px solid white'}}/>
                            </div>
                        </Tooltip>
                        &nbsp;&nbsp;&nbsp;
                        <Tooltip title="오는날" arrow>
                            <div style={{display: 'inline-block'}}>
                            <input type="date" name="arriverdepartDate" ref="arriverdepartDate" onChange={this.handleChange.bind(this)} style={{border: '0.1px solid white'}}/>
                            </div>
                        </Tooltip>
                        <br/><br/>

                        {/* 인원선택 */}
                        <div className="AirContentDiv" onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}>
                            <PersonIcon onClick={this.handleClick.bind(this)} style={{cursor: 'pointer'}}/>&nbsp;&nbsp;
                            <span style={{color:'white'}}>총 {this.state.person}명</span>
                        </div>&nbsp;&nbsp;&nbsp;

                        <Popover
                            id={id}
                            open={open}
                            onClose={this.handleClose.bind(this)}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                            }}>

                            <div className="AirOneWayPopover">
                                <b style={{fontWeight: '700'}}>성인</b>                                             
                                <div className="def-number-input number-input">
                                    <button onClick={()=>{this.setState({adult: this.state.adult-1, person: this.state.person-1})}} className="minus"></button>
                                    <input className="quantity" name="adult" value={this.state.adult} onChange={this.handleChange.bind(this)}
                                    type="number" />
                                    <button onClick={()=>{this.setState({adult: this.state.adult+1, person: this.state.person+1})}} className="plus"></button>
                                </div>

                                <b style={{fontWeight: '700'}}>유아</b>                                             
                                <div className="def-number-input number-input">
                                    <button onClick={()=>{this.setState({child: this.state.child-1, person: this.state.person-1})}} className="minus"></button>
                                    <input className="quantity" name="child" value={this.state.child} onChange={this.handleChange.bind(this)}
                                    type="number" />
                                    <button onClick={()=>{this.setState({child: this.state.child+1, person: this.state.person+1})}} className="plus"></button>
                                </div>

                                <b style={{fontWeight: '700'}}>소아</b>                                             
                                <div className="def-number-input number-input">
                                    <button onClick={()=>{this.setState({infant: this.state.infant-1, person: this.state.person-1})}} className="minus"></button>
                                    <input className="quantity" name="infant" value={this.state.infant} onChange={this.handleChange.bind(this)}
                                    type="number" />
                                    <button onClick={()=>{this.setState({infant: this.state.infant+1, person: this.state.person+1})}} className="plus"></button>
                                </div>
                            </div>
                        </Popover>

                        <div className="AirContentDiv">
                            {/* 좌석선택 */}
                            <AirlineSeatReclineNormalIcon/>&nbsp;
                            <select class="browser-default custom-select" name="seat" onClick={this.handleChange}>
                                <option selected value="all" style={{color: 'black'}}>전체</option>
                                <option value="Y" style={{color: 'black'}}>일반석</option>
                                <option value="C" style={{color: 'black'}}>비지니스석</option>
                            </select>
                        </div>
                    </Box>
                </Box>
                <br/>
                    <button type="button" className="btn btn-info"
                                        onClick={() => {
                                            window.open('https://flight.naver.com/flights/results/domestic?trip=RT&fareType='+this.state.seat+'&scity1=GMP&ecity1=CJU&scity2=CJU&ecity2=GMP&adult='+this.state.adult+'&child='+this.state.child+'&infant='+this.state.infant+'&sdate1='+this.state.startdepartDate+'&sdate2='+this.state.arriverdepartDate+'', '_blank')
                                        }}>
                                        항공권 검색</button>
            

                            <div style={{borderTop:'0.1px solid white',textAlign:'center'}} className="AirOneWayPlan">
                            
                            <Box
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="center"
                                width="100%"
                                className="AirTabContent"
                            >
                                <Box m={1} style={{textAlign: 'left'}}>
                                    {/* 날짜선택 */}
                                    <Tooltip title="예정 가는 시간" arrow>
                                        <div style={{display: 'inline-block'}}>
                                            <input type="time" class="form-control form-control-sm" value={this.state.wishtime1} onChange={this.handleChange.bind(this)} name="wishtime1"></input>
                                        </div>
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;
                                    <Tooltip title="예정 오는 시간" arrow>
                                        <div style={{display: 'inline-block'}}>
                                            <input type="time" class="form-control form-control-sm" value={this.state.wishtime2} onChange={this.handleChange.bind(this)} name="wishtime2"></input>
                                        </div>
                                    </Tooltip>
                                    
                                </Box>
                            </Box>
                            <br/>
                                    <Tooltip title="비용 추가를 원할 시, 입력해주세요." arrow>
                                        <div style={{display: 'inline-block'}}>
                                            <input type="text" class="form-control form-control-sm" value={this.state.money1} onChange={this.handleChange.bind(this)} name="money1" placeholder="비용"></input>
                                        </div>
                                    </Tooltip>
                            {/* <Tooltip title="예정 시간" arrow>
                                <div>
                                <input type="time" class="form-control form-control-sm" value={this.state.wishtime} onChange={this.handleChange.bind(this)} name="wishtime"></input>
                                <input type="text" class="form-control form-control-sm" value={this.state.money1} onChange={this.handleChange.bind(this)} name="money1"></input>
                                <input type="text" class="form-control form-control-sm" value={this.state.money2} onChange={this.handleChange.bind(this)} name="money2"></input>
                                </div>
                            </Tooltip> */}
                                
                                <br/><br/>
                               
                                <button type="button" ref="wishtime"
                                       onClick={this.insertWish.bind(this)} className="btn btn-info">
                                  일정추가
                                </button>
                            </div>
                
                        {/* alert 창 */}
                        <Dialog
                        open={this.state.alertOpen}
                        onClose={()=>{this.setState({alertOpen:false})}}
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
                        <Button onClick={()=>{this.setState({alertOpen:false})}} color="primary">
                            NO
                        </Button>
                        <Button onClick={
                            ()=>{
                                this.setState({
                                    alertOpen: false
                                })
                                this.props.history.push("/mypage");
                            }
                        } color="primary" autoFocus>
                            YES
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        )
    }

}

export default RoundAir;
