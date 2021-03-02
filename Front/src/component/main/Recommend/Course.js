import React,{Component} from 'react';
import {URL} from "../../../redux/config";
import axios from 'axios';
import store from '../../../redux/store';
import CourseDay from './CourseDay';
import Button from '@material-ui/core/Button';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'
import './Recommend.css';

class Course extends Component {

    constructor(props){
        super(props);

        this.state={
            list: [],
            startDay:'',
        }
    }
    
    getList=()=>{
        let url = URL + "/hotspot/day?groupNum=" + this.props.groupNum;

        axios.get(url)
            .then(res=>{
                this.setState({
                    list: res.data
                })
            })
            .catch(err=>{
                console.log("코스추천 day list 오류 : " + err);
            })
    }

    componentWillMount(){
        this.getList();
    }


    // modal 함수
    handleOpen = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            this.setState({
                open: true
            })
        }
        
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };


    render() {
        
        return (
            <>
               
                
                <div className="courseDiv">
                    
                    {this.state.list.map((row, idx)=>(
                        <CourseDay groupNum={this.props.groupNum} day={row.day} history={this.props.history}/>
                    ))}
                </div>
                <br/>

                
            </>
        );
    }
}

export default Course;