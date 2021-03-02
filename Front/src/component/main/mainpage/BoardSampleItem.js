import React, {Component} from "react";
import axios from 'axios';
import {Route, Link} from "react-router-dom";
import {URL} from "../../../redux/config";
import Paper from "@material-ui/core/Paper";

class BoardSampleItem extends Component {

    render() {
        const {row} = this.props;
        return (
            <Paper elevation={3}>
                {row.title}
                <img src={row.thumbnail} alt="profile"/>
            </Paper>        
        )        
    }
}

export default BoardSampleItem;

