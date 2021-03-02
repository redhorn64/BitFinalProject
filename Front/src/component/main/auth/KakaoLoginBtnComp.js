import React, { Component } from "react";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import axios from "axios";
import { URL, actionType } from "../../../redux/config";

class KakaoLoginBtnComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'kakao',
            kakaoConfirmCode: '',
            id: '',
            name: '',
            provider: '',
        }
    }

    responseKaKao = (res) => {
        this.setState({
            data: res,
            id: res.profile.id,
            name: res.profile.properties.nickname,
            provider: 'kakao'
        });

        // axios.get(`${URL}/member/oauthKakao`)
        //     .then((res) => {
        //         localStorage.setItem('kakaoConfirmCode', res.data)
        //         console.log(`res : ${res}, res.data : ${res.data}`);
        //         this.setState({
        //             kakaoConfirmCode: res.data,
        //         });
        //         alert(`인가 코드를 받았습니다`);
        //     })
        //     .catch(error => {
        //         console.log(`인가 코드 받기 오류 : ${error}`);
        //     });

        alert(JSON.stringify(this.state.data))
    }

    responseFail = (err) => {
        alert(err);
        console.error(err);
    }

    render() {
        return (
            <>
                <KaKaoBtn 
                    jsKey={'5b1bc09ea2391d811062370fac0b13dd'}
                    buttonText="KaKao"
                    onSuccess={this.responseKaKao}
                    onFailure={this.responseFail}
                    getProfile={true}
                />
            </>
        );
    }
}

const KaKaoBtn = styled(KaKaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`

export default KakaoLoginBtnComp;