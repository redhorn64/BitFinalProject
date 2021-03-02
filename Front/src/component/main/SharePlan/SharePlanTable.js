import React, {Component} from "react";
import axios from 'axios';
import {actionType, URL} from "../../../redux/config";
import './SharePlanCss.css';
import Box from '@material-ui/core/Box';
import profile from './Img_profile.png';
import moment from 'moment';
import SharePlanTableSub from './SharePlanTableSub';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import store from "../../../redux/store";

class SharePlanTable extends Component {

    constructor(props) {
        super(props);

        this.state={
            clist:[],
            id:'',
            profile:[],
            comment:'',
            photoCheck: false,
            wishday: ''
        }
    }

     setName=(com, day)=>{
        this.setState({
            comment: com,
            wishday: day
        })
        // this.getProfile();
    }

    getGroupData=()=>{
        let url=URL+"/plan/groupdata?groupnum="+this.props.row.groupNum;
        // console.log("그룹넘버 : " + this.props.row.groupNum);
        axios.get(url)
        .then(res=>{
            // console.log(res.data[0].memId);

            this.setState({
                clist:res.data,
                id: res.data[0].memId
            });

            // console.log(this.state.id);
            this.getProfile();
        }).catch(err=>{
            console.log("목록 오류:"+err);
          })
    }

    componentWillMount(){
        this.getGroupData();
    }

    getProfile=()=>{
        let url=URL+"/member/getdata?id=" + this.state.id;

        axios.get(url)
        .then(res=>{
            //console.log("profile : " + res.data);

            if(res.data.photo.substring(0,4)=='http'){
                this.setState({
                    photoCheck: true
                })
            }
            this.setState({
                profile:res.data
            });
        }).catch(err=>{
            console.log("프로필 오류:"+err);
          })
    }

    openChattingRoomDirect() {
        console.log("openChattingRoomDirect()", this.state.id);
        store.dispatch({
            type: actionType.selectedDirectRoomFriend,
            selectedDirectRoomFriend: this.state.id,
        });
        store.dispatch({
            type: actionType.publishFunctionMsg,
            publishFunctionMsg: "openChattingRoomDirect",
        });
    }

    render(){
        const {row}=this.props.row;
        var birth1=this.state.profile.birth;
        var today=moment();
        var age=today.diff(birth1,'year')+2;
        var profileImg = this.state.profile.photo=="no"?profile:
                        this.state.photoCheck?this.state.profile.photo: URL + "/" + this.state.profile.photo;
        return(
                    <Box className="SharePlanTableProfile">
                                    <div style={{textAlign: 'center'}}>
                                        {/* <img src={profileImg} onError={(e) => {
                                            console.log("img error");
                                            e.target.src = profile;
                                        }}/> */}
                                         <Tooltip title={
                                             <div style={{textAlign: 'center'}}>
                                                 <img src={profileImg} className="SharePlanTooltipImg" onError={(e) => {
                                                console.log("img error");
                                                e.target.src = profile;
                                            }}/>
                                            <br/>
                                            <strong>{this.state.id}</strong><br/>
                                            <strong>{this.state.profile.gender==null?"비공개":this.state.profile.gender} / {this.state.profile.birth==null?"비공개":age + "세"}</strong><br/>
                                            <div className="SharePlanTooltipComment">{this.state.comment}</div>
                                             </div>
                                         } placement="top">
                                            <strong style={{color: '#036E38', cursor: 'pointer'}}
                                                    onClick={() => {
                                                        this.openChattingRoomDirect();
                                                    }}
                                            >{this.state.id}</strong>
                                         </Tooltip>
                                        &nbsp;님의
                                        {/* <br/> */}
                                        <strong style={{color: '#036E38'}}>{this.state.wishday}</strong> 일정

                                    </div>
                                    <div className="SharePlanTableTimeline SharePlanTimeline">
                                        {this.state.clist.map((row)=>(
                                            <SharePlanTableSub row={row} setName={this.setName.bind(this)} pageNum={this.props.pageNum}></SharePlanTableSub>
                                        ))}
                                    </div>
                                    {/* <div className="balloon">
                                        <div>
                                            {this.state.comment}
                                        </div>
                                    </div> */}
                                {/* <Box className="SharePlanProfile2">


                                </Box> */}
                            {/* </Grid> */}
                        </Box>
        )
    }
}

export default SharePlanTable;
