import React, {Component} from 'react';
import './TourCss.css';

class PageComp extends Component {

    render() {
        const {area, startPage, endPage, currentPage, totalPage, paginate, category, search, type} = this.props;
        // href={`/tourlist/${area}/${startPage - 1}`}
        // href={`/tourlist/${area}/${endPage + 1}`}
        let prev = startPage > 1 ?
            <li className="page-item">
                <a className="page-link" style={{color: 'black'}}
                   href={(type == "tour")
                       ? `/tourlist/${area}/${startPage - 1}`
                       : (type == "search")
                           ? `/search/${category}/${search}/${startPage - 1}`
                           : (type == "share_restaurant")
                               ? `/share/${startPage - 1}`
                               : ""}
                >◀</a>
            </li> : "";

        let next = endPage < totalPage ?
            <li className="page-item">
                <a className="page-link" style={{color: 'black'}}
                   href={(type == "tour")
                       ? `/tourlist/${area}/${endPage + 1}`
                       : (type == "search")
                           ? `/search/${category}/${search}/${endPage + 1}`
                           : (type == "share_restaurant")
                               ? `/share/${endPage + 1}`
                               : ""}
                >▶</a>
            </li> : "";

        let page = [];

        for (let i = startPage; i <= endPage; i++) {
            page.push(i);
        }

        let pages = page.map(function (num, idx) {
            return (
                <li className="page-item" key={idx}>
                    <a className="page-link"
                       style={{
                           color: num == currentPage ? "#D1CC38" : "black",
                           fontWeight: num == currentPage ? "700" : ""
                       }}
                       href={(type == "tour")
                           ? `/tourlist/${area}/${num}`
                           : (type == "search")
                               ? `/search/${category}/${search}/${num}`
                               : (type == "share_restaurant")
                                   ? `/share/${num}`
                                   : ""}
                    >{num}</a>
                </li>
            )
        });

        let pagination = '';
        if (matchMedia("screen and (max-width:770px)").matches) {
            pagination =
                <ul className='pagination pagination-sm' style={{justifyContent: 'center', marginBottom: '100px'}}>
                    {prev}
                    {pages}
                    {next}
                </ul>;
        } else {
            pagination =
                <ul className='pagination' style={{justifyContent: 'center', marginBottom: '100px'}}>
                    {prev}
                    {pages}
                    {next}
                </ul>;
        }

        return (
            <div>
                {pagination}
                {/* <ul className='pagination' style={{justifyContent: 'center', marginBottom: '100px'}}>
                    {prev}
                    {pages}
                    {next}
			    </ul> */}
                {/* <Pagination id="tourListPage" color="primary" count={totalPage} page={currentPage} onChange={this.handleChange.bind(this)}/> */}
            </div>
        );
    }
}

export default PageComp;
