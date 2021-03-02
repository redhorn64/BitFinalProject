import axios from 'axios';
import React,{Component}  from 'react';
import {URL} from '../../../redux/config';
import './NoticeCss.css';
import store from "../../../redux/store";

class NoticeContent extends Component
{
    constructor({match})
    {
        super();
        
        this.state={
            selectData:''
        }
        this.num = match.params.num;
    }

    onSelectData=()=>{
        let url= URL + "/notice/detail?num=" + this.num;
    
        axios.get(url)
        .then(res=>{
            this.setState({
                selectData:res.data
            })
        }).catch(err=>{
            console.log("notice content 오류 : " + err);
        })
    }   

    onDeleteData=()=>{
        let url= URL + "/notice/delete?num=" + this.num;
    
        if(window.confirm("삭제하시겠습니까?")){
            axios.get(url)
            .then(res=>{
                this.props.history.push("/notice/1");
            }).catch(err=>{
                console.log("notice delete 오류 : " + err);
            })
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        // console.log("content willmount");
        this.onSelectData();
    }

    render(){
        // let url=document.getElementById("url").textContent
        const {selectData}=this.state;


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
                <br/>
                <div className="noticeTable" style={{margin: '0 auto'}}>
                    {store.getState().loginId=='admin'?
                    <div style={{float: 'right'}}>
                         <a href={`/notice/update/${this.num}`} style={{color: 'gray'}}>수정</a>&nbsp;/&nbsp;
                        <span style={{color: 'gray', cursor: 'pointer'}} onClick={this.onDeleteData.bind(this)}>삭제</span>
                    </div>:""    
                    }
                    <table className="table">
                        <thead>
                            <tr>
                                <td align="center">
                                    <b>{selectData.subject}</b>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div dangerouslySetInnerHTML={ {__html: selectData.content} } className="noticeContentEditor"></div>
                                </td>
                            </tr>
                            <tr>
                                <td align='center'>
                                    <button type="button" class="btn btn-dark-green" onClick={()=>{
                                        this.props.history.goBack();
                                    }}>목록</button>
                                    {/* <button type="button" className="btn btn-success btn-sm" style={{marginLeft:'100px',width:'100px'}}
                                        onClick={
                                            ()=>{
                                                this.props.history.push("/notice/update/" + this.num);
                                            }
                                        }>수정</button>
                                    <button type="button" className="btn btn-success btn-sm" style={{marginLeft:'100px',width:'100px'}}
                                        onClick={this.onDeleteData.bind(this)}>삭제</button> */}

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
}

export default NoticeContent;