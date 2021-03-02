import React,{Component} from 'react';
import axios from 'axios';
import {URL} from '../../../redux/config';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import './TourDetailCss.css';
import Chip from '@material-ui/core/Chip';
import store from '../../../redux/store';

const customIcons = {
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

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

class DetailReviewComp extends Component {

    constructor(props){
        super(props);

        this.state={
            content:'',
            upload:'',
            star: '1'
        }

        this.contentsid = this.props.contentsid;

    }

    changeHandler=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    insertReview=()=>{
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.")
        }
        else{
            let memNum = store.getState().loginId; // 나중에 로그인상태의 아이디 집어넣기
            let star = this.state.star;
            let content = this.state.content;
            let contentsid = this.contentsid;

            // let url = "http://localhost:9002/sreview/insert";
            let url = URL + "/sreview/insert";

            axios.post(url, {contentsid, memNum, star, content})
                .then(res=>{
                    this.setState({
                        content : "",
                        upload: ''
                    })
                    //window.location.reload();
                    this.props.getList();
                }).catch(err=>{
                    console.log("DetailReviewComp insert 오류 : " + err);
                })

        }
    }

    uploadImage=(e)=>{
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
            this.setState({
                upload:res.data.photoname
            })
        })

    }

    handleDelete = () => {
        let url = URL + "/sreview/delupload";
        axios.get(url)
            .then(res=>{
                this.setState({
                    upload:''
                })
            })
    };

    render() {

        const chip = this.state.upload==''?"":<Chip
                                                variant="outlined"
                                                size="small"
                                                label={this.state.upload}
                                                onDelete={this.handleDelete.bind(this)}
                                            />;
        return (
            <div>
                <Box
                        display="flex"
                        flexWrap="wrap"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                        justifyContent="center"
                        css={{ maxWidth: '100%' }}
                    >
                        <Box m={1} id="detailReField">
                           
                            <label htmlFor="srContent" style={{verticalAlign: 'middle', height: '45px'}}>
                            <Box component="fieldset" borderColor="transparent">
                            &nbsp;&nbsp;
                                <Rating
                                    name="customized-icons"
                                    defaultValue={1}
                                    getLabelText={(value) => customIcons[value].label}
                                    IconContainerComponent={IconContainer}
                                    onChange={
                                        (e)=>{
                                            this.setState({
                                                star : e.target.value
                                            })
                                        }
                                    }
                                    />
                                    
                                    {/* &nbsp;&nbsp;<MoreVertIcon style={{marginBottom: '10px', color: "#ddd"}}/>&nbsp; */}
                                    
                            </Box> 
                            
                            <textarea name="content" id="srContent" style={{resize: 'none'}} value={this.state.content} 
                                    className="form-control" onChange={this.changeHandler.bind(this)}></textarea>
                            <input style={{display:'none'}} id="review-icon-button-file" type="file" onChange={this.uploadImage.bind(this)}/>
                                    <label htmlFor="review-icon-button-file">
                                        
                                        <IconButton color="primary" aria-label="upload picture" component="span" style={{marginBottom: '10px'}}>
                                            <PhotoCamera />
                                        </IconButton>  
                                        {/* <span style={{display:'inline-block', paddingBottom: '20px'}}>{this.state.upload}</span> */}
                                    </label>
                                    {chip}
                            </label>
                                    
                        </Box>
                        <Box m={1} id="btnInsertBox">
                            <button type="button" className="btn btn-dark-green" id="btnInsertReview"
                                    onClick={this.insertReview.bind(this)}>작성</button>
                        </Box>
                </Box>
                                   
                
            </div>
        );
    }
}

export default DetailReviewComp;