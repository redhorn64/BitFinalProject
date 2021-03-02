import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {actionType, URL} from "../../../redux/config";
import {withRouter} from "react-router-dom";
import gsap, {Quint, TweenMax} from "gsap";
import profileImg_temp from "../../../image/noProfile.png";
import store from "../../../redux/store";
import ChattingLogic from "../../../ChattingLogic";
import userImg from "../../../image/user.png";

class ChatRoomItem extends Component {

    constructor(props) {
        super(props);
        // console.log("ChatRoomItem props", props);

        this.state = {
            friend: this.props.friend,
            num: this.props.row.num,
            friendProfileImg: "no",
        }

        store.subscribe(() => {
            if (store.getState().publishFunctionMsg == "directOpenChattingRoom") {
                console.log("directOpenChattingRoom subscribe"
                    , store.getState().selectedRoomNum
                    , store.getState().selectedFriend);

                store.dispatch({
                    type: actionType.publishFunctionMsg,
                    publishFunctionMsg: "",
                });

                this.setState({
                    friend: store.getState().selectedFriend,
                });

                this.forceUpdate(() => {
                    window.setTimeout(() => {
                        //div.container div#chattingBoard
                        let chattingBoard = document.getElementById("chattingBoard");
                        // console.log("setScrollBottom()", chattingBoard);

                        if (chattingBoard) {
                            chattingBoard.scrollTo(0, chattingBoard.scrollHeight);
                        }
                    }, 500);

                    store.dispatch({
                        type: actionType.publishFunctionMsg,
                        publishFunctionMsg: "setSelectedRoomNum",
                    });

                    store.dispatch({
                        type: actionType.publishFunctionMsg,
                        publishFunctionMsg: "changeChatAction",
                    });

                    store.dispatch({
                        type: actionType.publishFunctionMsg,
                        publishFunctionMsg: "readMsgInChattingRoom",
                    });

                    gsap.to(".containerRoot", {
                        scrollTrigger: ".containerRoot",
                        x: -500,
                        duration: 1,
                        ease: Quint.easeInOut,
                    });
                });
            }
        })
    }

    componentDidMount() {
        let chat = new ChattingLogic();
        chat.getProfileImage(this.props.friend, (res) => {
            this.setState({
                friendProfileImg: res.data.photo,
            });
        });
    }


    onClickChattingRoom = (row) => {
        console.log(row);
        window.setTimeout(() => {
            //div.container div#chattingBoard
            let chattingBoard = document.getElementById("chattingBoard");
            // console.log("setScrollBottom()", chattingBoard);

            if (chattingBoard) {
                chattingBoard.scrollTo(0, chattingBoard.scrollHeight);
            }
        }, 500);

        store.dispatch({
            type: actionType.setSelectedRoomNum,
            selectedRoomNum: row.num,
            selectedFriend: this.state.friend,
        });

        store.dispatch({
            type: actionType.publishFunctionMsg,
            publishFunctionMsg: "setSelectedRoomNum",
        });

        store.dispatch({
            type: actionType.publishFunctionMsg,
            publishFunctionMsg: "changeChatAction",
        });

        store.dispatch({
            type: actionType.publishFunctionMsg,
            publishFunctionMsg: "readMsgInChattingRoom",
        });

        gsap.to(".containerRoot", {
            scrollTrigger: ".containerRoot",
            x: -500,
            duration: 1,
            ease: Quint.easeInOut,
        });
    }

    /*
    start = new Date(Date.now());
    Wed Feb 10 2021 17:41:01 GMT+0900 (대한민국 표준시)
    start.getDate()
    10
    start.getMonth()+1
    2
    start.getYear()+1900
    2021
    start.getFullYear()
    2021
    * */
    getLastWriteDay(_lastWriteDay, msgCnt) {
        if (msgCnt < 1) {
            return;
        }

        let chat = new ChattingLogic();
        return chat.getLastWriteDay(_lastWriteDay);
    }

    getNewMsgCntNoti(_newMsgCnt) {
        if (_newMsgCnt > 0) {
            let _numLength = _newMsgCnt.toString().length;

            return (
                <div className="newMsgCnt"
                     style={{
                         width: `${(_numLength + 1) * 10}px`,
                     }}
                >
                    {_newMsgCnt}
                </div>
            );
        }
    }

    render() {
        /* row
            1:
                isNew: false
                lastMsg: "notiTest555"
                lastWriteday: "2021-02-09 20:28:25"
                msgCnt: 39
                newMsgCnt: 0
                num: "34"
                user1: "3color"
                user2: "yangyk7364"
        * */
        const {row, idx} = this.props;
        const url = URL + "/";
        let profileImg = (this.state.friendProfileImg == "no") ? profileImg_temp
            : (this.state.friendProfileImg.includes("http")) ? this.state.friendProfileImg
                : (url + this.state.friendProfileImg);

        return (
            <table>
                <tr className="room"
                    onClick={this.onClickChattingRoom.bind(this, row)}
                >
                    <th className='profileImg'>
                        <img src={profileImg} className="profileImg"
                             onError={(e)=>{
                                 console.log("img error");
                                 e.target.src = profileImg_temp;
                             }}
                        />
                    </th>
                    <th className='room'>
                        <div>
                            <b>
                                {this.props.friend}
                            </b>
                            <br/>
                            {row.lastMsg}
                        </div>
                    </th>
                    <th className='go'>
                        {/*<button type='button' onClick={
                            () => {
                                console.log("click button chatting.");
                                // url은 유지한 채로 채팅 창 내 변화만 허용.
                                // tr 전체를 눌렀을때 채팅방 이동.
                                // this.props.history.push('/chattingroom/' + row.num);
                            }
                        }>버튼
                        </button>*/}
                        <div className="etc">
                            <div className="lastWriteDay">
                                {this.getLastWriteDay(row.lastWriteday, row.msgCnt)}
                            </div>
                            {this.getNewMsgCntNoti(row.newMsgCnt)}
                        </div>
                    </th>
                </tr>
            </table>
        )


    }
}

export default withRouter(ChatRoomItem);

