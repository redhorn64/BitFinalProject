import React, {Component} from "react";
import axios from 'axios';
import GoogleLoginBtnComp from "./GoogleLoginBtnComp";
import GoogleLogoutBtnComp from "./GoogleLogoutBtnComp";
import store from "../../../redux/store";
import { URL, actionType, mainViewType } from "../../../redux/config";
import NaverLoginBtnComp from "./NaverLoginBtnComp";
import FaceBookLoginBtnComp from "./FaceBookLoginBtnComp";
import KakaoLoginBtnComp from "./KakaoLoginBtnComp";
import KakaoLoginBtnComp2 from "./KakaoLoginBtnComp2";
import KakaoLoginBtnComp3 from "./KakaoLoginBtnComp3";

import TextField from "@material-ui/core/TextField";

import MakeLoginBtn from "./MakeLoginBtn";
import { FaThemeisle } from "react-icons/fa";
import {Route, Link, withRouter } from "react-router-dom";
import '../join/SignupCss.css';
import jejuImg from '../../../image/jeju8.jpg';

class LoginPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("LoginPageComp constructor", props);

        this.state={
            id:'',  //아이디를 저장하고 있을 state
            pass:'',
            pwCheck: "",//비밀번호 두개가 일치하는가
            name : "",
            birth_date: "",
            phone : "",
            email : "",
            address : "",
            idcanUse: false,//중복된 아이디찾기 true여야 로그인가능
            logged:this.props.logged,
            onLogin:this.onLogin,
            googleOn : store.getState().googleOn
        }

        store.subscribe(function () {
            this.setState({
                googleOn: store.getState().googleOn,
            });
        }.bind(this));
    }

    setLoginId = (loginId) => {
        console.log("LoginPage setLoginId()");
        store.dispatch({
            type: actionType.LOG_IN,
            // mainView: mainViewType.MainPage
            loginId: loginId,
            logged: true
        });
    }

    // 변수 선언시 state 영역에 추가했을 경우에만 나중에 값변경이 가능하다
    // 값 변경시에는 setState 를 이용해야만 한다
    // 이벤트
    changeEvent=(e)=>{

        // console.log(e.target.id+":"+e.target.value);
        // 만약 엔터 누를때만 변경되도록 하고 싶으면
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onLogin=()=>{
        // console.log("로그인할 아이디는 " + this.state.id + "비밀번호는 " + this.state.pass);
        const data = {
            id: this.state.id,
            pass: this.state.pass
        }
        let url = URL + "/member/login";

        axios.post(url, data)
        .then(response => {
            console.log(response.data);
            if(response.data){
                // this.props.onLogin();
                this.setLoginId(data.id);
                // alert(store.getState().loginId+ "가 스토어에 저장된 아이디입니다");
                this.props.history.push("/");
            }
            else{
                alert("아이디와 비밀번호가 맞지않습니다.");
                this.setState({
                    pass: '',
                })
            }
        }).catch(err => {
            console.log("로그인시 오류남:"+err);
        })
    }

    render() {
        // console.log("LoginPageComp render()", this.props);
        // console.log("스토어에 있는 로그인 아이디 상태는 : " + store.getState().loginId);
        const parentOnLoginHandler = this.onLogin.bind(this);
        return (
            <div id="LoginPageComp">
                 {/* 날라가는 새 애니메이션 */}
                 {/* <div class="signImg">
                    <img src={jejuImg} alt=""/>
                </div>
                <div class="containers">
                    <div class="bird-container bird-container--one">
                        <div class="bird bird--one"></div>
                    </div>
                    <div class="bird-container bird-container--two">
                        <div class="bird bird--two"></div>
                    </div>
                    <div class="bird-container bird-container--three">
                        <div class="bird bird--three"></div>
                    </div>
                    <div class="bird-container bird-container--four">
                        <div class="bird bird--four"></div>
                    </div>
                </div> */}

                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38'}}>
                        &nbsp;&nbsp;로그인&nbsp;&nbsp;
                    </span>
                </div>
                {/* <div>
                    {this.state.id}
                    <h4 className="showIdResult">{this.state.showIdResult}</h4>
                </div> */}
                <br />

                <div id="LoginForm">
                    <table class="table table-bordered" style={{textAlign: 'center'}}>
                        <tr>
                            <td>
                                <input type="text" name = "id"
                                       class="form-control" value = {this.state.id}
                                       onChange={this.changeEvent.bind(this)}
                                       autoFocus={true}
                                       onKeyPress={(e)=>{
                                           if (e.code == "Enter" || e.code == "NumpadEnter") {
                                               document.getElementById("loginPassword").focus();
                                           }
                                       }}
                                    placeholder="아이디"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" id="loginPassword"
                                       name = "pass" class="form-control" value = {this.state.pass}
                                       onChange={this.changeEvent.bind(this)}
                                       onKeyPress={(e)=>{
                                           if (e.code == "Enter" || e.code == "NumpadEnter") {
                                               this.onLogin();
                                           }
                                       }}
                                    placeholder="비밀번호"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="loginBtn" style={{backgroundColor: '#036E38', color: 'white', cursor: 'pointer'}} onClick={this.onLogin.bind(this)}>
                                <span>로그인</span>
                            </td>
                        </tr>
                    </table>
                    <hr/>
                    <p style={{float: 'right', color: '#aaa', cursor: 'pointer'}} onClick={()=>{
                                this.props.history.push("/join");
                            }}>회원가입</p>
                    <br/>
                    <div className="detailTitle">
                        <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38'}}>
                            &nbsp;&nbsp;소셜 로그인&nbsp;&nbsp;
                        </span>
                    </div>
                    <hr/>
                    {
                        this.state.googleOn ==true ?
                            <GoogleLogoutBtnComp /> :
                            <GoogleLoginBtnComp />
                    }
                    <br/>
                    <NaverLoginBtnComp />
                    <br />
                    <KakaoLoginBtnComp2 />
                    <br/><br/>
                </div>

            </div>
        )
    }

}

export default withRouter(LoginPageComp);
