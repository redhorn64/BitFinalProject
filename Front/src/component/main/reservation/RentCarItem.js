import React,{Component} from 'react';
import Fade from '@material-ui/core/Fade';
import store from '../../../redux/store';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {URL} from '../../../redux/config';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

class RentCarItem extends Component
{
    constructor(props) {
        super(props);
        console.log("RentCarItem constructor", props);
        this.state={
            memId:'',  
            name:'',
            address: '',
            wishday:'',
            wishtime:'',
            money:'',
            alertOpen: false,
            alertSetOpen: false
        };
    }

    insertContent = () => {
        let url = URL + "/wish/insertcontent";
        let memId = store.getState().loginId;        
        let content = '렌트카,' + this.props.row.name;
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

    render(){
        const {row, num}=this.props;
        let opentime = row.opentime.split(":")[0] + ":" + row.opentime.split(":")[1];
        let closetime = row.closetime.split(":")[0] + ":" + row.closetime.split(":")[1];


        return(
            <tr>
                    <td style={{textAlign: 'center', cursor: 'pointer'}} onClick={this.toggle.bind(this)}>{num+1}</td>
                    <td onClick={this.toggle.bind(this)} style={{cursor: 'pointer'}}>{row.name}</td>
                    <td onClick={this.toggle.bind(this)} style={{cursor: 'pointer'}}>{row.address}</td>
                    <td onClick={this.toggle.bind(this)} style={{textAlign: 'center', cursor: 'pointer'}}>{row.phonenum}</td>
                    
                    {/* 렌트카 일정 저장 모달 */}
                    <MDBModal isOpen={this.state.open} toggle={this.toggle} centered className="RentAddModal" backdrop={false}>
                        <MDBModalHeader toggle={this.toggle} className="RentAddModal">업체 추가정보</MDBModalHeader>
                        <MDBModalBody>
                            <div className="RentAddModal">
                                🚩&nbsp;&nbsp;&nbsp;{row.name}&nbsp;({row.form})
                                    &nbsp;&nbsp;
                                    {row.homepage!=null?<span className="fa fa-mail-forward" style={{color: '#ddd', cursor: 'pointer'}}
                                        onClick={()=>{
                                            window.open(`${row.homepage}`, '_blank');
                                        }}
                                    ></span>:""}
                                    <br/>
                                🚗&nbsp;&nbsp;&nbsp;{row.totalcar}대의 차량 보유<br/>
                                🕐&nbsp;&nbsp;&nbsp;{opentime} ~ {closetime}<br/>
                                <hr/>
                                <b>일정 추가</b><br/>
                                📆&nbsp;&nbsp;대여일
                                <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                                ⏰&nbsp;&nbsp;대여 예정시간
                                <input type="time" class="form-control form-control-sm" ref="wishtime"></input>
                                💰&nbsp;&nbsp;비용
                                <input type="text" class="form-control form-control-sm" ref="money"/><br/>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="dark-green" onClick={this.toggle.bind(this)}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.insertContent.bind(this)}>추가</MDBBtn>
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
                {/* <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={this.state.open}>
                        <div className="rentcar">
                            <span>렌트카 일정 저장</span><br/>
                            <input type="text" ref="name" value={row.name}/><br/>
                            <input type="text" ref="address" value={row.address}/><br/><br/>
                            🗓&nbsp;&nbsp;대여일
                            <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                            ⏰&nbsp;&nbsp;대여시작 시간
                            <input type="time" class="form-control form-control-sm" ref="wishtime"></input><br/>
                            <div style={{textAlign: 'center'}}>
                                <button type="button" class="btn btn-warning spotmodalBtn" 
                                onClick={this.insertContent.bind(this)}><b>추가</b></button>
                            </div>
                        </div>
                        </Fade>
                </Modal> */}
            </tr>
        )
    }
}

export default RentCarItem;