import React, { Component } from "react";
import { URL } from "../../../redux/config";

class RowItem extends Component
{
    render() {
        const url = URL + "/photo/";
        return (
            <div>
                (번호){this.props.row.num}&nbsp;(아이디){this.props.row.id}&nbsp;(이메일){this.props.row.email}&nbsp;(이름){this.props.row.name}&nbsp;
                <img alt="" src={url+this.props.row.photo} />
                &nbsp;(휴대폰){this.props.row.hp}
            </div>
        )
    }
}

export default RowItem;