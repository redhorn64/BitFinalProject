import React, {Component} from "react";
import './EtcBoardComp.css';
import {  MDBIcon } from 'mdbreact';
import {URL} from '../../../redux/config';
import imgX from "../../../image/imgX.png";

class ShareItemComp extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {row} = this.props;
        let url = URL + "/";

        return (
                <div className="NoticeitemBox" style={{
                    cursor: 'pointer',
                }}
                > 
                    <div className="ShareitemContentDiv">
                        <img src={url + row.photo} onError={(e) => {
                            console.log("img error");
                            e.target.src = imgX;
                        }}/>
                    </div>
                    <div className="NoticeitemContentDiv">
                            {row.subject.split(",")[0]=="Food"?
                            <h6 className="font-weight-bold green-text">
                                <MDBIcon icon="utensils" className="pr-2" />
                                Food
                            </h6>:""}

                            {row.subject.split(",")[0]=="Cafe"?
                            <h6 className="font-weight-bold pink-text">
                                <MDBIcon icon="mug-hot" className="pr-2" />
                                Cafe
                            </h6>:""}

                            {row.subject.split(",")[0]=="Bar"?
                            <h6 className="font-weight-bold blue-text">
                                <MDBIcon icon="glass-cheers" className="pr-2" />
                                Bar
                            </h6>:""}
                    </div>
                    <div className="ShareitemTitle"
                         style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                    >
                        <b style={{color: '#888'}}
                        >{row.subject.split(",")[1]}
                        </b><br/>
                    </div>
                   
                    {/* <div className="NoticeitemContentDiv">
                        <p className="NoticeitemContent"
                           style={{fontWeight: '500', color: '#888', overflow: 'hidden'}}
                        >{row.writeday}
                        </p>
                    </div> */}
                </div>
            // </Box>
        )
    }
}

export default ShareItemComp;
