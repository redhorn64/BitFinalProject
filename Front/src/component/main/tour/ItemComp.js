import React,{Component} from 'react';
import './TourCss.css';
import Box from '@material-ui/core/Box';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from 'axios';
import {URL} from '../../../redux/config';

class ItemComp extends Component {

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
        const addr = row.roadaddr!=null?row.roadaddr.split(" "):row.addr!=null?row.addr.split(" "):"";
        
        return (

            <Box m={1} id="itemBox">
                <div style={{cursor: 'pointer'}} onClick={
                    ()=>{
                        this.props.history.push("/tour/" + row.contentsid);
                    }
                }>
                    <img id="itemImg" src={row.thumbnail} alt=""></img><br/>
                    <div id="itemTitle" style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                        <b style={{color:'#888'}}>{row.title}</b><br/>  
                    </div>
                    <div id="itemContentDiv">
                        <p id="itemContent" style={{fontWeight:'500', color:'#888', overflow:'hidden'}}>{row.introduction}</p>
                    </div>
                </div>
                
                <div id="itemLikes" style={{backgroundColor:'#FaFaFa', color:'#aaa'}}>
                    <ThumbUpAltIcon id="tourThumbIcon" style={{cursor: 'pointer'}} onClick={this.updateLikes.bind(this)}/>&nbsp;&nbsp;{row.likes}
                    {/* <span id="itemAddr" style={{float:'right', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>
                        <LocationOnIcon id="tourLocationIcon"/>&nbsp;{addr[addr.length-2]}&nbsp;{addr[addr.length-1]}
                    </span> */}
                    <span style={{float:'right'}}><span class="fas fa-star" style={{color: "#F0CD58"}}></span>&nbsp;{row.star}</span>
                </div>
            </Box>
        );
    }
}

export default ItemComp;