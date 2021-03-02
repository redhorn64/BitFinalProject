import React, {Component} from "react";
import MemberUpdateFormComp from "./MemberUpdateFormComp";
import axios from 'axios';
import {URL} from "../../../redux/config";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MySchedule from './MySchedule';
import MyReviwe from './MyReview';
import MyWishlist from './MyWishlist';
import './style/MyinfoCss.css';
import userImg from '../../../image/user.png';
import Paper from '@material-ui/core/Paper';
import PassCheck from './PassCheck';
import store from "../../../redux/store";
import SocialUpdateForm from './SocialUpdateForm';
import DeskMyPage from './DeskMyPage';
import MobileMyPage from './MobileMyPage';

class MypagePageComp extends Component {
    
    

    render() {

        return (
            <div>
                
                {document.body.offsetWidth > 450?<DeskMyPage/>:<MobileMyPage/>}
                {/* <div id="mypageInfo" style={{width: '100%', backgroundColor: '#f7f7f7', position: 'relative'}}>
                    <p id="mypageInfoTitle">내 정보 관리</p>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="center"
                            width="100%"
                        >

                            <Box className="mypageInfoCol" width="20%" alignSelf="center">
                                <img src={userimg} alt="이미지없음" id="mypageUserImg"/>
                            </Box>
                            <Box m={1} bgcolor="#fff" width="50%" className="mypageInfoCol">
                                <table>
                                        <tr style={{borderBottom: '1px dotted #eee'}}>
                                            <td>
                                                <span class="fas fa-bookmark"></span>
                                            </td>
                                            <td style={{paddingLeft: '10px'}}>
                                                {this.state.memberData.id}
                                            </td>
                                        </tr>
                                        <tr style={{borderBottom: '1px dotted #eee'}}>
                                            <td>
                                            <span class="fas fa-user-alt"></span>
                                            </td>
                                            <td style={{paddingLeft: '10px'}}>
                                                {this.state.memberData.name}
                                            </td>
                                        </tr>
                                        <tr style={{borderBottom: '1px dotted #eee'}}>
                                            <td>
                                            <span class="fas fa-phone-alt"></span>
                                            </td>
                                            <td style={{paddingLeft: '10px'}}>
                                                {this.state.memberData.hp}
                                            </td>
                                        </tr>
                                        <tr style={{borderBottom: '1px dotted #eee'}}>
                                            <td>
                                                <span class="fas fa-envelope-open-text"></span>
                                            </td>
                                            <td style={{paddingLeft: '10px'}}>
                                                {this.state.memberData.email}@{this.state.memberData.email2}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="fas fa-home"></span>
                                            </td>
                                            <td style={{paddingLeft: '10px'}}>
                                                {this.state.memberData.address}<br/>{address}
                                            </td>
                                        </tr>
                                    </table>
                            </Box>
                            <Box width="20%" alignSelf="center">
                                <Box m={1} bgcolor="#fff" className="mypageInfoCol" style={{textAlign: 'center'}}>
                                    <span className="mypageInfoSubtitle">일정</span><br/>
                                    <span className="mypageInfoSubContent">{this.state.wishCount}</span>
                                </Box>
                                <Box m={1} bgcolor="#fff" className="mypageInfoCol" style={{textAlign: 'center'}}>
                                    <span className="mypageInfoSubtitle">공유한 일정</span><br/>
                                    <span className="mypageInfoSubContent">0</span>
                                </Box>
                            </Box>
                            
                        </Box>

                </div>
                
                <Paper square style={{marginTop: '100px'}} id="mypageTabs">
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="My Plan" {...this.tabProps(0)}/>
                        <Tab label="My Review" {...this.tabProps(1)}/>
                        <Tab label="My Reservation" {...this.tabProps(2)}/>
                        <Tab label="My Info" {...this.tabProps(3)}/>
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        <MySchedule/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <MyReviwe/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        <MyWishlist/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={3}>
                        {passOkTab}
                    </TabPanel>
                </Paper> */}
                
            </div>
            
        )
        
        
    }
}
class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={3}>{this.props.children}</Box>
        </Typography>
      );
    }
  }
export default MypagePageComp;

