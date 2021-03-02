import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField, InputAdornment} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {actionType, URL} from "../../../redux/config";
import axios from "axios";
import store from "../../../redux/store";
import './MyPlanComp.css';
import SearchIcon from "@material-ui/icons/Search"


const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        // minWidth: 120,
        width: "150px",
        // height:"40px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        '& > *': {
            // margin: theme.spacing(1),
            width: '300px',
        },
    },
}));


export default function SearchComp(props) {

    const classes = useStyles();
    const [category, setCategory] = React.useState("all");
    const [searchVal, setSearchVal] = React.useState("");
    const [searchDataList, setSearchDataList] = React.useState(null);
    // console.log("SearchComp props", props);

    const setCategoryHandler = (e) => {
        // console.log(e.target.value);
        setCategory(e.target.value);
    };

    const setSearchValHandler = (e) => {
        // console.log(e.target.value);
        setSearchVal(e.target.value);

    }

    //input 내용에 따라 버튼 색깔 변화
    const updateButtonType = () => {
        const searchButton = document.querySelector(".searchButton");

        if (searchButton == null) {   //초반에 null일경우 스킵.
            return;
        }

        if (searchVal == "") {
            searchButton.classList.remove("MuiButton-containedPrimary");
        } else {
            if (!searchButton.classList.contains("MuiButton-containedPrimary")) {
                searchButton.classList.add("MuiButton-containedPrimary");
            }
        }
    }

    const doSearchHandler = () => {
        console.log(category, searchVal);

        if(searchVal.trim() == ""){
            alert("검색어를 입력해주세요.");
        }
        else{
            store.dispatch({
                type: actionType.setSearchResultDataList,
                category: category,
                searchVal: searchVal,
                searchResultDataList: [],
            });
    
            ///search/:category?/:keyword?
            props.history.push(`/search/${category}/${searchVal}/1`);
        }

        /*
        //search action.
        let perPage = 10;
        let url = URL + "/spot/searchlist" +
            "?start=0" +
            "&perPage=" + perPage +
            "&category=" + category +
            "&search=" + searchVal;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("doSearchHandler() res:", res.data, searchDataList);
            setSearchDataList(res.data);

            //dispatch
            store.dispatch({
                type: actionType.setSearchResultDataList,
                category: category,
                searchVal: searchVal,
                searchResultDataList: res.data,
            });

            ///search/:category?/:keyword?
            props.history.push(`/search/${category}/${searchVal}/1`);
        }).catch(err => {
            console.log("doSearchHandler() err:", err);
        });

        */
    }

    return (
        // <div className="searchComp"
        //      style={{height: "500px", padding: "20px"}}
        // >
        <div className="searchComp"
        >
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="search-demo-simple-select-outlined"
                    value={category}
                    onChange={setCategoryHandler}
                    label="Category"
                >
                    <MenuItem value="all">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="area">Area</MenuItem>
                    <MenuItem value="spot">Spot</MenuItem>
                    <MenuItem value="tag">Tag</MenuItem>
                </Select>
            </FormControl>
            {/* <br/><br/> */}
            <div id="search-outlined-basic">
                <TextField 
                        // label="관광지 검색" 
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            ),
                        }}
                        autoComplete="off" className={classes.root}
                        value={searchVal}
                        onChange={setSearchValHandler}
                        onKeyDown={(e)=>{
                            if(e.code == "Enter"){
                                doSearchHandler();
                            }
                        }}
                />
            </div>
            {/* <br/> */}
            <button className="searchButton btn btn-dark-green"
                    onClick={doSearchHandler}
            > 명소 검색 </button>
            {updateButtonType()}
        </div>

    )

}

//활성화
//<button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabindex="0" type="button">
// <span class="MuiButton-label">Search</span>
// <span class="MuiTouchRipple-root"></span>
// </button>



