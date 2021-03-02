import React,{Component} from 'react';
import './style/RCA.css';
import DayDetail from './DayDetail';
import Header from './Header';

class DayItem extends Component {
    

    constructor(props){
        super(props);

        // this.state={
        //     // sharelist:[],
        //     // spotlist:[],
            
        // };

    }
    // rendervalue=()=>{
    //     return this.props.row.shareNum===null?0:'';
    // }

    // getShare=()=>{
    //     let url=URL+"/wish/sharesubject?num="+(this.props.row.shareNum!==null?'':0);
    //     axios.get(url)
    //     .then(res=>{
    //         this.setState({
    //             sharelist:res.data
    //         });
    //     }).catch(err=>{
    //         console.log("목록 오류:"+err);
    //     })
    // }

    // componentDidMount(){
    //     this.getShare();
    // }

    // componentWillUnmount(){
    //     console.log("Day Item willmount");
    // }

    // spot(){
    //     let url = URL + "/spot/select?contentsid=" + this.props.row.spotId;
    // }

    render() {
        
        const {row} = this.props;
        
        var dayInfo = this.props.dayInfo;
        var selectDay = new Date(dayInfo.getYear, dayInfo.getMonth-1, dayInfo.getDay);
        var wishday=""+row.wishday;
        var y = wishday.substr(0,4);
        var m = wishday.substr(5,2);
        var d = wishday.substr(8,2);

        var aroundId=row.aroundId;
        var category=row.content;
        var today = new Date(y, m-1, d);
        var betweenDay = selectDay.getTime() - today.getTime(); 
        var tag = betweenDay==0?<DayDetail row={this.props.row}/>:"";
        
        return (
            <span style={{color: 'black', fontWeight: '300'}}>
                {tag}
               
            </span>
        );
    }
}

export default DayItem;