import React, {Component} from "react";
import Logo2 from "../../image/logo2.png";
import WaveBorder from "../main/mainpage/WaveBorder";
import {createMuiTheme, MuiThemeProvider, WithStyles} from "@material-ui/core";
import {ThemeProvider} from 'styled-components';
import theme from "../main/mainpage/theme";
import PropTypes from "prop-types";
import styledComponents from "styled-components";

class FooterComp extends Component {

    constructor(props) {
        super(props);
        // console.log("FooterComp constructor", props);
    }

    render() {
        // console.log("FooterComp render()", this.props);
        return (
            <WaveBorder upperColor="#FFFFFF" lowerColor="rgba(45,85,170,.2)" animationNegativeDelay={4}>
                {/* <div className="footerComp">
                    <hr/>
                    <img src={Logo2}
                        style={{width: "150px"}}
                        alt="logo2"/>
                    <br/>
                    <p>
                        (주)멘도롱소랑 | 경기도 서초구 강남대로 459 (서초동 1300-34)<br/>
                        사업자 번호 147-14-12345 | 전화번호:02-123-1234 | 팩스 02-1234-1234 | 이메일 help@naver.com
                    </p>
                </div> */}
            </WaveBorder>
        )
    }
}

export default FooterComp;
