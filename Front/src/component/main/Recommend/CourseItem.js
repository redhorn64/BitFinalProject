import React,{Component} from 'react';
import {URL} from "../../../redux/config";
import axios from 'axios';
import store from '../../../redux/store';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { MDBBtn, MDBCardImage, MDBModal, MDBModalBody, MDBModalHeader, MDBMask, MDBView, MDBModalFooter, MDBIcon } from 'mdbreact';
import './Recommend.css';

class CourseDayItem extends Component {

    constructor(props){
        super(props);
    }

    render() {
        
        return (
            <>
            <Box class="recomCourse" style={{textAlign: 'center'}}>
                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" waves 
                        onClick={()=>{this.props.history.push("/tour/" + this.props.contentsid)}}>
                    <img className="img-fluid" src={this.props.img} style={{width: '100%'}}/>
                                    
                    <MDBMask className="flex-center" overlay="stylish-light" style={{alignItems: 'flex-end', cursor: 'pointer'}}>
                        <p className="white-text"><strong>{this.props.title}</strong></p>
                    </MDBMask>
                </MDBView>
                    {/* <figcaption>{this.props.title}</figcaption> */}
            </Box>
            <Box class="recomLastCourse" style={{margin: 'auto 0', textAlign: 'center', color: '#ccc'}}>
                <span className="fas fa-arrow-right"></span>
            </Box>
            </>
        );
    }
}

export default CourseDayItem;