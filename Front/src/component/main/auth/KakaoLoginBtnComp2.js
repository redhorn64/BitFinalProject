import React, { Component, useEffect } from "react";
import kakao_login_wide from "../../../image/kakao_login_large_wide.png";
import { URL, actionType } from "../../../redux/config";
import store from "../../../redux/store";
import axios from "axios";
import { withRouter } from "react-router-dom";
import '../join/SignupCss.css';

// 브라우저의 윈도우 객체에서 Kakao API 가져오기
// 리액트 컴포넌트 상단에 작성하여 Kakao api에 접근할수있다
const { Kakao } = window;

class KakaoLoginBtnComp2 extends Component {

    constructor(props) {
        super(props);
        console.log(`KakaoLogin버튼컴포넌트2 props : ${props}`);

        this.state = {
            id: '',
            name: '',
            kakaoOn: false,
        };

        store.subscribe(() => {
            if (store.getState().kakaoOn) {
                this.setState({
                    id: store.getState.loginId,
                    name: store.getState.name,
                    kakaoOn: store.getState.kakaoOn,

                }) 
            }
        });
    }

    componentDidMount() {
        Kakao.init('5b1bc09ea2391d811062370fac0b13dd');

        console.log("Kakao.isInitialized()", Kakao.isInitialized());

        Kakao.Auth.createLoginButton({
            container: '#kakao-login-btn',
            success: function(authObj) {
                Kakao.API.request({
                    url: '/v2/user/me',
    
                    success: function(res) {
                        
                        // console.log(res.id);
                        // alert(res.id);
                        // console.log(res.kakao_account['email']);
                        // alert(res.kakao_account['email']);
                        // console.log(res.properties['nickname']);
                        // alert(res.properties['nickname']);
                        // alert(res.properties['profile_image']);
                        // alert(res.properties['thumbnail_image']);
                        // console.log(authObj.access_token);
                        // alert(authObj.access_token);

                        // alert(res.kakao_account['age_range']);
                        // alert(res.kakao_account['birthday']);
                        // alert(res.kakao_account['gender']);
    
                        var id = res.id; // 카카오 앱 회원번호
                        var kakaonickname = res.properties['nickname'];
                        // alert(`kakaonickname : ${kakaonickname}`);
                        var kakaoe_mail = res.kakao_account['email'];
                        // alert(`kakaoe_mail : ${kakaoe_mail}`);
                        var getAppKey = Kakao.Auth.getAppKey();
                        var getAccessToken = Kakao.Auth.getAccessToken();

                        // alert('getAppKey : ' + getAppKey);
                        // alert('getAccessToken : ' + getAccessToken);

                        store.dispatch({
                            type: actionType.kakaoLogin,
                            kakaoOn: true,
                            loginId: kakaoe_mail.substr(0, kakaoe_mail.indexOf('@')),
                            logged: true,
                            name: kakaonickname,
                            photo: res.properties['profile_image'],
                            loginEmail: kakaoe_mail,
                        });

                        // alert(`store에는 ${store.getState().loginId} 와 kakaoOn 은 ${store.getState().kakaoOn}
                        // logged 상태는 ${store.getState().logged} 이고 name은 ${store.getState().name} 
                        // , 사진은 ${store.getState.photo} , 로그인이메일은 ${store.getState().loginEmail}
                        // 입니다`);

                        let url = URL + '/member/insertsocial';

                        axios.post(url, {
                            id: store.getState().loginId,
                            name: store.getState().name,
                            provider: id,
                            photo: store.getState().photo,
                            email: store.getState().loginId,
                            email2: 'kakao.com',
                        })
                        .then(res => {

                        })
                        .catch(error => {
                            console.log(`KAKAO DB 저장 실패 : 
                                        ${error}`);
                        });
                        
                        // this.props.history.push('/');
                        window.location.replace("http://" + window.location.hostname + ( (window.location.port == "" || window.location.port == undefined)?'':':' + window.location.port) + '/');
                    }
                })
            },
            fail: function(error) {
                alert(JSON.stringify(error));
            }
        });
    }
    
    
    render() {
        
        
        
        return (
            <div id="kakaoBtn">
                <a id="kakao-login-btn"></a>
                <a href="http://developers.kakao.com/logout"></a>

            </div>
        );

    };
}

export default KakaoLoginBtnComp2;