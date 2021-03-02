import React , { Component } from 'react';
import reactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { refreshTokenSetup } from "./refreshToken";
import store from "../../../redux/store";
import { URL, actionType, mainViewType } from "../../../redux/config";
import axios from 'axios';
import '../join/SignupCss.css';
import {withRouter } from "react-router-dom";

class GoogleLoginBtnComp extends Component
{
    // 백엔드에 정보를 저장하기 위해 state에 id, name, provider를 저장함
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
            accessToken: '',
            email: '',
            email2: '',
            photo: '',
        }
    }

    setLoginId = (loginId) => {
        console.log("LoginPage setLoginId()");
        store.dispatch({
            type: actionType.LOG_IN,
            // mainView: mainViewType.MainPage
            loginId: this.state.id
        });
    }

    setGoogleOn = () => {
        console.log("구글로 로그인했습니다");
        store.dispatch({
            type: actionType.googleLogin,
            googleOn: true,
            loginId: this.state.email.split("@")[0],
            logged: true
        });
        this.props.history.push("/");
    }
    
    // 로그인에 실패한 경우에는 에러를 넘겨줌 => onFailure함수에서 error 출력
    onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };

    responseGoogle = (response) => {
        console.log(response);
    }
    
    // 로그인에 성공하면 json을 반환해줌 => onSuccess함수에서 state에 id, name을 저장
    onSuccess = (res) => {
        console.log('[Login Success] 로그인한 사용자:', res);
        // console.log('로그인한 사용자 id : ' +  res.googleId);

        this.setState({
            id: res.googleId,
            name: res.profileObj.name,
            email: res.profileObj.email,
            email2: 'gmail.com',
            photo: res.profileObj.imageUrl,
        });
        let url = URL + "/member/insertsocial";

        axios.post(url, {id:this.state.email.split("@")[0], name:this.state.name, provider:this.state.id, 
            photo:this.state.photo, email:this.state.email.split("@")[0], email2:this.state.email2})
                .then(result=>{
                    
                }).catch(err=>{
                    console.log("google db 저장 실패 : " + err);
                })

        this.setGoogleOn();
        // alert("스토어에 저장된 구글로그인 상태 : " + store.getState().googleOn);

        // initializing the setup
        refreshTokenSetup(res);
        };

        // 로그인에 실패한 경우에는 에러를 넘겨줌 => onFailure함수에서 error 출력
        onFailure = (res) => {
            console.log('[Login failed] res:', res);
        };

    render() {
        return (
            <div id="googleLogin">
            <GoogleLogin
                clientId="256166181377-83u2uuteqgosooa3um2i3o36ho1325md.apps.googleusercontent.com"
                buttonText="구글 아이디로 로그인"
                onSuccess={this.onSuccess.bind(this)}
                onFailure={this.onFailure.bind(this)}
                cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
            />
            </div>
        );
    };

}

export default withRouter(GoogleLoginBtnComp);