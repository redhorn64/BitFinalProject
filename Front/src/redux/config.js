import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import React, {useEffect} from "react";
import {} from "../component/main/admin/MemberListPageComp";


// export const URL = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot";
export const URL = "http://localhost:9002";

export const boardActionType = {
    write: "write",
    read: "read",
    update: "update",
    delete: "delete",
}

export const arrJejuLoc_en = [
    "jeju",
    "jocheon",
    "gujwa",
    "sungsan",
    "pyoseon",
    "namwon",
    "andeok",
    "daejung",
    "hangyeong",
    "hanrim",
    "aewol",
    "udo",
    "seogwipo",
]

export const arrJejuLoc_ko = [
    "제주",
    "조천",
    "구좌",
    "성산",
    "표선",
    "남원",
    "안덕",
    "대정",
    "한경",
    "한림",
    "애월",
    "우도",
    "서귀포",
]

export const actionType = {
    setMainView: "setMainView",
    SIGN_UP: "SIGN_UP",
    LOG_IN: "LOG_IN",
    LOG_OUT: "LOG_OUT",
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    MEMBER_LIST: "MEMBER_LIST", // 회원 리스트 요청 시작
    MB_LIST_S: "MB_LIST_S", // 회원 리스트 요청 성공
    MB_LIST_F: "MB_LIST_F", // 회원 리스트 요청 실패
    shareBoardUpdate: "shareBoardUpdate",
    setSearchResultDataList: "setSearchResultDataList",
    googleLogin: "googleLogin",
    googleLogout: "googleLogout",
    kakaoLogin: "kakaoLogin",
    kakaoLogout: "kakaoLogout",
    weatherUpdate: "weatherUpdate",
    setChatWindow: "setChatWindow",
    setSelectedRoomNum: "setSelectedRoomNum",
    setIsChatAutoUpdate: "setIsChatAutoUpdate",
    setIsChatAutoBackgroundUpdate: "setIsChatAutoBackgroundUpdate",
    publishFunctionMsg: "publishFunctionMsg",
    chattingRoomListInfo: "chattingRoomListInfo",
    selectedChattingRoomMsgList: "selectedChattingRoomMsgList",
    selectedDirectRoomFriend: "selectedDirectRoomFriend",
}

export const mainViewType = {
    MainPage: "mainPage",
    Home: "home",
    Login: "login",
    Logout: "Logout",
    MyPage: "myPage",
    Notice: "notice",
    Reservation: "reservation",
    ShareBoard: "shareBoard",
    Tour: "tour",
    TourList: "tourList",
    Admin: "admin",
    JoinForm: "joinForm",
    SearchResult: "searchResult",
    Recommend: "recommend",
}
