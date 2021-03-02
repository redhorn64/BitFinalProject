import React, {Component} from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Box from "@material-ui/core/Box";
import '../tour/TourCss.css';

class ShareRestaurantItemComp extends Component {

    constructor(props) {
        super(props);

    }

    getStars = (starCnt) => {
        console.log(starCnt);
        if ((typeof starCnt) == "number") {
            starCnt = Number(starCnt);
        }

        let strStar = "";

        for (let i = 0; i < starCnt; i++) {
            strStar += "⭐️";
        }

        return strStar;
    }

    /*
    * addr: "제주도 어딘가"
    content: "분위기 좋고 예뻐요 ㅎㅎ 인스타용 카페"
    id: "minjj"
    likes: 0
    num: "309"
    photo: "11"
    regroup: 309
    relevel: 0
    restep: 0
    star: "5"
    subject: "레이식당"
    writeday: "2020-12-09"
    * */
    render() {
        const {row} = this.props;
        console.log(row);
        return (
            <Box m={1} id="itemBox">
                <div style={{cursor: 'pointer'}} onClick=""
                >
                    <img id="itemImg" src={row.photo} alt=""></img><br/>
                    <div id="itemTitle" style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                        <b style={{color: '#888'}}>{row.subject}</b><br/>
                    </div>
                    <div id="itemContentDiv">
                        <p id="itemContent"
                           style={{fontWeight: '500', color: '#888', overflow: 'hidden'}}>{row.content}</p>
                    </div>
                </div>

                <div id="itemStar" style={{backgroundColor: '#FaFaFa', color: '#aaa', height:"30px"}}>
                    {/*<ThumbUpAltIcon id="tourThumbIcon" style={{cursor: 'pointer'}} onClick={this.updateLikes.bind(this)}/>&nbsp;&nbsp;{row.likes}*/}
                    별점 : {this.getStars(row.star)}
                </div>
            </Box>
        )
    }
}

export default ShareRestaurantItemComp;
