import React , { Component } from 'react';
import reactDOM from 'react-dom';
import { GoogleLogout } from 'react-google-login';
import store from "../../../redux/store";
import { URL, actionType, mainViewType } from "../../../redux/config";

class GoogleLogoutBtnComp extends Component
{
    
    setGoogleOut = () => {
        console.log("구글로 로그아웃했습니다");
        store.dispatch({
            type: actionType.googleLogout,
            googleOn: false
        });
    }

    render() {
        const responseGoogle = (response) => {
            console.log(response);
        }

        const onSuccess = (res) => {
            alert('Logout 되었습니다');
            this.setGoogleOut();
            alert("setGoogleOut() 후 스토어에 저장된 구글로그인 상태 : " + store.getState().googleOn);
            
            // window.location.href("/");
        }

        return (
            <>
            <br />
            <br />
            <GoogleLogout
                clientId="256166181377-83u2uuteqgosooa3um2i3o36ho1325md.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
            </>
        );
    }
}

export default GoogleLogoutBtnComp;