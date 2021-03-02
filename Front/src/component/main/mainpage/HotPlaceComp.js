import React, {Component, useEffect, useLayoutEffect, useState} from "react";
import {NavLink, Route} from "react-router-dom";
import store from "../../../redux/store";
import {actionType, arrJejuLoc_en, arrJejuLoc_ko, mainViewType} from "../../../redux/config";
import TourList from '../../header/menus/TourList';
import TourPageComp from '../tour/TourPageComp';
import axios from 'axios';
import {URL} from "../../../redux/config";

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BoardSample from "./BoardSample";
import "../tour/TourCss.css";
import "./MainPageComp.css";
import gsap from "gsap";

import img_s_jeju from "../../../image/land_s/jeju_s.png";
import img_s_jocheon from "../../../image/land_s/jocheon_s.png";
import img_s_gujwa from "../../../image/land_s/gujwa_s.png";
import img_s_sungsan from "../../../image/land_s/sungsan_s.png";
import img_s_pyoseon from "../../../image/land_s/pyoseon_s.png";
import img_s_namwon from "../../../image/land_s/namwon_s.png";
import img_s_seogwipo from "../../../image/land_s/seogwipo_s.png";
import img_s_andeok from "../../../image/land_s/andeok_s.png";
import img_s_daejung from "../../../image/land_s/daejung_s.png";
import img_s_hangyeong from "../../../image/land_s/hangyeong_s.png";
import img_s_hanrim from "../../../image/land_s/hanrim_s.png";
import img_s_aewol from "../../../image/land_s/aewol_s.png";
import img_s_udo from "../../../image/land_s/udo_s.png";
import img_wholeMap from "../../../image/land/jejuisland_d.png";

// function TabPanel(props) {
//     const {children, value, index, ...other} = props;
//
//     // photos, setPhotos 비구조화 할당
//     let [photos, setPhotos] = useState([]);
//
//     // 통신 메서드
//     function searchApi() {
//         const url = URL + '/spot/list';
//
//         axios.get(url
//         ).then(function (response) {
//             setPhotos(response.data);
//             console.log("/spot/list", response);
//         }).catch(function (error) {
//             console.log("/spot/list", error);
//         })
//     }
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
//
// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };
//
// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default function HotPlaceComp(props) {
    const [value, setValue] = React.useState(2);
    const [selectedLocationIdx, setSelectedLocationIdx] = React.useState(0);
    const [isLocationOn, setIsLocationOn] = React.useState(false);
    const [scrollYVal, setScrollYVal] = React.useState(0);

    window.addEventListener("scroll", () => {
        setScrollYVal(window.scrollY);
    });


    useEffect(() => {
        setActionLocationEvent();
    }, [scrollYVal])

    const handleChange = (event, newValue) => {
        // console.log(event, newValue);
        setValue(newValue);
    };

    const setMainView = (mainView) => {
        // console.log("HotPlaceComp setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            mainView: mainView
        });
    }

    const clickLocation = (e) => {
        e.preventDefault();
        setSelectedLocationIdx(e.target.dataset.idx);

    }

    // window.onmousewheel = function (e) {
    //     // console.log(window.scrollY);
    //     setActionLocationEvent(window.scrollY);
    // }.bind(this);
    //
    // window.onscroll = function (e) {
    //     // console.log(window.scrollY);
    //     setActionLocationEvent(window.scrollY);
    // }.bind(this);

    const setActionLocationEvent = () => {
        let scrollVal = window.scrollY;
        // console.log(isLocationOn);
        if (scrollVal > 550) {
            if (!isLocationOn) {
                setIsLocationOn(true);
                let timeStack = 0;
                let timeSnap = 0.1;

                //land part img on
                for (let i = 2; i <= 14; i++) {
                    let _tempStr = `div.btn_go img:nth-child(${i})`;
                    gsap.killTweensOf(_tempStr);

                    // console.log(_tempStr, document.querySelector(_tempStr));
                    document.querySelector(_tempStr).style.visibility = "visible";
                    document.querySelector(_tempStr).style.opacity = 0;
                    gsap.fromTo(_tempStr, {
                        y: 50,
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: (timeSnap * (i - 1)),
                    });
                }

                timeStack = timeSnap * 13 + 0.5;

                //img_wholeMap on
                gsap.killTweensOf("div.btn_go img.img_wholeMap");
                gsap.to("div.btn_go img.img_wholeMap", {
                    opacity: 1,
                    duration: 1,
                    delay: timeStack,
                });

                timeStack += 0.5;
                //land part img off
                for (let i = 2; i <= 14; i++) {
                    let _tempStr = `div.btn_go img:nth-child(${i})`;
                    // console.log(_tempStr, document.querySelector(_tempStr));
                    gsap.to(_tempStr, {
                        opacity: 0,
                        duration: 1,
                        delay: timeStack,
                    });
                }

                //land caption div on
                gsap.killTweensOf("div.hotPlace_location div.btn_go div");
                gsap.to("div.hotPlace_location div.btn_go div", {
                    opacity: 1,
                    duration: 1,
                    delay: timeStack,
                });
            }
        } else {
            setIsLocationOn(false);
            // console.log("setIsLocationOn(false);");

            //land part img off
            for (let i = 2; i <= 14; i++) {
                let _tempStr = `div.btn_go img:nth-child(${i})`;
                gsap.killTweensOf(_tempStr);
                // console.log(_tempStr, document.querySelector(_tempStr));
                document.querySelector(_tempStr).style.visibility = "visible";
                document.querySelector(_tempStr).style.opacity = 0;
            }

            //img_wholeMap off
            gsap.killTweensOf("div.btn_go img.img_wholeMap");
            document.querySelector("div.btn_go img.img_wholeMap").style.opacity = 0;

            //land caption div off
            gsap.killTweensOf("div.hotPlace_location div.btn_go div");
            // console.log(document.querySelectorAll("div.hotPlace_location div.btn_go div"));
            document.querySelectorAll("div.hotPlace_location div.btn_go div")
                .forEach((e, i, all) => {
                    e.style.opacity = 0;
                });
        }
    }


    const mouseOverEventJejuMap = (e) => {
        // console.log("mouseOverEventJejuMap", e.target.dataset);

        // let selectedLoc = document.getElementById("btn_go_" + e.target.dataset.location_en);
        // console.log(selectedLoc);
        // selectedLoc.style.visibility = "visible";
        gsap.to("#btn_go_" + e.target.dataset.location_en, {
            opacity: 1,
            duration: 0.3,
        });
    }

    const mouseLeaveEventJejuMap = (e) => {
        // console.log("mouseLeaveEventJejuMap", e.target.dataset);

        // let selectedLoc = document.getElementById("btn_go_" + e.target.dataset.location_en);
        // console.log(selectedLoc);
        // selectedLoc.style.visibility = "hidden";
        gsap.to("#btn_go_" + e.target.dataset.location_en, {
            opacity: 0,
            duration: 0.3,
        });
    }


    return (
        <div className="hotPlaceComp">
            <div className="hotPlace_location">
                <div className="btn_go">
                    <img className="img_wholeMap" src={img_wholeMap}/>
                    <img id="btn_go_jeju"       src={img_s_jeju}        />
                    <img id="btn_go_jocheon"    src={img_s_jocheon}     />
                    <img id="btn_go_gujwa"      src={img_s_gujwa}       />
                    <img id="btn_go_sungsan"    src={img_s_sungsan}     />
                    <img id="btn_go_pyoseon"    src={img_s_pyoseon}     />
                    <img id="btn_go_namwon"     src={img_s_namwon}      />
                    <img id="btn_go_seogwipo"   src={img_s_seogwipo}    />
                    <img id="btn_go_andeok"     src={img_s_andeok}      />
                    <img id="btn_go_daejung"    src={img_s_daejung}     />
                    <img id="btn_go_hangyeong"  src={img_s_hangyeong}   />
                    <img id="btn_go_hanrim"     src={img_s_hanrim}      />
                    <img id="btn_go_aewol"      src={img_s_aewol}       />
                    <img id="btn_go_udo"        src={img_s_udo}         />

                    {
                        arrJejuLoc_en.map((e, i) => (
                            <div className={e} key={i}>
                                <a href="#"
                                   onMouseLeave={mouseLeaveEventJejuMap}
                                   onMouseOver={mouseOverEventJejuMap}
                                   onClick={clickLocation.bind(this)}
                                   data-location_en={e}
                                   data-location_kr={arrJejuLoc_ko[i]}
                                   data-idx={i}
                                >{arrJejuLoc_ko[i]}
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="hotPlace_sample">
                <BoardSample idx={selectedLocationIdx}
                             history={props.history}
                />
            </div>
        </div>
    )
}
/*
<img id="btn_go_jeju"       src={img_s_jeju}        />
<img id="btn_go_jocheon"    src={img_s_jocheon}     />
<img id="btn_go_gujwa"      src={img_s_gujwa}       />
<img id="btn_go_sungsan"    src={img_s_sungsan}     />
<img id="btn_go_pyoseon"    src={img_s_pyoseon}     />
<img id="btn_go_namwon"     src={img_s_namwon}      />
<img id="btn_go_andeok"     src={img_s_andeok}      />
<img id="btn_go_daejung"    src={img_s_daejung}     />
<img id="btn_go_hangyeong"  src={img_s_hangyeong}   />
<img id="btn_go_hanrim"     src={img_s_hanrim}      />
<img id="btn_go_aewol"      src={img_s_aewol}       />
<img id="btn_go_udo"        src={img_s_udo}         />
<img id="btn_go_seogwipo"   src={img_s_seogwipo}    />
*/
/*
                    <div className="jeju">     <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="jeju     "  data-location_kr="제주"  >제주   </a> </div>   <img id="btn_go_jeju"       src={img_s_jeju       }/>
                    <div className="jocheon">  <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="jocheon  "  data-location_kr="조천"  >조천   </a> </div>   <img id="btn_go_jocheon"    src={img_s_jocheon    }/>
                    <div className="gujwa">    <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="gujwa    "  data-location_kr="구좌"  >구좌   </a> </div>   <img id="btn_go_gujwa"      src={img_s_gujwa      }/>
                    <div className="sungsan">  <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="sungsan  "  data-location_kr="성산"  >성산   </a> </div>   <img id="btn_go_sungsan"    src={img_s_sungsan    }/>
                    <div className="pyoseon">  <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="pyoseon  "  data-location_kr="표선"  >표선   </a> </div>   <img id="btn_go_pyoseon"    src={img_s_pyoseon    }/>
                    <div className="namwon">   <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="namwon   "  data-location_kr="남원"  >남원   </a> </div>   <img id="btn_go_namwon"     src={img_s_namwon     }/>
                    <div className="andeok">   <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="andeok   "  data-location_kr="안덕"  >안덕   </a> </div>   <img id="btn_go_andeok"     src={img_s_andeok     }/>
                    <div className="daejung">  <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="daejung  "  data-location_kr="대정"  >대정   </a> </div>   <img id="btn_go_daejung"    src={img_s_daejung    }/>
                    <div className="hangyeong"><a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="hangyeong"  data-location_kr="한경"  >한경   </a> </div>   <img id="btn_go_hangyeong"  src={img_s_hangyeong  }/>
                    <div className="hanrim">   <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="hanrim   "  data-location_kr="한림"  >한림   </a> </div>   <img id="btn_go_hanrim"     src={img_s_hanrim     }/>
                    <div className="aewol">    <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="aewol    "  data-location_kr="애월"  >애월   </a> </div>   <img id="btn_go_aewol"      src={img_s_aewol      }/>
                    <div className="udo">      <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="udo      "  data-location_kr="우도"  >우도   </a> </div>   <img id="btn_go_udo"        src={img_s_udo        }/>
                    <div className="seogwipo"> <a href="#"  onMouseLeave={mouseLeaveEventJejuMap}  onMouseOver={mouseOverEventJejuMap}   onClick={clickLocation.bind(this)} data-location_en="seogwipo "  data-location_kr="서귀포" >서귀포  </a> </div>  <img id="btn_go_seogwipo"   src={img_s_seogwipo   }/>

 */

/*
import img_s_jeju       from "../../../image/land_s/jeju_s.png";
import img_s_jocheon    from "../../../image/land_s/jocheon_s.png";
import img_s_gujwa      from "../../../image/land_s/gujwa_s.png";
import img_s_sungsan    from "../../../image/land_s/sungsan_s.png";
import img_s_pyoseon    from "../../../image/land_s/pyoseon_s.png";
import img_s_namwon     from "../../../image/land_s/namwon_s.png";
import img_s_seogwipo   from "../../../image/land_s/seogwipo_s.png";
import img_s_andeok     from "../../../image/land_s/andeok_s.png";
import img_s_daejung    from "../../../image/land_s/daejung_s.png";
import img_s_hangyeong  from "../../../image/land_s/hangyeong_s.png";
import img_s_hanrim     from "../../../image/land_s/hanrim_s.png";
import img_s_aewol      from "../../../image/land_s/aewol_s.png";
import img_s_udo        from "../../../image/land_s/udo_s.png";

import img_jeju         from "../../../image/land/jeju.png";
import img_jocheon      from "../../../image/land/jocheon.png";
import img_gujwa        from "../../../image/land/gujwa.png";
import img_sungsan      from "../../../image/land/sungsan.png";
import img_pyoseon      from "../../../image/land/pyoseon.png";
import img_namwon       from "../../../image/land/namwon.png";
import img_seogwipo     from "../../../image/land/seogwipo.png";
import img_andeok       from "../../../image/land/andeok.png";
import img_daejung      from "../../../image/land/daejung.png";
import img_hangyeong    from "../../../image/land/hangyeong.png";
import img_hanrim       from "../../../image/land/hanrim.png";
import img_aewol        from "../../../image/land/aewol.png";
import img_udo          from "../../../image/land/udo.png";
 */

/*
<div className="btn_go">
    <div className="jeju">          <a href="#">제주</a>      </div>  <img id="btn_go_jeju"       src={img_jeju     }  />
    <div className="jocheon">       <a href="#">조천</a>      </div>  <img id="btn_go_jocheon"    src={img_jocheon  }  />
    <div className="gujwa">         <a href="#">구좌</a>      </div>  <img id="btn_go_gujwa"      src={img_gujwa    }  />
    <div className="sungsan">       <a href="#">성산</a>      </div>  <img id="btn_go_sungsan"    src={img_sungsan  }  />
    <div className="pyoseon">       <a href="#">표선</a>      </div>  <img id="btn_go_pyoseon"    src={img_pyoseon  }  />
    <div className="namwon">        <a href="#">남원</a>      </div>  <img id="btn_go_namwon"     src={img_namwon   }  />
    <div className="seogwipo">      <a href="#">서귀</a>      </div>  <img id="btn_go_seogwipo"   src={img_seogwipo }  />
    <div className="andeok">        <a href="#">안덕</a>      </div>  <img id="btn_go_andeok"     src={img_andeok   }  />
    <div className="daejung">       <a href="#">대정</a>      </div>  <img id="btn_go_daejung"    src={img_daejung  }  />
    <div className="hangyeong">     <a href="#">한경</a>      </div>  <img id="btn_go_hangyeong"  src={img_hangyeong}  />
    <div className="hanrim">        <a href="#">한림</a>      </div>  <img id="btn_go_hanrim"     src={img_hanrim   }  />
    <div className="aewol">         <a href="#">애월</a>      </div>  <img id="btn_go_aewol"      src={img_aewol    }  />
    <div className="udo">           <a href="#">우도</a>      </div>  <img id="btn_go_udo"        src={img_udo      }  />
</div>
 */

/*
    <a href="#" data-location="제주" onClick={clickLocation.bind(this)}>제주</a>
    <a href="#" data-location="조천" onClick={clickLocation.bind(this)}>조천</a>
    <a href="#" data-location="구좌" onClick={clickLocation.bind(this)}>구좌</a>
    <a href="#" data-location="성산" onClick={clickLocation.bind(this)}>성산</a>
    <a href="#" data-location="표선" onClick={clickLocation.bind(this)}>표선</a>
    <a href="#" data-location="남원" onClick={clickLocation.bind(this)}>남원</a>
    <a href="#" data-location="서귀" onClick={clickLocation.bind(this)}>서귀</a>
    <a href="#" data-location="안덕" onClick={clickLocation.bind(this)}>안덕</a>
    <a href="#" data-location="대정" onClick={clickLocation.bind(this)}>대정</a>
    <a href="#" data-location="한경" onClick={clickLocation.bind(this)}>한경</a>
    <a href="#" data-location="한림" onClick={clickLocation.bind(this)}>한림</a>
    <a href="#" data-location="애월" onClick={clickLocation.bind(this)}>애월</a>
    <a href="#" data-location="우도" onClick={clickLocation.bind(this)}>우도</a>
 */

/*
<Paper square>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Jeju" {...a11yProps(0)} />
                    <Tab label="Jocheon" {...a11yProps(1)} />
                    <Tab label="Gujwa" {...a11yProps(2)} />
                    <Tab label="Sungsan" {...a11yProps(3)} />
                    <Tab label="Pyoseon" {...a11yProps(4)} />
                    <Tab label="Namwon" {...a11yProps(5)} />
                    <Tab label="Seogwipo" {...a11yProps(6)} />
                    <Tab label="Andeok" {...a11yProps(7)} />
                    <Tab label="Daejung" {...a11yProps(8)} />
                    <Tab label="Hangyeong" {...a11yProps(9)} />
                    <Tab label="Hanrim" {...a11yProps(10)} />
                    <Tab label="Aewol" {...a11yProps(11)} />
                    <Tab label="Udo" {...a11yProps(12)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <BoardSample/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
                <TabPanel value={value} index={2}>
                </TabPanel>
                <TabPanel value={value} index={3}>
                </TabPanel>
                <TabPanel value={value} index={4}>
                </TabPanel>
                <TabPanel value={value} index={5}>
                </TabPanel>
                <TabPanel value={value} index={6}>
                </TabPanel>
                <TabPanel value={value} index={7}>
                </TabPanel>
                <TabPanel value={value} index={8}>
                </TabPanel>
                <TabPanel value={value} index={9}>
                </TabPanel>
                <TabPanel value={value} index={10}>
                </TabPanel>
                <TabPanel value={value} index={11}>
                </TabPanel>
                <TabPanel value={value} index={12}>
                </TabPanel>
            </Paper>
 */


/*
<a href="/tourlist/jeju     ">제주</a>
<a href="/TourList/jocheon  ">조천</a>
<a href="/TourList/gujwa    ">구좌</a>
<a href="/TourList/sungsan  ">성산</a>
<a href="/TourList/pyoseon  ">표선</a>

<a href="/TourList/namwon   ">남원</a>
<a href="/TourList/seogwipo ">서귀</a><br/>
<a href="/TourList/andeok   ">안덕</a>
<a href="/TourList/daejung  ">대정</a>
<a href="/TourList/hangyeong">한경</a>

<a href="/TourList/hanrim   ">한림</a>
<a href="/TourList/aewol    ">애월</a>
<a href="/TourList/udo      ">우도</a><br/><br/>
*/


{/* <NavLink exact to="/tourlist/jeju"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>제주</NavLink> */
}
{/* <NavLink exact to="/tourlist/jocheon"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>조천</NavLink>
<NavLink exact to="/tourlist/gujwa"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>구좌</NavLink>
<NavLink exact to="/tourlist/sungsan"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>성산</NavLink>
<NavLink exact to="/tourlist/pyoseon"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>표선</NavLink>
<NavLink exact to="/tourlist/namwon"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>남원</NavLink>
<NavLink exact to="/tourlist/seogwipo"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>서귀포</NavLink>
<br/>
<NavLink exact to="/tourlist/andeok"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>안덕</NavLink>
<NavLink exact to="/tourlist/daejung"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>대정</NavLink>
<NavLink exact to="/tourlist/hangyeong"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>한경</NavLink>
<NavLink exact to="/tourlist/hanrim"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>한림</NavLink>
<NavLink exact to="/tourlist/aewol"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>애월</NavLink>
<NavLink exact to="/tourlist/udo"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>우도</NavLink> */
}


// <Route path="/TourList/:name?" component={TourList}></Route>
