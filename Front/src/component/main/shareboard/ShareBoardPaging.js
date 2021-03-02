import React,{Component} from 'react';

class ShareBoardPaging extends Component {

    render() {
        const{startPage, endPage, currentPage, totalPage, paginate} = this.props;

        let prev = startPage>1?<li class="page-item"><a class="page-link" onClick={(e)=>{
            e.preventDefault();
            this.props.paginate(startPage - 1);
        }}>◀</a></li>:"";

        let next = endPage < totalPage?<li class="page-item"><a class="page-link" onClick={(e)=>{
            e.preventDefault();
            this.props.paginate(endPage + 1);
        }}>▶</a></li>:"";

        let page = [];
        for(let i=startPage; i<=endPage; i++){
            page.push(i);
        }
        let pages = page.map(function(num,idx){
            return <li class="page-item"><a class="page-link" style={{color : num==currentPage?"red":"black"}} onClick={(e)=>{
                e.preventDefault();
                paginate(num);
            }}>{num}</a></li>
        });

        return (
            <div>
                {startPage},{endPage},{totalPage}
                <ul class="pagination">
                    {prev}
                    {pages}
                    {next}
			    </ul>
            </div>
        );
    }
}

export default ShareBoardPaging;