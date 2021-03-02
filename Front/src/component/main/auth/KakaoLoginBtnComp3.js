import React, { Component } from "react";
import kakao_login_wide from "../../../image/kakao_login_large_wide.png";
import { URL } from "../../../redux/config";

// 브라우저의 window 객체에서 Kakao API 가져오기 
// Kakao api 에 접근한다
const { Kakao } = window;

class KakaoLoginBtnComp3 extends Component {
    componentDidMount() {
        Kakao.init('5b1bc09ea2391d811062370fac0b13dd');
        console.log("Kakao.isInitialized() : " + Kakao.isInitialized());
        console.log(Kakao);
    }

    kakaoLoginClickHandler = () => {
        Kakao.Auth.authorize({
            redirectUri: "http://localhost:3000/login"
        });
    }

    render() {
        return (
            <img 
                src={kakao_login_wide} 
                alt="kakaoButton"
                onClick={this.kakaoLoginClickHandler}
                style={{ cursor: "pointer" }}
            >

            </img>
        );
    }
}

export default KakaoLoginBtnComp3;