import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import './style/UpdateFormCss.css';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import store from '../../../redux/store';

class MemberUpdateFormComp extends Component {

    constructor(props) {
        super(props);

        this.state={
            password: '',
            showPassword: false,
           
        }
    }    
    
    handleChange = (prop) => (e) => {
        this.setState({
            [prop] : e.target.value
        });
    }

    handleClickShowPassword=()=>{
        var s = this.state.showPassword
        this.setState({
            showPassword: !s
        })
    }

    handleMouseDownPassword=(e)=>{
        e.preventDefault();
    }

    passCheck=()=>{
        let url = URL + "/member/login";
        // console.log(store.getState().loginId);
        let id = store.getState().loginId;
        let pass = this.state.password;
        
        axios.post(url, {id, pass})
            .then(res=>{
                if(res.data){
                    if(document.body.offsetWidth <= 450)
                        this.props.history.push("/mypage/update")
                    else
                        this.props.passOk(true);
                }
                else{
                    alert("비밀번호가 맞지 않습니다.");
                    this.setState({
                        password: ''
                    })
                }
            })
    }

    render() {
        return (
            <div id="mypagePassCheck">
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38'}}>
                        &nbsp;&nbsp;&nbsp;비밀번호 확인&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
                <br/>
                <div className="detailIntro" style={{color: "#888", textAlign: 'center', marginBottom: '0px'}}>
                    정보 수정을 위해 현재 비밀번호를 입력해주세요.
                </div>
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <FormControl className="mypagePassMargin mypageTextField" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange('password').bind(this)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword.bind(this)}
                                onMouseDown={this.handleMouseDownPassword.bind(this)}
                                edge="end"
                                >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>  
                    <button type="button" class="btn btn-dark-green mypagePassBtn" onClick={this.passCheck.bind(this)}>입력</button>
                </div>
                
            </div>
        )
    }
}

export default MemberUpdateFormComp;