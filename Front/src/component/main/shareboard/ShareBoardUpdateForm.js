import React, {Component} from 'react';
import {Route, Link} from "react-router-dom";
import ShareBoardPageComp from "./ShareBoardPageComp";
// import ShareBoardFormComp from "./ShareBoardFormComp";
import "./Share.css";
import axios from "axios";
import {URL} from "../../../redux/config";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import "../join/SignupCss.css";
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { pink } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Chip from '@material-ui/core/Chip';

class ShareBoardUpdateForm extends Component {
    constructor(props) {
        super(props);
        console.log("ShareBoardUpdateForm constructor", this.props);
        this.num = this.props.match.params.num;
        this.pageNum = this.props.match.params.pageNum;
        // this.refs.star.value = 0;
        this.state = {
            photoname: '',
            star: '1',
            category: 'Food'
        }
    }


    //서버에 이미지 업로드하는 함수
    uploadImage = (e) => {
        const uploadFile = e.target.files[0];
        const upload = new FormData();
        upload.append("uploadFile", uploadFile);

        let url = URL + "/share/upload";

        axios({
            method: 'post',
            url: url,
            data: upload,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            this.setState({
                photoname: res.data.photoname
            })
        }).catch(err => {
            console.log("shareboard upload 오류 : " + err);
        })

    }

    //num 에 해당하는 데이타 가져오기
    onSelectData = () => {
        let url = URL + "/share/select?num=" + this.num;
        axios.get(url
        ).then(res => {
            console.log(res);
            //이미지명은 state 이므로
            this.setState({
                star: res.data.star,
                photoname: res.data.photo,
                category: res.data.subject.split(",")[0]
            })

            this.refs.subject.value = res.data.subject.split(",")[1];
            this.refs.addr.value = res.data.addr;
            this.refs.content.value = res.data.content;
            
            
        }).catch(err => {
            console.log(err);
        })

    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.onSelectData();
    }


    onDataUpdate = (resolve) => {
        //입력값 변수에 저장하기
        let subject = this.state.category + "," + this.refs.subject.value;
        let addr = this.refs.addr.value;
        let content = this.refs.content.value;
        let star = this.state.star;

        //db 에 update
        let url = URL + "/share/update";
        let num = this.num;
        axios.post(url, {num, subject, addr, content, star}
        ).then(res => {
            //값 지우기
            this.refs.subject.value = '';
            this.refs.addr.value = '';
            this.refs.content.value = '';

            //이미지도 지우기
            this.setState({
                photoname: ''
            });

            if (resolve != null) {
                resolve();
            }
        }).catch(err => {
            console.log("수정시 오류남:" + err);
        })

    }

    handleSubmit(event) {
        event.preventDefault();
        let _promise = new Promise((resolve, reject) => {
            this.onDataUpdate(resolve);
        });

        _promise.then(() => {
            alert('정보가 성공적으로 수정되었습니다.');
        }).then(() => {
            if (this.pageNum == 0) {
                window.location.href = "/";
            } else {
                this.props.history.push(`/share/${this.pageNum}`);
            }
        });
    }

    changeCategory = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    handleDelete = () => {
        let url = URL + "/share/delupload?num=" + this.num;
        axios.get(url)
            .then(res=>{
                this.setState({
                    photoname:''
                })
            })
    };

    render() {
        // console.log("ShareBoardUpateForm render()", this.props);
        const chip = this.state.photoname=='no'|this.state.photoname==''?"":<Chip
                                                variant="outlined"
                                                size="small"
                                                label={this.state.photoname}
                                                onDelete={this.handleDelete.bind(this)}
                                            />;

        
        return (
            <div>
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor: 'white', color: '#036E38'}}>
                        &nbsp;&nbsp;맛집 정보 수정&nbsp;&nbsp;
                    </span>
                </div>

                <div id="SignupForm" style={{textAlign: 'center', position: 'relative'}}>
                <table class="table table-bordered">
                    <tr>
                        <td colSpan="2">
                        <Radio
                            checked={this.state.category === 'Food'}
                            onChange={this.changeCategory}
                            value="Food"
                            name="radio-button-demo"
                            style={{color: green[600]}}
                            inputProps={{ 'aria-label': 'Food' }}
                        /><b>Food</b>
                        <Radio
                            checked={this.state.category === 'Cafe'}
                            onChange={this.changeCategory}
                            value="Cafe"
                            name="radio-button-demo"x
                            style={{color: pink[600]}}
                            inputProps={{ 'aria-label': 'Cafe' }}
                        /><b>Cafe</b>
                        <Radio
                            checked={this.state.category === 'Bar'}
                            onChange={this.changeCategory}
                            value="Bar"
                            name="radio-button-demo"
                            style={{color: blue[600]}}
                            inputProps={{ 'aria-label': 'Bar' }}
                        /><b>Bar</b>
                        </td>
                    </tr>
                        <tr>
                            <td colSpan="2">
                                <span style={{width: '5%', color: '#036E38'}} className="fas fa-bookmark"></span>
                                <input className="form-control" type="text" style={{width: '95%', display:'inline-block'}}
                                   placeholder="상호명" ref="subject"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <span style={{width: '5%', color: '#036E38'}} className="fas fa-map-marker-alt"></span>
                                <input className="form-control" type="text" style={{width: '95%', display:'inline-block'}}
                                   placeholder="주소" ref="addr"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{padding: '0'}}>
                                <input style={{display:'none'}} id="sign-icon-button-file" name = "photo" type="file" onChange={this.uploadImage.bind(this)}/>
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
                                <textarea maxLength="1000" className="form-control"
                                    style={{resize: 'none', cursor: 'auto', height: '30vh'}}
                                    ref="content" placeholder="후기를 남겨주세요">
                                </textarea>                                
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <Rating

                                value={this.state.star}
                                // defaultValue={this.state.star}
                                emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                onChange={
                                    (e) => {
                                        console.log(e);
                                        this.setState({
                                            star: e.target.defaultValue
                                        })
                                    }
                                }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="mypageUpdateBtn" style={{backgroundColor:'#036E38', color: 'white'}} onClick={()=>{
                                    this.props.history.goBack();
                                }}>
                                <span>목록</span>
                            </td>
                            <td className="mypageUpdateBtn" style={{backgroundColor:'#036E38', color: 'white'}} onClick={this.handleSubmit.bind(this)}>
                                <span>수정</span>
                            </td>
                        </tr>
                    </table>

                </div>
                {/* <div id="ShareFormSubject">
                    <h3 id="sharesubject">맛집공유 수정</h3>
                </div>


                <table id="ShareFormAll">
                    <tr>
                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>맛집이름 </span></th>
                        <td id="sharetd">
                            <input className="form-control" type="text" style={{width: '200px', height: '50px'}}
                                   placeholder="맛집이름을 적어주세요" ref="subject"/>
                        </td>
                    </tr>

                    <tr>
                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>맛집주소 </span></th>
                        <td id="sharetd">
                            <input className="form-control" type="text" style={{width: '400px', height: '50px'}}
                                   placeholder="맛집주소를 적어주세요" ref="addr"/>
                        </td>
                    </tr>

                    <tr>
                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>이미지 </span></th>
                        <td id="sharetd">
                            <input type="file" onChange={this.uploadImage.bind(this)}/>
                        </td>
                    </tr>

                    <tr>
                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>리뷰 </span></th>
                        <td id="sharetd">
                         <textarea maxLength="1000" className="form-control"
                                   style={{width: '600px', height: '150px', resize: 'none', cursor: 'auto'}}
                                   ref="content" placeholder="리뷰를 입력하세요">
                         </textarea>
                        </td>
                    </tr>

                    <tr>
                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>평가 </span></th>

                        <td id="sharetd">
                            <Box style={{marginTop: "25px"}} component="fieldset" mb={3} borderColor="transparent">
                                <Rating
                                    name="customized-empty"
                                    defaultValue={0}
                                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                    onChange={
                                        (e) => {
                                            this.setState({
                                                star: e.target.defaultValue
                                            })
                                        }
                                    }
                                />
                            </Box>
                        </td>
                    </tr>

                </table>

                <div id="ShareFormButton">
                    <MDBBtn size="sm" color="deep-orange"
                            style={{color: 'white', cursor: 'pointer'}}
                            onClick={this.handleSubmit.bind(this)}>
                        <b style={{fontSize: '15px'}}>수정하기</b>
                    </MDBBtn>

                    <MDBBtn size="sm" color="deep-orange"
                            style={{color: 'white', cursor: 'pointer'}}
                            onClick={() => {
                                this.props.history.goBack();
                            }}>
                        <b style={{fontSize: '15px'}}>목록</b>
                    </MDBBtn>

                </div> */}
            </div>
        )
    }
}

export default ShareBoardUpdateForm;
