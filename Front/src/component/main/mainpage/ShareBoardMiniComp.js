import React, {Component} from "react";
import PlusImg from "../../../image/plus.png";

class ShareBoardMiniComp extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <br/>
                <h5>공유게시판</h5>
                <button>
                    <img src={PlusImg}
                         style={{width: "50px"}}
                    />
                </button>
                <table className="shareBoardList">
                    <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.list.map(function (e, i) {
                        // console.log(i, e);
                        if (i < 5) {
                            return (
                                <tr key={i}>
                                    <td>
                                        <a href="#">
                                            <span>{e.subject}</span>
                                        </a>
                                    </td>
                                    <td>{e.writeday}</td>
                                </tr>
                            );
                        } else {

                        }
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default ShareBoardMiniComp;
