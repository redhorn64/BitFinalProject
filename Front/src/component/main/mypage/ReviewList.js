import React, {Component} from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import {URL} from '../../../redux/config';
import {Route, Link} from "react-router-dom";
import './style/MyReviewCss.css';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

class ReviewList extends Component {


    updateLikes = () =>{
        let url = URL + "/spot/updatelikes?contentsid=" + this.props.row.contentsid;

        axios.get(url)
            .then(res=>{
                this.props.getList();
            }).catch(err=>{
                console.log("tourlist likes 업데이트 오류 : " + err);
            })
    }


    render() {
        
        const {row}=this.props;
        const date = row.writeday.split(" ")[0];
        // const photo = row.photo=="no"?"x":<img src={row.photo} alt="profile"/>;
        const star = row.star==1?<SentimentVeryDissatisfiedIcon/>:row.star==2?<SentimentDissatisfiedIcon/>:row.star==3?<SentimentSatisfiedIcon/>
            :row.star==4?<SentimentSatisfiedAltIcon/>:<SentimentVerySatisfiedIcon/>;

        // let photoCol = '';
        // if (matchMedia("screen and (min-width:400px)").matches) {
        //     photoCol = <TableCell align="center" className="mypageReCol">{photo}</TableCell>;
        // }

        return (
           
                <TableRow> 
                
                    <TableCell align="center" className="mypageReCol">{this.props.idx}</TableCell>
                    {/* {photoCol} */}
                    <TableCell className="mypageReCol"> 
                        <Link to={`/tour/${row.contentsid}`} id="mypageReviewLink">
                            <div id="mypageReContent" style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{row.content}</div>
                        </Link>   
                    </TableCell>
                    <TableCell align="center" className="mypageReCol" style={{color: '#F0CD58'}}>{star}</TableCell>
                    <TableCell align="center" width="20%" className="mypageReCol">{date}</TableCell>
                
                </TableRow>
           
        );
    }
}
export default ReviewList;