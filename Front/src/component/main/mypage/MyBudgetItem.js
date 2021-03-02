import React,{Component} from 'react';
import axios from 'axios';
import {URL} from '../../../redux/config';

class MyBudgetItem extends Component
{
    constructor(props) {
        super(props);
        console.log("MyBudgetItem constructor", props);
        this.state={
            memId:'',  
            content:'',
            shareNum:'',
            spotId:'',
            aroundId:'',
            money: '',
            wishday:'',
            wishtime:'',
            num:'',
            spot:'',
            share:''
        };
    }
    getShare=()=>{
        let url=URL+"/wish/sharesubject?num="+ this.props.row.shareNum;
        axios.get(url)
        .then(res=>{
            this.setState({
                share:res.data
            });
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }

    getSpot=()=>{
        let url=URL+"/wish/spottitle?contentsid="+ this.props.row.spotId;
        axios.get(url)
        .then(res=>{
            // console.log(res.data);
            this.setState({
                spot:res.data
            });
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }    

    componentDidMount(){
        if(this.props.row.shareNum!==null){
            this.getShare();
            // this.setState({
            //     sharelist:this.state.list
            // })
        }
        else if(this.props.row.spotId!==null){
            this.getSpot();
            // this.setState({
            //     spotlist:this.state.list
            // })
        }
    }

    render(){
        const {row}=this.props;      
        var budget = row.aroudId!=null?row.aroudId:row.shareNum!=null?this.state.share:
                    row.spotId!=null?this.state.spot:row.content;
        // var budget='';
        // if(row.aroundId!=null){
        //     budget=row.aroundId;
        // }else if(row.shareNum!=null){
        //     budget=this.state.share;
        // }else if(row.spotId!=null){
        //     budget=this.state.spot;
        // }else{
        //     budget=row.content;
        // }
        return(
            <tr>
                    <td style={{textAlign: 'center'}}>{budget}</td>
                    <td style={{textAlign: 'center'}}>{row.wishday}&nbsp;&nbsp;&nbsp;{row.wishtime}</td>
                    <td style={{textAlign: 'center'}}>{row.money}{row.money!=null?"원":""}</td>
                    <td style={{textAlign: 'center'}}>{row.capital}{row.capital!=null?"원":""}</td>
            </tr>
        )
    }
}

export default MyBudgetItem;