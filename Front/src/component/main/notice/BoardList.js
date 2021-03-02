import axios from 'axios';
import React,{Component} from 'react';
import PlusImg from "../../../image/plus.png";
import BoardItem from "./BoardItem"; 

class BoardList extends Component {
    state={
        listData:[]
    }

    list=()=>{
        let url="http://192.168.0.3:9002/notice/list";
        url+="board/list";
        console.log(url);
        axios.get(url)
        .then(res=>{
            this.setState({
                listData:res.data
            })
        })
    }

    componentWillMount()
    {
        this.list();
    }
    render(){
        return(
            <div>
                <table className="table table-bordered board
                boardtable" style={{width:'400px'}}>
                    <caption><b>공지사항목록</b></caption>
                    <thead>
                        <tr>
                            <th style={{width:'50px'}}>#</th>
                            <th style={{width:'50px'}}>제목</th>
                            <th style={{width:'50px'}}>작성일</th>
                            {/* <th style={{width:'50px'}}>조회수</th> */}
                            <th style={{width:'50px'}}>⭐</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.listData.map((row,idx)=>(
                                <RowItem row={row} key={idx} idx={idx}
                                history={this.props.history}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>



            //페이징처리
            
        )
    }
}

export default BoardList;