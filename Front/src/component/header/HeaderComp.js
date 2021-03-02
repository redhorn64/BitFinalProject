import React, {Component} from "react";
import {
    BrowserRouter
} from "react-router-dom";
import Menu from "./Menu";

class HeaderComp extends Component {
    constructor(props) {
        super(props);

        // console.log("HeaderComp constructor", props);
    }

    render() {
        const {logged, onLogout} = this.props;

        // console.log("HeaderComp render", this.props, this.state);

        return (
            <div className="headerComp">
                {/*<BrowserRouter>*/}
                    <Menu logged={logged}
                          onLogout={onLogout}
                          type="normal"
                    />
                {/*</BrowserRouter>*/}
            </div>
        )
    }
}

export default HeaderComp;
