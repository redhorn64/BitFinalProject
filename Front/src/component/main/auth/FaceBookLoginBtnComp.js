import FacebookLogin from "react-facebook-login";
import React, { Component } from "react";
import styled from "styled-components";

class FaceBookLoginBtnComp extends Component {

    state = {
        isLoggedIn: false,
        id: '',
        name: '',
        email: '',
    }

    responseFacebook = response => {
        console.log(response);

        this.setState({
            isLoggedIn:true,
            id: response.id,
            name: response.name,
            email: response.email,
        });
    };

    componentClicked = () => console.log('clicked');

    render() {

        let fbContent;

        if(this.state.isLoggedIn) {
            fbContent = (
                <div>
                    <h2>{this.state.name}</h2>
                    Email : {this.state.email}
                </div>
            );
        }
        else {
            fbContent = (
                <FacebookLogin
                    appId="513629929622627"
                    autoLoad={false} // 실행과 동시에 자동으로 로그인 팝업창이 뜸
                    fields="name,email.picture" // 어떤정보를 받아올지 입력하는 필드
                    scope="public_profile,user_friends"
                    onClick={this.componentClicked} // this.바인딩 추가
                    callback={this.responseFacebook} // this.바인딩 추가
                />
            );
        }

        return (
            <div>
                {fbContent}
            </div>
        );
    }   
}

export default FaceBookLoginBtnComp;
