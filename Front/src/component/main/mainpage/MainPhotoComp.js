import React, {Component} from 'react';
import jeju1 from "../../../image/jeju1.jpg";
import jeju2 from "../../../image/jeju2.jpg";
import jeju3 from "../../../image/jeju3.jpeg";
import udo1 from "../../../image/udo1.jpg";
import gsap from "gsap";
import jejuImg from '../../../image/jeju8.jpg';
import './MainPhotoComp.css';
import {WOW} from 'wowjs';
// import WaveBorder from "./WaveBorder";
// import {createMuiTheme, MuiThemeProvider, WithStyles} from "@material-ui/core";
// import {ThemeProvider} from 'styled-components';
// import theme from "./theme";
// import PropTypes from "prop-types";
// import styledComponents from "styled-components";

class MainPhotoComp extends Component {


    constructor(props) {
        super(props);


    }

    setImageScroll = (photoNum, preNum = 4) => {
        const duration = 3;
        const imgCnt = 4;
        let arrImg = [];

        //over index setting
        if (photoNum > imgCnt) {
            photoNum = 1;
        }

        //img element array setting.
        for (let i = 1; i <= imgCnt; i++) {
            let tempImgIdx = (photoNum - 1) + i;
            tempImgIdx = tempImgIdx > imgCnt ? tempImgIdx - imgCnt : tempImgIdx;
            arrImg.push(document.querySelector(`img.mainPhotoComp_img${tempImgIdx}`));
        }


        if (arrImg[0] != null) {
            //zIndex setting.
            for (let i = 0; i < imgCnt; i++) {
                arrImg[i].style.zIndex = imgCnt - i;
            }

            //tween action.
            gsap.fromTo(`.mainPhotoComp_img${photoNum}`
                , {
                    opacity: 0,
                }, {
                    opacity: 1,
                    duration: duration,
                });
            gsap.fromTo(`.mainPhotoComp_img${preNum}`
                , {
                    // opacity: 1,
                }, {
                    opacity: 0,
                    duration: duration,
                });

            //next action preparing.
            setTimeout(this.setImageScroll.bind(this, photoNum + 1, photoNum), (duration + 2) * 1000);
        }

    }

    componentDidMount() {
        for (let i = 0; i < 4; i++) {
            gsap.killTweensOf(`.mainPhotoComp_img${i + 1}`);
        }
        // this.setImageScroll(1, 4);
        new WOW().init();
    }

    render() {
        return (
            // <div className="mainPhotoComp">
            <div>
                 {/* 날라가는 새 애니메이션 */}
                 <div class="MainPhotoImg" style={{position: 'relative'}}>
                    <img src={jejuImg} alt=""/>
                    <div className="MainImgContent" style={{position: 'absolute'}}>
                        <h1 class="white-text mb-0 pt-md-5 pt-5"
                                >
                            <strong class="wow fadeInDown" data-wow-delay="0.3s" style={{textShadow: '4px 2px 2px gray'}}>혼저옵서예</strong>
                            &nbsp;&nbsp;
                            <strong class="wow fadeInDown" data-wow-delay="0.8s" style={{textShadow: '4px 2px 2px gray'}}>촘말로 좋수다. 공기도 맑고</strong>
                        </h1>
                        {/* <p class="wow fadeInDown white-text" data-wow-delay="1.5s">______________________</p> */}
                        <hr style={{backgroundColor: '#fff', width: '20vw', height: '1px'}} class="wow fadeInDown white-text" data-wow-delay="1.5s"></hr>
                        <h4 class="text-uppercase mb-4 white-text">
                            <strong class="wow fadeInDown" data-wow-delay="1.5s" style={{textShadow: '2px 1px 1px gray'}}>어서오세요</strong>
                            &nbsp;&nbsp;
                            <strong class="wow fadeInDown" data-wow-delay="2s" style={{textShadow: '2px 1px 1px gray'}}>정말로 좋습니다. 공기도 맑고</strong></h4>
                    </div>
                </div>
                <div class="containers">
                    <div className="MainPhotoContent" style={{position: 'absolute'}}>
                        <h1 class="white-text mb-0 pt-md-5 pt-5"
                                >
                            <strong class="wow fadeInDown" data-wow-delay="0.3s" style={{textShadow: '4px 2px 2px gray'}}>혼저옵서예</strong>
                            &nbsp;&nbsp;
                            <strong class="wow fadeInDown" data-wow-delay="0.8s" style={{textShadow: '4px 2px 2px gray'}}>촘말로 좋수다. 공기도 맑고</strong>
                        </h1>
                        {/* <p class="wow fadeInDown white-text" data-wow-delay="1.5s">______________________</p> */}
                        <hr style={{backgroundColor: '#fff', width: '20vw', height: '1px'}} class="wow fadeInDown white-text" data-wow-delay="1.5s"></hr>
                        <h4 class="text-uppercase mb-4 white-text">
                            <strong class="wow fadeInDown" data-wow-delay="1.5s" style={{textShadow: '2px 1px 1px gray'}}>어서오세요</strong>
                            &nbsp;&nbsp;
                            <strong class="wow fadeInDown" data-wow-delay="2s" style={{textShadow: '2px 1px 1px gray'}}>정말로 좋습니다. 공기도 맑고</strong></h4>
                    </div>
                                
                    <div class="bird-container bird-container--one">
                        <div class="bird bird--one"></div>
                    </div>
                    <div class="bird-container bird-container--two">
                        <div class="bird bird--two"></div>
                    </div>
                    <div class="bird-container bird-container--three">
                        <div class="bird bird--three"></div>
                    </div>
                    <div class="bird-container bird-container--four">
                        <div class="bird bird--four"></div>
                    </div>
                </div>
                    {/* <img className="mainPhotoComp_img1" src={jeju1}/> */}
                {/*<div>*/}
                {/*    <img className="mainPhotoComp_img2" src={jeju2}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <img className="mainPhotoComp_img3" src={jeju3}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <img className="mainPhotoComp_img4" src={udo1}/>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default MainPhotoComp
