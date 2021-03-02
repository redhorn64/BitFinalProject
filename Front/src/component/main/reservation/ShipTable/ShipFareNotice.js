import React, {Component} from "react";

class ShipFareNotice extends Component {
    constructor(props) {
        super(props);
        console.log("ShipFareNotice constructor", props);
    }
    render() {
        return (
            <div className="ShipNotice">
                <b>제주 도민은 공원입장료가 무료이므로 필히 신분증 제시 바랍니다.</b><br/>
                📢 이륜차(오토바이,자전거,전동스쿠터 등 기타차량) 및 화물차량은 별도문의 바랍니다.<br/>
                📢 승선선박명 : 우도사람1,2호, 우도훼리호, 우일카훼리, 우일훼리호, 우도랜드1,2호
            </div>
        )
    }
}

export default ShipFareNotice;