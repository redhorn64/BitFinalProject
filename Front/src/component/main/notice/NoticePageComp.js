import React, {Component} from "react";
import BoardItem from "./BoardItem";
import axios from 'axios';
import './NoticeCss.css';
import {URL} from '../../../redux/config';
import NoticePagination from './NoticePagination';
import store from "../../../redux/store";

class NoticePageComp extends Component {
    state={
        maxNo:7,
        
    }
    
    constructor({match}){
        super();

        this.state={
            pageNum: match.params.pageNum,
            listData:[]
        }

        this.currentPage = this.state.pageNum;
        this.totalCount = 0;
        this.perPage = 5; // 한페이지당 보여질 글의 갯수
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
        this.list();
    }

    getTotalCount = () => {

        let url = URL + "/notice/count";

        axios.get(url)
            .then(res => {
                this.totalCount = res.data;
                this.list();
            }).catch(err => {
            console.log("notice getTotalCount 오류 : " + err);
        })
    }

    list=()=>{
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

        let url= URL + "/notice/list?start=" + this.start + "&perPage=" + this.perPage;
        // console.log(url);

        axios.get(url)
        .then(res=>{
            this.setState({
                listData:res.data
            })
        })
    }

    componentWillMount()
    {
        this.getTotalCount();
        window.scrollTo(0, 0);
    }
    render() {
        const {boards}=this.state;

        return (
            <div className="noticePageDiv">

            <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor: 'white', color: '#036E38'}}>
                        &nbsp;&nbsp;공지사항&nbsp;&nbsp;
                    </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    관광지나 업체, 제주도 축제 등 중요한 소식을 알려드립니다.<br/>
                </div>

                {/*<a href="#NoticeMiniComp">{this.props.name}</a>*/}
                {/* <BoardForm list={this.list.bind(this)}/> */}
                <br/>

                <div className="noticeTable" style={{margin: '0 auto'}}>
                    
                    {store.getState().loginId === 'admin'?<a href="/noticeInsert" style={{float: 'right', color:'black'}}>글쓰기</a>:""}
                    <br/>
                    <table className="table">
                        <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th style={{width:'60px', width:'5%'}}>#</th>
                            <th style={{width:'200px', width:'65%'}}>제목</th>
                            <th style={{width:'50px', width:'25%'}}>작성일</th>
                            <th style={{width:'50px', width:'5%'}}>⭐</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.listData.map((row,idx)=>(
                            <BoardItem row={row} key={idx} idx={(this.currentPage-1)*this.perPage + idx+1}
                                history={this.props.history} list={this.list.bind(this)}/>
                            ))
                        }
                        </tbody>
                    </table>
                    
                </div>
                <NoticePagination paginate={this.paginate.bind(this)} startPage={this.startPage} endPage={this.endPage} 
                    currentPage={this.currentPage} totalPage={this.totalPage}/>

            </div>
        )
    }

}

export default NoticePageComp;
