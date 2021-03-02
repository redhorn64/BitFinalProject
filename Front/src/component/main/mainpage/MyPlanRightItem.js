import React, {Component} from 'react';
import './MyPlanComp.css';
import axios from 'axios';
import {URL} from '../../../redux/config';
import Paper from "@material-ui/core/Paper";
import { MDBMask, MDBView, MDBBtn, MDBIcon } from "mdbreact";

class MyPlanRightItem extends Component {
    
    constructor(props){
        super(props);

    }

    render(){
        
        const {row} = this.props;

        return (
            <div className="myplanRightItemBox">
            {/* <div>  */}
            {/* <div> */}
                <MDBView>
                    <img src={row.thumbnail} alt="" class="myplanRightItemImg"/>
                    <MDBMask className="flex-center" overlay="stylish-light" style={{flexWrap:'wrap'}}>
                        <p className="white-text" style={{fontWeight: '500'}}>{row.title}</p>
                        <MDBBtn rounded href={`/tour/${row.contentsid}`}>
                            <MDBIcon icon="clone left" /> 보러가기
                        </MDBBtn>
                    </MDBMask>
                </MDBView>    
                {/* </div> */}
                {/* <div class="myplanRightTitle" style={{position: 'absolute', bottom: '5%', left: '30%', color: 'white', textAlign: 'center'}}>
                    {row.title}
                </div> */}
            </div>
            // <Paper elevation={3}>
            //     <br/>
            //     <div id="myplanRightThumb"></div>
            // </Paper>
        )
    }
}

export default MyPlanRightItem;
