import React,{Component} from 'react';
import {Route, Link} from "react-router-dom";
import axios from "axios";
import {URL} from '../../../redux/config';
import store from "../../../redux/store";
import moment from 'moment';

class BoardItem extends Component
{
    updateStar=()=>{
        let url = URL + "/notice/updatestar?num=" + this.props.row.num;

        if(store.getState().loginId==='admin'){
            axios.get(url)
            .then(res=>{
                this.props.list();
            }).catch(err=>{
                console.log("notice updateStar 오류 : " + err)
            })
        }
        
    }

    render(){
        const {row, idx, history}=this.props;
        let color = row.star == 1?"#fafafa":"";
        const day = moment(row.writeday).format('YYYY-MM-DD');
        return(
            
            <tr style={{backgroundColor: color}}>
                <td align='center'>{idx}</td>
                
                    <td>
                        
                        <Link to={`/notice/content/${row.num}`}>{row.subject}</Link>
                    </td>
                <td align='center'>{day}</td>
                <td align='center'>{row.star==1?<span style={{cursor: 'pointer'}} onClick={this.updateStar.bind(this)}>⭐</span>
                    :<span className="far fa-star" style={{cursor: 'pointer'}} onClick={this.updateStar.bind(this)}></span>}</td>

            </tr>


        )
    }
}

export default BoardItem;