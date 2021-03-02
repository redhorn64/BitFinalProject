import React, {Component, useEffect} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BoardSample from "./BoardSample";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import NoticeItemComp from "./NoticeItemComp";
import axios from "axios";
import {URL} from "../../../redux/config";
// import ShareRestaurantItemComp from "./ShareRestaurantItemComp";
import ShareBoardRowItem from "../shareboard/ShareBoardRowItem";
import './MainPageComp.css';
import Slider from "react-slick";
import './EtcBoardComp.css';
import ShareItemComp from './ShareItemComp';
import SharePlanItemComp from './SharePlanItemComp';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paperRoot: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: "10px",
            padding: "10px",
            width: "300px",
            height: "400px",
            overflow: "hidden",
        }
    }
}));

export default function EtcBoardComp(props) {
    const classes = useStyles();
    const [selectedTabValue, setSelectedTabValue] = React.useState(1);
    const [noticeList, setNoticeList] = React.useState([]);
    const [shareRestaurant, setShareRestaurant] = React.useState([]);
    const [shareMyPlan, setShareMyPlan] = React.useState([]);

    useEffect(() => {
        if (selectedTabValue == 0) {
            getNoticeList();
        } else if (selectedTabValue == 1) {
            getShareRestaurantList();
        } else if (selectedTabValue == 2) {
            getShareMyPlanList();
        }
    }, [selectedTabValue]);

    const handleChange = (event, newValue) => {
        console.log(event, newValue);
        setSelectedTabValue(newValue);
    };

    const getNoticeList = () => {
        let url = URL + "/notice/list?start=0&perPage=10";
        console.log(url);

        axios.get(url
        ).then(res => {
            console.log(res);
            setNoticeList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getShareRestaurantList = () => {
        let url = URL + "/share/list?start=0&perPage=10";
        console.log(url);

        axios.get(url
        ).then(res => {
            console.log(res);
            setShareRestaurant(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getShareMyPlanList=()=>{
        let url=URL+"/plan/list?start=0&perPage=10";
        console.log(url);

        axios.get(url
            ).then(res => {
                console.log(res);
                setShareMyPlan(res.data);
            }).catch(err => {
                console.log(err);
            })

    }


    const settings = {
        dots: false,  // 점은 안 보이게
        infinite: true, // 무한으로 즐기게
        speed: 500,
        slidesToShow: 5, //4장씩 보이게 해주세요
        slidesToScroll: 1, //1장씩 넘어가세요
        
        responsive: [ // 반응형 웹 구현 옵션
            {
                breakpoint: 1600, // 화면 사이즈 1200px
                settings: {
                  slidesToShow: 4,
                }
            },
          {
              breakpoint: 1200, // 화면 사이즈 1200px
              settings: {
                slidesToShow: 4,
              }
          },
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      };
    /**
     * Notice | ShareRestaurant | ShareMyPlan
     */
    return (
        <div className="etcBoardComp">

            <Tabs
                TabIndicatorProps={{style: {background:'#2BBBAD'}}} 
                variant="fullWidth"
                value={selectedTabValue} 
                onChange={handleChange} 
                aria-label="simple tabs example"
            >
                <Tab label="공지사항" {...a11yProps(0)} />
                <Tab label="BEST 맛집" {...a11yProps(1)} />
                <Tab label="동행" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={selectedTabValue} index={0}>
                <div className="EtcBoardNotice" 
                // style={{
                //     display: "flex",
                //     overflow: "auto",
                //     flexWrap: "wrap"
                // }}
                >
                    <div style={{float: 'right', cursor: 'pointer', color: '#2BBBAD'}} onClick={()=>{props.history.push("/notice/1")}}>
                         <b className="EtcGoToShare">+ 더보기</b>
                       </div>
                    <br/>
                    <Slider {...settings}>
                        {
                            noticeList.map((e, i) => {
                                return (
                                    <NoticeItemComp key={i} row={e} history={props.history}/>
                                )
                            })
                        }
                    </Slider>
                    
                </div>
            </TabPanel>
            <TabPanel value={selectedTabValue} index={1}>
                <div className="EtcBoardNotice" 
                    >
                       <div style={{float: 'right', cursor: 'pointer', color: '#2BBBAD'}} onClick={()=>{props.history.push("/share/1")}}>
                         <b className="EtcGoToShare">+ 더보기</b>
                       </div>
                       <br/>
                    <Slider {...settings}>
                        {
                            shareRestaurant.map((e, i) => {
                                return (
                                    <ShareItemComp key={i} row={e} history={props.history}/>
                                )
                            })
                        }
                    </Slider>
                    
                </div>
            </TabPanel>
            <TabPanel value={selectedTabValue} index={2}>
            <div className="EtcBoardNotice" 
                    >
                       <div style={{float: 'right', cursor: 'pointer', color: '#2BBBAD'}} onClick={()=>{props.history.push("/shareplan")}}>
                         <b className="EtcGoToShare">+ 더보기</b>
                       </div>
                       <br/>
                    <Slider {...settings}>
                        {
                            shareMyPlan.map((e, i) => {
                                return (
                                    <SharePlanItemComp key={i} row={e} history={props.history}/>
                                )
                            })
                        }
                    </Slider>
                    
                </div> 
            </TabPanel>

        </div>
    );
}
