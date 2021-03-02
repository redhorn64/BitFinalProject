import React, {Component} from "react";
import axios from 'axios';
import RowItem from "./RowItem";
import store from "../../../redux/store";
import { URL, actionType, mainViewType } from "../../../redux/config";

class MemberListPageComp extends Component {
    constructor(props) {
        super(props);
        console.log("LoginPageComp constructor", props);
        
        // this.state={
        //     // id:'',  //아이디를 저장하고 있을 state
        //     // password:'',
        //     // pwCheck: "",//비밀번호 두개가 일치하는가
        //     // name : "",
        //     // birth_date: "",
        //     // phone : "",
        //     // email : "",
        //     // address : "",
        //     // idcanUse: false,//중복된 아이디찾기 true여야 로그인가능

        //     memberData: []
        // }
    }

    // 스프링에서 목록 가져오기
    list = () => {
        let url = URL + "/member/list";
        axios.get(url)
        .then(response=>{
            this.setState({
                memberData:response.data
            })
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }
    
    MEMBERLIST = () => {
        console.log("회원목록 보기 dispatch");
        let url = URL + "/member/list";
        axios.get(url)
        .then(response=>{
            this.setState({
                memberData:response.data
            })
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }

    componentDidMount() {
        // this.list(); //처음 시작시 백엔드로부터 데이타 가졍괴
        
        store.dispatch({ type: actionType.MEMBER_LIST });
        store.subscribe(this.MEMBERLIST);
    }

    

    render() {
        console.log("MemberListPageComp render()", this.props);
        return (
            <div>
                <div>
                    <b>회원 목록</b>
                    <div>
                        번호&nbsp;아이디&nbsp;이메일&nbsp;이름&nbsp;이미지&nbsp;휴대폰
                    </div>
                    {/* <div>
                        {
                            this.props.store.memberData.map((row, idx) => (
                                <RowItem row={row} key={idx} />
                            ))
                        }
                    </div> */}
                </div>
            </div>
        )
    }

}

export default MemberListPageComp;
