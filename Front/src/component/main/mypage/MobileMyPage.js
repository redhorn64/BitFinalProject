import React, {Component} from "react";
import MemberUpdateFormComp from "./MemberUpdateFormComp";
import axios from 'axios';
import {URL} from "../../../redux/config";
import './style/MyinfoCss.css';
import userImg from '../../../image/user.png';
import store from "../../../redux/store";
import SocialUpdateForm from './SocialUpdateForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

class MobileMyPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            memberData: [],
            wishCount: 0,
            sharePlanCount:0,
        }
    }

    getMyData = () => {
        let url = URL + '/member/getdata?id=' + store.getState().loginId;
        axios.get(url)
            .then(response => {
                if(response.data.photo.substring(0,4)=='http'){
                    this.setState({
                        photoCheck: true
                    })
                }
                this.setState({
                    memberData: response.data
                })
            }).catch(err => {
            console.log("목록 오류:" + err);
        })

        url = URL + '/wish/wishcount?memId=' + store.getState().loginId;
        axios.get(url)
            .then(res=>{
                this.setState({
                    wishCount: res.data
                })
            }).catch(err=>{
                console.log("wishlist 일정갯수 가져오기 오류 : " + err);
            })
        
        url=URL+"/plan/count?memId="+store.getState().loginId;
        axios.get(url)
        .then(res=>{
            this.setState({
                sharePlanCount:res.data
            })
        }).catch(err=>{
            console.log("sharePlan 갯수 가져오기 오류 :"+err);
        })    
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getMyData(); //처음 시작시 백엔드로부터 데이타 가져오기
    }
    
    render() {
        
        const url = URL + "/";
        const userimg = this.state.memberData.photo=="no"?userImg:
            this.state.photoCheck?this.state.memberData.photo: url + this.state.memberData.photo;


        return (
            <div>
                <div id="mypageInfo" style={{width: '100%', marginTop: '50px'}}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <table className="table table-bordered">
                            <tr>
                                <td colSpan="2" style={{textAlign: 'center'}}>
                                    <img src={userimg} alt="이미지없음" id="mypageUserImg"
                                    onError={(e) => {
                                        console.log("img error");
                                        e.target.src = userImg;
                                    }}
                                    /><br/>
                                    {this.state.memberData.id}
                                </td>
                            </tr>
                            <tr style={{textAlign: 'center'}}>
                                <td width="50%"><strong>나의 일정</strong>&nbsp;&nbsp;{this.state.wishCount}</td>
                                <td width="50%"><strong>공유 일정</strong>&nbsp;&nbsp;{this.state.sharePlanCount}</td>
                            </tr>
                            {/* <tr style={{textAlign: 'center'}}>
                                <td colSpan="2"><strong>{this.state.memberData.email}@{this.state.memberData.email2}</strong></td>
                            </tr> */}
                        </table>

                        {/* <ListItem button>
                            <ListItemText primary={this.state.memberData.id} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={this.state.memberData.name} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={this.state.memberData.hp} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={`${this.state.memberData.email}@${this.state.memberData.email2}`} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={this.state.memberData.address} />
                        </ListItem> */}
                    </List>
                    <Divider />
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <span class="fas fa-user-alt"></span>
                            </ListItemIcon>
                            {this.state.memberData.provider=="no"?
                                <ListItemLink href="/mypage/pass/m">
                                    <ListItemText primary="My info" />
                                </ListItemLink>
                                :<ListItemLink href="/mypage/social">
                                    <ListItemText primary="My info" />
                                </ListItemLink>    
                            }
                            <ListItemText primary=">" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav" aria-label="My plan">
                        <ListItem button>
                            <ListItemIcon>
                                <span className="far fa-calendar-check"/>
                            </ListItemIcon>
                            <ListItemLink href="/mypage/plan">
                                <ListItemText primary="My plan" />
                            </ListItemLink>
                            <ListItemText primary=">" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav" aria-label="mypageMyReview">
                        <ListItem button>
                            <ListItemIcon>
                                <span className="fas fa-comment-dots"/>
                            </ListItemIcon>
                            <ListItemLink href="/mypage/review">
                                <ListItemText primary="My review" />
                            </ListItemLink>
                            <ListItemText primary=">" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav" aria-label="mypageBudget">
                        <ListItem button>
                            <ListItemIcon>
                                <span className="fas fa-splotch"/>
                            </ListItemIcon>
                            <ListItemLink href="/mypage/budget">
                                <ListItemText primary="My Budget" />
                            </ListItemLink>
                            <ListItemText primary=">" />
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            </div>
            
        )
        
        
    }
}

export default MobileMyPage;

