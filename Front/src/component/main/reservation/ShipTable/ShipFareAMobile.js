import React, {Component} from "react";
import ShipFareNotice from "./ShipFareNotice";

class ShipFareAMobile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <table class="table table-bordered">
                    <caption style={{captionSide: 'top'}}>총괄 요금표</caption>
                    <thead>
                        <tr>
                            <td rowSpan="2">구분</td>
                            <td rowSpan="2">왕복요금</td>
                            <td colSpan="2">편도요금</td>
                        </tr>
                        <tr>
                            <td>들어갈때</td>
                            <td>나올때</td>
                        </tr>
                    </thead>
                        <tr>
                            <td>성인</td>
                            <td>10,500원</td>
                            <td>6,000원</td>
                            <td>4,500원</td>
                        </tr>
                        <tr>
                            <td>중고등학생</td>
                            <td>10,100원</td>
                            <td>5,600원</td>
                            <td>4,500원</td> 
                        </tr>
                        <tr>
                            <td>경로,장애인,유공자</td>
                            <td>9,000원</td>
                            <td>4,500원</td>
                            <td>4,500원</td>
                        </tr>
                        <tr>
                            <td>초등학생</td>
                            <td>3,800원</td>
                            <td>2,300원</td>
                            <td>1,500원</td>
                        </tr>
                        <tr>
                            <td>3~7세</td>
                            <td>3,000원</td>
                            <td>1,500원</td>
                            <td>1,500원</td>
                        </tr>
                        <tr>
                            <td>경차</td>
                            <td>21,600원</td>
                            <td>12,800원</td>
                            <td>8,800원</td>                            
                        </tr>
                        <tr>
                            <td>중소형,9인승 이하 승합</td>
                            <td>26,000원</td>
                            <td>15,000원</td>
                            <td>11,000원</td>  
                        </tr>
                        <tr>
                            <td>대형(그렌져이상,수입차)12인승 이하 승합</td>
                            <td>30,400원</td>
                            <td>17,200원</td>
                            <td>13,200원</td> 
                        </tr>
                        <tr>
                            <td>15인승 이하 승합</td>
                            <td>37,000원</td>
                            <td>20,500원</td>
                            <td>16,500원</td> 
                        </tr>
                        <tr>
                            <td>카운티,25인승 이하</td>
                            <td>61,000원</td>
                            <td>33,500원</td>
                            <td>27,500원</td>
                        </tr>
                    <tbody>
                                           
                    </tbody>
                </table>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <td rowSpan="2">구분</td>
                            <td colSpan="3">요금 상세안내</td>
                        </tr>
                        <tr>
                            <td>선박요금</td>
                            <td>도립공원입장료</td>
                            <td>터미널이용료</td>
                        </tr>
                    </thead>
                        <tr>
                            <td>성인</td>                          
                            <td>4,500원</td>
                            <td>1,000원</td>
                            <td>500원</td>
                        </tr>
                        <tr>
                            <td>중고등학생</td>                           
                            <td>4,500원</td>
                            <td>800원</td>
                            <td>300원</td>
                        </tr>
                        <tr>
                            <td>경로,장애인,유공자</td>                       
                            <td>4,500원</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>초등학생</td>                           
                            <td>1,500원</td>
                            <td>500원</td>
                            <td>300원</td>
                        </tr>
                        <tr>
                            <td>3~7세</td>                          
                            <td>1,500원</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>경차</td>                           
                            <td>8,800원</td>
                            <td>4,000원</td>
                            <td rowSpan="5">*렌터카 불가(장애인,노약자,임산부,영유아 탑승시 가능)</td>
                        </tr>
                        <tr>
                            <td>중소형,9인승 이하 승합</td>                            
                            <td>11,000원</td>
                            <td>4,000원</td>
                        </tr>
                        <tr>
                            <td>대형(그렌져이상,수입차)12인승 이하 승합</td>                         
                            <td>13,200원</td>
                            <td>4,000원</td>
                        </tr>
                        <tr>
                            <td>15인승 이하 승합</td>                          
                            <td>16,500원</td>
                            <td>4,000원</td>
                        </tr>
                        <tr>
                            <td>카운티,25인승 이하</td>                          
                            <td>27,500원</td>
                            <td>6,000원</td>
                        </tr>
                    <tbody>
                                           
                    </tbody>
                </table>
                <br/>
                <ShipFareNotice/>
            </div>
        )
    }
}

export default ShipFareAMobile;