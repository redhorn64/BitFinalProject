import React, {Component} from "react";
import {URL} from '../../../redux/config';
import RentCarItem from "./RentCarItem";
import axios from 'axios';
import {WOW} from 'wowjs';
import './RentCarCss.css';

class RentCarPageComp extends Component {
    constructor(props) {
        super(props);
        console.log("RentCarPageComp constructor", props);
        this.state={
            listData:[]
        };
    }

    list=()=>{
        let url= URL + "/reservation/carlist";
        console.log(url);

        axios.get(url)
        .then(res=>{
            this.setState({
                listData:res.data
            })
        }).catch(err=>{
            console.log("렌트카 list 오류 : " + err);
        })
    }

    componentWillMount()
    {
        window.scrollTo(0, 0);
        this.list();
        new WOW().init();
    }

    render() {
        return (
            <div>
                <section class="my-md-5 rentcarSection">

                    <div class="rgba-black-strong rounded rentcarIntro">
                        <div class="col-md-12 mb-4 white-text text-center ShipTitle">
                                <h1 class="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInDown"
                                data-wow-delay="0.3s"><strong>RENT CAR</strong></h1>
                                <hr style={{backgroundColor: '#fff', width: '20vw', height: '1px', margin: '20px auto'}} class="wow fadeInDown" data-wow-delay="0.4s"></hr>
                                {/* <p class="wow fadeInDown" data-wow-delay="0.4s">_________________________</p> */}
                                <h5 class="text-uppercase mb-4 white-text wow fadeInDown" data-wow-delay="0.4s">
                                    <strong>면허가 존재한다!&nbsp;&nbsp;&nbsp;뚜벅이 여행이 싫다!<br/>
                                    편하게 여행을 즐기실 수 있는 제주도의 렌트카 정보들을 확인해보세요.</strong></h5>
                                
                            </div>
                    </div>

                </section>

                <div id="RentCarTable">
                    <table className="table table-hover" id="rentCarMainTable">
                        <thead style={{backgroundColor: '#fafafa'}}>
                            <tr style={{textAlign: 'center'}}>
                                <td style={{width:'5%'}}>#</td>
                                <td style={{width:'25%'}}>업체명</td>
                                {/* <td style={{width:'100px'}}>구분</td> */}
                                <td style={{width:'45%'}}>주소</td>
                                {/* <td style={{width:'90px'}}>차량대수</td> */}
                                {/* <td style={{width:'90px'}}>시작시간</td> */}
                                {/* <td style={{width:'90px'}}>종료시간</td> */}
                                {/* <td style={{width:'150px'}}>홈페이지</td> */}
                                <td style={{width:'25%'}}>전화번호</td>
                                {/* <td style={{width:'150px'}}>확인일</td> */}
                                {/* <td style={{width:'10%'}}>추가정보</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listData.map((row, num)=>(
                                    <RentCarItem row={row} key={num} num={num} history={this.props.history}/>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default RentCarPageComp;
