import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Admin, TourList, Tour} from './menus';
import store from "../../redux/store";
import {actionType, mainViewType} from "../../redux/config";
import "./Menu.css";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MobileMenu from './MobileMenu';
import MainTitle from '../../image/titleImage.png';

class Menu extends Component {

    constructor(props) {
        super(props);
        // console.log("Menu constructor ", this.props)

        this.state = {
            type: this.props.type,
            onLogin: this.props.onLogin,
            onLogout: this.props.onLogout,
            logged: store.getState().logged,
            drawerOpen: false,
            drawerSetOpen: false
        }

        store.subscribe(function () {
            // console.log("Menu subscribe()", store.getState().logged);
            this.setState({
                logged: store.getState().logged,
            });
        }.bind(this));
    }

    setMainView = (mainView) => {
        // console.log("Home setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            // mainView: mainViewType.MainPage
            mainView: mainView
        });
    }

    setLogOut = () => {
        console.log("Menu setLogOut()");

        store.dispatch({
            type: actionType.LOG_OUT,
            // mainView: mainViewType.MainPage
            loginId: '',
            logged: false,
            googleOn: false
        });
    }

    handleDrawerOpen = () => {
        this.setState({
            drawerOpen: true
        })
    };

    handleDrawerClose = () => {
        this.setState({
            drawerOpen: false
        })
    };

    // drawer = ()=> (
    //     <div style={{width: '240px'}}
    //         role="presentation"
    //         onClick={this.handleDrawerClose.bind(this)}
    //         onKeyDown={this.handleDrawerClose.bind(this)}>
    //       <Divider />
    //       <List>
    //           <ListItem>
    //             <NavLink exact to="/"
    //                     onClick={() => {
    //                         console.log("Home NavLink onClick");
    //                         this.setMainView(mainViewType.MainPage);
    //                     }}
    //             >
    //                 Home
    //             </NavLink>
    //           </ListItem>
    //       </List>
    //       <Divider />
    //       <List>
    //           <ListItem><a href="/tourlist/jeju/1">제주</a></ListItem>
    //           <ListItem><a href="/tourlist/jocheon/1">조천</a></ListItem>
    //           <ListItem><a href="/tourlist/gujwa/1">구좌</a></ListItem>
    //           <ListItem><a href="/tourlist/sungsan/1">성산</a></ListItem>
    //           <ListItem><a href="/tourlist/pyoseon/1">표선</a></ListItem>
    //           <ListItem><a href="/tourlist/namwon/1">남원</a></ListItem>
    //           <ListItem><a href="/tourlist/seogwipo/1">서귀포</a></ListItem>
    //           <ListItem><a href="/tourlist/andeok/1">안덕</a></ListItem>
    //           <ListItem><a href="/tourlist/daejung/1">대정</a></ListItem>
    //           <ListItem><a href="/tourlist/hangyeong/1">한경</a></ListItem>
    //           <ListItem><a href="/tourlist/hanrim/1">한림</a></ListItem>
    //           <ListItem><a href="/tourlist/aewol/1">애월</a></ListItem>
    //           <ListItem><a href="/tourlist/udo/1">우도</a></ListItem>
    //       </List>
    //       <Divider />
    //       <List>
    //           <ListItem><a href="/share/1">맛집 공유</a></ListItem>
    //           <ListItem><a href="/shareplan">일정 공유</a></ListItem>
    //       </List>
    //       <Divider />
    //       <List>
    //           <ListItem><a href="/reservation">항공 / 렌터카예약</a></ListItem>
    //       </List>
    //       <Divider />
    //       <List>
    //           <ListItem><a href="/notice/1">공지사항</a></ListItem>
    //       </List>
    //       <Divider/>
    //       <List>
    //           <ListItem><a href="/" onClick={
    //                             ()=>{
    //                                 console.log("Logout NavLink onClick");
    //                                 this.setMainView(mainViewType.MainPage);
    //                                 this.setLogOut();
    //                             }
    //                         }>Logout</a></ListItem>
    //       </List>
    //     </div>
    //   );

    render() {
        // console.log("메뉴에서 스토어 상태 : " + store.getState().loginId);
        // console.log("메뉴에서 스토어 로그인 상태 : " + store.getState().logged);
        // 부모컴포넌트(App->HeaderComp)에서 받아온 logged, onLogout을 통해 로그인 전에는 '로그인'을 로그인 후에는 '로그아웃'으로 글씨 변경
        // 로그아웃일 경우 onLogout함수를 통해 logged를 다시 false로 바꿔준다.
        // 부모컴포넌트가 HeaderComp->App이므로 props를 통해 value를 전달받을 수 있다. 그러나 Login컴포넌트의경우는 여러번 전달해야함.
        // 따라서 전역적인 상태가 필요하다.


        // let {logged} = this.props;
        // console.log("Menu render ", this.props);

        var className_div_menu = `${this.state.type} menu`;

        var tag = document.body.offsetWidth > 450?
            <div className={className_div_menu}>
            <ul className="menu">
                <li className="logo">
                    <NavLink exact to="/"
                            onClick={() => {
                                console.log("Home NavLink onClick");
                                this.setMainView(mainViewType.MainPage);
                            }}
                    >
                        {/* Home */}
                        <img src={MainTitle}/>
                    </NavLink>
                </li>

                {/* <li>
                    <NavLink exact to="/admin"
                            onClick={() => {
                                console.log("Admin NavLink onClick");
                                this.setMainView(mainViewType.Admin);
                            }}
                    >Admin</NavLink>
                </li>
                <li>
                    <NavLink exact to="/join"
                            onClick={() => {
                                console.log("Join NavLink onClick");
                                this.setMainView(mainViewType.JoinForm);
                            }}
                    >Join</NavLink>
                </li> */}
                <li className="menuLi">
                    <NavLink exact to="/notice/1"
                            onClick={() => {
                                console.log("Notice NavLink onClick");
                                this.setMainView(mainViewType.Notice);
                            }}
                    // >Notice</NavLink>
                     >공지사항</NavLink>
                </li>
                <li className="dropdown menuLi">
                    {/* <a className="dropdownTitle">Tour</a> */}
                    <a className="dropdownTitle">명소안내</a>
                        {/*<div class="dropdown-content" >*/}
                        <div className="dropdown-content" >
                            <a href="/tourlist/jeju/1">제주</a>
                            <a href="/tourlist/jocheon/1">조천</a>
                            <a href="/tourlist/gujwa/1">구좌</a>
                            <a href="/tourlist/sungsan/1">성산</a>
                            <a href="/tourlist/pyoseon/1">표선</a>

                            <a href="/tourlist/namwon/1">남원</a>
                            <a href="/tourlist/seogwipo/1">서귀포</a>
                            <a href="/tourlist/andeok/1">안덕</a>
                            <a href="/tourlist/daejung/1">대정</a>
                            <a href="/tourlist/hangyeong/1">한경</a>

                            <a href="/tourlist/hanrim/1">한림</a>
                            <a href="/tourlist/aewol/1">애월</a>
                            <a href="/tourlist/udo/1">우도</a>
                        </div>
                </li>
                {/* <li>
                        <NavLink exact to="/Recommend"
                                onClick={() => {
                                    this.setMainView(mainViewType.Recommend);
                                }}
                        // >Course</NavLink>
                         >코스추천</NavLink>
                    </li> */}
                {/* <li>
                <NavLink exact to="/share"
                            onClick={() => {
                                console.log("ShareBoard NavLink onClick");
                                this.setMainView(mainViewType.ShareBoard);
                            }}
                    >Share</NavLink>
                </li> */}
                <li className="dropdown menuLi">
                    {/* <a className="dropdownTitle">Traffic</a> */}
                    <a className="dropdownTitle">교통안내</a>
                        <div className="dropdown-content" >
                            <a href="/air">항공</a>
                            <a href="/car">렌터카</a>
                            <a href="/ship">우도 배편</a>
                        </div>
                    {/* <NavLink exact to="/reservation"
                            onClick={() => {
                                console.log("Reservation NavLink onClick");
                                this.setMainView(mainViewType.Reservation);
                            }}
                    >Reservation</NavLink> */}
                </li>
                <li className="dropdown menuLi">
                    {/* <a className="dropdownTitle">Share</a> */}
                    <a className="dropdownTitle">소통공간</a>
                        <div className="dropdown-content" >
                            <a href="/share/1">맛집 공유</a>
                            <a href="/shareplan/1">일정 공유</a>
                            <a href="/Recommend">코스 추천</a>
                        </div>
                </li>
                
                {this.state.logged ?
                    <li className="dropdown menuLi">
                        {/* <a className="dropdownTitle">My</a> */}
                        <a className="dropdownTitle">내정보</a>
                        <div className="dropdown-content" >
                            <a href="/mypage">마이페이지</a>
                            <a href="/" onClick={
                                ()=>{
                                    console.log("Logout NavLink onClick");
                                    this.setMainView(mainViewType.MainPage);
                                    this.setLogOut();
                                }
                            }>로그아웃</a>

                        </div>
                    </li>:
                    <li className="menuLi">
                        <NavLink exact to="/login"
                                onClick={() => {
                                    console.log("Login NavLink onClick");
                                    this.setMainView(mainViewType.Login);
                                }}
                        >로그인</NavLink>
                    </li>
                    }
                </ul>
            </div>:
            // 모바일 메누
            <div className={className_div_menu}>
                <MobileMenu setMainView={this.setMainView.bind(this)} setLogOut={this.setLogOut.bind(this)} history={this.props.history}/>
            </div>
            // <div className={className_div_menu}>
            //     <ul className="mobilemenu">
            //     <li>
            //                 <IconButton
            //                     color="inherit"
            //                     aria-label="open drawer"
            //                     onClick={this.handleDrawerOpen.bind(this)}
            //                     edge="start"
            //                 >
            //                     <MenuIcon />
            //                 </IconButton>
            //                 <SwipeableDrawer
            //                     anchor='left'
            //                     open={this.state.drawerOpen}
            //                     onClose={this.handleDrawerClose.bind(this)}
            //                     onOpen={this.handleDrawerOpen.bind(this)}
            //                 >
            //                     {this.drawer()}
            //                 </SwipeableDrawer>
            //             </li>
            //             <li style={{textAlign: 'center'}}>Title</li>
            //             {this.state.logged ?
            //                 <li>
            //                     <NavLink exact to="/mypage"
            //                             onClick={() => {
            //                                 console.log("mypage NavLink onClick");
            //                                 this.setMainView(mainViewType.MyPage);
            //                             }}
            //                     >
            //                         <IconButton >
            //                             <AccountCircleIcon/>
            //                         </IconButton>
            //                     </NavLink>
            //                 </li>:
            //                 <li>
            //                     <NavLink exact to="/login"
            //                             onClick={() => {
            //                                 console.log("Login NavLink onClick");
            //                                 this.setMainView(mainViewType.Login);
            //                             }}
            //                     >
            //                         <IconButton >
            //                             <AccountCircleIcon/>
            //                         </IconButton>
            //                     </NavLink>
            //                 </li>
            //                 }
            //     </ul>
            // </div>
            ;
        return (
            <div>
                {tag}
            </div>
        )
    }
}

export default Menu;


                {/*<hr style={{clear: 'both'}}/>*/}

                {/* <Route exact path="/"> */}
                    {/*<Home></Home>*/}
                {/* </Route> */}
                {/* <Route exact path="/Reservation/:name?"> */}
                    {/*<Reservation></Reservation>*/}
                {/* </Route> */}
                 {/* <Route exact path="/Notice/:name?"> */}
                    {/*<Notice></Notice>*/}
                {/* </Route> */}

                {/* <Route exact path="/TourList/:name?" component={TourList}></Route> */}
                {/* <Route exact path="/TourList/:name?" component={TourPageComp}></Route> */}
                {/* <Route exact path="/Tour/:name?" component={Tour}></Route> */}

                {/* <Route exact path="/ShareBoard/:name?"> */}
                    {/*<ShareBoard></ShareBoard>*/}
                {/* </Route> */}
                {/* <Route exact path="/MyPage/:name?" component={MyPage}> */}
                    {/*<MyPage></MyPage>*/}
                {/* </Route>
                <Route exact path="/Login/:name?"> */}
                    {/*<Login></Login>*/}
                {/* </Route>
                <Route exact path="/Admin:name?"> */}
                    {/*<Admin></Admin>*/}
                {/* </Route> */}
