import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";

class MyWishlist extends Component {

    constructor(props) {
        super(props);
        // console.log("MyWishlist constructor", props);

    }
    render() {
        // console.log("MyWishlist render()", this.props);

        return (
            <div>
                나의 예약
            </div>
         )
     }
}
export default MyWishlist;