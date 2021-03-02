import React, {Component, useState, useEffect} from "react";
import './Chat.css';
import axios from 'axios';
import {actionType, URL} from "../../../redux/config";
import {withRouter} from "react-router-dom";
import store from "../../../redux/store";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import gsap, {Quint} from "gsap";
import noProfile from "../../../image/noProfile.png";
import ChattingLogic from "../../../ChattingLogic";
// import "./SharePlanCss.css";

const ChattingRoom = (props) => {
    // console.log("ChattingRoom props", props);
    const [msg, setMsg] = useState(''); //to send.
    const [msgList, setMsgList]
        = useState(store.getState().selectedChattingRoomMsgList == undefined
        ? []
        : store.getState().selectedChattingRoomMsgList); //loaded msg list.
    const [msgListCount, setMsgListCount] = useState(store.getState().selectedChattingRoomMsgList == undefined
        ? 0
        : store.getState().selectedChattingRoomMsgList.length);
    let loginId = store.getState().loginId;
    let selectedRoomNum = store.getState().selectedRoomNum;
    let intervalContainer = null;
    let preMsgCnt, curMsgCnt = 0;
    const [friendProfileImg, setFriendProfileImg] = useState("no");


    useEffect(() => {
        getProfileImg();
        printCommentEachOther();
        return (() => {
            setScrollBottom();
        })
    }, [selectedRoomNum]);

    useEffect(() => {
        return (() => {
            setScrollBottom();
        })
    }, [msgListCount]);

    const getProfileImg = () => {
        let chat = new ChattingLogic();
        chat.getProfileImage(store.getState().selectedFriend, (res) => {
            setFriendProfileImg(res.data.photo);
        });
    }

    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const printCommentEachOther = () => {
        //통신.
        let chat = new ChattingLogic();
        chat.getMsgList((res) => {
            // console.log(res.data.length, store.getState());

            if (store.getState().selectedChattingRoomMsgList) {
                if (res.data.length != store.getState().selectedChattingRoomMsgList.length) {
                    setMsgListCount(res.data.length);
                }
            } else {
                setMsgListCount(res.data.length);
            }

            store.dispatch({
                type: actionType.selectedChattingRoomMsgList,
                selectedChattingRoomMsgList: res.data,
            });
            setMsgList(res.data);
        });

        if (!store.getState().isChatAutoUpdate) {
            store.dispatch({
                type: actionType.setIsChatAutoUpdate,
                isChatAutoUpdate: true,
            });

            intervalContainer = window.setInterval(() => {
                //해당 스레드는 하나만 돌게 한다.
                // console.log("store.getState().isOpenChatWindow", store.getState().isOpenChatWindow);
                if (!store.getState().isOpenChatWindow) {
                    //창이 닫혀있을떄. -> 백그라운드로.
                    // window.clearTimeout(_setTimeOutObj);
                } else {
                    //창이 떠있을떄. -> 채팅창 업뎃이트.
                    printCommentEachOther();
                }

            }, 5000);
        }

    }

    const sendMessage = () => {
        if (msg.length == 0) {
            return;
        }

        let chat = new ChattingLogic();
        chat.sendMessage(msg, (res) => {
            printCommentEachOther();
        });
        setMsg("");
    }

    const setScrollBottom = () => {
        // console.log("setScrollBottom()");

        window.setTimeout(() => {
            //div.container div#chattingBoard
            let chattingBoard = document.getElementById("chattingBoard");
            // console.log("setScrollBottom()", chattingBoard);

            if (chattingBoard) {
                chattingBoard.scrollTo(0, chattingBoard.scrollHeight);
            }
        }, 500);
    }

    return (
        <div id="container"
             className="container"
             style={{
                 float: "right",
             }}
        >
            <h3>
                <ArrowBackIcon
                    className="backButton"
                    onClick={() => {
                        gsap.to(".containerRoot", {
                            scrollTrigger: ".containerRoot",
                            x: 0,
                            duration: 1,
                            ease: Quint.easeInOut,
                        });

                        store.dispatch({
                            type: actionType.setSelectedRoomNum,
                            selectedRoomNum: "",
                            selectedFriend: "",
                        });

                        window.setTimeout(()=>{
                            store.dispatch({
                                type: actionType.publishFunctionMsg,
                                publishFunctionMsg: "readMsgInChattingRoom",
                            });
                        }, 500);

                        store.dispatch({
                            type: actionType.publishFunctionMsg,
                            publishFunctionMsg: "chattingRoomListInfo",
                        });
                    }}
                />&nbsp;&nbsp;{store.getState().selectedFriend}
            </h3>


            {/*<input type="hidden" id="sessionId" value={sessionId}/>*/}
            <input type="hidden" id="roomNum" value={store.getState().selectedRoomNum}/>

            <div id="chattingBoard" className="chattingBoard">
                {msgList.map((e, i) => {
                    let chat = new ChattingLogic();
                    let _strTime = chat.getLastWriteDay(e.writeday);
                    // let _date = new Date(e.writeday);
                    // let _strTime = _date.getHours() + ":" + _date.getMinutes();
                    if (e.sender == loginId) {
                        //나.
                        return (
                            <div className="myMsg formMsg" key={i}>
                                <table>
                                    <tbody>
                                    <tr style={{width: "100%"}}>
                                        {/*<td valign={"bottom"} align={"right"}>
                                            <b style={{color: "yellow"}}
                                            >1</b>&nbsp;
                                            <br/>
                                            <b>{_strTime}</b>&nbsp;
                                        </td>*/}
                                        {/*<td valign={"baseline"} align={"right"}*/}
                                        <td valign={"baseline"}
                                            className="myMsgBox"
                                        >
                                            <div className="msgText">
                                                <b>{e.msg}</b>
                                            </div>
                                            <div className="msgTime">
                                                <b>{_strTime}</b>&nbsp;
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    } else {
                        //상대방.
                        return (
                            <div className="otherMsg formMsg" key={i}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td rowSpan={2} valign={"top"}>
                                            <img src={friendProfileImg} className="profileImg"
                                                 onError={(e) => {
                                                     console.log("img error");
                                                     e.target.src = noProfile;
                                                 }}
                                            />
                                        </td>
                                        <td>
                                            <b>{e.sender}</b>
                                        </td>
                                        <td rowSpan={2} valign={"bottom"} className="msgTime">
                                            &nbsp;<b>{_strTime}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="msgText">
                                                <b>{e.msg}</b>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                })}
            </div>

            {/* input */}
            <div id="yourMsg">
                <table className="inputTable">
                    <tbody>
                    <tr style={{
                        width: "100%"
                    }}>
                        <th style={{
                            width: "80%"
                        }}>
                            <input id="chatting" name="msg"
                                   value={msg} placeholder="보내실 메시지를 입력하세요."
                                   onChange={handleChange}
                                   onKeyPress={(e) => {
                                       if (e.code == "Enter") {
                                           sendMessage();
                                       }
                                   }}
                                   style={{
                                       width: "100%",
                                       height: "40px",
                                   }}
                            />
                        </th>
                        <th style={{
                            width: "20%"
                        }}>
                            <button onClick={sendMessage}
                                    id="sendBtn"
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                    }}
                            >보내기
                            </button>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChattingRoom;


/*

<div className="otherMsg formMsg">
                    <table>
                        <tr>
                            <td rowSpan={2} valign={"top"}>
                                <img src={noProfile} className="profileImg"/>
                            </td>
                            <td>
                                <b>name</b>
                            </td>
                            <td rowSpan={2} valign={"bottom"}>
                                &nbsp;<b>99:88</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="msgText">
                                    <b>
                                        sdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                    </b>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="myMsg formMsg">
                    <table>
                        <tr style={{width: "100%"}}>
                            <td valign={"bottom"} align={"right"}>
                                <b style={{color: "yellow"}}
                                >1</b>&nbsp;
                                <br/>
                                <b>99:88</b>&nbsp;
                            </td>
                            <td valign={"bottom"} align={"right"} style={{width: "70%"}}>
                                <div className="msgText" align={"left"}>
                                    <b>
                                        sdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                    </b>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

* */
