import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import './style/UpdateFormCss.css';
import DaumPostcode from 'react-daum-postcode';
import store from '../../../redux/store';
import Chip from '@material-ui/core/Chip';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

class SocialUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state={
            id: '',
            name: '',
            gender: '',
            birth: '',
            photo: '',
            address: '',
            addrdetail: '',
            email: '',
            email2: '',
            hp: '',
            password: '',
            showPassword: false,
            zoneCode : "",
            fullAddress : "",
            isDaumPost : false,
            isRegister : false,
            register: [],
        }
    }    
    

    // 스프링에서 목록 가져오기
    getData = () => {
        let url = URL + '/member/getdata?id=' + store.getState().loginId;
        axios.get(url)
        .then(response=>{
            this.setState({
                id: response.data.id,
                name: response.data.name,
                gender: response.data.gender,
                birth: response.data.birth,
                photo: response.data.photo,
                fullAddress: response.data.address,
                addrdetail: response.data.addrdetail,
                email: response.data.email,
                email2: response.data.email2,
                hp: response.data.hp            
            })
            if(this.state.gender=='여자')
                this.refs.woman.className = 'mypageUpdateBtn clickMypageUpdateBtn';
            else
                this.refs.man.className = 'mypageUpdateBtn clickMypageUpdateBtn';
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }

    changeEmail = (e) => {
        console.log("changeEmail 함수");
        this.setState({
            email2: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

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

    componentDidMount() {
        this.getData(); //처음 시작시 백엔드로부터 데이타 가져오기
    }

    onUpdateMember = () => {
        var id = this.state.id;
        var name = this.state.name;
        var gender = this.state.gender;
        var birth = this.state.birth;
        var photo = this.state.photo;
        var address = this.state.fullAddress;
        var addrdetail = this.state.addrdetail;
        var email = this.state.email;
        var email2 = this.state.email2;
        var hp = this.state.hp;
        
        let url = URL + "/member/update";

        if(name.trim()==null || birth.trim()==null
            || gender==null || address==null || addrdetail==null ||
            email==null || email2==null || hp==null){
                alert("정보를 모두 입력해주세요.")
        }
        else {
            axios.post(url, {
                id, name, gender, birth, photo, address, addrdetail, email, email2, hp
            })
            .then(response => {
                window.scrollTo(0,0);
                alert("정보가 수정되었습니다.");
            }).catch(err=>{
                console.log("회원업데이트중 오류:"+err);
            })
        }
        
    }

    onDeleteMember = () => {
        let id = this.state.id;
        let passCheck = this.state.passCheck;
        let url = URL + "/member/delete";

        console.log(id + ", " +passCheck);
        axios.post(url , {id:id,pass:passCheck})
        .then(response => {
            if(response.data)
                this.props.history.push("/MainPage");//정보 변경후 메인페이지로 이동
            else
                alert("비밀번호 틀림");
        }).catch(err=>{
            console.log("회원삭제중 오류:"+err);
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

      handleDelete = () => {
        let url = URL + "/member/delupload?id=" + store.getState().loginId;
        axios.get(url)
            .then(res=>{
                this.setState({
                    photo:''
                })
            })
    };

    render() {
        // console.log("MemberUpdateFormComp render()", this.props);

        const chip = this.state.photo=='no'|this.state.photo==''?"":<Chip
                                                id="memberUpdateChip"
                                                variant="outlined"
                                                size="small"
                                                label={this.state.photo}
                                                onDelete={this.handleDelete.bind(this)}
                                            />;

        return (
            <div id="MypageUpdateForm" style={{textAlign: 'center', position: 'relative'}}>

                {/* <form onSubmit={this.onUpdateMember}> */}
                    <table class="table table-bordered">
                        <caption style={{captionSide: 'top', textAlign: 'center'}}><b>회원정보 수정</b></caption>
                        <tr>
                        <td colSpan="2"> <span class="fas fa-user-alt"></span>&nbsp;&nbsp;{this.state.id}</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="text" name = "name" class="form-control" value = {this.state.name} onChange={this.handleChange} placeholder="이름"/></td>
                        </tr>
                        <tr>
                            <td className="mypageUpdateBtn" ref="woman" onClick={this.womanClick.bind(this)}>여자</td>
                            <td className="mypageUpdateBtn" ref="man" onClick={this.manClick.bind(this)}>남자</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Tooltip title="생년월일" arrow>
                                    <input type="date" name = "birth" className="form-control SignupBirth" value = {this.state.birth} 
                                        onChange={this.handleChange.bind(this)}/>
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
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="text" name = "address" class="form-control" value = {this.state.fullAddress} disabled  placeholder="주소"/>
                                <br/>
                                <input type="text" name = "addrdetail" class="form-control" value = {this.state.addrdetail} onChange={this.handleChange} placeholder="상세 주소"/>
                                
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
                                <input type="text" name = "email" value = {this.state.email} className="mypageUpdateAddr" onChange={this.handleChange} placeholder="이메일"/>@
                                <input type="text" name = "email2" value = {this.state.email2} className="mypageUpdateAddr" onChange={this.handleChange} required/>
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
                            <td colSpan="2"><input type="text" class="form-control" name = "hp" value = {this.state.hp} 
                                placeholder="휴대폰" onChange={this.handleChange} required/></td>
                        </tr>
                        <tr>
                            <td className="mypageUpdateBtn">
                                <span onClick={this.onUpdateMember.bind(this)}>정보 수정</span>
                                {/* <button type="submit" style={{padding: '0', fontWeight: '0', backgroundColor: 'rgba(255,255,255,0)', border: 'none'}}>정보 수정</button> */}
                            </td>
                            <td className="mypageUpdateBtn">
                                <span onClick={this.onDeleteMember.bind(this)}>회원 탈퇴</span>
                            </td>
                        </tr>
                    </table>
            </div>
        )
    }
}

export default SocialUpdateForm;