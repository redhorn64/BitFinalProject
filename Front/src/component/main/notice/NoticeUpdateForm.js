import React, { Component } from 'react';
import axios from "axios";
import {URL} from '../../../redux/config';
import './NoticeCss.css';
import 'codemirror/lib/codemirror.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';


class NoticeUpdateForm extends Component
{
    editorRef = React.createRef();

    constructor({match}, props){
        super(props);

        this.state={
            subject: '',
            content:'',
            thumbnailchekck: 0
        }

        this.num = match.params.num;
    }

    onSelectData=()=>{
        let url= URL + "/notice/detail?num=" + this.num;
    
        axios.get(url)
        .then(res=>{
            this.setState({
                subject : res.data.subject,
                content : res.data.content
            })
            this.editorRef.current.getInstance ().setHtml(this.state.content, false);
            // console.log(this.state.content);
        }).catch(err=>{
            console.log("notice content 오류 : " + err);
        })
    }   

      
    onDataUpdate=()=>{
        let num = this.num;
        let subject = this.state.subject;
        let content = this.editorRef.current.getInstance().getHtml();
        let id = '관리자';

        let url = URL + "/notice/update";

        axios.post(url, {num,id,subject,content})
        .then(res=>{
            this.props.history.push("/notice/content/" + this.num);
        }).catch(err=>{
            console.log("notice update 오류 : " + err)
        })

    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    uploadImage(blob) {

        let formData = new FormData();
        formData.append('uploadFile', blob);
        let url = URL + '/notice/upload';

        return axios(url, {
            method: 'POST',
            data: formData,
            headers : {'Content-type' : 'multipart/form-data' }
        }).then(response => {
            if (response.data) {
              if(this.state.thumbnailcheck === 0) {
                this.setState({
                  thumbnailchekck : 1,
                  thumbnail : response.data.photoname
                })
              }
                return response.data.photoname;
            }
            throw new Error('Server or network error');
        });  
    };
    
     
    
    onAddImageBlob(blob, callback) {
        this.uploadImage(blob)
            .then(response => {
                if (!response) {
                    throw new Error('Validation error');
                }
                else callback(response, "alt text");
            }).catch(error => {
                console.log(error);
            });

    };

    componentWillMount() {
        window.scrollTo(0, 0);
        // console.log("content willmount");
        this.onSelectData();
    }


    render(){
        return (
            <div className="noticeInsertTable noticePageDiv">
                <table className="table table-bordered">
                    <caption style={{captionSide: 'top', textAlign: 'center'}}><b>공지사항 수정</b></caption>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" className="form-control" name="subject" placeholder="제목" value={this.state.subject}
                                     onChange={this.handleChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {/* <textarea style={{width:'280px',height:'80px'}} name="content" onChange={this.handleChange.bind(this)}></textarea> */}
                                <Editor
                                    previewStyle="vertical"
                                    height="300px"
                                    initialEditType="wysiwyg"
                                    ref={this.editorRef}
                                    hooks={{

                                        addImageBlobHook: async (blob, callback) => {
                        
                                          const upload = await this.uploadImage(blob);
                        
                                          callback(URL + "/" + upload, "alt text");
                        
                                          return false;
                        
                                        }
                        
                                    }}
                                    />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{textAlign: 'center'}}> 
                    <button type="button" class="btn btn-dark-green" onClick={this.onDataUpdate.bind(this)}>수정</button>
                </div>
            </div>
        )
    }   
}
    
export default NoticeUpdateForm;