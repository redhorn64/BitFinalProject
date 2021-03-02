import React, {Component} from "react";


class Tour extends Component{
    constructor(props) {
        super(props);
        this.props.setMainView("tour");
    }

    render() {
        return (
            <div>
                {/*<b>관광명소</b>*/}
            </div>
        )
    }

}

export default Tour;
