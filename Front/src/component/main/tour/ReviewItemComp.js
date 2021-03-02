import React,{Component} from 'react';
import axios from 'axios';
import {URL} from '../../../redux/config';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import store from '../../../redux/store';
import imgX from '../../../image/imgX.png';

const reviewcustomIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };

  function reviewIconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{reviewcustomIcons[value].icon}</span>;
  }
  
  reviewIconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

class ReviewItemComp extends Component {

    state={
        update: false,
        upload: 'no',
        content:'',
        star: '1'
    }

    changeHandler=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    uploadImage=(e)=>{
        console.log("upload");
        const uploadFile=e.target.files[0];
        const imageFile=new FormData();
        imageFile.append("uploadFile",uploadFile);

        let url = URL + "/sreview/upload";
        
        axios({
            method:'post',
            url:url,
            data:imageFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            console.log(res.data.photoname);
            this.setState({
                upload: res.data.photoname
            })
        })

    }

    updateClick=()=>{
        this.setState({
            update: true
        })

        let url = URL + "/sreview/select?num=" + this.props.row.num;
        axios.get(url)
            .then(res=>{
                this.setState({
                    content: res.data.content,
                    upload: res.data.photo
                })
            }).catch(err=>{
                console.log("update spotreview 오류 : " + err);
            })

    }

    handleDelete = () => {
        let url = URL + "/sreview/updatenoupload";
        axios.get(url)
            .then(res=>{
                this.setState({
                    upload:'이미지 없음'
                })
            })
    };

    update=()=>{
        let url = URL + "/sreview/update";
        let num = this.props.row.num;
        let star = this.state.star;
        let content = this.state.content;

        console.log(star + ", " + content);

        axios.post(url, {num, star, content})
            .then(res=>{
                this.setState({
                    update: false
                })
                this.props.list();
            }).catch(err=>{
                console.log("spotreview update 오류 : " + err);
            })
    }

    delete=()=>{
        let url = URL + "/sreview/delete?num=" + this.props.row.num;

        if(window.confirm("삭제하시겠습니까?")){
            axios.get(url)
                .then(res=>{
                    this.setState({
                        update: false
                    })
                    this.props.list();
                }).catch(err=>{
                    console.log("spotreview delete 오류 : " + err);
                })
        }
    }

    render() {
        const {row}=this.props;
        const url = URL + "/";
        // const url = "http://localhost:9002/photo/";
        const photo = this.state.update==false?(row.photo==="no"?"":<td style={{width:'15%'}}>
                            <img src={url + row.photo} alt="이미지 없음" style={{width:'100px', height:'100px'}} 
                            onError={(e) => {
                                console.log("img error");
                                e.target.src = imgX;
                            }}
                            />
                            {/* <div className="tourReImg" style={{display:'inline-block', border: '1px solid gray'}}></div> */}
                        </td>):"";
        const w = row.photo==="no"?"2":"0";
        const star = row.star==1?<SentimentVeryDissatisfiedIcon/>:row.star==2?<SentimentDissatisfiedIcon/>
        :row.star==3?<SentimentSatisfiedIcon/>:row.star==4?<SentimentSatisfiedAltIcon/>:<SentimentVerySatisfiedIcon/>

        const chip = row.photo==="no"?(this.state.upload=='no'?"":<Chip
                                                variant="outlined"
                                                size="small"
                                                label={this.state.upload}
                                                onDelete={this.handleDelete.bind(this)}
                                            />):<Chip
                                            variant="outlined"
                                            size="small"
                                            label={this.state.upload}
                                            onDelete={this.handleDelete.bind(this)}
                                        />;
        // 로그인 아이디가 맞으면 출력
        const edit = store.getState().loginId===row.memNum ? <div style={{position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}} class="fas fa-tools" onClick={this.updateClick.bind(this)}></div>
                :   "";

        const tag = this.state.update==false?
            <td style={{width:'75%', padding: '10px', position: 'relative'}} align="left" colSpan={w}>
                &nbsp;&nbsp;    
                <span style={{color: '#F0CD58'}}>{star}</span>
                &nbsp; &nbsp;<b>{row.memNum}</b><span style={{color: '#999'}}>님이 작성하신 후기입니다.</span>
                <br/><br/>
                <p>{row.content}</p>
                {edit}
                
                <div style={{float: 'right', color: '#aaa'}}>
                    {row.writeday}
                </div>
            </td>
            :<td style={{width:'100%', padding: '10px', position: 'relative'}} align="left" colSpan={2}>
                <Rating
                                    name="reviewcustomized-icons"
                                    defaultValue={row.star}
                                    getLabelText={(value) => reviewcustomIcons[value].label}
                                    IconContainerComponent={reviewIconContainer}
                                    onChange={
                                        (e)=>{
                                            this.setState({
                                                star : e.target.value
                                            })
                                        }
                                    }
                                    />
                <div style={{position: 'absolute', top:'5px', right:'5px', cursor: 'pointer'}} onClick={
                    ()=>{
                        this.setState({
                            update: false
                        })
                    }
                }>x</div>
                <textarea name="content" style={{resize: 'none', width: '100%'}} value={this.state.content} 
                                    className="form-control" onChange={this.changeHandler.bind(this)}></textarea>
                
                <input style={{display:'none'}} id="upreview-icon-button-file" type="file" onChange={this.uploadImage.bind(this)}/>
                <label htmlFor="upreview-icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span" style={{marginBottom: '10px'}}>
                        <PhotoCamera />
                    </IconButton> 
                </label>
                {chip}
                <div style={{float:'right', marginTop: '10px'}}>
                    <button type="button" class="btn btn-warning" onClick={this.update.bind(this)}>수정</button>
                    <button type="button" class="btn btn-warning" onClick={this.delete.bind(this)}>삭제</button>
                </div>
            </td>;
        return (
            <tr>
                {photo}
                {tag}
            </tr> 
        );
    }
}

export default ReviewItemComp;