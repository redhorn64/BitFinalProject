import React,{Component} from 'react';
import './style/RCA.css';
import {URL} from "../../../redux/config";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import store from '../../../redux/store';
import {  FcCollaboration } from "react-icons/fc";
import moment from 'moment';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Form } from 'reactstrap';


class ClistItem extends Component {

    constructor(props){
        super(props);

        this.state={
            alertOpen: false,
            alertSetOpen: false      
        }

    }

    // alert 함수
    alertOpen = () => {
        this.setState({
            alertOpen: true
        })
    };

    alertClose = () => {
        this.setState({
            alertOpen: false
        })
    };
    
    onDelete=()=>{
        let url=URL+"/wish/delete?num="+this.props.row.num;
        
        console.log(this.props.row.num); 
        
        axios.get(url)
        .then(res=>{
            this.alertClose();
            this.props.toggle();
            this.props.getMonthList();
        }).catch(err=>{
          console.log("삭제시 오류:"+err);
        });
       }

    //    onData=()=>{
    //        let url= URL+"/plan/insert";
    //        let memId=store.getState().loginId;
    //        let title=this.props.row.title;
    //        let content=this.props.row.addr;
    //        let wishday=this.props.row.wishday;
    //        let wishtime=this.props.row.wishtime;

    //        axios.post(url,{memId,title,content,wishday,wishtime})
    //        .then(res=>{
    //             //this.props.history.push("/shareplan");
    //        }).catch(err=>{
    //         console.log("shareplan insert 오류 : " + err);
    //        })

    //    }

    render() {
        
        const {row} = this.props;
        let flag=false;
        if(row.aroundId==null&&row.spotId==null&&row.shareNum==null){
            if(row.content.split(",")[0]=="여행예산"){
                flag = true;
            }
        }

        return (
            // <div>
            
                <div>
                {flag==false?
                    <TimelineItem className="RCA-timeline">
                        <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary" className="RCA-timelineTitle">
                            {row.wishtime}
                        </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                        <TimelineDot className="RCA-timelineDot" style={{backgroundColor: 'white'}}>
                            {/* <FastfoodIcon /> */}
                            {row.content=="spot"?"🛕":row.content==="myplan"&&row.title.split(",")[0]==="일정"?"📅":row.content==="share"?"👨‍🍳":
                                row.content.split(",")[0]==="카페"?"☕":row.content.split(",")[0]==="음식점"?"🍔":
                                row.content.split(",")[0]==="숙박"?"🛌":row.title.split(",")[0]==="우도배"?"🚢":
                                row.title.split(",")[0]==="렌트카"?"🚗":row.title.split(",")[0]==="항공"?"🛬":''}
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent className="RCA-timelineTitle">
                            <div style={{cursor: 'pointer'}} onClick={this.alertOpen.bind(this)}>

                                {row.content==="share"||row.content==="myplan"?row.title.split(",")[1]:row.title}
                            </div>
                        {/* <Paper elevation={3} className="RCA-timelineTitle" style={{cursor: 'pointer'}} onClick={this.alertOpen.bind(this)}>
                        
                            
                        </Paper> */}
                        </TimelineContent>
                        
                        
                    </TimelineItem>
                :""}
                
                
                {/* alert 창 */}
                <Dialog
                        open={this.state.alertOpen}
                        onClose={this.alertClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{row.content==="share"||row.content==="myplan"?row.title.split(",")[1]:row.title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            해당 일정을 삭제하시겠습니까?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.alertClose.bind(this)} color="primary">
                            NO
                        </Button>
                        <Button onClick={this.onDelete.bind(this)} color="primary" autoFocus>
                            YES
                        </Button>
                        </DialogActions>
                    </Dialog>

                </div>
                
                

                
                // {
                 //   row.content==="spot"?<div>{row.wishtime}&nbsp;🛕{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>
                    //  {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    //  {/* </div>:row.content==="myplan"?<div>{row.wishtime}&nbsp;📅{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content==="share"?<div>{row.wishtime}&nbsp;👨‍🍳{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content.split(",")[0]==="카페"?<div>{row.wishtime}&nbsp;☕{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content.split(",")[0]==="음식점"?<div>{row.wishtime}&nbsp;🍔{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content.split(",")[0]==="숙박"?<div>{row.wishtime}&nbsp;🛌{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:''
                // } */}
            // </div>
        );
    }
}


export default ClistItem;