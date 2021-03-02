import React, {Component} from "react";
import '../ShipPageCss.css';

class ShipIntro extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let month = this.props.month==1?"1~2월, 11,12월":this.props.month==2?"3월, 10월":this.props.month==3?"4월, 9월":
            this.props.month==4?"5 ~ 8월":this.props.month==11?"1~3월, 10~12월":"4월 ~ 9월";
        return (
            <div>
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor: 'white', color: '#036E38'}}>
                        &nbsp;&nbsp;배편 시간표&nbsp;&nbsp;
                    </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    <b style={{color: '#555'}}>{this.props.title}</b> 배편 <b style={{color: '#555'}}>{month}</b> 날짜별 시간과 요금 정보입니다.<br/>
                </div>
            </div>
        )
    }
}

export default ShipIntro;