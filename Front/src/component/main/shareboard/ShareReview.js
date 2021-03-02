import React, {Component, useState} from 'react';
import axios from "axios";
import {URL} from '../../../redux/config';
import ReviewItem from './ReviewItem';
import store from "../../../redux/store";
import { MDBIcon } from 'mdbreact';

class ShareReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listData: []
        }
        this.regroup = this.props.regroup;

        //글 추가가 되면 자동 호출되게끔 subscribe 등록.
        store.subscribe(this.getAnswerList.bind(this));
    }

    getAnswerList = () => {
        //댓글 출력하는 함수.
        let url = URL + "/share/answer" +
            "?regroup=" + this.regroup;
        // console.log(url);

        axios.get(url
        ).then(res => {
            // console.log(res);
            this.setState({
                listData: res.data
            });
        }).catch(err => {
            console.log(err);
        })

    }

    componentDidMount() {
        this.getAnswerList();
    }

    render() {
        return (
            <div>
                
                <hr/>
                {
                    this.state.listData.map((row, idx) => {
                        return (
                            <ReviewItem row={row} key={idx} idx={idx}
                                        history={this.props.history}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default ShareReview;
