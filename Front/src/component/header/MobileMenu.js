import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {NavLink, Route} from "react-router-dom";
import {actionType, mainViewType} from "../../redux/config";
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import store from "../../redux/store";
import {withRouter } from "react-router-dom";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./Menu.css";
import titleImage from '../../image/titleImage.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
      textAlign: 'center'
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

//  아코디언
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

function MobileMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerSetOpen, setDrawerSetOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/mypage" onClick={handleMobileMenuClose} style={{color: 'black'}}> 마이페이지</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/" onClick={
                            ()=>{
                                handleMobileMenuClose();
                                props.setMainView(mainViewType.MainPage);
                                props.setLogOut();
                            }
                        } style={{color: 'black'}}>
            로그아웃
        </NavLink>
      </MenuItem>
      
    </Menu>
  );

    const handleDrawerOpen = () => {
        console.log("click");
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    // 메뉴 열리는 창 //////////////////////////////////////////////////////////////////////////////////
  const drawer = ()=> (
    <div style={{width: '240px'}}
        role="presentation"
        // onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose} className="mobildMenuDrawer">
      <Divider />
      <List onClick={handleDrawerClose}>
          <ListItem style={{fontWeight: '900', color: '#333'}}>
            <NavLink exact to="/"
                    onClick={() => {
                        console.log("Home NavLink onClick");
                        props.setMainView(mainViewType.MainPage);
                    }}
            >
                Home
            </NavLink>
          </ListItem>
      </List>
      {/* <Divider /> */}
      <List>
        <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading} style={{fontWeight: '900', color: '#333'}}>명소안내</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List onClick={handleDrawerClose}>
                        <ListItem><a href="/tourlist/jeju/1" style={{color: 'black'}}>제주</a></ListItem>
                        <ListItem><a href="/tourlist/jocheon/1" style={{color: 'black'}}>조천</a></ListItem>
                        <ListItem><a href="/tourlist/gujwa/1" style={{color: 'black'}}>구좌</a></ListItem>
                        <ListItem><a href="/tourlist/sungsan/1" style={{color: 'black'}}>성산</a></ListItem>
                        <ListItem><a href="/tourlist/pyoseon/1" style={{color: 'black'}}>표선</a></ListItem>
                        <ListItem><a href="/tourlist/namwon/1" style={{color: 'black'}}>남원</a></ListItem>
                        <ListItem><a href="/tourlist/seogwipo/1" style={{color: 'black'}}>서귀포</a></ListItem>
                        <ListItem><a href="/tourlist/andeok/1" style={{color: 'black'}}>안덕</a></ListItem>
                        <ListItem><a href="/tourlist/daejung/1" style={{color: 'black'}}>대정</a></ListItem>
                        <ListItem><a href="/tourlist/hangyeong/1" style={{color: 'black'}}>한경</a></ListItem>
                        <ListItem><a href="/tourlist/hanrim/1" style={{color: 'black'}}>한림</a></ListItem>
                        <ListItem><a href="/tourlist/aewol/1" style={{color: 'black'}}>애월</a></ListItem>
                        <ListItem><a href="/tourlist/udo/1" style={{color: 'black'}}>우도</a></ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
      </List>
      {/* <Divider /> */}
      <List>
        <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading} style={{fontWeight: '900', color: '#333'}}>소통공간</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List onClick={handleDrawerClose}>
                        <ListItem><a href="/share/1" style={{color: 'black'}}>맛집 공유</a></ListItem>
                        <ListItem><a href="/shareplan/1" style={{color: 'black'}}>일정 공유</a></ListItem>
                        <ListItem><a href="/Recommend" style={{color: 'black'}}>코스 추천</a></ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
      </List>
      
      {/* <Divider /> */}
      <List>
        <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading} style={{fontWeight: '900', color: '#333'}}>교통안내</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List onClick={handleDrawerClose}>
                        <ListItem><a href="/air" style={{color: 'black'}}>항공</a></ListItem>
                        <ListItem><a href="/car" style={{color: 'black'}}>렌터카</a></ListItem>
                        <ListItem><a href="/ship" style={{color: 'black'}}>우도행 배편</a></ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
      </List>
      
      {/* <Divider /> */}
      <List onClick={handleDrawerClose} style={{fontWeight: '500', color: '#333'}}>
          <ListItem><a href="/notice/1">공지사항</a></ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.grow}>
        <SwipeableDrawer
            anchor='left'
            open={drawerOpen}
            onClose={handleDrawerClose}
            onOpen={handleDrawerOpen}
        >
            {drawer()}
        </SwipeableDrawer>
        <HideOnScroll {...props}>
      <AppBar style={{backgroundColor: 'white', color: 'black'}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon/>
          </IconButton>
          <div className={classes.grow} />
          {/* <Typography className={classes.title} variant="b" noWrap>
            제주 일상
          </Typography> */}
          <img src={titleImage} style={{width: '20vw'}} onClick={()=>{props.history.push("/")}}/>
          <div className={classes.grow} />
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={(event)=>{
                  if(store.getState().logged==true)
                    handleMobileMenuOpen(event);
                  else
                    window.location.replace("/login");
              }}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
    </div>
  );
}

export default withRouter(MobileMenu);