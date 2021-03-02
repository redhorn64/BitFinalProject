import React, {Component, Fragment} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardFormComp from "./ShareBoardFormComp";
import ShareBoardRowItem from "./ShareBoardRowItem";
import {URL, actionType} from '../../../redux/config';
import {MDBBtn} from "mdbreact";
import axios from "axios";
import store from "../../../redux/store";
import Box from "@material-ui/core/Box";
import PageComp from "../tour/PageComp";
import SearchIcon from '@material-ui/icons/Search';


class ShareBoardPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("ShareBoardPageComp constructor", this.props);
        this.state = {
            // area: match.params.name,
            listData: [],
            pageNum: props.match.params.pageNum,
        }
        store.dispatch({
            type: actionType.shareBoardUpdate,
        });

        this.currentPage = this.state.pageNum;
        this.totalCount = 0;
        this.perPage = 6; // 한페이지당 보여질 글의 갯수
        this.perBlock = 3; // 한블럭당 출력할 페이지의 갯수
        this.totalPage = 0; // 총 페이지의 갯수
        this.startPage = 0; // 각 블럭당 시작 페이지 번호
        this.endPage = 0; // 각 블럭당 끝페이지 번호
        this.start = 0; // 각 블럭당 불러올 글의 시작번호
        this.end = 0; // 각 블럭당 글의 끝번호
        this.no = 0; // 각 페이지에서 출력할 시작번호

        this.select = 'star';
    }

    getShareListByPaging = () => {
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

        let url = URL + "/share/list" +
            "?start=" + this.start +
            "&perPage=" + this.perPage;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("getShareListByPaging() res", res);
            this.setState({
                listData: res.data
            })
        }).catch(err => {
            console.log("getShareListByPaging() err", err);
        });

    
    }

    getTotalCount = () => {
        let url = URL + "/share/count";

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log("getTotalCount res : ", res);
                this.totalCount = res.data;
                this.getShareListByPaging();
            }).catch(err => {
            console.log("getTotalCount err : ", err);
        })
    }

    getSearchShareListByPaging = () => {
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

        let url = URL + "/share/search" +
            "?start=" + this.start +
            "&perPage=" + this.perPage +
            "&search=" + this.refs.search.value;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("searchShareList() res", res);
            this.setState({
                listData: res.data
            });
        }).catch(err => {
            console.log("searchShareList() err", err);
        });
    }

    getSearchTotalCount = () => {
        let url = URL + "/share/searchcount" +
            "?search=" + this.refs.search.value;

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log("getSearchTotalCount res : ", res);
                this.totalCount = res.data;
                this.getSearchShareListByPaging();
            }).catch(err => {
            console.log("getSearchTotalCount err : ", err);
        })
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.getTotalCount();
    }

    render() {
        const { photoIndex, isOpen, images } = this.state;
        
        return (
            <div id="ShareBoardPage">
                
                {/* 제목 */}
                {/* <div style={{margin: "0 auto", marginLeft: "45%", marginTop: '1%', marginBottom: '4%'}}>
                    <h3 id="sharesubject">맛집 공유게시판</h3>
                </div> */}
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor: 'white', color: '#036E38'}}>
                        &nbsp;&nbsp;맛집 공유게시판&nbsp;&nbsp;
                    </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    나만 아는 숨음 맛집! 돈쭐 내주고 싶은 맛집!<br/>
                    회원분들끼리 공유하는 공간입니다.<br/>
                    
                    {/*/!* 공유버튼 *!/*/}
                    <MDBBtn color="dark-green" type="button"
                            className="ShareListBtn"
                            style={{marginTop: '1.3%', color: 'white'}}
                            onClick={() => {
                                console.log("share Restaurant");
                                if (store.getState().loginId != null && store.getState().loginId != "") {
                                    this.props.history.push("/share/insert");
                                } else {
                                    let _result = window.confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?");

                                    if (_result) {
                                        this.props.history.push("/login");
                                    }
                                }
                            }}
                    > 맛집공유
                    </MDBBtn>
                </div>
                <br/><br/><br/>

                
                <div className="ShareSearchForm">

                    <MDBBtn color="dark-green"
                            className="ShareListBtn"
                            onClick={
                                () => {
                                    this.setState({
                                        pageNum: 1,
                                    });
                                    this.currentPage = 1;
                                    this.getTotalCount();
                                    this.refs.search.value = "";
                                }
                            }
                            style={{float: 'left', marginLeft: '7%'}}>
                        전체글
                    </MDBBtn>

                    <MDBBtn size="sm" color="dark-green"
                        className="ShareSearchBtn"
                        style={{float: 'right'}}
                            onClick={
                                () => {
                                    this.setState({
                                        pageNum: 1,
                                    });
                                    this.currentPage = 1;
                                    this.getSearchTotalCount();
                                }
                            }
                    >
                        {/* <b>검색</b> */}
                        <SearchIcon/>
                    </MDBBtn>

                    <input type="search" className="form-control ShareListSearch" ref="search"
                           style={{float: 'right'}}
                           onKeyDown={(e) => {
                               // console.log(e);
                               if (e.code == "Enter") {
                                   this.setState({
                                       pageNum: 1,
                                   });
                                   this.currentPage = 1;
                                   this.getSearchTotalCount();
                               }
                           }}
                    />
                </div>


                {/* 게시판 폼 */}
                <Box display="flex"
                     flexWrap="wrap"
                     p={1}
                     m={1}
                     bgcolor="background.paper"
                     justifyContent="center"
                     css={{maxWidth: '100%'}}
                >
                    {
                        this.state.listData.map((row, idx) => (
                            <ShareBoardRowItem row={row} key={idx}
                                               list={this.getShareListByPaging.bind(this)}
                                               history={this.props.history}
                                               currentPage={this.currentPage}
                            />
                        ))
                    }
                </Box>

                {/* 페이징 */}
                <PageComp currentPage={this.currentPage}
                          startPage={this.startPage} endPage={this.endPage}
                          totalPage={this.totalPage}
                          type="share_restaurant"
                ></PageComp>
            </div>
        )
    }

}

export default ShareBoardPageComp;
