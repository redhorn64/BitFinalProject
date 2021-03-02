import React, {Component, useState} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardUpdateForm from "./ShareBoardUpdateForm";
import Modal from './Modal';
import axios from "axios";
import {actionType, mainViewType, URL} from '../../../redux/config';
import ShareReview from './ShareReview';
import store from "../../../redux/store";
import Box from '@material-ui/core/Box';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SmsIcon from '@material-ui/icons/Sms';
import TextsmsIcon from '@material-ui/icons/Textsms';
import {withStyles} from '@material-ui/core/styles';
import './Share.css';
import {Delete} from "@material-ui/icons";
// import "../tour/TourCss.css"
import imgX from "../../../image/imgX.png";
import { MDBBtn, MDBCardImage, MDBModal, MDBModalBody, MDBModalHeader, MDBMask, MDBView, MDBModalFooter, MDBIcon } from 'mdbreact';
import { MDBPopover, MDBPopoverBody } from "mdbreact";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


/*
row:
    addr: "제주시 제주동 제주읍 제주리 제주제주"
    content: "맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다.↵맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다↵맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다"
    id: "hee0134"
    likes: 0
    num: "422"
    photo: "jeju20210122102347.png"
    regroup: 422
    relevel: 0
    restep: 0
    star: "4"
    subject: "제주도 맛집맛집"
    writeday: "2021-01-22"

    addr: ""
    content: "맛있습니다"
    id: null
    likes: 0
    num: "474"
    photo: "jeju20210129150010.jpg"
    regroup: 473
    relevel: 0
    restep: 0
    star: "0"
    subject: "해녀촌"
    writeday: "2021-01-30"
 */

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);


class ShareBoardRowItem extends Component {

    constructor(props) {
        super(props);
        console.log("constructor", this.props);
        //스크롤
        this.myRef = React.createRef()
        this.state = {
            scrollTop: 0,
            answerCount: 0,
        }
        this.state = {
            modalOpen: false,
            likes: 0,
            open: false,
            alertOpen: false,
            alertSetOpen: false
        }


        store.dispatch({
            type: actionType.setMainView,
            mainView: mainViewType.ShareBoard,
        });

        this.getAnswerCount();
    }

    getAnswerCount = () => {
        let regroup = this.props.row.regroup;
        let url = URL + "/share/answercount" +
            "?num=" + regroup;

        axios.get(url
        ).then(res => {
            // console.log("getAnswerCount() res", res);
            this.setState({
                answerCount: res.data
            });
        }).catch(err => {
            console.log("getAnswerCount() err", err);
        });
    }


    //스크롤
    onScroll = () => {
        const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
        const scrollTop = this.myRef.current.scrollTop
        // console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`);
        this.setState({
            scrollTop: scrollTop
        })
    }

    toggle = () => {
        this.setState({
          open: !this.state.open
        });
      }


    //삭제하는 함수 이벤트
    onDeleteData = (e) => {
        e.preventDefault();
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let url = URL + "/share/delete";
        let data = {
            num: num,
            regroup: regroup,
        }

        // console.log("onDeleteData", url, data);

        if (window.confirm("삭제하시겠습니까?")) {
            axios.post(url, data
            ).then(res => {
                // console.log("onDeleteData() res", res);
                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });

                //메인 페이지 또는 공유 페이지인지에 따라 다르게 적용.
                // if(store.getState().mainView == mainViewType.ShareBoard){
                //     this.props.history.goBack();
                // } else{
                window.location.reload();
                // }

            }).catch(err => {
                console.log("onDeleteData() err", err);
            });
        }
    }

    onInsertAnswer = () => {
        // 원본 리뷰글의 댓글
        // regroup 현재꺼 / relevel 1 / restep 현재꺼 /
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let relevel = this.props.row.relevel;
        let restep = this.props.row.restep;
        let content = this.refs.content.value;
        let id = store.getState().loginId;
        let star = 0;
        let url = URL + "/share/insert" +
            "?" +
            "relevel=" + relevel +
            "&restep=" + restep +
            "&regroup=" + regroup;

        let data = {
            num: num,
            content: content,
            star: star,
            id: id,
        }

        console.log(url, data);

        axios.post(url, data
        ).then(res => {
            // console.log("onInsertAnswer res", res);
            this.refs.content.value='';
            store.dispatch({
                type: actionType.shareBoardUpdate,
            });
            this.getAnswerCount();
        }).catch(err => {
            console.log("onInsertAnswer err", err);
        })

    }

    openModal = () => {
        this.setState({modalOpen: true})
    }

    closeModal = () => {
        this.setState({modalOpen: false})
    }


    getItemBottomLikeBox = (row) => {
        let itemBottomBtnDiv = null;
        let isCondition = (this.props.currentPage != null && this.props.currentPage != undefined);
        // console.log("getItemBottomLikeBox", this.props.currentPage, isCondition);

        if (store.getState().logged && store.getState().loginId == row.id && isCondition) {
            itemBottomBtnDiv = (
                <div
                    id="DivItemLikeBox"
                >
                    {/* 좋아요 버튼 */}
                    <ThumbUpAltIcon
                        className="ShareThumbIcon"
                        onClick={this.addLikes}
                    />&nbsp;{row.likes + this.state.likes}&nbsp;&nbsp;

                    <SmsIcon
                        className="ShareThumbIcon"
                        onClick=""
                    />&nbsp;{this.state.answerCount}&nbsp;

                    {/* 삭제 버튼 */}
                    <DeleteIcon
                        className="ShareListDel"
                        onClick={this.onDeleteData.bind(this)}
                    />

                    {/* modify 버튼 */}
                    <BuildIcon
                        className="ShareListUp"
                        onClick={() => {
                            // this.props.history.push(`/share/update/${this.props.row.num}/${this.props.currentPage}`);
                            if (!this.props.currentPage) {
                                window.location.href = `/share/update/${this.props.row.num}/0`;
                            } else {
                                window.location.href = `/share/update/${this.props.row.num}/${this.props.currentPage}`;
                            }
                        }}
                    />
                </div>
            )
        } else {
            itemBottomBtnDiv = (
                <div
                    id="DivItemLikeBox"
                >
                    {/* 좋아요 버튼 */}
                    <ThumbUpAltIcon
                        className="ShareThumbIcon"
                        onClick={this.addLikes}
                    />&nbsp;{row.likes + this.state.likes}&nbsp;&nbsp;

                    <SmsIcon
                        className="ShareThumbIcon"
                        onClick=""
                    />&nbsp;{this.state.answerCount}&nbsp;
                </div>
            )
        }

        return itemBottomBtnDiv;
    }

    getThumbnailImg = (_strSrc) => {
        let resultImg = null;
        let srcImg = URL + "/" + _strSrc;

        if (_strSrc == "no") {
            resultImg = (
                <MDBCardImage
                        hover
                        overlay='white-slight'
                        className='card-img-top'
                        src={imgX}
                        alt='이미지 없음'
                        onClick={this.toggle.bind(this)} id="ShareImg"
                        />
                // <img
                //     src={imgX}
                //     style={{
                //         width: "100%"
                //     }}
                // />
            )
        } else {
            resultImg = (
                <MDBCardImage
                        hover
                        overlay='white-slight'
                        className='card-img-top'
                        src={srcImg}
                        onError={(e) => {
                            console.log("img error");
                            e.target.src = imgX;
                        }}
                        onClick={this.toggle.bind(this)} id="ShareImg"
                        alt='이미지 없음'
                        />
                // <img
                //     src={srcImg}
                //     onError={(e) => {
                //         console.log("img error");
                //         e.target.src = imgX;
                //     }}
                //     style={{
                //         width: "100%"
                //     }}
                // />
            )
        }

        return resultImg;
    }

    addLikes = () => {
        // /share/updatelikes
        let num = this.props.row.num;
        let url = URL + "/share/updatelikes" +
            "?num=" + num;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("addLikes res", res);
            store.dispatch({
                type: actionType.shareBoardUpdate,
            });
            this.setState({
                likes: this.state.likes + 1,
            })
        }).catch(err => {
            console.log("addLikes err", err);
        })
    }

    insertWish=()=>{
        let url = URL + "/wish/insertshare";
        let memId = store.getState().loginId;
        let shareNum = this.props.row.num;
        let content = this.props.row.addr;
        let wishday = this.refs.wishday.value;
        let wishtime = this.refs.wishtime.value;
        let money = this.refs.money.value==''?null:this.refs.money.value;

        console.log(this.refs.wishday.value);
        if(wishday == '' || wishtime == '')
            alert("날짜와 시간을 모두 선택해주세요.");
        else{
            axios.post(url, {memId, shareNum, content, wishday, wishtime, money})
            .then(res=>{
                this.toggle();
                this.setState({
                    alertOpen: true
                })
            }).catch(err=>{
                console.log("spotwish insert 오류 : " + err);
            })
        }

    }

    /*
    row:
        addr: "제주시 제주동 제주읍 제주리 제주제주"
        content: "맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다.↵맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다↵맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다"
        id: "hee0134"
        likes: 0
        num: "422"
        photo: "jeju20210122102347.png"
        regroup: 422
        relevel: 0
        restep: 0
        star: "4"
        subject: "제주도 맛집맛집"
        writeday: "2021-01-22"

    row:
        addr: ""
        content: "맛있습니다"
        id: "yangyk7364"
        likes: 0
        num: "474"
        photo: "jeju20210129150010.jpg"
        regroup: 473
        relevel: 0
        restep: 0
        star: "0"
        subject: "해녀촌"
        writeday: "2021-01-30"
     */
    render() {
        const {row} = this.props;
        // console.log(store.getState().loginId, row.id);
        let itemBottomBtnDiv = this.getItemBottomLikeBox(row);
        let ThumbnailImg = this.getThumbnailImg(row.photo);

        return (
            <React.Fragment>
                <Box m={1} id="ShareListBox">
                    <div onClick={this.toggle.bind(this)}>
                        {ThumbnailImg}
                        <div id="ShareListTitle">
                            {row.subject.split(",")[0]=="Food"?
                            <h6 className="font-weight-bold green-text">
                                <MDBIcon icon="utensils" className="pr-2" />
                                Food
                            </h6>:""}

                            {row.subject.split(",")[0]=="Cafe"?
                            <h6 className="font-weight-bold pink-text">
                                <MDBIcon icon="mug-hot" className="pr-2" />
                                Cafe
                            </h6>:""}

                            {row.subject.split(",")[0]=="Bar"?
                            <h6 className="font-weight-bold blue-text">
                                <MDBIcon icon="glass-cheers" className="pr-2" />
                                Bar
                            </h6>:""}
                            {row.subject.split(",")[1]}
                        </div>
                        <div id="ShareListContent" style={{overflow: 'hidden'}}>
                            {row.content}
                        </div>
                    </div>
                    {itemBottomBtnDiv}
                </Box>

                {/*/////////////////////////////////////Modal/////////////////////////////////////////////////////*/}
                {/* //header 부분에 텍스트를 입력한다. */}
                <MDBModal isOpen={this.state.open} toggle={this.toggle} size="lg" backdrop={false}>
                    <MDBModalHeader toggle={this.toggle}>

                        {row.subject.split(",")[0]=="Food"?
                            <b className="green-text ShareModalCategory"><MDBIcon icon="utensils" className="pr-2" />Food</b>:""}

                            {row.subject.split(",")[0]=="Cafe"?
                            <b className="pink-text ShareModalCategory"><MDBIcon icon="mug-hot" className="pr-2" />Cafe</b>:""}

                            {row.subject.split(",")[0]=="Bar"?
                            <b className="blue-text ShareModalCategory"><MDBIcon icon="glass-cheers" className="pr-2" />Bar</b>:""}

                        &nbsp;&nbsp;
                        <span id="ShareModalTitle"><b>{row.id}</b>님이 공유하신 맛집입니다.</span></MDBModalHeader>
                    <MDBModalBody>
                        {/* <div id="ShareModalAll" ref={this.myRef} onScroll={this.onScroll}> */}
                        <div className="ShareModalScroll">
                            <div id="ShareModalAll">
                            <Box display="flex"
                            flexWrap="wrap"
                            p={1}
                            m={1}
                            bgcolor="background.paper"
                            justifyContent="center"
                            css={{maxWidth: '100%'}}
                        >
                            <Box m={1} className="ShareModalItemBox">
                                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                    <img
                                        className="img-fluid"
                                        src={row.photo!="no"?URL + "/" + row.photo:imgX}
                                        alt=""
                                        onError={(e) => {
                                            console.log("img error");
                                            e.target.src = imgX;
                                        }}
                                    />
                                    <MDBMask overlay="white-slight" />
                                </MDBView>
                            </Box>
                            <Box m={1} className="ShareModalItemBox" style={{position: 'relative'}}>
                                <br/>
                                <Rating
                                    defaultValue={row.star}
                                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                    readOnly={true}
                                />
                                <div style={{position: 'absolute', right: '5px', top: '5px'}}>
                                    <b style={{color: 'gray'}}>{row.writeday}</b>
                                </div>
                                <h3 className="mb-3 p-0" style={{fontWeight: '500'}}>
                                    {row.subject.split(",")[1]}
                                </h3>
                                <p>
                                    <MDBIcon icon="map-marker-alt" />&nbsp;&nbsp;{row.addr}
                                </p>
                            </Box>
                            <div className="ShareModalItemContent">
                                    {row.content}
                            </div>
                        </Box>
                        <br/>
                        <hr/>

                            <div id="ShareReviewWrite">
                            <MDBIcon icon="comments" className="green-text pr-3" style={{marginLeft: '10px'}}/><b style={{fontWeight: '400'}}>다녀온 후기나 궁금한 질문을 자유롭게 나눠보아요.</b>
                                <br/><br/>
                                <textarea
                                            placeholder="댓글 입력"
                                            className="form-control"
                                            ref="content"
                                            style={{resize: 'none'}}
                                        ></textarea>
                                        <MDBBtn color="dark-green" id="ShareReviewSave"
                                                onClick={()=>{
                                                    if(store.getState().logged==true){
                                                        this.onInsertAnswer();
                                                    }
                                                    else
                                                        alert("로그인이 필요한 서비스입니다.");
                                                }}
                                                style={{float: 'right'}}
                                        >작성
                                        </MDBBtn>
                            </div>
                            </div>
                        
                            <ShareReview regroup={row.regroup}/>
                        </div>

                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="dark-green" onClick={this.toggle}>Close</MDBBtn>
                    {store.getState().logged==true?
                    <MDBPopover
                    placement="top"
                    popover
                    clickable
                    id="popper5"
                    >
                        <MDBBtn color="primary">일정추가</MDBBtn>
                        <div>
                            <MDBPopoverBody>
                                <div className="ShareModalInsertPlan">
                                    <span className="spotmodalTitle">일정 추가</span><br/>
                                    👨‍🍳&nbsp;&nbsp;{row.subject.split(",")[1]}<br/>
                                    &nbsp;<MDBIcon icon="map-marker-alt" />&nbsp;&nbsp;{row.addr}<br/>
                                    🗓&nbsp;&nbsp;여행 날짜
                                    <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                                    ⏰&nbsp;&nbsp;예정 시간
                                    <input type="time" class="form-control form-control-sm" ref="wishtime"></input>
                                    💰&nbsp;&nbsp;비용
                                    <input type="text" class="form-control form-control-sm" ref="money"/><br/>
                                    <div style={{textAlign: 'center'}}>
                                        <MDBBtn color="primary" onClick={this.insertWish.bind(this)}>추가</MDBBtn>
                                    </div>
                                </div>
                            </MDBPopoverBody>
                        </div>
                    </MDBPopover>
                    :""}

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
                {/*//////////////////////////////////////////////////////////////////////////////////////////*/}
            </React.Fragment>
        )
    }
}


export default ShareBoardRowItem

