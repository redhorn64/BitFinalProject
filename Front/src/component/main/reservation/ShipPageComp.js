import React, {Component} from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ShipTableA1 from "./ShipTable/ShipTableA1";
import ShipTableA2 from "./ShipTable/ShipTableA2";
import ShipTableA3 from "./ShipTable/ShipTableA3";
import ShipTableA4 from "./ShipTable/ShipTableA4";
import ShipTableB1 from "./ShipTable/ShipTableB1";
import ShipTableB2 from "./ShipTable/ShipTableB2";
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import store from '../../../redux/store';
import {URL} from '../../../redux/config';
import Button from '@material-ui/core/Button';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './ShipPageCss.css';
import {WOW} from 'wowjs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ShipPageComp extends Component {
    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);

        this.state = {
            value: 0,
            month:'',
            memId:'',  
            content:'성산→우도',
            wishday:'',
            wishtime:'',
            money:'',
            open: false,
            alertOpen: false,
            alertSetOpen: false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        new WOW().init();
    }

    insertContent = () => {
        let url = URL + "/wish/insertcontent";
        let memId = store.getState().loginId;        
        let content = '우도배,' + this.state.content;
        let wishday = this.refs.wishday.value;
        let wishtime = this.refs.wishtime.value;
        let money = this.refs.money.value==''?null:this.refs.money.value;

        // console.log(memId);
        // console.log(content);
        // console.log(wishday);
        if(wishday == '' || wishtime == '')
            alert("날짜와 시간을 모두 선택해주세요.");
        else{
            axios.post(url, {memId, content, wishday, wishtime, money
            }).then(res => {
                this.toggle();
                this.setState({
                    alertOpen: true
                })
            }).catch(err=>{
                console.log("예약 내용 저장시 오류:"+err);
            })
        }
    } 

    tabProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleTabChange = (event,newValue) => {
        this.setState({ value: newValue });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    changeMonth = (e) => {
        // console.log("changeMonth 함수");
        this.setState({
            month: e.target.value
        })
    }
    
    changeDestination = (e) => {
        // console.log("Destination 함수");
        this.setState({
            content: e.target.value
        })
    }

    // modal 함수
    handleOpen = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            this.setState({
                open: true
            })
        }
        
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    toggle = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            
            this.setState({
                open: !this.state.open
            })
        }
    }

    render() {
        const tag1 = this.state.month==1?<ShipTableA1 month="1"/>:this.state.month==2?<ShipTableA2 month="2"/>:
                    this.state.month==3?<ShipTableA3 month="3"/>:this.state.month==4?<ShipTableA4 month="4"/>:
                    "";
        const tag2 = this.state.month==11?<ShipTableB1 month="11"/>:this.state.month==12?<ShipTableB2 month="12"/>:
                    "";
                    
        return (
            <div>
                <section class="my-md-5 ShipSection">

                    <div class="rgba-black-strong rounded ShipIntro">
                        <div class="col-md-12 mb-4 white-text text-center ShipTitle">
                                <h1 class="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInDown"
                                data-wow-delay="0.3s"><strong>UDO</strong></h1>
                                <hr style={{backgroundColor: '#fff', width: '20vw', height: '1px', margin: '20px auto'}} class="wow fadeInDown" data-wow-delay="0.4s"></hr>
                                {/* <p class="wow fadeInDown" data-wow-delay="0.4s">______________________</p> */}
                                <h5 class="text-uppercase mb-4 white-text wow fadeInDown" data-wow-delay="0.4s">
                                    <strong>우도를 안가면 제주도 여행이라 할 수 없다!<br/>
                                    우도행 배편 시간과 금액을 미리 확인해보세요.</strong></h5>
                                
                                {/*/!* 공유버튼 *!/*/}
                                <MDBBtn size="sm" color="dark-green" type="button"
                                        className="ShareListBtn wow fadeInDown"
                                        data-wow-delay="0.4s"
                                        style={{marginTop: '1.3%'}}
                                        onClick={() => {
                                            if (store.getState().loginId != null && store.getState().loginId != "") {
                                                this.toggle();
                                            } else {
                                                let _result = window.confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?");

                                                if (_result) {
                                                    this.props.history.push("/login");
                                                }
                                            }
                                        }}
                                >일정추가
                                </MDBBtn>
                                
                            </div>

                        <div style={{textAlign: 'center'}} className="ShipTabs">
                            
                            <div class="white-text wow fadeInDown" style={{border: '1px solid white', margin: '0 auto'}} data-wow-delay="0.7s">

                            {/* <Paper square> */}
                                <Tabs
                                    TabIndicatorProps={{style: {background:'green'}}}
                                    value={this.state.value}
                                    // indicatorColor="secondary"
                                    textColor="white"
                                    variant="fullWidth"
                                    onChange={this.handleTabChange}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab label="성산 ↔ 우도" {...this.tabProps(0)}/>
                                    <Tab label="종달 ↔ 우도" {...this.tabProps(1)}/>
                                </Tabs>
                                <TabPanel value={this.state.value} index={0} style={{padding: '0px'}}>
                                     성산 ↔ 우도행<br/>
                                    <select class="browser-default custom-select" onClick={this.changeMonth}>
                                        <option disabled selected>가는 날짜</option>
                                        <option value="1">1월~2월, 11월~12월</option>
                                        <option value="2">3월, 10월</option>
                                        <option value="3">4월, 9월</option>
                                        <option value="4">5월 ~ 8월</option>
                                    </select>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={1}>
                                    종달 ↔ 우도행<br/>
                                    <select class="browser-default custom-select" onClick={this.changeMonth}>
                                        <option disabled selected>가는 날짜</option>
                                        <option value="11">1~3월, 10~12월</option>
                                        <option value="12">4월 ~ 9월</option>
                                    </select>
                                    {/* <br/>{tag2} */}
                                </TabPanel>
                            {/* </Paper> */}

                            </div>
                        </div>

                    </div>

                </section>
                {tag1}{tag2}


                {/* 일정 추가 모달 */}
                <MDBModal isOpen={this.state.open} toggle={this.toggle} centered backdrop={false}>
                        <MDBModalHeader toggle={this.toggle} className="ShipAddModal">일정 추가</MDBModalHeader>
                        <MDBModalBody>
                            <div className="ShipAddModal">
                                {/* <input type="text" ref="content" className="selectDestination" 
                                value={this.state.content} onChange={this.changeMonth}/> */}
                                🚢&nbsp;&nbsp;<b>출발지 → 도착지</b>
                                <select class="browser-default custom-select" onClick={this.changeDestination}>
                                    <option value="성산→우도">성산 → 우도</option>
                                    <option value="종달→우도">종달 → 우도</option>
                                    <option value="우도→성산">우도 → 성산</option>
                                    <option value="우도→종달">우도 → 종달</option>
                                </select>
                                <br/>
                                🗓&nbsp;&nbsp;<b>승선일</b>
                                <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                                ⏰&nbsp;&nbsp;<b>승선 시간</b>
                                <input type="time" class="form-control form-control-sm" ref="wishtime"></input>
                                💰&nbsp;&nbsp;<b>비용</b>
                                <input type="text" class="form-control form-control-sm" ref="money" onClick={this.handleChange}/>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="dark-green" onClick={this.insertContent.bind(this)}>추가</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

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
class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={2}>{this.props.children}</Box>
        </Typography>
      );
    }
  }
export default ShipPageComp;
