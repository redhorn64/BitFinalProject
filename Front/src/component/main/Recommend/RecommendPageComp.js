import React, { Component } from 'react';
import store from '../../../redux/store';
import axios from 'axios';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import {URL} from "../../../redux/config";
import Course from './Course';
import './Recommend.css';
import {WOW} from 'wowjs';
import Button from '@material-ui/core/Button';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

class RecommendPageComp extends Component{
    
    constructor(props){
        super(props);

        this.state={
            list: [],
            alertOpen: false,
            groupNum: ''
        }
    }

    
    getList=()=>{
        let url = URL + "/hotspot/group";

        axios.get(url)
            .then(res=>{
                this.setState({
                    list: res.data
                })
                console.log(res.data);
            })
            .catch(err=>{
                console.log("코스추천 list 오류 : " + err);
            })
    }

    componentWillMount(){
        window.scrollTo(0, 0);
        this.getList();
        new WOW().init();
    }

    
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
    
    insertHotspot = () => {
        let memId = store.getState().loginId;        
        let startDay = this.refs.startDay.value;
        let url = URL + "/hotspot/insert?groupNum="+this.state.groupNum+"&startDay="+startDay
        +"&memId="+memId;

        console.log(memId);
        console.log(startDay);
        if(startDay == '')
            alert("날짜를 선택해주세요.");
        else{
            axios.post(url
            ).then(res => {
                console.log(url);
                this.toggle();
                this.setState({
                    alertOpen: true
                })
            }).catch(err=>{
                console.log("예약 내용 저장시 오류:"+err);
            })
        }
    } 

    render(){
        
        return(
            <div id="RecommendPageComp">
                <section class="my-md-5 recommendSection">

                    <div class="rgba-black-strong rounded rentcarIntro">
                        <div class="col-md-12 mb-4 white-text text-center ShipTitle">
                                <h1 class="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInDown"
                                data-wow-delay="0.3s"><strong>COURSE</strong></h1>
                                <hr style={{backgroundColor: '#fff', width: '20vw', height: '1px', margin: '20px auto'}} class="wow fadeInDown" data-wow-delay="0.4s"></hr>
                                {/* <p class="wow fadeInDown" data-wow-delay="0.4s">_________________________</p> */}
                                <h5 class="text-uppercase mb-4 white-text wow fadeInDown" data-wow-delay="0.4s">
                                    <strong>코스 구성이 어려우신 분들을 위해<br/>
                                    저희 일상제주가 인기있는 코스를 추천해드립니다.</strong></h5>
                                
                            </div>
                    </div>

                </section>
                {this.state.list.map((row, idx)=>(
                    <div>
                        <div className="detailTitle">
                            <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38'}}>
                                &nbsp;&nbsp;&nbsp;
                                {row.groupNum==1?"알찬 1박2일 제주도 코스"
                                    :row.groupNum==2?"제주도에서 즐기는 3박4일 예술여행"
                                        :row.groupNum==3?"여유즐기는 2박3일 자유여행"
                                            :row.groupNum==4?"제주 서부지역 3박4일 여행"
                                                :"나혼자 여유로운 1박2일 제주도여행"}
                                &nbsp;&nbsp;&nbsp;
                            </span>
                            {/* <Button color="primary" onClick={this.toggle.bind(this)}>
                            일정 찜하기
                            </Button><br/> */}
                        </div>
                        <div className="detailIntro" style={{color: "#888"}}>
                            {row.groupNum==1?"1박2일 여행을 알차게!"
                                    :row.groupNum==2?"예술인들 모여라! 여유로운 예술인들의 여행"
                                        :row.groupNum==3?"빡빡한 여행 싫은 분들께 추천드립니다. 여행은 여유!"
                                            :row.groupNum==4?"서부지역의 핫한 지역들만 모아보았습니다!"
                                                :"떠나요 혼자서 모든걸 훌훌 버리고~"}
                                                <br/>
                            <MDBBtn color="dark-green" type="button"
                                    className="ShareListBtn"
                                    style={{marginTop: '1.3%', color: 'white'}}
                                    onClick={() => {
                                        // console.log("click" + idx);
                                        if (store.getState().loginId != null && store.getState().loginId != "") {
                                            this.setState({
                                                groupNum: idx+1
                                            })
                                            this.toggle();

                                        } else {
                                            let _result = window.confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?");

                                            if (_result) {
                                                this.props.history.push("/login");
                                            }
                                        }
                                    }}
                            > 일정추가
                            </MDBBtn>
                        </div>
                        <Course groupNum={row.groupNum} history={this.props.history}></Course>

                    </div>
                ))}

                {/* 추천일정 저장 모달 */}
                <MDBModal isOpen={this.state.open} toggle={this.toggle} centered className="RecomAddModal" backdrop={false}>
                    <MDBModalHeader toggle={this.toggle} className="RecomAddModalTitle">일정 추가</MDBModalHeader>
                    <MDBModalBody>
                        <div className="RecomAddModal">
                            📆&nbsp;&nbsp;여행 시작일
                            <input type="date" class="form-control form-control-sm" ref="startDay"></input>
                            <br/>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="dark-green" onClick={this.toggle.bind(this)}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={this.insertHotspot.bind(this)}>추가</MDBBtn>
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

export default RecommendPageComp;