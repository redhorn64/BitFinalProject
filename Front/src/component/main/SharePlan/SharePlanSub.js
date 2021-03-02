import React, {Component} from "react";
import { Dialog, DialogTitle,DialogActions, DialogContent, DialogContentText,Button } from "@material-ui/core";
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {URL} from "../../../redux/config";
import store from "../../../redux/store";
import './SharePlanCss.css';
import { FcCheckmark } from "react-icons/fc";




class SharePlanSub extends Component {

    constructor(props) {
        super(props);
        //console.log("SharePlanRoot constructor", props);

        this.state={
            deleteOpen:false,
            deleteSetOpen:false
            
        }

        
        
    }

    deleteOpen=()=>{
        this.setState({
            deleteOpen:true
        })
    };

    deleteClose=()=>{
        this.setState({
            deleteOpen:false
        })
    };


    onDelete=()=>{
        let url=URL+"/plan/delete?num="+this.props.row.num;
        
        //console.log(this.props.row.num); 
        
        axios.get(url)
        .then(res=>{
            this.deleteClose();
            window.location.href="/shareplan/1";
        }).catch(err=>{
          console.log("삭제시 오류:"+err);
        });
       }

       onGroupDelete=()=>{
        let url=URL+"/plan/groupdelete?groupnum="+this.props.row.groupNum;
        
        // console.log(this.props.row.groupNum); 
        
        axios.get(url)
        .then(res=>{
            this.deleteClose();
            window.location.href = "/shareplan/1";
        }).catch(err=>{
          console.log("삭제시 오류:"+err);
        });
       }


    componentDidMount(){
        // this.getProfile();
        this.props.setName(this.props.row.comment, this.props.row.wishday);
    }



    render(){
        const {row} = this.props;
        var flag = '';

        if(row.title.includes(",")){
            if(row.title.split(",")[0]=="항공")
                flag = "🛬";
            else if(row.title.split(",")[0]=="우도배")
                flag = "🚢";
            else if(row.title.split(",")[0]=="음식점")
                flag = "🍔";
            else if(row.title.split(",")[0]=="카페")
                flag = "☕";
            else if(row.title.split(",")[0]=="숙박")
                flag = "🛏";
            else if(row.title.split(",")[0]=="Food" || row.title.split(",")[0]=="Bar" || row.title.split(",")[0]=="Cafe")
                flag = "👩‍🍳";
            else
                flag = "📅";
            
        }
        else{
            flag = "🛕";
        }

        return(
            
                <div>
                <div>
                    <TimelineItem  >
            
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {this.props.row.wishtime}
                            </Typography>
                        </TimelineOppositeContent>

                    

                        <TimelineSeparator>
                            <TimelineDot style={{backgroundColor:'white'}}>
                                {flag}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>

                        {store.getState().loginId==this.props.row.memId?
                            <TimelineContent onClick={this.deleteOpen.bind(this)} style={{cursor:'pointer'}} >
                                <div>
                                    {/* {this.props.row.wishday===this.props.day?this.props.row.title:this.props.row.title} */}
                                    <strong>{row.title.includes(",")?row.title.split(",")[1]:row.title}</strong>
                                </div>
                            </TimelineContent>:
                            <TimelineContent>
                                <div>
                                    <strong>{row.title.includes(",")?row.title.split(",")[1]:row.title}</strong>
                                    {/* {this.props.row.wishday===this.props.day?this.props.row.title:this.props.row.title} */}
                                </div>
                            </TimelineContent>
                        }
                        
                        
                        {/* <Typography variant="h6" component="h1" style={{cursor:'pointer',fontSize:20}} 
                            onClick={this.deleteOpen.bind(this)}>
                            {this.props.row.wishday===this.props.day?this.props.row.title:this.props.row.title}
                        </Typography> */}
                
                    </TimelineItem>
               
               <Dialog 
                    open={this.state.deleteOpen} 
                    onClose={this.deleteClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                     <DialogTitle id="alert-dialog-title">{this.props.row.title.includes(",")===true?this.props.row.title.split(",")[1]
                     :this.props.row.title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            해당 공유일정을 삭제하시겠습니까?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.deleteClose.bind(this)} color="primary">
                            닫기
                        </Button>
                        <Button  onClick={this.onDelete.bind(this)} color="primary" autoFocus>
                            삭제
                        </Button>
                        <Button  onClick={this.onGroupDelete.bind(this)} color="primary" autoFocus>
                            그룹전체삭제
                        </Button>
                        </DialogActions>
                 </Dialog>
                
                
                 
            </div>
            </div>
        )
    }

}

export default SharePlanSub;
