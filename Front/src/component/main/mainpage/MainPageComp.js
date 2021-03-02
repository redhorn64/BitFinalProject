import React, {Component} from "react";
import SearchComp from "./SearchComp";
import HotPlaceComp from "./HotPlaceComp";
import NoticeMiniComp from "./NoticeMiniComp";
import ShareBoardMiniComp from "./ShareBoardMiniComp";
import axios from "axios";
import {actionType, mainViewType, URL} from "../../../redux/config";
import "./MainPageComp.css"
import MainPhotoComp from "./MainPhotoComp";
import MyPlanComp from "./MyPlanComp";
import EtcBoardComp from "./EtcBoardComp";
import store from "../../../redux/store";

class MainPageComp extends Component {

    /**
     * props
     * setMainView={this.props.setMainView}
     */
    constructor(props) {
        super(props);
        // console.log("MainPageComp constructor", props);

        this.state = {
            shareBoardList: [],
            noticeList: [],
        }

        store.dispatch({
            type: actionType.setMainView,
            setMainView: mainViewType.MainPage,
        })

    }

    componentWillMount() {
        this.getNoticeList.bind(this)();
        this.getShareBoardList.bind(this)();
        window.scrollTo(0, 0);
    }

    getNoticeList = () => {
        // console.log("getNoticeList()");
        var url = URL + "/notice/list";

        axios.get(url
        ).then((res) => {
            // console.log("getNoticeList success : ", res);
            this.setState({
                noticeList: res.data
            });
        }).catch((error) => {
            // console.log("getNoticeList error", error);
        });
    }

    getShareBoardList = () => {
        // console.log("getShareBoardList()");
        var url = URL + "/share/list?start=0&perPage=5";

        axios.get(url
        ).then((res) => {
            // console.log("getShareBoardList success : ", res);
            this.setState({
                shareBoardList: res.data
            });
        }).catch((error) => {
            // console.log("getShareBoardList error", error);
        });
    }


    /**
     * MainPhotoComp
     * SearchComp | MyPlanComp
     * HotPlaceComp
     * EtcBoardComp
     */
    render() {
        // console.log("MainPageComp render()", this.props);
        return (
            <div id="mainHomePage">
                <MainPhotoComp/>
                <div className="mainPageComp">
                    
                    <div className="search-myplan">
                        <SearchComp history={this.props.history}/>
                        <MyPlanComp/>
                    </div>
                    <HotPlaceComp history={this.props.history}/>
                    <EtcBoardComp history={this.props.history}/>
                </div>
            </div>
            
        )
    }

}

export default MainPageComp;
