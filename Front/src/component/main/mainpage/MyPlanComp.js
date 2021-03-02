import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";
import store from '../../../redux/store';
import './MyPlanComp.css';
import axios from 'axios';
import {URL} from '../../../redux/config';
import MyPlanRightItem from './MyPlanRightItem';
import MyPlanLeftItem from './MyPlanLeftItem';
import Weather2 from "./Weather2";
import Slider from "react-slick";

class MyPlanComp extends Component {
    
    constructor(props){
        super(props);

        this.state={
            count: 0,
            todayList: [], // 오늘 전부 plan
            todayAfterList: [], // 오늘 현재 시간 이후 plan
            nextList: [], // 오늘 이후 plan
            spotList: [],
            hotspotList: []
        }

        let date = new Date();
        this.today = date.getFullYear() + "-" + Number(date.getMonth()+1) + "-" + date.getDate();
    }

    componentWillMount(){
        this.getPlanList();
    }

    // todayList, todayAfterList 가져오기
    getPlanList = () => {
        let url = URL + "/wish/planlist?memId=" + store.getState().loginId + "&day=" + this.today + "&category=today";
        
        // let url = URL + "/wish/planlist?memId=sanghee&day=" + this.today + "&category=today&perPage=5";
        
        // let url = URL + "/wish/planlist?memId=sanghee&day=2020-12-15&category=today&perPage=5";
        
        axios.get(url)
            .then(res=>{
                let date = new Date();
                let now = date.getHours() < 10 ? "0" + date.getHours() + ":" + date.getMinutes():date.getHours() + ":" + date.getMinutes();
                // console.log(now);
                this.setState({
                    todayList: res.data,
                    todayAfterList: res.data.filter(item => item.wishtime > now)
                })

                if(this.state.todayList == '')
                    this.getNextDayPlan();
                else
                    this.getSpotList("today");
            }).catch(err=>{
                console.log("myplan getPlanList 오류 : " + err);
            })
    }

    // 오늘 일정 없을 시, 오늘 이후 plan 가져오기
    getNextDayPlan = () => {
        let url = URL + "/wish/planlist?memId=" + store.getState().loginId + "&day=" + this.today + "&category=nextDay";
        
        axios.get(url)
            .then(res=>{
                this.setState({
                    nextList: res.data
                })

                if(this.state.nextList != '')
                    this.getSpotList("nextDay");
                else
                    this.getHotspotList();
                    
            }).catch(err=>{
                console.log("myplan getNextDayPlan 오류 : " + err);
            })
    }

    // 카테고리별 spotlsit 가져오기
    getSpotList = (category) => {
        let url = URL + "/wish/spotlist?memId=" + store.getState().loginId + "&day=" + this.today + "&category=" + category;
        
        axios.get(url)
            .then(res=>{
                this.setState({
                    spotList: res.data
                })  
                if(this.state.spotList == '')
                    this.getHotspotList();
            }).catch(err=>{
                console.log("myplan getSpotList 오류 : " + err);
            })
    }

    // 아예 뒷 일정이 없을 경우
    getHotspotList=()=>{
        let url = URL + "/spot/hotspotlist";
        
        axios.get(url)
            .then(res=>{
                this.setState({
                    hotspotList: res.data
                })  
            }).catch(err=>{
                console.log("myplan getHotspotList 오류 : " + err);
            })
    }

    render(){
        // login시에만 왼쪽 블럭 출력
        const check = store.getState().logged==true && (this.state.todayList!='' || this.state.nextList!='');
        const leftTag = check==true?
            // <Box p={1} className="myPlanLeft" style={{borderRight: '1px solid black'}}>
                
            // </Box>
            <div className="myPlanLeft">
                {this.state.todayList!=''?<span style={{color: '#333'}}>MyPlan on {this.today}</span>:<span>MyPlan</span>}
                        <br/>
                        {this.state.todayList!=''?
                            <span style={{color: '#2BBBAD'}}><strong>TODAY</strong></span>
                        :""}
                        <List style={{width: '100%', overflow: 'scroll'}}>
                            {this.state.todayList!=''?this.state.todayList.map((row)=>(
                                <MyPlanLeftItem row={row}/>
                            )):this.state.nextList!=''?this.state.nextList.map((row)=>(
                                <MyPlanLeftItem row={row}/>
                            ))
                            // :<ListItem className="myplanLeftList">등록하신 일정이 없습니다.<br/>새로운 일정을 계획해보아요.</ListItem>
                            :""}
                        </List>        
            </div>:"";
                            

        // 오른쪽 블럭 : 오늘 spot 출력 / 없을 시, 오늘 이후 spot 출력 / 없을 시, 추천 spot 보여주기
        const list = this.state.spotList!=''?
            <div className="myPlanpagesRoot">
                {this.state.spotList.map((row)=>(
                        <MyPlanRightItem row={row}/>
                    ))}
                
            </div>
        :
        <div className="myPlanpagesRoot">
            {this.state.hotspotList.map((row)=>(
                    <MyPlanRightItem row={row}/>
                ))} 
        </div>;

        // 로그인 시, plan list 출력 / 없을 시, 뭐넣지
        const rightTag = store.getState().logged==true?
            // <Box p={1} className="myPlanRight" style={{borderRight: '1px solid black'}}>
                
            // </Box>
            this.state.todayList!='' && this.state.spotList!=''?
                <div className="myPlanRight">
                    <span>&nbsp;오늘의 <strong style={{color: '#2BBBAD'}}>Spot</strong></span>
                    {list}
                </div>
                :this.state.nextList!='' && this.state.spotList!=''?
                    <div className="myPlanRight">
                        <span>&nbsp;다가오는 <strong style={{color: '#2BBBAD'}}>Spot</strong></span>
                        {list}
                    </div>:check==false?<div className="myPlanRight myPlanTop5">
                            <span>&nbsp;이달의 <strong style={{color: '#2BBBAD'}}>명소</strong></span>
                                {list}
                            </div>:<div className="myPlanRight">
                            <span>&nbsp;이달의 <strong style={{color: '#2BBBAD'}}>명소</strong></span>
                                {list}
                            </div>
            :<Weather2/>;

        return (
            <div className="myPlanComp myPlanParent">
                {leftTag}
                {rightTag}
            </div>
        )
    }
}

export default MyPlanComp;
