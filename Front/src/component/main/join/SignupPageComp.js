import React, { Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import { makeStyles, createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import './SignupCss.css';
import DaumPostcode from 'react-daum-postcode';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import welcomeImg from '../../../image/jeju6.jpg';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Chip from '@material-ui/core/Chip';
import jejuImg from '../../../image/jeju8.jpg';
import Tooltip from '@material-ui/core/Tooltip';

class SignupPageComp extends Component {


    constructor(props) {
        super(props);

        // console.log("SignupPageComp constructor", props);
        
        this.state={
            id:'',  //아이디를 저장하고 있을 state
            password:'',
            pwCheck: "",//비밀번호 두개가 일치하는가
            name : '',
            gender: '',
            birth: '2000-01-01',
            photo: '',
            addrdetail: '',
            email : '',
            email2:'',
            hp : "",
            idcanUse: false,//중복된 아이디찾기 true여야 로그인가능
            // files: [],
            // events: [],
            // filePreviews: {},
            zoneCode : "",
            fullAddress : "",
            isDaumPost : false,
            isRegister : false,
            register: [],
            alertOpen: false,
            alertSetOpen: false
        };

        //함수 선언
        this.onIdChk=this.onIdChk.bind(this);
    }

    // 변수 선언시 state 영역에 추가했을 경우에만 나중에 값변경이 가능하다
    // 값 변경시에는 setState 를 이용해야만 한다
    // 이벤트
    changeEvent=(e)=>{
        
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onIdChk=()=>{
        
        let url = URL + '/member/checkid?id=' + this.state.id;

        axios.get(url)
        .then(response=>{
            if(response.data)
            {
                alert("사용가능한 아이디입니다.");
                this.setState({
                    idcanUse: true
                })
            }
            else
            {
                alert("사용중인 아이디입니다. 다른 아이디를 입력해주세요.");
                this.setState({
                    id: '',
                    idcanUse: false
                })
            }
        }).catch(err => {
            console.log("아이디체크시 오류남:"+err);
        })
    }

    // onSubmitHandler = (e) => {
    //     e.preventDefault();
    //     this.onInsertMember();
    // };

    //사진 업로드시 호출되는 함수
    imageUpload=(e)=>{
        const uploadFile = e.target.files[0];

        //서버에 업로드
        const memberFile = new FormData();
        memberFile.append("uploadFile",uploadFile);

        axios({
            method: 'post',
            url: URL + '/member/upload',
            data: memberFile,
            headers: {'Content-Type':'multipart/form-data'}
        }).then(response=>{
            this.setState({
                photo: response.data.photoname
            })
        }).catch(err=>{
            console.log("이미지 업로드시 오류남:"+err);
        })
    }

    onInsertMember = () => {
        var id = this.state.id;
        var provider = 'no';
        var name = this.state.name;
        var pass = this.state.password;
        var pwCheck = this.state.pwCheck;
        var gender = this.state.gender;
        var birth = this.state.birth;
        var photo = this.state.photo;
        var address = this.state.fullAddress;
        var addrdetail = this.state.addrdetail;
        var email = this.state.email;
        var email2 = this.state.email2;
        var hp = this.state.hp;
        let url = URL + "/member/insert";

        if(id.trim()==='' || name.trim()==='' || pass.trim()==='' || pwCheck.trim()==='' || birth.trim()===''|| photo===''
            || gender.trim()==='' || address.trim()==='' || addrdetail.trim()==='' ||
            email.trim()==='' || email2.trim()==='' || hp.trim()===''){
                
            alert("정보를 모두 입력해주세요.");
        }
        else{
            if(this.state.idcanUse){
                if(this.state.password === this.state.pwCheck){
                    axios.post(url, {
                        id, name, pass, gender, birth, photo, address, addrdetail, email, email2, hp  
                    })
                        .then(response => {
                            this.setState({
                                alertOpen: true
                            })
                            // this.props.history.push("/login");//저장 성공후 로그인으로 이동되도록 한다
                        }).catch(err=>{
                            console.log("회원가입시 오류남:"+err);
                        })
                }
                else {
                    alert("비밀번호가 맞지 않습니다.")
                }
            }
            else {
                alert("아이디 중복을 확인해주세요.");
            }
        }
        
    }

    changeEmail = (e) => {
        this.setState({
            email2: e.target.value
        })
    }

    womanClick=(e)=>{
        if(e.target.className == 'mypageUpdateBtn clickMypageUpdateBtn'){
            e.target.className = 'mypageUpdateBtn';
            this.setState({
                gender: ''
            })       
        }
        else{
            this.refs.man.className = "mypageUpdateBtn";
            e.target.className = 'mypageUpdateBtn clickMypageUpdateBtn';
            
            this.setState({
                gender: '여자'
            })
        }
    }
    manClick=(e)=>{
        if(e.target.className == 'mypageUpdateBtn clickMypageUpdateBtn'){
            e.target.className = 'mypageUpdateBtn';
            this.setState({
                gender: ''
            })         
        }
        else{
            this.refs.woman.className = "mypageUpdateBtn";
            e.target.className = 'mypageUpdateBtn clickMypageUpdateBtn';
            this.setState({
                gender: '남자'
            })  
        }
    }

    // 주소검색
    handleTogglePost = () => {
        var p = this.state.isDaumPost;
        this.setState({
            isDaumPost : !p
        })
    }

    // postcode
    handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = ''; 
        let zoneCodes = data.zonecode;
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState ({
            fullAddress: AllAddress,
            zoneCode : zoneCodes
        })
      }


    // onAdd = (event) => {
    //     const afterStateChange = () => {
    //         event.affectedFiles
    //             .filter(file => !file.validationErrors)
    //             .forEach(file => {
    //                 const reader = new FileReader();

    //                 reader.onloadend = (ev) => {
    //                     this.setState({
    //                         filePreviews: {
    //                             ...this.state.filePreviews,
    //                             [file.uid]: ev.target.result
    //                         }
    //                     });
    //                 };

    //                 reader.readAsDataURL(file.getRawFile());
    //             });
    //     };

    //     this.setState({
    //         files: event.newState,
    //         events: [
    //             ...this.state.events,
    //             `선택된 파일: ${event.affectedFiles[0].name}`
    //         ],
    //     }, afterStateChange);

    //     uploadFile = event.affectedFiles[0].name;
    // }

    // onRemove = (event) => {
    //     const filePreviews = {
    //         ...this.state.filePreviews
    //     };

    //     event.affectedFiles.forEach(file => {
    //         delete filePreviews[file.uid];
    //     });

    //     this.setState({
    //         files: event.newState,
    //         events: [
    //             ...this.state.events,
    //             `파일 제거됨: ${event.affectedFiles[0].name}`
    //         ],
    //         filePreviews: filePreviews
    //     });
    // }

    // onProgress = (event) => {
    //     this.setState({
    //         files: event.newState,
    //         events: [
    //             ...this.state.events,
    //             `진행 정도: ${event.affectedFiles[0].progress} %`
    //         ]
    //     });
    // }

    // onStatusChange = (event) => {
    //     const file = event.affectedFiles[0];

    //     this.setState({
    //         files: event.newState,
    //         events: [
    //             ...this.state.events,
    //             `File '${file.name}' status changed to: ${fileStatuses[file.status]}`
    //         ]
    //     });
    // }
    
    handleDelete = () => {
        let url = URL + "/member/delupload";
        axios.get(url)
            .then(res=>{
                this.setState({
                    photo:''
                })
            })
    };

    render() {

        const chip = this.state.photo==''?"":<Chip
                                                id="SignChip"
                                                variant="outlined"
                                                size="small"
                                                label={this.state.photo}
                                                onDelete={this.handleDelete.bind(this)}
                                            />;

        return (
            <div>
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

            <div id="SignupForm" style={{textAlign: 'center', position: 'relative'}}>
                <table class="table table-bordered">
                    <caption style={{captionSide: 'top', textAlign: 'center'}}><b>회원가입</b></caption>
                    <tr>
                        <td colSpan="2">
                            <input type="text" name = "id" class="form-control" value = {this.state.id} onChange={this.changeEvent.bind(this)} 
                                placeholder="아이디"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{backgroundColor: '#036E38', color: 'white', cursor: 'pointer'}} onClick={this.onIdChk.bind(this)}>
                            아이디 중복 검사
                        </td>
                    </tr>
                        <tr>
                            <td>
                                <input type="password" name = "password" class="form-control" value = {this.state.password} onChange={this.changeEvent.bind(this)} 
                                    placeholder="비밀번호"/>
                            </td>
                            <td>
                                <input type="password" name = "pwCheck" class="form-control" value = {this.state.pwCheck} onChange={this.changeEvent.bind(this)} 
                                    placeholder="비밀번호 확인"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="text" name = "name" class="form-control" value = {this.state.name} 
                                    onChange={this.changeEvent.bind(this)} placeholder="이름" required/>
                                
                            </td>
                        </tr>
                        <tr>
                            <td className="mypageUpdateBtn" ref="woman" onClick={this.womanClick.bind(this)}>여자</td>
                            <td className="mypageUpdateBtn" ref="man" onClick={this.manClick.bind(this)}>남자</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Tooltip title="생년월일" arrow>
                                    <input type="date" name = "birth" className="form-control SignupBirth" value = {this.state.birth} 
                                        onChange={this.changeEvent.bind(this)}/>
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{padding: '0'}}>
                                프로필 사진&nbsp;
                                <input style={{display:'none'}} id="sign-icon-button-file" name = "photo" type="file" onChange={this.imageUpload.bind(this)}/>
                                    <label htmlFor="sign-icon-button-file">
                                        
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>  
                                    </label>
                                    {chip}
                                {/* <input type="file" name = "photo" onChange={this.imageUpload.bind(this)}/> */}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="text" name = "address" class="form-control" value = {this.state.fullAddress} placeholder="주소" disabled required/>
                                <br/>
                                <input type="text" name = "addrdetail" class="form-control" value = {this.state.addrdetail} onChange={this.changeEvent.bind(this)} 
                                    placeholder="상세주소" required/>
                                
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" onClick={this.handleTogglePost.bind(this)} style={{backgroundColor: '#036E38', color: 'white', cursor: 'pointer'}}>
                                주소검색
                                {
                                    this.state.isDaumPost ?
                                        <DaumPostcode
                                            onComplete={this.handleAddress.bind(this)}
                                            autoClose
                                            className="postSearchModal"
                                            isDaumPost={this.state.isDaumPost}
                                            />
                                    : null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="text" name = "email" value = {this.state.email} className="mypageUpdateAddr" onChange={this.changeEvent.bind(this)} 
                                    placeholder="이메일" required/>@
                                <input type="text" name = "email2" value = {this.state.email2} className="mypageUpdateAddr" onChange={this.changeEvent.bind(this)} required/>
                                &nbsp;
                                <select name="selectemail" className="mypageUpdateAddr" onChange={this.changeEmail}>
                                    <option disabled>선택하세요</option>
                                    <option value="">직접입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="nate.com">nate.com</option> 
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="text" class="form-control" name = "hp" value = {this.state.hp} onChange={this.changeEvent.bind(this)} 
                                placeholder="휴대폰 번호" required/></td>
                        </tr>
                        <tr>
                            <td className="mypageUpdateBtn" colSpan="2" onClick={this.onInsertMember.bind(this)}>
                                <span>회원 가입</span>
                            </td>
                        </tr>
                    </table>

                    {/* alert 창 */}
                    <Dialog
                        open={this.state.alertOpen}
                        onClose={()=>{
                            this.setState({
                                alertOpen: false
                            })
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}}><b>즐거운 제주도 여행되세요.</b></DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <img src={welcomeImg} alt="" style={{width: '100%'}}/>
                            
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        {/* <Button onClick={this.alertClose.bind(this)} color="primary">
                            NO
                        </Button> */}
                        <Button onClick={
                            ()=>{
                                this.setState({
                                    alertOpen: false
                                })
                                this.props.history.push("/login");
                            }
                        } color="primary" autoFocus>
                            YES
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>
            </div>
        );
    }

}

SignupPageComp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SignupPageComp;
