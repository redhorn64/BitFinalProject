import React, {Component, useState} from 'react';
import {actionType, boardActionType, URL} from "../../../redux/config";
import axios from "axios";
import store from "../../../redux/store";
import {MDBBtn} from "mdbreact";
import imgX from "../../../image/imgX.png";
import userimg from '../../../image/user.png';
import FaceIcon from '@material-ui/icons/Face';
import './Share.css';
import { Visibility } from '@material-ui/icons';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import BuildIcon from '@material-ui/icons/Build';
import profile from '../SharePlan/Img_profile.png';

class ReviewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            saveType: "",
            photo:'',
            isphoto:false
        }

        
    }

    onTriggerInput = (type = null) => {

        const {row} = this.props;
        var className = `.input_answer_${row.regroup}_${row.relevel}_${row.restep}`;
        console.log(className);

        let divInput = document.querySelector(className);

        // if (this.state.saveType == type) {
        //통신 끝나고 들어온건지, 댓글쓰기/수정 버튼눌러 들어온건지.
        if (type != null) {
            if (this.state.saveType == type) {
                if (this.state.isOpen) {
                    divInput.style.display = "none";
                    this.setState({
                        isOpen: false,
                    });
                } else {
                    divInput.style.display = "block";
                    this.setState({
                        isOpen: true,
                        saveType: type,
                    });
                }
            } else {
                divInput.style.display = "block";
                this.setState({
                    isOpen: true,
                    saveType: type,
                });
            }
        } else {
            divInput.style.display = "none";
            this.setState({
                isOpen: false,
                saveType: "",
            });
        }
    }

    onSaveButton = () => {
        console.log(this.state.saveType);
        if (this.state.saveType == "insert") {
            this.onInsertSubAnswer();
        } else if (this.state.saveType == "update") {
            this.onUpdateSubAnswer();
        }
    }

    onInsertSubAnswer = () => {
        // 리뷰 대댓글 추가.
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
            console.log("onInsertAnswer res", res);
            
            store.dispatch({
                type: actionType.shareBoardUpdate,
            });

            this.refs.content.value = "";
            var del = document.getElementsByClassName("ShareReviewAll");
                for(var i=0; del.length; i++){
                    del.item(i).style.display = "none";
                }

            this.onTriggerInput();
        }).catch(err => {
            console.log("onInsertAnswer err", err);
        })
    }

    onDeleteSubAnswer = () => {
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let url = URL + "/share/deleteanswer" +
            "?num=" + num;

        console.log("onDeleteData", url);

        if (window.confirm("삭제하시겠습니까?")) {
            axios.get(url
            ).then(res => {

                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });

                var del = document.getElementsByClassName("ShareReviewAll");
                for(var i=0; del.length; i++){
                    del.item(i).style.display = "none";
                }

            }).catch(err => {
                console.log("onDeleteData() err", err);
            });
        }
    }

    onUpdateSubAnswer = () => {
        let num = this.props.row.num;
        let content = this.refs.content.value;
        let url = URL + "/share/updateanswer" +
            "?num=" + num +
            "&content=" + content;
        console.log("onUpdateSubAnswer", url);

        if (window.confirm("수정하시겠습니까?")) {
            axios.post(url
            ).then(res => {
                console.log("onUpdateSubAnswer() res", res);
                
                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });

                var del = document.getElementsByClassName("ShareReviewAll");
                for(var i=0; del.length; i++){
                    del.item(i).style.display = "none";
                }
                // this.props.history.push("/share");
                this.refs.content.value = "";
                this.onTriggerInput();
            }).catch(err => {
                console.log("onUpdateSubAnswer() err", err);
            });
        }
    }

    getIsDisableAnswerButton = (row, actionType = null) => {
        // disabled={row.content.includes("삭제된 글입니다.") ? true : false}
        // console.log(row.id, store.getState().loginId, actionType);
        if (actionType == boardActionType.write) {
            return false;
        } else {
            if (row.content.includes("삭제된 글입니다.")) {
                return true;
            } else if (row.id != store.getState().loginId) {
                return true;
            }
        }

        return false;
    }

    // 프로필 사진
    getPhoto = () => {
        let url = URL + '/member/getdata?id=' + this.props.row.id;
        axios.get(url)
        .then(response=>{
            if(response.data.photo.substring(0,4)=='http'){
                this.setState({
                    isphoto: true
                })
            }
            this.setState({
                photo: response.data.photo       
            })
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }

    componentDidMount(){
        this.getPhoto();
    }
    /*
        addr: null
        content: "댓글 수정 가능한지."
        id: null
        likes: 0
        num: "488"
        photo: "no"
        regroup: 476
        relevel: 1
        restep: 3
        star: "0"
        subject: null
        writeday: "2021-02-04"
    */
    render() {
        const {row} = this.props;
        const photo = this.state.photo=="no"?userimg:this.state.isphoto?this.state.photo: URL + "/" + this.state.photo;
        
        return (
            <div className="ShareModalReviewItem" style={{marginLeft: `calc(15px*${row.relevel})`, borderBottom: '1px dotted #ddd'}}>
                {/*num:{row.num} / {row.photo} / id:{row.id}*/}
                {/*/ {row.regroup} / {row.relevel} / {row.restep} / 내용 :*/}

                {row.relevel==1?<br/>:<SubdirectoryArrowRightIcon style={{color: '#ddd', marginRight: '5px'}}/>}
                  <img
                    src={photo}
                    alt=""
                    className="ShareModalReviewProfile"
                    style={{borderRadius:'100%', border:'0.1px solid #ddd'}} onError={(e) => {
                        console.log("img error");
                        e.target.src = profile;
                    }}
                  />
                &nbsp;&nbsp;<b style={{fontWeight: '500'}}>{row.id}</b>&nbsp;&nbsp;
                
                {/* 수정버튼 */}
                {row.id==store.getState().loginId?
                    <BuildIcon className="ShareModalUpBtn" style={{color: '#aaa', cursor: 'pointer'}}
                        onClick={this.onTriggerInput.bind(this, "update")}
                        disabled={this.getIsDisableAnswerButton(row)}/>:""
                }
                <br/>

                <div className="ShareModalMsg" style={{position: 'relative'}} onMouseOver={()=>{
                    document.getElementsByClassName("ShareModalReviews")[this.props.idx].style.visibility='visible';
                }} onMouseOut={()=>{
                    document.getElementsByClassName("ShareModalReviews")[this.props.idx].style.visibility='collapse';
                }}>
                    {row.content}&nbsp;&nbsp;

                    {/* 추가 버튼 */}
                    <SubdirectoryArrowRightIcon className="ShareModalReviews" style={{visibility: 'collapse', color: '#ddd', cursor: 'pointer'}}
                        onClick={this.onTriggerInput.bind(this, "insert")} disabled={this.getIsDisableAnswerButton(row, boardActionType.write)}/>
                
                    <div style={{position:'absolute', right:'5px', bottom:'5px', color: '#888'}}>{row.writeday}</div>
                </div>

                {/* <MDBBtn size="sm" color="deep-orange"
                        onClick={this.onTriggerInput.bind(this, "insert")}
                        disabled={this.getIsDisableAnswerButton(row, boardActionType.write)}
                ><b style={{fontSize: '12px'}}>댓글 쓰기</b>
                </MDBBtn>
                &nbsp;
                <MDBBtn size="sm" color="deep-orange"
                        onClick={this.onTriggerInput.bind(this, "update")}
                        disabled={this.getIsDisableAnswerButton(row)}
                ><b style={{fontSize: '12px'}}>댓글 수정</b>
                </MDBBtn>
                &nbsp;
                <MDBBtn size="sm" color="deep-orange"
                        onClick={this.onDeleteSubAnswer.bind(this)}
                        disabled={this.getIsDisableAnswerButton(row)}
                ><b style={{fontSize: '12px'}}>댓글 삭제</b>
                </MDBBtn> */}

                {/*댓글 입력창 on/off*/}
                <div className={`input_answer_${row.regroup}_${row.relevel}_${row.restep} ShareReviewAll`}
                     style={{
                         display: "none",
                     }}
                >
                    <textarea
                        placeholder={(this.state.saveType == "insert")
                            ? "댓글 입력"
                            : "수정 댓글 입력"}
                        id="shareInputAnswer"
                        className="form-control"
                        ref="content"
                        style={{resize: 'none'}}
                    />
                    <div style={{textAlign: 'right'}}>
                        {this.state.saveType == "update"? 
                        <MDBBtn color="primary"
                                onClick={this.onDeleteSubAnswer.bind(this)}
                                    >삭제</MDBBtn>:""}
                        <MDBBtn color="dark-green"
                                onClick={this.onSaveButton.bind(this)}
                        >저장</MDBBtn>
                    </div>
                </div>
                {/* <hr/> */}
            </div>
        )
    }
}

export default ReviewItem;
