import { getSuggestedQuery } from '@testing-library/react';
import React , { Component, useEffect, useState } from 'react';
import reactDOM from 'react-dom';
import { refreshTokenSetup } from "./refreshToken";
import { URL, actionType } from "../../../redux/config";
import axios from 'axios';
import store from "../../../redux/store";

//window에 있는 naver 비구조화 할당하여 선언한다.
//window객체에서 뽑아야 하는 naver 파라미터는 global로
//선언해주지않으면사용이불가한다.
const { naver } = window;

function NaverLoginBtnComp (props) {
    
    const Login = () => {
        Naver();
        // UserProfile();
    }

    useEffect(Login, []);

    const setLoginId = (loginId) => {
        store.dispatch({
            type: actionType.LOG_IN,
            loginId: loginId,
            logged: true
        }); 
        
        // 처리후 되돌아갈 곳
        window.location.replace("/");
        
    }

    //client_id 와 redirect_uri 등록
    //JavaScript용 라이브러리 동작에 필요한 기본정보를 설정하는 코드

    //사용 가능한 Option
    //color: 버튼 색상. white, green
    //type: 버튼 타입. 1(버튼형), 2(작은 배너), 3(큰 배너)
    //height: 배너 및 버튼 높이 (사용자 지정값 px)
    const Naver = () => {
        
        let naverLogin = new naver.LoginWithNaverId({
            clientId: 'dPXRHN5aH3Xl6lXxm7bn',
            callbackUrl: "http://localhost:3000/",
            isPopup: false, // 팝업을 통한 연동처리 여부
            loginButton: {color: "green", type: 3},
            callbackHandle: true
            // callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다
        });
        
        // 설정정보를 초기화하고 연동을 준비
        naverLogin.init();
    
        console.log(naverLogin.getLoginStatus());

        // naverLogin.getLoginStatus((status) => {
        //     if (status) {
        //         console.log(status);
        //         const email = naverLogin.user.getEmail();
        //         const name = naverLogin.user.getNickName();
        //         const profileImage = naverLogin.user.getProfileImage();
        //         const id = naverLogin.user.getId();
        //         const hp = naverLogin.user.getMobile();
        //         console.log("네이버로그인상태 : " + name);
                
        //     } else {
        //         console.log('AccessToken이 올바르지 않습니다.');
        //     }
        // });
        
        var el = document.getElementById("naverIdLogin");

        el.addEventListener('click', function() {
            naverLogin.getLoginStatus(function (status) {
                if (status && naver) {
                    // 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크
                    var email = naverLogin.user.getEmail();
                    var name = naverLogin.user.getNickName();
                    var profileImage = naverLogin.user.getProfileImage();
                    var id = naverLogin.user.getId();
                    var hp = naverLogin.user.getMobile();
                    
                    if( email == undefined || email == null ) {
                        alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                        // 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함
                        naverLogin.reprompt();
                        return;
                    }
    
                    let url = URL + "/member/insertsocial";
    
                    axios.post(url, {id:email.split("@")[0], name:name, provider:id, 
                        photo:profileImage, email:email.split("@")[0], email2:'naver.com'})
                            .then(result=>{
                                
                                setLoginId(email.split("@")[0]);
                            }).catch(err=>{
                                console.log("naver db 저장 실패 : " + err);
                            })
                    
                } else {
                    console.log("callback 처리에 실패하였습니다.");
                    console.log(status);
                }
            });
        });
    }


    // const UserProfile = () => {
    //     window.location.href.includes('access_token') && GetUser();
    //     function GetUser() {
    //         console.log("window.location.href : " + window.location.href);
    //         const location = window.location.href.split('=')[1];
    //         console.log("로케이션 : " + location);
    //         console.log("로케이션 0번째 : " + window.location.href.split("=")[0]);
    //         console.log("로케이션 길이 : " + window.location.href.split("=").length);
    //         for (var i=0; i < window.location.href.split("=").length; i = i + 1)
    //         {
    //             console.log(window.location.href.split("=")[i]);
    //         }
    //         var sharpPos = window.location.href.indexOf('#', 0);
    //         console.log("# 위치 : " + sharpPos);
            
    //         var sharpSplit = window.location.href.split("#")[1];
    //         var idxEq = sharpSplit.indexOf("=");
    //         var startPos = idxEq + 1;
    //         var tokenEnd = sharpSplit.indexOf("&");

    //         const token = sharpSplit.substring(startPos, tokenEnd);
            
    //         console.log("token : " + token);
    //         fetch(`${URL}/account/sign-in`, {
    //             method: "GET",
    //             headers : {
    //                 "Content-type" : "application/json",
    //                 "Authorization" : token
    //             },
    //         })
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log("데이터 확인 : " + response.name);
    //             localStorage.setItem("access_token", response.token);
    //             localStorage.setItem("nickname", response.nickname);
    //             localStorage.setItem("image",response.image);
    //             setUserData({
    //                 nickname : response.nickname,
    //                 image : response.image
    //             })
    //         })
    //         .catch(err => console.log("err : ", err));
    //     }
    // };

    return (
        //네이버 아이디로 로그인 버튼 생성
        //자바스크립트용 라이브러리는 네이버 아이디로 로그인 버튼을
        //자동으로 생성해주는 스크립트 기능이 포함되어있습니다.
        //사용 가능한 로그인 버튼은 크기별 3가지 색상별 2가지씩
        //총 6가지가 제공되며 
        //각각 스크립트 내에 loginButton option을 통하여 세팅
        <>
        <div id="naverIdLogin">
            네이버로그인
        </div>
        </>
    );
}

export default NaverLoginBtnComp;
// class NaverLoginBtnComp extends Component
// {
//     // 백엔드에 정보를 저장하기 위해 state에 id, name, provider를 저장함
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: '',
//             name: '',
//             provider: '',
//             accessToken: ''
//         }
//     }

//     render() {
        
        
        
//         return (
//             <>
//             <br />
//             <br />
            
//             </>
//         );
//     }
// }

// export default NaverLoginBtnComp;