import React, {Component} from "react";
import './SharePlanCss.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import Slider from "react-slick";
import SharePlanRoot from './SharePlanRoot';
import Grid from '@material-ui/core/Grid';

import store from '../../../redux/store';
import { StoreTwoTone } from "@material-ui/icons";
import SharePlanTable from './SharePlanTable';
import Box from '@material-ui/core/Box';
import SharePlanPage from './SharePlanPage';


class SharePlanPageComp extends Component {

    constructor({match}) {
        super();

        this.state={
           glist:[],
           list:[],
           allList: [],
           pageNum: match.params.pageNum,
          //  groupNum:match.params.groupNum

        }

        // this.currnetPage=this.state.groupNum;
        this.currentPage = this.state.pageNum;
        this.totalCount = 0;
        this.perPage = 12; // 한페이지당 보여질 글의 갯수
        this.perBlock = 5; // 한블럭당 출력할 페이지의 갯수
        this.totalPage = 0; // 총 페이지의 갯수
        this.startPage = 0; // 각 블럭당 시작 페이지 번호
        this.endPage = 0; // 각 블럭당 끝페이지 번호
        this.start = 0; // 각 블럭당 불러올 글의 시작번호
        this.end = 0; // 각 블럭당 글의 끝번호
        this.no = 0; // 각 페이지에서 출력할 시작번호
    
    }

    paginate = (num) =>{
        
      this.currentPage = num;
      this.setState({
        pageNum: num
      })

      // console.log(this.currentPage);
      this.getAllGroupnum();
  }

      getTotalCount = () => {

        let url = URL + "/plan/allcount";

        axios.get(url)
            .then(res => {
                this.totalCount = res.data;
                this.getAllGroupnum();
            }).catch(err => {
            console.log("shareplan getTotalCount 오류 : " + err);
        })
    }

    getGroup=()=>{
      let url=URL+"/plan/group?wishday="+this.refs.wishday.value;
         //console.log(this.refs.wishday.value);
        this.setState({
          glist:[]
      });

        axios.get(url)
        .then(res=>{
          // console.log("선택 데이터 : " + res.data);
            this.setState({
                glist:res.data
            });
        }).catch(err=>{
            console.log("리스트 오류:"+err);
          })
    }

    getGroupnum=()=>{
        let url=URL+"/plan/groupnum";

        
        
        axios.get(url)
        .then(res=>{
          // console.log("데이터 ; " + res.data);
            this.setState({
                glist:res.data
                
            });
        }).catch(err=>{
            console.log("리스트 오류:"+err);
          })
    }

    getAllGroupnum=()=>{
      // 나머지가 있을 경우에는 1페이지 더 추가 (예 : 총글수가 9이고 한페이지당 2개씩 볼 경우)
      this.totalPage = Math.floor(this.totalCount / this.perPage) + (this.totalCount % this.perPage > 0 ? 1 : 0);

      // 시작페이지와 끝페이지 구하기
      this.startPage = Math.floor((this.currentPage - 1) / this.perBlock) * this.perBlock + 1;
      this.endPage = this.startPage + this.perBlock - 1;
      // 마지막 블럭은 endPage를 totalPage로 해놔야 한다.
      if (this.endPage > this.totalPage)
          this.endPage = this.totalPage;

      // mysql은 첫 글이 0번이므로 +1 안해도됨 (오라클은 1번)
      this.start = (this.currentPage - 1) * this.perPage;

      this.no = this.totalCount - (this.currentPage - 1) * this.perPage;

      let url=URL+"/plan/allgroupnum?start=" + this.start + "&perPage=" + this.perPage;

      axios.get(url)
      .then(res=>{
        console.log("데이터 ; " + res.data);
          this.setState({
            allList:res.data
              
          });
      }).catch(err=>{
          console.log("리스트 오류:"+err);
        })
  }

    

    componentDidMount(){
      window.scrollTo(0, 0);
        this.getGroupnum();
        this.getTotalCount();
       //this.getPlan();
    }


    getGroupData=()=>{
      let url=URL+"/plan/groupdata?groupnum="+this.props.row.groupNum;
      // console.log("그룹넘버 : " + this.props.row.groupNum);
      axios.get(url)
      .then(res=>{
          // console.log(res.data[0].memId);

          this.setState({
              clist:res.data,
              id: res.data[0].memId
          });

          console.log(this.state.id);
          this.getProfile();
      }).catch(err=>{
          console.log("목록 오류:"+err);
        })
  }


    render() {

        const settings = {
            //dots: true,  // 점은 안 보이게
            infinite: true, // 무한으로 즐기게
            speed: 500,
            slidesToShow: 1, //4장씩 보이게 해주세요
            slidesToScroll: 1, //1장씩 넘어가세요
          };
        
        
        return (
            
                
            <div className="react-out">
            <div className="react-body">
             <div className="detailTitle">
              <span className="detailTitleContent" style={{backgroundColor:'white',color:'#036E38'}}>
                    &nbsp;&nbsp;일정 공유게시판&nbsp;&nbsp;
                </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    새로운 사람과 제주도 여행을 같이 하고 싶다! <br/>
                    여러분만의 일정을 다른 사람들과 공유해보세요!
                    <br/>
                  <br/>
                  동행이 필요하세요? 나와 일정이 비슷한 동행에게 채팅서비스를 이용해보세요.
                  <br/>
                  <input type="date" className="wishday form-control" ref="wishday"  onChange={this.getGroup.bind(this)}/>
                </div>
                
            <div className="shareplanSlideTitle">
              <strong>오늘 기준 가까운 날짜의 공유된 일정입니다.</strong>
            </div>
                
                {/* <strong>오늘 이후의 등록된 일정입니다.</strong>  */}
                
                  
                
                  <div className="share-slide-list-bar">
                    <div className="share-slide-list-box">
                        <br/>
                      
                        {this.state.glist==''?
                        <div>찾으시는 날짜에 공유된 정보가 없습니다.</div>
                      : 
                      <Slider {...settings}>
                      {this.state.glist.map((row)=>(
                          <SharePlanRoot row={row} day={this.refs.wishday.value}></SharePlanRoot>
                      ))}
                  </Slider>
                      }
                      
                      </div>
            
                  </div>
            
            </div>
            
            {/* <hr/> */}
            <div className="detailTitle" id="allList">
              <span className="detailTitleContent" style={{backgroundColor:'white',color:'#036E38'}}>
                    &nbsp;&nbsp;전체 리스트&nbsp;&nbsp;
                </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    회원분들이 올리신 모든 공유 리스트 목록입니다.<br/>
                    괜찮은 일정을 내 일정으로 ~
                    <br/>
                </div>
            {/* <div> */}
              {/* <Grid container> */}
              

                  <div id="SharePlanAllList" style={{margin: '0 auto'}}>
                  <Box
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="center"
                                width="100%"
                                className="SharePlanTableBox">
                      {this.state.allList.map((row)=>(
                          <SharePlanTable row={row} pageNum={this.state.pageNum}></SharePlanTable>
                          // <Box className="SharePlanTableProfile">

                          //   {row.groupNum}
                          // </Box>
                      ))} 
                </Box>
                  </div>
                <SharePlanPage paginate={this.paginate.bind(this)} startPage={this.startPage} endPage={this.endPage} 
                    currentPage={this.currentPage} totalPage={this.totalPage}/>
              {/* </Grid> */}
            {/* </div> */}
          </div>
        
           
          
        );    
           
    }

}

export default SharePlanPageComp;
