import React,{Component} from 'react';
import {URL} from "../../../redux/config";
import axios from 'axios';
import store from '../../../redux/store';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import CourseItem from './CourseItem'
import Box from '@material-ui/core/Box';
import './Recommend.css';

class CourseDay extends Component {

    constructor(props){
        super(props);

        this.state={
            list: []
        }
    }
    
    getList=()=>{
        let url = URL + "/hotspot/list?groupNum="+this.props.groupNum+"&day="+this.props.day;
        // console.log(url)
        axios.get(url)
            .then(res=>{
                this.setState({
                    list: res.data
                })
                console.log(res.data);
            })
            .catch(err=>{
                console.log("코스추천 list 오류 : " + err);
        })
    }

    componentWillMount(){
        this.getList();
    }

    render() {
        
        return (
            <div className="RecomCourseDay">
                <table width="100%">
                    <tr>
                        <td width="10%">
                            
                            <b className="RecomCourseDayTitle" style={{color: '#036E38'}}>Day {this.props.day}</b>
                        </td>
                        <td width="90%">
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="center"
                            width="100%"
                            className="courseBox"
                            >
                                <Box class="recomLastCourse" style={{margin: 'auto 0', textAlign: 'center', color: '#ccc'}}>
                                    <span className="fas fa-arrow-right"></span>
                                </Box>
                                {/* <Box class="recomCourse">
                                </Box> */}
                                {this.state.list.map((row)=>(
                                    <CourseItem title={row.title} img={row.img} contentsid={row.contentsid} history={this.props.history}/>
                                ))}
                                <Box class="recomLastCourse" style={{margin: 'auto 0', textAlign: 'center', color: '#036E38'}}>
                                    &nbsp;<span className="fas fa-flag"></span>
                                    {/* 🚩 */}
                                </Box>
                        </Box>
                        </td>
                    </tr>
                </table>
                
                                
                
                <br/>
            </div>
        );
    }
}

export default CourseDay;