import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReviewList from './ReviewList';
import './style/MyReviewCss.css';
import ReviewPage from './ReviewPage';
import store from '../../../redux/store';

class MyReview extends Component {

    constructor(props){
        super(props);

        this.state={
            pageNum: 1,
            reviewList: []
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
        this.getMyReview();
    }

    getTotalCount = () => {

        let url = URL + "/wish/count?memNum=" + store.getState().loginId;

        axios.get(url)
            .then(res => {
                this.totalCount = res.data;
                this.getMyReview();
            }).catch(err => {
            console.log("mypage review getTotalCount 오류 : " + err);
        })
    }

    getMyReview = () => {
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
        
        let url = URL + '/wish/myreview?start=' + this.start + '&end=' + this.perPage + '&memNum=' + store.getState().loginId;
        axios.get(url)
            .then(response => {
                // console.log(response.data);
                this.setState({
                    reviewList: response.data
                })
            }).catch(err => {
            console.log("목록 오류:" + err);
        })
  
    }
    componentDidMount() {
        this.getTotalCount();
    }

    render() {
        // console.log("MyReview render()", this.props);
        // let photoCol = '';
        // if (matchMedia("screen and (min-width:400px)").matches) {
        //     photoCol = <TableCell align="center" className="mypageReCol">photo</TableCell>;
        // }
        const tag = this.state.reviewList==''?<div style={{textAlign: 'center', margin: '10px'}}><b className="mypageReCol">등록된 review가 없습니다.</b></div>:""; 

        return (
            <div id="MyPageReview">
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38'}}>
                        &nbsp;&nbsp;&nbsp;나의 리뷰&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
                <br/>
                <div className="detailIntro" style={{color: "#888", textAlign: 'center', marginBottom: '0px'}}>
                    회원님이 작성하신 Review 목록입니다.
                </div>
                <Paper id="mypageReview">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="mypageReCol">#</TableCell>
                                {/* {photoCol} */}
                                <TableCell align="center" className="mypageReCol">review</TableCell>
                                <TableCell align="center" className="mypageReCol">star</TableCell>
                                <TableCell align="center" className="mypageReCol">date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.reviewList.map((row, idx)=>(
                                <ReviewList row={row} idx={(this.currentPage-1)*this.perPage + idx+1}/>
                            ))}
                            {/* {this.state.reviewList ? this.state.reviewList.map(r, idx => {
                            return <ReviewList key={r.num} num={r.num} photo={r.photo} content={r.content} memNum={r.memNum} idx={idx} 
                            star={r.star} likes={r.likes} contentsid={r.contentsid} writeday={r.writeday} history={this.props.history}/>
                            }) : ''} */}
                        </TableBody>
                    </Table>
                {tag}
                </Paper>
                <ReviewPage paginate={this.paginate.bind(this)} startPage={this.startPage} endPage={this.endPage} 
                    currentPage={this.currentPage} totalPage={this.totalPage}/>
            </div>              
        );
    }
}
        
export default MyReview;