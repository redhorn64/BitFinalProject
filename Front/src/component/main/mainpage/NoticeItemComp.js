import React, {Component} from "react";
import {Box} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
// import '../tour/TourCss.css';
import './EtcBoardComp.css';

class NoticeItemComp extends Component {

    constructor(props) {
        super(props);

        // this.paperRoot = {
        //     display: "flex",
        //     flexWrap: "wrap",
        //     "& > *": {
        //         margin: "10px",
        //         padding: "10px",
        //         width: "300px",
        //         height: "400px",
        //         overflow: "hidden",
        //     }
        // }
    }

    showDetailNotice = ()=>{

    }

    /*
    * content: "글 올립니다 올려요"
    num: "32"
    readcount: 22
    star: "0"
    subject: "글 테스트용 올려요"
    writeday: "2020-12-09 02:06"
    * */
    render() {
        const {row} = this.props;
        let codes = row.content;
        console.log(row);


        return (
            // <Box m={1} id="NoticeitemBox">
                <div className="NoticeitemBox" style={{
                    cursor: 'pointer',
                    
                }}
                     onClick={()=>{this.props.history.push("/notice/content/" + row.num)}}
                >
                    
                    <div className="NoticeitemTitle"
                         style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                    >
                        <b style={{color: '#888'}}
                        >{row.subject}
                        </b><br/>
                    </div>
                   <div className="NoticeitemContentDiv">
                        <p className="NoticeitemContent"
                           style={{fontWeight: '500', color: '#888', overflow: 'hidden'}}
                           dangerouslySetInnerHTML={ {__html: codes} }
                        >
                        </p>
                    </div>
                    <div className="NoticeitemContentDiv">
                        <p className="NoticeitemContent"
                           style={{fontWeight: '500', color: '#888', overflow: 'hidden'}}
                        >{row.writeday}
                        </p>
                    </div>
                </div>
            // </Box>
        )
    }
}

export default NoticeItemComp;
