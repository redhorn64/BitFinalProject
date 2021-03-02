import React, {Component} from "react";
// import BigText from '../component/BigText';
// import Header from "../component/Header";
import store from "../../../redux/store";
import {actionType, mainViewType} from "../../../redux/config";

// page init
// constructor -> componentWillMount -> render

// 다른메뉴 -> Home menu click
// constructor -> componentWillMount -> render -> componentDidMount

// Home menu 에서 -> 다른메뉴로 갈때.
// componentWillUnmount

class Home extends Component {

    constructor(props) {
        super(props);
        console.log("Home constructor", this.props, this.state, store.getState());
    }

    componentWillMount() {
        console.log("Home componentWillMount()");
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("Home componentWillUpdate()");
    }


    componentWillUnmount() {
        console.log("Home componentWillUnmount()");
    }


    render() {
        console.log("Home render()");
        return (
            <div>
                {/*<Header />*/}
                {/*<BigText>홈</BigText>*/}
            </div>
        )
    }

    componentDidMount() {
        console.log("Home componentDidMount()");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Home componentDidUpdate()");
    }

    componentWillUnmount() {
        console.log("Home componentWillUnmount()");
    }
}

export default Home;
