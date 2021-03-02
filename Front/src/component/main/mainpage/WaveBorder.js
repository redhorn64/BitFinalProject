import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import jeju1 from "../../../image/jeju1.jpg";
import jeju2 from "../../../image/jeju2.jpg";
import jeju3 from "../../../image/jeju3.jpeg";
import udo1 from "../../../image/udo1.jpg";
import Logo2 from "../../../image/logo2.png";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import qrcode from "../../../image/frame.png";

const styles = {
    waves: {
        position: "absolute",
        width: "100%",
        marginBottom: -7,
        height: "7vw",
        minHeight: "7vw",
        // "z-index": "-5",
        // bottom: "-1000",
    },
    "@keyframes moveForever": {
        from: {transform: "translate3d(-90px, 0, 0)"},
        to: {transform: "translate3d(85px, 0, 0)"}
    },
    parallax: {
        "& > use": {
            animation: "$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",
            animationDelay: props => `-${props.animationNegativeDelay}s`
        }
    },
    content: {
        textAlign: "center",
        backgroundColor: "#2d55aa",
        // minHeight: "75vh",
        // margin: "-.1em 0 0 0",
        color: "#ffdd55",
        fontSize: "2em",
        fontWeight: "300",
        userSelect: "none",
        cursor: "default",
        outline: "none",
    },
};

function WaveBorder(props) {
    const id = String(Math.random());
    const {
        className,
        lowerColor,
        upperColor,
        classes,
        animationNegativeDelay,
        ...rest
    } = props;
    return (
        <div className={className} style={{background: upperColor}} {...rest}>
            {/* <img className="mainPhotoComp_img1" src={jeju1}/> */}
            <svg
                className={classes.waves}
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto">
                <defs>
                    <path
                        id={id}
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className={classes.parallax}>
                    <use href={`#${id}`} x="48" y="6" fill={lowerColor}/>
                </g>
            </svg>
            {/*<div className="footerComp">*/}
            {/* <div> */}
                {/* <hr/> */}
                {/* <div className="content">
                    <br/>
                    <img src={Logo2}
                         style={{width: "150px"}}
                         alt="logo2"/>
                    <br/>
                    (주)멘도롱소랑 | 경기도 서초구 강남대로 459 (서초동 1300-34)<br/>
                    사업자 번호 147-14-12345 | 전화번호:02-123-1234 | 팩스 02-1234-1234 | 이메일 help@naver.com
                </div>
            </div> */}
            <MDBFooter color="unique-color-dark" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                    <MDBCol md="6" style={{color: '#eee'}}>
                        <h5 className="title"><img src={qrcode} style={{ width: '10vh', float: 'left'}}/>
                        <br /><br /><br />&nbsp;(주)제주일상
                        </h5>
                        <p>&nbsp;경기도 서초구 강남대로 459 (서초동 1300-34)</p>
                    </MDBCol>
                    <MDBCol md="6">
                        {/* <h5 className="title">Links</h5> */}
                        <ul>
                        <li className="list-unstyled">
                            <a href="#!" style={{color: '#aaa'}}>사업자 번호 147-14-12345</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!" style={{color: '#aaa'}}>전화번호:02-123-1234</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!" style={{color: '#aaa'}}>팩스 02-1234-1234</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!" style={{color: '#aaa'}}>이메일 help@naver.com</a>
                        </li>
                        </ul>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
                    </MDBContainer>
                </div>
                </MDBFooter>
        </div>
    );
}

WaveBorder.propTypes = {
    lowerColor: PropTypes.string.isRequired,
    upperColor: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    animationNegativeDelay: PropTypes.number.isRequired
};

export default withStyles(styles)(WaveBorder);
