import React, {Component} from 'react';

class ReviewPage extends Component {

    render() {
        const {startPage, endPage, currentPage, totalPage, paginate} = this.props;
        let prev = startPage > 1 ?
            <li className="page-item" ><a class="page-link" onClick={(e)=>{
                e.preventDefault();
                this.props.paginate(startPage - 1);
            }}>◀</a></li> : "";

        let next = endPage < totalPage ?
            <li className="page-item"><a class="page-link" onClick={(e)=>{
                e.preventDefault();
                this.props.paginate(endPage + 1);
            }}>▶</a></li> : "";

        let page = [];

        for (let i = startPage; i <= endPage; i++) {
            page.push(i);
        }

        let pages = page.map(function (num, idx) {
            return (
                <li className="page-item" key={idx}>
                    <a class="page-link"
                       style={{
                           color: num == currentPage ? "#D1CC38" : "black",
                           fontWeight: num == currentPage ? "700" : ""
                       }} onClick={(e)=>{
                            e.preventDefault();
                            paginate(num);
                        }}>{num}</a></li>
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
            </div>
        );
    }
}

export default ReviewPage;
