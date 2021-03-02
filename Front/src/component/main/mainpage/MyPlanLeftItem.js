import React, {Component} from 'react';
import './MyPlanComp.css';
import axios from 'axios';
import {URL} from '../../../redux/config';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';

class MyPlanLeftItem extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            title:''
        }

        let date = new Date();
        this.today = date.getFullYear() + "-" + Number(date.getMonth()+1) + "-" + date.getDate();
    }

    getSpotTitle = () => {
        let url = URL + "/wish/spottitle?contentsid=" + this.props.row.spotId;

        axios.get(url)
            .then(res=>{
                this.setState({
                    title: res.data
                })
            }).catch(err=>{
                console.log("myplan getSpotTitle 오류 : " + err);
            })
    }

    getShareSubject = () => {
        let url = URL + "/wish/sharesubject?num=" + this.props.row.shareNum;

        axios.get(url)
            .then(res=>{
                this.setState({
                    title: res.data
                })
            }).catch(err=>{
                console.log("myplan getShareSubject 오류 : " + err);
            })
    }

    componentWillMount(){
        if(this.props.row.spotId != null)
            this.getSpotTitle();
        else if(this.props.row.shareNum != null)
            this.getShareSubject();
    }

    render(){
        
        const {row} = this.props;
        const title = row.spotId!=null?this.state.title:row.shareNum!=null?this.state.title.split(",")[1]:row.aroundId!=null?row.aroundId:
            row.content.split(",")[1];
        // const icon = row.spotId!=null?"🛕":row.shareNum!=null?"👨‍🍳":row.content!=null&row.aroundId==null?"📅"
        //     :row.aroundId!=null&row.content.split(",")[0]=="음식점"?"🍔":row.aroundId!=null&row.content.split(",")[0]=="카페"?"☕":"🛌";

        var icon='';
        if(row.spotId!=null)
            icon = "🛕";
        else if(row.shareNum!=null)
            icon = "👨‍🍳";
        else if(row.aroundId!=null){
            if(row.content.split(",")[0]=="음식점")
                icon = "🍔";
            else if(row.content.split(",")[0]=="카페")
                icon = "☕";
            else 
                icon = "🛌";
        }
        // else if(row.content!=null&row.aroundId==null){
        else if(row.content!=null&row.aroundId==null){
            if(row.content.split(",")[0]=="우도배")
                icon = "🚢";
            else if(row.content.split(",")[0]=="렌트카")
                icon = "🚗";
            else if(row.content.split(",")[0]=="항공")
                icon = "🛬";
            else 
                icon = "📅";
        }
        var betweenDay = parseInt((new Date(row.wishday) - new Date(this.today))/ (24*60*60*1000));
        var isToday = Number(this.today.split("-")[0]) == Number(row.wishday.split("-")[0]) ?
                     Number(this.today.split("-")[1]) == Number(row.wishday.split("-")[1]) ? 
                     Number(this.today.split("-")[2]) == Number(row.wishday.split("-")[2]) ? true: false: false: false;
        return (
            <div>
                <ListItem className="myplanLeftList">
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor: 'white', border: '0.1px solid #eee'}}>
                            {/* <ImageIcon/> */}
                            {icon}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={title} secondary={isToday==true?`예정시간 ${row.wishtime}`:`D-${betweenDay}`}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
            </div>
        )
    }
}

export default MyPlanLeftItem;
