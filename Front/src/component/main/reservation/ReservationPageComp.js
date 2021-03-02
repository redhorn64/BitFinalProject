import React, {Component} from "react";
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './Reservation.css';

import store from '../../../redux/store';
import axios from 'axios';

import OneWayAir from './OneWayAir';
import RoundAir from './RoundAir';
import {WOW} from 'wowjs';

class ReservationPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("ReservationPageComp constructor", props);
        this.state = {
          tabValue:0
          }

    }
   
    // 인원 선택버튼 숫자증가
    state = {
      value: 0
    }
    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    };
  
    decrease = () => {
      this.setState({ value: this.state.value - 1 });
    }
  
    increase = () => {
      this.setState({ value: this.state.value + 1 });
    }

    componentDidMount(){
      window.scrollTo(0, 0);
      new WOW().init();
  }
    
    // 탭 버튼
    a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      handleTabChange = (event, newValue) => {
        this.setState({ tabValue: newValue });
      }


    render() {

        return (
            <div>
              <section class="my-md-5 AirSection">

              <div class="rgba-black-strong rounded AirIntro">
                  <div class="col-md-12 mb-4 white-text text-center AirTitle">
                          <h1 class="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInDown"
                          data-wow-delay="0.3s"><strong>AIR</strong></h1>
                          <hr style={{backgroundColor: '#fff', width: '20vw', height: '1px', margin: '20px auto'}} class="wow fadeInDown" data-wow-delay="0.4s"></hr>
                          {/* <p class="wow fadeInDown" data-wow-delay="0.4s">______________________</p> */}
                          <h5 class="text-uppercase mb-4 white-text wow fadeInDown" data-wow-delay="0.4s">
                              <strong>떠나요~ 둘이서~ 모든걸 훌훌 버리고<br/>
                              제주도 항공 정보를 확인해보세요.</strong></h5>
                          
                      </div>

                  <div style={{textAlign: 'center'}} className="AirTabs">
                      
                      <div class="white-text wow fadeInUp" style={{border: '1px solid white', margin: '0 auto'}} data-wow-delay="0.7s">
                      
                        <Tabs
                             TabIndicatorProps={{style: {background:'green'}}}
                             value={this.state.tabValue}
                              textColor="white"
                              variant="fullWidth"
                              onChange={this.handleTabChange}
                              aria-label="disabled tabs example"
                        >
                          <Tab label="편도" icon={<TrendingFlatIcon/>} {...this.a11yProps(0)}/>
                          <Tab label="왕복" icon={<SyncAltIcon/>} {...this.a11yProps(1)}/>
                        </Tabs>

                        {/* 편도 */}
                         <TabPanel value={this.state.tabValue} index={0}>
                            <OneWayAir history={this.props.history}/>
                        </TabPanel>

                        {/* 왕복 */}
                        <TabPanel value={this.state.tabValue} index={1}>
                            <RoundAir history={this.props.history}/>
                        </TabPanel>


                      </div>
                  </div>

              </div>

              </section>
            </div>
        )
    }

}

class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={3}>{this.props.children}</Box>
        </Typography>
      );
    }
  }

export default ReservationPageComp;
