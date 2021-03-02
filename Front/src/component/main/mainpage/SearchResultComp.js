import React, {Component} from "react";
import store from "../../../redux/store";
import {actionType, mainViewType, URL} from "../../../redux/config";
import axios from "axios";
import Tourintro from "../tour/Tourintro";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import ItemComp from "../tour/ItemComp";
import PageComp from "../tour/PageComp";
import '../tour/TourCss.css';

class SearchResultComp extends Component {

    constructor(props) {
        super(props);

        console.log(props);

        let {category, searchVal} = store.getState().mainSearch;

        this.state = {
            area: "jeju", //props.match.params.name,
            spotList: [],
            pageNum: props.match.params.pageNum,
            category: category,
            searchVal: searchVal,
        }

        this.currentPage = this.state.pageNum;
        this.totalCount = 0;
        this.perPage = 12; // 한페이지당 보여질 글의 갯수
        this.perBlock = 5; // 한블럭당 출력할 페이지의 갯수
        this.totalPage = 0; // 총 페이지의 갯수
        this.startPage = 0; // 각 블럭당 시작 페이지 번호
        this.endPage = 0; // 각 블럭당 끝페이지 번호
        this.start = 0; // 각 블럭당 불러올 글의 시작번호
        this.end = 0; // 각 블럭당 글의 끝번호
        this.no = 0; // 각 페이지에서 출력할 시작번호

        this.select = category;
    }


    /*
    @GetMapping("/spot/searchlist")
    public List<SpotlistDto> getSearchList(@RequestParam int start, @RequestParam int perPage,
                                           @RequestParam String category, String search) {
        System.out.println("start:" + start);
        System.out.println("perPage:" + perPage);
        System.out.println("category:" + category);
        System.out.println("search:" + search);
        return mapper.getSearchList(start, perPage, category, search);
    }
     */
    getList = () => {
        // 나머지가 있을 경우에는 1페이지 더 추가 (예 : 총글수가 9이고 한페이지당 2개씩 볼 경우)
        this.totalPage = Math.floor(this.totalCount / this.perPage)
            + (this.totalCount % this.perPage > 0 ? 1 : 0);

        // 시작페이지와 끝페이지 구하기
        this.startPage = Math.floor((this.currentPage - 1) / this.perBlock) * this.perBlock + 1;
        this.endPage = this.startPage + this.perBlock - 1;

        // 마지막 블럭은 endPage를 totalPage로 해놔야 한다.
        if (this.endPage > this.totalPage) {
            this.endPage = this.totalPage;
        }

        // mysql은 첫 글이 0번이므로 +1 안해도됨 (오라클은 1번)
        this.start = (this.currentPage - 1) * this.perPage;
        this.no = this.totalCount - (this.currentPage - 1) * this.perPage;

        let url = URL + "/spot/searchlist" +
            "?start=" + this.start +
            "&perPage=" + this.perPage +
            "&category=" + this.select +
            "&search=" + this.state.searchVal;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("res:", res);
            this.setState({
                spotList: res.data
            });
        }).catch(err => {
            console.log("spotlist getList 오류 : ", err);
        });
    }


    /*
        @GetMapping("/spot/searchcount")
        public int getSearchTotalCount(@RequestParam String category, @RequestParam String search) {
            return mapper.getSearchTotalCount(category, search);
        }
     */
    getTotalCount = () => {
        let url = URL + "/spot/searchcount" +
            "?category=" + this.select +
            "&search=" + this.state.searchVal;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("res:", res);
            this.totalCount = res.data;
            this.getList();
        }).catch(err => {
            console.log("err:", err);
        });
    }


    componentWillMount() {
        window.scrollTo(0, 0);
        this.getTotalCount();
    }


    selectChange = (e) => {
        this.select = e.target.value;
        this.getList();
    }


    render() {
        // console.log("TourPageComp render()", this.props);
        return (
            <div>
                <Tourintro area={this.state.area}
                           type="search"
                />
                <br/><br/><br/>

                {/* list 출력 */}
                <div className="tourIntroTitle">
                    <span className="tourIntroTitleContent" style={{backgroundColor: 'white', color: '#036E38'}}>
                        &nbsp;&nbsp;&nbsp;"{this.state.searchVal}" 의 검색 결과&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
                <div style={{width: '95%'}}>
                    <FormControl className="selectTourList">
                        <InputLabel>category</InputLabel>
                        <Select native
                                value={this.select}
                                onChange={this.selectChange.bind(this)}
                        >
                            <option value="all">All</option>
                            <option value="area">Area</option>
                            <option value="spot">Spot</option>
                            <option value="tag">Tag</option>
                        </Select>
                    </FormControl>
                    <br/><br/>

                    <Box display="flex"
                         flexWrap="wrap"
                         p={1}
                         m={1}
                         bgcolor="background.paper"
                         justifyContent="center"
                         css={{maxWidth: '100%'}}
                    >
                        {this.state.spotList.map((row, idx) => (
                            <ItemComp row={row}
                                      key={idx}
                                      history={this.props.history}
                                      getList={this.getList.bind(this)}
                            ></ItemComp>
                        ))}
                    </Box>
                </div>
                <br/><br/>

                {/* 페이징 */}
                <PageComp currentPage={this.currentPage}
                          startPage={this.startPage}
                          endPage={this.endPage}
                          totalPage={this.totalPage}
                          area={this.state.area}
                          type="search"
                          category={this.state.category}
                          search={this.state.searchVal}
                ></PageComp>
            </div>
        )
    }
}

export default SearchResultComp;

/*
export default function SearchResultComp(props) {
    console.log("SearchResultComp props", props);
    var mainSearch = store.getState().mainSearch;
    console.log(mainSearch);
    var category = mainSearch.category;
    var searchVal = mainSearch.searchVal;
    var searchResultDataList = mainSearch.searchResultDataList;
    // console.log(searchResultDataList)

    const getSearchResultDataList = () => {
        return searchResultDataList.map((value, index) => {
            return (
                <div>
                    {index} , {value.title}<br/>
                </div>
            )
        });
    }
    return (
        <div>
            [{category}] {searchVal} 로 검색한 결과.<br/>
            {getSearchResultDataList()}
        </div>
    );
}
*/
