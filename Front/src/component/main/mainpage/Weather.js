/*global kakao*/
import React, {Component} from 'react';
import axios from 'axios';
import store from "../../../redux/store";
import { URL, actionType } from "../../../redux/config";
import ReactAnimatedWeather from 'react-animated-weather';
import OPENNURI from "../../../image/img_opentype01.png";
import ColorSkycons, { ColorSkyconsType } from 'react-color-skycons';
import styled from "styled-components";
import './Weather.css'
import Slider from "react-slick";

// ReactAnimatedWeather
const defaults = {
    icon: 'CLEAR_DAY',
    color: 'goldenrod',
    size: 32,
    animate: true
};
// 리액트AnimatedWeather

// ColorSkycons
const svgProps = {
    style: { backgroundColor: 'blue' },
}
// ColorSkycons

// 날짜
let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜

let hours = today.getHours(); // 시
month = month < 10 ? '0' + month : month;
date = date < 10 ? '0' + date : date;
hours = hours < 10 ? '0' + hours : hours;
let callHour = String(24 * 8); // 8일
// 날짜

// 위치가져오기관련정보
let geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000  
};
// 위치가져오기관련정보

// LCC DFS 좌표변환을 위한 기초 자료
let RE = 6371.00877; // 지구 반경 (km)
let GRID = 5.0; // 격자 간격 (km)
let SLAT1 = 30.0; // 투영 위도1(degree)
let SLAT2 = 60.0; // 투영 위도2(degree)
let OLON = 126.0; // 기준점 경도 (degree)
let OLAT = 38.0; // 기준점 위도 (degree)
let XO = 43; // 기준점 X좌표 (GRID)
let YO = 136; // 기준점 Y좌표 (GRID)
// LCC DFS 좌표변환을 위한 기초 자료

// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도, v1:x, v2:y) )

const krSkyStatus = ['맑음', '구름조금', '구름많음', '흐림', '비', '비눈', '눈비', '눈'];

const skyStatus = ['CLEAR_DAY', 'PARTLY_CLOUDY_DAY', 'CLOUDY', 'FOG', 'RAIN', 'RAIN_SNOW', 'SLEET', 'SNOW'];
        
const skyStatusEnum = Object.freeze({
    CLEAR_DAY: 0,
    PARTLY_CLOUDY_DAY: 1,
    CLOUDY: 2,
    FOG: 3,
    RAIN: 4,
    RAIN_SNOW: 5,
    SLEET: 6,
    SNOW: 7,
});

const skyColor = ['goldenrod', 'grey', 'grey', 'black', 'grey', 'black', 'black', 'black'];

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
};

class Weather extends Component {
    
    constructor(props) {
        super(props);
        console.log("Weather class 생성자", props);

        store.subscribe(function() {
            // console.log("날씨 클래스 생성자에서 state 변경에 대한 변화를 구독합니다 변화를 확인했습니다 store에서 weatherInfo 값을 가져와 첫번째 courseAreaName을 보여줍니다 : " + store.getState().weatherInfo[0].courseName);
        }.bind(this));
        
        
        // 리덕스스토어에구독한다
        
        // 리덕스를 안쓰고 클래스 내부 state를 씁니다
        this.state = {
            // c_tm: [], // 동네예보 예보 시각
            // c_courseAreaName: [], // 코스 지역이름
            // c_spotAreaName: [], // 관광지점 지역이름
            // c_courseName: [], // 관광코스 명
            // c_thema: [], // 관광지 명
            // c_th3: [], // 일 3시간 기온
            // c_maxTa: [], // 최고 기온
            // c_minTa: [], //최저 기온
            // c_wd: [], // 풍향
            // c_ws: [], // 풍속
            // c_sky: [], // 하늘상태
            // c_rhm: [], // 습도
            // c_pop: [], // 강수확률
            // c_rn: [], // 강수량
            c_weatherInfo: [], // 전체 날씨 정보1,
            c_weatherInfo_2: [], // 전체 날씨 정보2
            c_weatherInfo_3: [], // 초단기실황조회 전체 날씨 정보3
            c_weatherInfo_4: [], // 초단기실황조회_2 전체 날씨 정보4
            c_weatherInfo_5: [], // 초단기예보조회 전체 날씨 정보5
            c_weatherInfo_6: [], // 동네예보조회 전체 날씨 정보6
            jejuGridList: [], // 초기 리스트는 비어있습니다.
            time: '',
            selectBoxValue: '?',
            c_latitude: '', // 현재|선택 위도
            c_longitude: '', // 현재|선택 
            c_address: '', // 구주소|도로명주소
            c_change_date_format: '',
            c_WeatherPages: [], // 여러 페이지 날씨정보들
            c_TourWeatherPages: [], // 여러 페이지 관광지 날씨정보들
            c_midTermWeather_1: '', // 중기전망조회 전체 날씨 정보1
            c_midTermWeather_2: [], // 중기육상예보조회 전체 날씨 정보2
            c_midTermWeather_3: [], // 중기기온조회 전체 날씨 정보3
        };
        // 리덕스를 안쓰고 클래스 내부 state를 씁니다
    }
    
    componentDidMount(){
        this.getWeatherList();
        this.getWeatherList_2();
        // this.getWeatherList_3();
        this.getMidtermWeather();
        this.getLocation();
        this._getJejuGridList();
        this.xml2jsonCurrentWth(48, 36)
    }
    
    getWeatherList = () => {

        this.setState({
            c_TourWeatherPages: [],
        })

        /*
        let url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        let today = new Date();
        
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜
        let day = today.getDay(); // 요일
        
        let hours = today.getHours(); // 시
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hours = hours < 10 ? '0' + hours : hours;
        // document.write(year+month+date+hours);
        queryParams += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent(year+month+date+hours);
        let callHour = String(24 * 8); // 8일
        queryParams += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent(callHour); // CURRENT_DATE부터 8일 후까지의 자료 호출
        queryParams += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('1'); // 관광 코스ID
        
        url = url + queryParams;
        
        axios.get(url)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
            */
           
        var url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('8'); // 한 페이지 결과 수
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json');
        queryParams += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent(year+month+date+hours);
        queryParams += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent(callHour); // CURRENT_DATE부터 8일 후까지의 자료 호출
        queryParams += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('50'); // 관광 코스ID
        console.log("/getTourStnVilageFcst" + queryParams);
        
        // 아래 url이 중간부터 있는 이유는 package.json 에
        // "proxy": "http://apis.data.go.kr/1360000",
        // 저것을 미리 세팅해두었기 때문입니다.
        // axios.get("/getTourStnVilageFcst" + queryParams)
        axios.get("/TourStnInfoService/getTourStnVilageFcst" + queryParams)
        .then(res => {
                console.log("기상청 리턴값 res:", res);
                console.log("기상청 리턴값 res.data.response.body.items.item:", res.data.response.body.items.item);
                
                // 날씨클래스 내부 state에 정보 저장한다
                this.setState({
                    c_weatherInfo: res.data.response.body.items.item,
                });
                // console.log(res.data);
                // 날씨클래스 내부 state에 정보 저장한다

                // 리덕스스토어에 액션함수를 보낸다
                let reduxWeather = res.data.response.body.items.item;
                
                store.dispatch({
                    type: actionType.weatherUpdate,
                    weatherInfo: reduxWeather,
                });
                // 리덕스스토어에 액션함수를 보낸다
                
                // 로컬스토리지에 String으로 변경해 저장한다
                localStorage.setItem("weather_1", JSON.stringify(res.data));
                // 로컬스토리지에 String으로 변경해 저장한다
            })
            .catch(err => {
                console.log("기상청 리턴값 err:", err);
            });
        
            for (let i = 0 ; i < 1 ; i = i + 1) {
                let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
                queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(i+1);
                queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('250'); // 한 페이지 결과 수
                queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json');
                queryParams += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent(year+month+date+hours);
                queryParams += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent(callHour); // CURRENT_DATE부터 8일 후까지의 자료 호출
                queryParams += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('50'); // 관광 코스ID
                console.log("/getTourStnVilageFcst" + queryParams);
                axios.get("/TourStnInfoService/getTourStnVilageFcst" + queryParams)
                .then(res => {
                        console.log("기상청 리턴값 res:", res);
                        console.log("기상청 리턴값 res.data.response.body.items.item:", res.data.response.body.items.item);
                        
                        // 날씨클래스 내부 state에 정보 저장한다
                        this.setState({
                            c_TourWeatherPages: this.state.c_WeatherPages.concat(res),
                        });
                        // 날씨클래스 내부 state에 정보 저장한다

                        // 리덕스스토어에 액션함수를 보낸다
                        // let reduxWeather = res.data.response.body.items.item;
                        
                        // store.dispatch({
                        //     type: actionType.weatherUpdate,
                        //     weatherInfo: reduxWeather,
                        // });
                        // 리덕스스토어에 액션함수를 보낸다
                        
                        // 로컬스토리지에 String으로 변경해 저장한다
                        // localStorage.setItem("weather_1", JSON.stringify(res.data));
                        // 로컬스토리지에 String으로 변경해 저장한다
                    })
                    .catch(err => {
                        console.log("기상청 리턴값 err:", err);
                    });
            }
        }
        
        getWeatherList_2 = () => {
        
        let url_2 = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnWthrIdx';
        let queryParams_2 = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams_2 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); // 페이지번호
        queryParams_2 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('8'); // 한 페이지 결과 수
        queryParams_2 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams_2 += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent(year+month+date+hours); // 현재시각
        queryParams_2 += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent(callHour); // CURRENT_DATE부터 8일 후까지의 자료 호출
        queryParams_2 += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('50'); // 관광 코스ID
        
        console.log("/getTourStnWthrIdx" + queryParams_2);
        
        // axios.get("/getTourStnWthrIdx" + queryParams_2)
        axios.get("/TourStnInfoService/getTourStnWthrIdx" + queryParams_2)
        .then(res2 => {
            console.log("기상청 리턴값_2 res2 : " + res2);
                console.log("기상청 리턴값_2 res2.data.response.body.items.item : " + res2.data.response.body.items.item);
                
                // 날씨클래스 내부 state에 정보 저장한다
            this.setState({
                c_weatherInfo_2: res2.data.response.body.items.item,
            });
            // 날씨클래스 내부 state에 정보 저장한다

            // 리덕스스토어에 액션함수를 보낸다
            let reduxWeather_2 = res2.data.response.body.items.item;
            
            store.dispatch({
                type: actionType.weatherUpdate,
                weatherInfo_2: reduxWeather_2,
            });
            // 리덕스스토어에 액션함수를 보낸다
            
            //로컬스토리지에 String으로 변경해 저장한다
            localStorage.setItem("weather_2", JSON.stringify(res2.data));
            //로컬스토리지에 String으로 변경해 저장한다
        })
        .catch(err => {
            console.log("기상청 리턴값_2 err_2 : ", err);
        });
    }
    
    getWeatherList_3 = () => {

        let url_3 = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst';
        let queryParams_3 = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams_3 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams_3 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('8');
        queryParams_3 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams_3 += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(year+month+date); // 발표일자
        queryParams_3 += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0600'); // 발표시각 06시 발표(정시단위)
        queryParams_3 += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('56'); // 예보지점 X 좌표값
        queryParams_3 += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('33'); // 예보지점 Y 좌표
        console.log("/getUltraSrtNcst" + queryParams_3);
        
        axios.get("/VilageFcstInfoService/getUltraSrtNcst" + queryParams_3)
        .then(res3 => {
            console.log("기상청 리턴값_3 res3.data.response.body.items.item : " + res3.data.response.body.items.item);
                
            // 날씨클래스 내부 state에 정보 저장한다.
            this.setState({
                    c_weatherInfo_3: res3.data.response.body.items.item, 
                });
                // 날씨클래스 내부 state에 정보 저장한다.
                
                // 리덕스스토어에 액션함수를 보낸다
                let reduxWeather_3 = res3.data.response.body.items.item;
                
                store.dispatch({
                    type: actionType.weatherUpdate,
                    weatherInfo_3: reduxWeather_3,
                });
                // 리덕스스토어에 액션함수를 보낸다
                
                //로컬스토리지에 String으로 변경하여 저장한다
                localStorage.setItem("weather_3", JSON.stringify(res3.data));
                //로컬스토리지에 String으로 변경하여 저장한다
            })
            .catch(err => {
                console.log("기상청 리턴값_3 err_3 : " + err);
            });
        }
        
    getLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError, geo_options);
        }else{
            console.log("지오 로케이션 없음");
        }
    };
    
    locationSuccess = (p) => {
        var latitude = p.coords.latitude,
        longitude = p.coords.longitude;
        this.setState({
            c_latitude: latitude,
            c_longitude: longitude,
        });
        console.log("현재 위도 : " + latitude +", 현재 경도 : " + longitude);
        
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        var coord = new kakao.maps.LatLng(latitude, longitude);
        var callback = (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                console.log('현재 있는 곳 위도와 경도를 주소로 변환하면 : ' + result[0].address.address_name + ' 입니다');
                this.setState({
                    c_address: result[0].address.address_name,
                });
            }
        };
    
        // 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청한다.
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        
        var rs = this.dfs_xy_conv("toXY",latitude,longitude);
        
        // 위도/경도 -> 기상청 좌표x / 좌표 y 변환
        this.xml2jsonCurrentWth(rs.nx, rs.ny);
    }
    
    locationError = (error) => {
        var errorTypes = {
            0 : "에러 내용확인안됨",
            1 : "허용을 안눌렀습니다",
            2 : "위치가 안잡힙니다",
            3 : "응답시간이 지났습니다"
        };
        var errorMsg = errorTypes[error.code];
        console.log(errorMsg);
    }
    
    dfs_xy_conv = (code, v1, v2) => {
        var DEGRAD = Math.PI / 180.0;
        var RADDEG = 180.0 / Math.PI;
        
        var re = RE / GRID;
        var slat1 = SLAT1 * DEGRAD;
        var slat2 = SLAT2 * DEGRAD;
        var olon = OLON * DEGRAD;
        var olat = OLAT * DEGRAD;

        var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);
        var rs = {};
        if (code == "toXY") {
            
            rs['lat'] = v1;
            rs['lng'] = v2;
            var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
            ra = re * sf / Math.pow(ra, sn);
            var theta = v2 * DEGRAD - olon;
            if (theta > Math.PI) theta -= 2.0 * Math.PI;
            if (theta < -Math.PI) theta += 2.0 * Math.PI;
            theta *= sn;
            rs['nx'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
            rs['ny'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
        }
        else {
            rs['nx'] = v1;
            rs['ny'] = v2;
            var xn = v1 - XO;
            var yn = ro - v2 + YO;
            ra = Math.sqrt(xn * xn + yn * yn);
            if (sn < 0.0) ra = -ra;
            var alat = Math.pow((re * sf / ra), (1.0 / sn));
            alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;
            
            if (Math.abs(xn) <= 0.0) {
                theta = 0.0;
            }
            else {
                if (Math.abs(yn) <= 0.0) {
                    theta = Math.PI * 0.5;
                    if (xn < 0.0) theta = -theta; 
                }
                else theta = Math.atan2(xn, yn);
            }
            var alon = theta / sn + olon;
            rs['lat'] = alat * RADDEG;
            rs['lng'] = alon * RADDEG;
        }
        return rs;
    }

    xml2jsonCurrentWth = (nx, ny) => {
        var today_2 = new Date();
        var dd = today_2.getDate();
        var mm = today_2.getMonth()+1;
        var yyyy = today_2.getFullYear();
        var hours = today_2.getHours();
        var minutes = today_2.getMinutes();
        console.log("시간 (분) : " + minutes);

        if(minutes <= 40){
            // 40분 이전이라면 한시간 전 값
            hours = hours - 1;
            if(hours < 0){
                // 자정 이전은 전날로 계산
                // 00:40분 이전이라면 'base_date'는 전날이고 'base_time'은 2300이다.
                today_2.setDate(today_2.getDate() - 1);
                dd = today_2.getDate();
                mm = today_2.getMonth() + 1;
                yyyy = today_2.getFullYear();
                hours = 23;
            }
        }
        if(hours < 10) {
            hours = '0' + hours;
        }
        if(mm < 10) {
            mm = '0' + mm;
        }
        if(dd < 10) {
            dd = '0' + dd;
        }
        
        var _nx = nx,
        _ny = ny,
        apikey = 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D',
        basetime = hours + "00",
        url_4 = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst';
        today_2 = yyyy+""+mm+""+dd;
        var queryParams_4 = '?ServiceKey=' + apikey;
        queryParams_4 += '&numOfRows=8&pageNo=1';
        queryParams_4 += '&dataType=JSON';
        queryParams_4 += '&base_date=' + today_2; // 오늘 날짜
        queryParams_4 += '&base_time=' + basetime; // 요청 가능 발표 시간
        queryParams_4 += '&nx=' + _nx + '&ny=' + _ny;
        
        axios.get("/VilageFcstInfoService/getUltraSrtNcst" + queryParams_4)
        .then(res4 => {
                console.log("초단기실황조회_2 : " + res4.data.response.body.items.item);
                console.log("/VilageFcstInfoService/getUltraSrtNcst" + queryParams_4);
                
                // 날씨 클래스 내부 state에 정보 저장한다
                this.setState({
                    c_weatherInfo_4: res4.data.response.body.items.item,
                });
                // 날씨 클래스 내부 state에 정보 저장한다
            })
            .catch(err => {
                console.log("초단기실황조회 error : " + err);
                alert("다시 시도해주세요.\n : " + err);
            });

        var queryParams_5 = '?' + encodeURIComponent('ServiceKey') + '=' + apikey;
        queryParams_5 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams_5 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams_5 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams_5 += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(today_2);
        queryParams_5 += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(basetime);
        queryParams_5 += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(_nx);
        queryParams_5 += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(_ny);

        axios.get("/VilageFcstInfoService/getUltraSrtFcst" + queryParams_5)
            .then(res5 => {
                console.log("초단기예보조회 : " + res5.data.response.body.items.item[0].category);
                console.log("/VilageFcstInfoService/getUltraSrtFcst" + queryParams_5);

                    // 날씨 클래스 내부 state에 정보 저장한다
                    this.setState({
                        c_weatherInfo_5: res5.data.response.body.items.item,
                    });
                    // 날씨 클래스 내부 state에 정보 저장한다
                })
                .catch(err => {
                    console.log("초단기예보조회 error : " + err);
                    alert("다시 시도해주세요.\n : " + err);
                });
        
        var std_time = [2, 5, 8, 11, 14, 17, 20, 23] // API 응답 시간

        today_2 = new Date();
        var hours_2 = today_2.getHours(); // 현재 시간 얻기
        var dd_2 = today_2.getDate();
        var mm_2 = today_2.getMonth()+1;
        var yyyy_2 = today_2.getFullYear();

        if (hours_2 < 2) {
            today_2.setDate(today_2.getDate() - 1);
            dd_2 = today_2.getDate();
            mm_2 = today_2.getMonth()+1;
            yyyy_2 = today_2.getFullYear();
            hours_2 = 23;
        }
        else {
            hours_2 = hours_2 - ((hours_2 + 1) % 3);
        }

        hours_2 = hours_2 < 10 ? '0' + hours_2 : hours_2;
        mm_2 = mm_2 < 10 ? '0' + mm_2 : mm_2;
        dd_2 = dd_2 < 10 ? '0' + dd_2 : dd_2;

        today_2 = yyyy_2 + "" + mm_2 + "" + dd_2;
        var url_6 = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst';
        var queryParams_6 = '?' + encodeURIComponent('ServiceKey') + '=' + apikey;
        queryParams_6 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams_6 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500');
        queryParams_6 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams_6 += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(today_2);
        queryParams_6 += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours_2+'00');
        queryParams_6 += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(_nx);
        queryParams_6 += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(_ny);

        // 예보구분 중에 동네예보는 항목값이 총 14개이다.
        
        // POP	강수확률
        // PTY	강수형태
        // R06	6시간 강수량
        // REH	습도
        // S06	6시간 신적설
        // SKY	하늘상태
        // T3H	3시간 기온
        // TMN	아침 최저기온
        // TMX	낮 최고기온
        // UUU	풍속(동서성분)
        // VVV	풍속(남북성분)
        // WAV	파고
        // VEC	풍향
        // WSD	풍속
        
        axios.get("/VilageFcstInfoService/getVilageFcst" + queryParams_6)
        .then(res6 => {
            console.log("/VilageFcstInfoService/getVilageFcst" + queryParams_6);
            console.log("동네예보조회 : " + res6.data.response.body.items.item[0].category);
                
                // 날씨 클래스 내부 state에 정보 저장한다
                this.setState({
                    c_weatherInfo_6: res6.data.response.body.items.item,
                });
                // 날씨 클래스 내부 state에 정보 저장한다
            })
            .catch(err => {
                console.log("동네예보조회 error : " + err);
                alert("동네예보조회를 다시 시도해주세요.\n : " + err);
            });
        
        this.setState({
            c_WeatherPages: [],
        })

        for (let i = 0 ; i < 1 ; i++) {
            let queryParams_7 = '?' + encodeURIComponent('ServiceKey') + '=' + apikey;
            queryParams_7 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(i+1);
            queryParams_7 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('250');
            queryParams_7 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
            queryParams_7 += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(today_2);
            queryParams_7 += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours_2+'00');
            queryParams_7 += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(_nx);
            queryParams_7 += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(_ny);

            // 예보구분 중에 동네예보는 항목값이 총 14개이다.
            
            // POP	강수확률
            // PTY	강수형태
            // R06	6시간 강수량
            // REH	습도
            // S06	6시간 신적설
            // SKY	하늘상태
            // T3H	3시간 기온
            // TMN	아침 최저기온
            // TMX	낮 최고기온
            // UUU	풍속(동서성분)
            // VVV	풍속(남북성분)
            // WAV	파고
            // VEC	풍향
            // WSD	풍속
            
            axios.get("/VilageFcstInfoService/getVilageFcst" + queryParams_7)
            .then(res7 => {
                    console.log("/VilageFcstInfoService/getVilageFcst" + queryParams_7);
                    console.log("동네예보조회 여러페이지 : " + res7.data.response.body.items.item[0].category);

                    // 날씨 클래스 내부 state에 정보 저장한다
                    this.setState({
                        c_WeatherPages: this.state.c_WeatherPages.concat(res7),
                    })
                    // 날씨 클래스 내부 state에 정보 저장한다
                })
                .catch(err => {
                    console.log("동네예보조회 여러페이지 error : " + err);
                    alert("동네예보조회 여러페이지를 다시 시도해주세요.\n : " + err);
                });
        }
    }

    _getJejuGridList = () => {
        // jeju_grid_list를 가지고 옵니다.
    const jejuGridUrl = 'dummy/jeju_grid_list.json';
    
    axios.get(jejuGridUrl)
    .then(data => {
        // 가지고 온 리스트를 state에 저장합니다.
        this.setState({
            jejuGridList: data.data
            });
            console.log("제주도 격자 X : " + data.data[0][Object.keys(data.data[0])[4]]);
            console.log("제주도 격자 Y : " + data.data[0][Object.keys(data.data[0])[5]]);
        })
        .catch(error => {
            console.log(error);
        });
    }
        
    // select박스 선택하면 다른 지역 날씨 보여주는 이벤트
    selectChange = (event) => {
        var dataset = event.target.options[event.target.selectedIndex].dataset;
        
        console.log("select박스 선택한 value 행정구역코드 : " + event.target.value);
        console.log("data-nx 와 data-ny : " + dataset.nx + ", " + dataset.ny);
        
        this.xml2jsonCurrentWth(dataset.nx, dataset.ny);
        
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        
        var coord = new kakao.maps.LatLng(dataset.latitude, dataset.longitude);
        var callback = (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                console.log('현재 있는 곳 위도와 경도를 주소로 변환하면 : ' + result[0].address.address_name + ' 입니다');
                this.setState({
                    c_address: result[0].address.address_name,
                });
            }
        };
        
        // 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청한다.
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    };

    changeFcstTime = (timeValue) => {
        if(timeValue.substr(0, 1) === '0')
        {
            timeValue = timeValue.substr(1, 1);
        }

        timeValue = Number(timeValue);

        if (timeValue > 12)
        {
            timeValue = timeValue - 12;
            timeValue = `오후${timeValue}`;
        }
        else if (timeValue < 12)
        {
            timeValue = `오전${timeValue}`;
        }
        else if (timeValue === 12)
        {
            timeValue = `정오${timeValue}`;
        }
        else if (timeValue === 0)
        {
            timeValue = `자정12시(0시)`;
        }
        return timeValue;
    }

    FindWeekday = (fcstDate) => {
        var fcstYear = Number(fcstDate.substr(0, 4));
        var fcstMonth = Number(fcstDate.substr(4, 1) === 0 ? Number(fcstDate.substr(5, 1)) : Number(fcstDate.substr(4, 2)));
        var f_fcstDate = Number(fcstDate.substr(6, 1)) === 0 ? Number(fcstDate.substr(7, 1)) : Number(fcstDate.substr(6, 2));
        var changeDate = new Date();
        changeDate.setFullYear(fcstYear);
        changeDate.setMonth(fcstMonth-1);
        changeDate.setDate(f_fcstDate);
        return changeDate.getDay();
    }

    getMidtermWeather = () => {
        var url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidSeaFcst';
        var apiKey = 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        var queryParams_8 = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
        queryParams_8 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); // 페이지번호
        queryParams_8 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); // 한 페이지 결과 수
        queryParams_8 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams_8 += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent('184'); // 지점번호 제주도
        // 발표시각 일2회(06:00,18:00)회 생성 되며 발표시각을 입력-최근 24시간 자료만 제공

        var today_3 = new Date();
        var dd_3 = today_3.getDate();
        var mm_3 = today_3.getMonth()+1;
        var yyyy_3 = today_3.getFullYear();
        var hour = today_3.getHours(); // 현재 시간 얻기
        let tmFCValue = '0600'; // 초깃값

        if (hour < 6 && hour >= 0) {
            today_3.setDate( today_3.getDate() - 1 );
            dd_3 = today_3.getDate();
            mm_3 = today_3.getMonth()+1;
            yyyy_3 = today_3.getFullYear();
            tmFCValue = `1800`;
        }
        else if (hour >= 6 && hour < 18) {
            tmFCValue = '0600';
        }
        else if (hour >= 18) {
            tmFCValue = '1800';
        }

        dd_3 = dd_3 < 10 ? '0' + dd_3 : dd_3;
        mm_3 = mm_3 < 10 ? '0' + mm_3 : mm_3;

        queryParams_8 += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(`${yyyy_3}${mm_3}${dd_3}${tmFCValue}`);

        axios.get("/MidFcstInfoService/getMidFcst" + queryParams_8)
            .then(res8 => {
                console.log("/MidFcstInfoService/getMidFcst" + queryParams_8);
                console.log("중기예보 데이타 : " + res8.data.response.body.items.item[0].wfSv);
                this.setState({
                    c_midTermWeather_1: res8.data.response.body.items.item[0].wfSv,
                });
            })
            .catch(error => {
                console.log('중기예보 오류 : ' + error);
            });

        var queryParams_9 = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
        queryParams_9 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams_9 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams_9 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams_9 += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent('11G00000'); // 제주도
        queryParams_9 += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(`${yyyy_3}${mm_3}${dd_3}${tmFCValue}`); // 발표시각

        axios.get("/MidFcstInfoService/getMidLandFcst" + queryParams_9)
            .then(res9 => {
                console.log("/MidFcstInfoService/getMidLandFcst" + queryParams_9);
                console.log("중기육상예보조회 데이타 : " + res9.data.response.body.items.item[0].wf3Am);
                this.setState({
                    // c_midTermWeather_2: res9.data.response.body.items.item,
                    c_midTermWeather_2: res9.data.response.body.items.item[0],
                });
            })
            .catch(error => {
                console.log(`중기육상예보조회 오류 : ${error}`);
            });

        var url_10 = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa';
        var queryParams_10 = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
        queryParams_10 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams_10 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams_10 += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams_10 += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent('11G00201'); // 예보구역코드 제주도 제주 
        // 발표시각 -일 2회(06:00,18:00)회 생성 되며 발표시각을 입력-최근 24시간 자료만 제공
        queryParams_10 += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(`${yyyy_3}${mm_3}${dd_3}${tmFCValue}`);

        axios.get("/MidFcstInfoService/getMidTa" + queryParams_10)
            .then(res10 => {
                console.log(`/MidFcstInfoService/getMidTa${queryParams_10}`);
                console.log(`중기기온조회 데이타 : ${res10.data.response.body.items.item[0].taMin3}`);
                this.setState({
                    c_midTermWeather_3: res10.data.response.body.items.item,
                });
            })
            .catch(err => {
                console.log(`중기기온조회 오류 : ${err}`);
            });
    }

    AfterDays = (days) => {
        var todayNaljja = new Date();
        todayNaljja.setDate(todayNaljja.getDate()+days);
        var tnStr = (todayNaljja.getMonth()+1) + '월' + todayNaljja.getDate() + '일';
        return tnStr;
    }

    midTermWeatherIcons = (wParam) => {
        let midTermWeatherIconsResult = '';
        if (wParam === '맑음')
        {
            midTermWeatherIconsResult = 
                <ColorSkycons
                    type = { 'CLEAR_DAY' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />;
        }
        else if (wParam === '구름많음')
        {
            midTermWeatherIconsResult = 
                <ColorSkycons
                    type = { 'CLOUDY' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />;
        }            
        else if(wParam === '구름많고 비')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'CLOUDY' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                <ColorSkycons
                    type = { 'RAIN' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        else if(wParam === '구름많고 눈')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'CLOUDY' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                <ColorSkycons
                    type = { 'SNOW' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        else if(wParam === '구름많고 비/눈')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'CLOUDY' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                /> 
                <ColorSkycons
                    type = { 'RAIN_SNOW' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        else if(wParam === '구름많고 소나기')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'CLOUDY' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                /> 
                <ColorSkycons
                    type = { 'RAIN' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        else if (wParam === '흐림')
        {
            midTermWeatherIconsResult = 
                <ColorSkycons
                    type = { 'FOG' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />;
        }    
        else if (wParam === '흐리고 비')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'FOG' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                /> 
                <ColorSkycons
                    type = { 'RAIN' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        else if (wParam === '흐리고 눈')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'FOG' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                /> 
                <ColorSkycons
                    type = { 'SNOW' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        else if (wParam === '흐리고 비/눈')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'FOG' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                /> 
                <ColorSkycons
                    type = { 'RAIN_SNOW' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        else if (wParam === '흐리고 소나기')
        {
            midTermWeatherIconsResult = 
                <>
                <ColorSkycons
                    type = { 'FOG' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                /> 
                <ColorSkycons
                    type = { 'RAIN' }
                    animate = { defaults.animate }
                    size = { defaults.size }
                    resizeClear = { true }
                    // {...svgProps}
                />
                </>;
        }
        return midTermWeatherIconsResult;
    }

    render() {

        var options = this.state.jejuGridList.map((jejuGrid) => {
            return(
                <option 
                    data-nx={jejuGrid[Object.keys(jejuGrid)[4]]} 
                    data-ny={jejuGrid[Object.keys(jejuGrid)[5]]}
                    value={jejuGrid[Object.keys(jejuGrid)[0]]}
                    data-longitude={jejuGrid[Object.keys(jejuGrid)[6]]}
                    data-latitude={jejuGrid[Object.keys(jejuGrid)[7]]}>
                        {jejuGrid[Object.keys(jejuGrid)[1]]}&nbsp;
                        {jejuGrid[Object.keys(jejuGrid)[2]]}&nbsp;
                        {jejuGrid[Object.keys(jejuGrid)[3]]}&nbsp;
                </option>
            );
        });
        
        var changeDateFormat = new Date();
        
        var TodayYear = changeDateFormat.getFullYear();
        var TodayMonth = changeDateFormat.getMonth();
        var TodayDate = changeDateFormat.getDate();
        let todayDay = changeDateFormat.getDay();

        var fcstDay = changeDateFormat.getDay();
        
        var arrDayStr = ['일', '월', '화', '수', '목', '금', '토'];
        
        var info = this.state.c_midTermWeather_1.split("○").filter(it => it.includes(" "));
        var infoTag = document.body.offsetWidth >= 770?info.map((row)=>(<div>○&nbsp;{row}</div>)):"";

        var lowTem = [];
        this.state.c_WeatherPages.map((row, index)=>(
            row.data.response.body.items.item
            .filter(weather => weather.category === 'TMN')
            .map((itemrow, idx) => (
                    lowTem[idx] = itemrow.fcstValue
                ))
            ))

            var highTem = [];
            this.state.c_WeatherPages.map((row, index)=>(
                row.data.response.body.items.item
                .filter(weather => weather.category === 'TMX')
                .map((itemrow, idx) => (
                    highTem[idx] = itemrow.fcstValue
                ))
            ))

        const settings = {
            dots: false,  // 점은 안 보이게
            infinite: true, // 무한으로 즐기게
            speed: 500,
            slidesToShow: 7, //4장씩 보이게 해주세요
            slidesToScroll: 1, //1장씩 넘어가세요
            
            responsive: [ 
              {
                  breakpoint: 1200, 
                  settings: {
                    slidesToShow: 6,
                  }
              },
              {
                breakpoint: 1023,
                settings: {
                  slidesToShow: 5
                }
              },
              {
                breakpoint: 550,
                settings: {
                  slidesToShow: 3
                }
              }
            ]
          };

        return (
            <div className="myPlanTop5">
                {/* <br /> */}

                {/* 총 데이타수: */}
                {/* {this.state.c_weatherInfo.length}개 */}
                {/* {this.state.c_TourWeatherPages.length}개 */}
                {/* {JSON.parse(localStorage.getItem('weather_1'))} */}

                {/* '관광지-지역이름' &nbsp; '코스 명' &nbsp; '관광지명' &nbsp; '테마' &nbsp; '최고기온' &nbsp; '최저기온' &nbsp; '풍향' &nbsp; '풍속' &nbsp; '하늘상태' &nbsp; '습도' &nbsp; '강수확률' &nbsp; '강수량' &nbsp; */}
                {/* '최고기온' &nbsp; '최저기온' &nbsp; '하늘상태' */}
                {/* <br /> */}
                {
                    // c_weatherInfo.map((row)=>(
                    //     <>
                    //     {/* ({row.spotAreaName})
                    //     ({row.courseName})
                    //     ({row.spotName})
                    //     ({row.thema}) */}
                    //     (최고기온{row.maxTa})
                    //     (최저기온{row.minTa})
                    //     {/* ({row.wd})
                    //     ({row.ws}) */}

                    //     {/* <ReactAnimatedWeather
                    //         icon={skyStatus[row.sky-1]}
                    //         color={skyColor[row.sky-1]}
                    //         size={defaults.size}
                    //         animate={defaults.animate}
                    //     /> */}
                        
                    //     <ColorSkycons
                    //         type = { Object.keys(skyStatusEnum).find(name => skyStatusEnum[name] === row.sky-1) }
                    //         animate = { defaults.animate }
                    //         size = { defaults.size }
                    //         resizeClear = { true }
                    //         // {...svgProps}
                    //     />
                        
                    //     {krSkyStatus[row.sky-1]}
                        
                    //     </>
                    //     ))
                }
                {/* <br /> */}
                {/* '여러페이지관광코스별_관광지_상세_날씨 최고기온'
                {
                    this.state.c_TourWeatherPages.map((row, index)=>(
                        row.data.response.body.items.item.map((itemrow, idx)=>(
                            <div className='jejuWeatherDiv'>
                                최고기온{itemrow.maxTa}&nbsp;
                                관광지명{itemrow.spotName}&nbsp;
                                예보시각{itemrow.tm}시&nbsp;
                            </div>
                        ))
                        ))
                    }
                <br /> */}
                {/* '여러페이지관광코스별_관광지_상세_날씨 최저기온' */}
                {/* {
                    this.state.c_TourWeatherPages.map((row, index)=>(
                        row.data.response.body.items.item.map((itemrow, idx)=>(
                            <div className='jejuWeatherDiv'>
                                {itemrow.minTa}
                                {itemrow.spotName}
                            </div>
                        ))
                        ))
                } */}
                {/* <br /> */}
                {/* '여러페이지관광코스별_관광지_상세_날씨 하늘상태' */}
                {/* {
                    this.state.c_TourWeatherPages.map((row, index)=>(
                        row.data.response.body.items.item.map((itemrow, idx)=>(
                            <div className='jejuWeatherDiv'>
                                {itemrow.sky}
                                {itemrow.spotName}
                            </div>
                        ))
                    ))
                } */}
                
                {/* <br /> */}
                {/* <br /> */}
                {/* '초단기실황조회' */}
                {/* <br/> */}
                {/* '기온' '동서바람성분' '풍향' '남북바람성분' '풍속' */}
                {/* <br /> */}
                {
                    // store.getState.weatherInfo_3.map((row)=>(
                    //     this.state.c_weatherInfo_4.filter(w => w.category === 'T1H').map((row)=>(
                    //         <>
                    //         '현재기온'
                    //         {/* ({row.category}) */}
                    //         {row.obsrValue}℃
                    //     </>
                    // ))
                }

                {/* <br /> */}
                {/* '동네예보조회'
                {this.state.c_weatherInfo_6.length}개 */}
                {/* <br/> */}
                {/* '발표시각' &nbsp; '예보일자' &nbsp; '예보시각' &nbsp; '자료구분문자' &nbsp; '예보 값' */}
                {/* '자료구분문자' &nbsp; '예보 값' */}
                {/* <br /> */}
                {
                    // this.state.c_weatherInfo_6.filter(w => w.category === 'SKY' || w.category === 'TMN' || w.category === 'TMX').map((row)=>(
                    //     this.state.c_weatherInfo_6.filter(w => w.category === 'SKY' || w.category === 'TMN' || w.category === 'TMX').map((row, index)=>(
                    //         <div className="jejuWeatherDiv">
                    //             {/* <span>
                    //                 발표시각
                    //                 ({row.baseTime})
                    //             </span> */}
                    //             <span>
                    //                 예보일자
                    //                 ({row.fcstDate})
                    //                 변경전({changeDateFormat.getFullYear()}, {changeDateFormat.getMonth()+1}, {changeDateFormat.getDate()}, {arrDayStr[changeDateFormat.getDay()]}요일)
                                    
                    //                 예보일자 섭스트링({changeYear = Number(row.fcstDate.substr(0, 4))});
                                    
                    //                 예보일자 섭스트링2({changeMonth = Number(row.fcstDate.substr(4, 1)) === 0 ? Number(row.fcstDate.substr(5, 1)) : Number(row.fcstDate.substr(4, 2))});
                                    
                    //                 예보일자 섭스트링3({changeDate = Number(row.fcstDate.substr(6, 1)) === 0 ? Number(row.fcstDate.substr(7, 1)) : Number(row.fcstDate.substr(6, 2))});

                    //                 {changeDay = changeDateFormat.getDay()}
                                    
                    //                 <input type='hidden' value={changeDateFormat.setFullYear(changeYear)}></input>
                    //                 <input type='hidden' value={changeDateFormat.setMonth(changeMonth-1)}></input>
                    //                 <input type='hidden' value={changeDateFormat.setDate(changeDate)}></input>

                    //                 변경후({changeDateFormat.getFullYear()}&nbsp;{changeDateFormat.getMonth()+1}&nbsp;{changeDateFormat.getDate()}&nbsp;{arrDayStr[changeDay]}요일)
                    //             </span>
                    //             <br />
                    //             <span>
                    //                 예보시각
                    //                 ({row.fcstTime})
                                    
                    //             </span>
                    //             <br />
                    //             <span>
                    //                 자료구분문자
                    //                 ({row.category})
                    //             </span>
                    //             <br />
                    //             <span>
                    //                 예보 값
                    //                 ({row.fcstValue})
                    //             </span>
                    //             <ColorSkycons
                    //                 type = { Object.keys(skyStatusEnum).find(name => skyStatusEnum[name] === row.fcstValue-1) }
                    //                 animate = { defaults.animate }
                    //                 size = { defaults.size }
                    //                 resizeClear = { true }
                    //                 // {...svgProps}
                    //             />
                    //             ({krSkyStatus[row.fcstValue-1]})
                    //         </div>

                    // ))
                }
                
                {/* '동네예보조회 여러페이지 하늘상태' */}
                <div className='jejuWeatherContainer'>
                {
                    // store.getState.weatherInfo_3.map((row)=>(
                        this.state.c_weatherInfo_4.filter(w => w.category === 'T1H').map((row)=>(
                            <>
                            <span id="weatherNowTem">현재기온&nbsp;<strong style={{color: '#2BBBAD'}}>{row.obsrValue}℃</strong></span>
                            {/* ({row.category}) */}
                        </>
                    ))
                }
                    <div style={{float: 'right'}}>
                        <select onChange={this.selectChange} class="browser-default custom-select" value={this.props.selectBoxValue}>
                            {options}
                        </select>
                    </div>
                    <br />
                
                <div className="weatherInfo">
                {
                    this.state.c_WeatherPages.map((row, index)=>(
                        row.data.response.body.items.item
                        .filter(weather => weather.category === 'TMN')
                        .map((itemrow, idx) => (
                            <div>
                                <strong>
                                {Number(itemrow.fcstDate.substr(4, 1)) === 0 ? Number(itemrow.fcstDate.substr(5, 1)) : Number(itemrow.fcstDate.substr(4, 2))}
                                /
                                {/* 일{changeDate = Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))} */}
                                {Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))}</strong>
                                &nbsp;
                                {arrDayStr[this.FindWeekday(itemrow.fcstDate)]}
                                &nbsp;
                                최저 <strong style={{color: '#2BBBAD'}}>{lowTem[idx]}℃</strong> / 최고 <strong style={{color: '#2BBBAD'}}>{highTem[idx]}℃</strong> 
                            </div>
                        ))
                        ))
                }   
                </div>
                
                <br/>
                {/* {
                    this.state.c_WeatherPages.map((row, index)=>(
                        row.data.response.body.items.item
                        .filter(weather => weather.category === 'TMN')
                        .map((itemrow, idx) => (
                            <React.Fragment> */}
                                {/* {itemrow.category}&nbsp; */}
                                {/* 발표일자{itemrow.baseDate}&nbsp; */}
                                {/* 발표시각{this.changeFcstTime(itemrow.baseTime.substr(0, 2))}시&nbsp; */}
                                {/* 예보일자 */}
                                {/* {itemrow.fcstDate}&nbsp; */}
                                {/* {Number(itemrow.fcstDate.substr(0, 4))}년도 */}
                            
                                {/* 월{changeMonth = Number(itemrow.fcstDate.substr(4, 1)) === 0 ? Number(itemrow.fcstDate.substr(5, 1)) : Number(itemrow.fcstDate.substr(4, 2))} */}
                                {/* {Number(itemrow.fcstDate.substr(4, 1)) === 0 ? Number(itemrow.fcstDate.substr(5, 1)) : Number(itemrow.fcstDate.substr(4, 2))}
                                / */}
                                {/* 일{changeDate = Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))} */}
                                {/* {Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))}
                                &nbsp;
                                {arrDayStr[this.FindWeekday(itemrow.fcstDate)]}
                                &nbsp;
                                최저
                                {itemrow.fcstValue}℃&nbsp; */}
                                {/* 예보시각
                                {this.changeFcstTime(itemrow.fcstTime.substr(0, 2))}시 */}
                            {/* </React.Fragment>
                        ))
                        ))
                }
                <br/>
                &nbsp; */}
                {/* '동네예보조회 여러페이지 낮 최고기온' */}
                {/* {
                    this.state.c_WeatherPages.map((row, index)=>(
                        row.data.response.body.items.item
                        .filter(weather => weather.category === 'TMX')
                        .map((itemrow, idx) => (
                            <React.Fragment> */}
                                {/* {itemrow.category}&nbsp; */}
                                {/* 발표일자{itemrow.baseDate}&nbsp; */}
                                {/* 발표시각{this.changeFcstTime(itemrow.baseTime.substr(0, 2))}시&nbsp; */}
                                {/* 예보일자 */}
                                {/* {itemrow.fcstDate}&nbsp; */}
                                {/* {Number(itemrow.fcstDate.substr(0, 4))}년도 */}
                            
                                {/* 월{changeMonth = Number(itemrow.fcstDate.substr(4, 1)) === 0 ? Number(itemrow.fcstDate.substr(5, 1)) : Number(itemrow.fcstDate.substr(4, 2))} */}
                                {/* {Number(itemrow.fcstDate.substr(4, 1)) === 0 ? Number(itemrow.fcstDate.substr(5, 1)) : Number(itemrow.fcstDate.substr(4, 2))}
                                / */}
                                {/* 일{changeDate = Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))} */}
                                {/* {Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))}
                                &nbsp;
                                {arrDayStr[this.FindWeekday(itemrow.fcstDate)]}
                                &nbsp;
                                최고
                                {itemrow.fcstValue}℃&nbsp; */}
                                {/* 예보시각
                                {this.changeFcstTime(itemrow.fcstTime.substr(0, 2))}시 */}
                            {/* </React.Fragment>
                        ))
                    ))
                }
                <br /> */}
                    
                    

                    {/* {this.state.c_address} */}
                    <Slider {...settings}>
                    {/* <div className='preventFloat'> */}
                    {
                        this.state.c_WeatherPages.map((row, index)=>(
                            row.data.response.body.items.item
                            .filter(weather => weather.category === 'SKY')
                            .map((itemrow, idx) => (
                                <div className='jejuWeatherDiv_small active'>
                                    {/* {itemrow.category}&nbsp; */}
                                    {/* {itemrow.fcstValue}&nbsp; */}
                                    <ColorSkycons
                                        type = { Object.keys(skyStatusEnum).find(name => skyStatusEnum[name] === itemrow.fcstValue-1) }
                                        animate = { defaults.animate }
                                        size = { defaults.size }
                                        resizeClear = { true }
                                        // {...svgProps}
                                    />
                                    {/* {krSkyStatus[itemrow.fcstValue-1]} */}
                                    {/* {this.changeFcstTime(itemrow.baseTime.substr(0, 2))}시&nbsp; */}
                                    {/* {itemrow.fcstDate}&nbsp; */}
                                    {/* 변경전({changeDateFormat.getFullYear()}, {changeDateFormat.getMonth()+1}, {changeDateFormat.getDate()}, {arrDayStr[changeDateFormat.getDay()]}요일) */}
                                        
                                    {/* 년도{changeYear = Number(itemrow.fcstDate.substr(0, 4))} */}
                                    {/* {Number(itemrow.fcstDate.substr(0, 4))}년도 */}
                                    <br />                                
                                    {/* 월{changeMonth = Number(itemrow.fcstDate.substr(4, 1)) === 0 ? Number(itemrow.fcstDate.substr(5, 1)) : Number(itemrow.fcstDate.substr(4, 2))} */}
                                    {Number(itemrow.fcstDate.substr(4, 1)) === 0 ? Number(itemrow.fcstDate.substr(5, 1)) : Number(itemrow.fcstDate.substr(4, 2))}
                                    /
                                    {/* 일{changeDate = Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))} */}
                                    {Number(itemrow.fcstDate.substr(6, 1)) === 0 ? Number(itemrow.fcstDate.substr(7, 1)) : Number(itemrow.fcstDate.substr(6, 2))}
                                    &nbsp;
                                    {arrDayStr[this.FindWeekday(itemrow.fcstDate)]}<br/>
                                    &nbsp;
                                    {this.changeFcstTime(itemrow.fcstTime.substr(0, 2))}시
                                </div>
                            ))
                            ))
                    }
                    
                    </Slider>
                    {/* <Slider {...settings}>
                    <div className='jejuWeatherDiv'>
                             {this.AfterDays(3)}&nbsp;
                             {arrDayStr[(todayDay+3)%7]}
                             <br />
                            오전💧{this.state.c_midTermWeather_2.rnSt3Am}%&nbsp;<br/>
                            {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf3Am)}
                            <br />
                            오후💧{this.state.c_midTermWeather_2.rnSt3Pm}%&nbsp;<br/>
                             {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf3Pm)}
                        </div>
                               <div className='jejuWeatherDiv'>
                                    {this.AfterDays(4)}&nbsp;
                                    {arrDayStr[(todayDay+4)%7]}
                                    <br />
                                    오전💧{this.state.c_midTermWeather_2.rnSt4Am}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf4Am)}
                                    <br />
                                    오후💧{this.state.c_midTermWeather_2.rnSt4Pm}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf4Pm)} 
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(5)}&nbsp;
                                    {arrDayStr[(todayDay+5)%7]}
                                    <br />
                                    오전💧{this.state.c_midTermWeather_2.rnSt5Am}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf5Am)}
                                    <br />
                                    오후💧{this.state.c_midTermWeather_2.rnSt5Pm}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf5Pm)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(6)}&nbsp;
                                    {arrDayStr[(todayDay+6)%7]}
                                    <br />
                                    오전💧{this.state.c_midTermWeather_2.rnSt6Am}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf6Am)}
                                    <br />
                                    오후💧{this.state.c_midTermWeather_2.rnSt6Pm}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf6Pm)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(7)}&nbsp;
                                    {arrDayStr[(todayDay+7)%7]}
                                    <br />
                                    오전💧{this.state.c_midTermWeather_2.rnSt7Am}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf7Am)}
                                    <br />
                                    오후💧{this.state.c_midTermWeather_2.rnSt7Pm}%&nbsp;<br/>
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf7Pm)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(8)}&nbsp;
                                    {arrDayStr[(todayDay+8)%7]}
                                    <br />
                                    <br />
                                    💧{this.state.c_midTermWeather_2.rnSt8}%
                                    <br />
                                    {this.state.c_midTermWeather_2.wf8}&nbsp;
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf8)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(9)}&nbsp;
                                    {arrDayStr[(todayDay+9)%7]}
                                    <br />
                                    <br />
                                    💧{this.state.c_midTermWeather_2.rnSt9}%
                                    <br />
                                    {this.state.c_midTermWeather_2.wf9}&nbsp;
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf9)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(10)}&nbsp;
                                    {arrDayStr[(todayDay+10)%7]}
                                    <br />
                                    <br />
                                    💧{this.state.c_midTermWeather_2.rnSt10}%
                                    <br />
                                    {this.state.c_midTermWeather_2.wf10}&nbsp;
                                    {this.midTermWeatherIcons(this.state.c_midTermWeather_2.wf10)}
                                </div>
                    </Slider> */}
                        
                    {/* {
                        this.state.c_midTermWeather_2.map((row, index) => ( */}
                            {/* // <React.Fragment>
                            // <>
                            //     <div className='jejuWeatherDiv'>
                            //         {this.AfterDays(3)}&nbsp;
                            //         {arrDayStr[(todayDay+3)%7]}
                            //         <br />
                            //         오전💧{row.rnSt3Am}%&nbsp; */}
                                    {/* {row.wf3Am}&nbsp; */}
                                    {/* {this.midTermWeatherIcons(row.wf3Am)}
                                    <br />
                                    오후💧{row.rnSt3Pm}%&nbsp; */}
                                    {/* {row.wf3Pm}&nbsp; */}
                                    {/* {this.midTermWeatherIcons(row.wf3Pm)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(4)}&nbsp;
                                    {arrDayStr[(todayDay+4)%7]}
                                    <br />
                                    오전💧{row.rnSt4Am}%&nbsp;
                                    {this.midTermWeatherIcons(row.wf4Am)} */}
                                    {/* {row.wf4Am} */}
                                    {/* <br />
                                    오후💧{row.rnSt4Pm}%&nbsp;
                                    {this.midTermWeatherIcons(row.wf4Pm)}  */}
                                    {/* {row.wf4Pm}&nbsp; */}
                                {/* </div> */}
                                {/* <div className='jejuWeatherDiv'>
                                    {this.AfterDays(5)}&nbsp;
                                    {arrDayStr[(todayDay+5)%7]}
                                    <br />
                                    오전💧{row.rnSt5Am}%&nbsp;
                                    {this.midTermWeatherIcons(row.wf5Am)} */}
                                    {/* {row.wf5Am} */}
                                    {/* <br />
                                    오후💧{row.rnSt5Pm}%&nbsp;
                                    {this.midTermWeatherIcons(row.wf5Pm)} */}
                                    {/* {row.wf5Pm}&nbsp; */}
                                {/* </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(6)}&nbsp;
                                    {arrDayStr[(todayDay+6)%7]}
                                    <br />
                                    오전💧{row.rnSt6Am}%&nbsp;
                                    {/* {row.wf6Am} */}
                                    {/* {this.midTermWeatherIcons(row.wf6Am)}
                                    <br />
                                    오후💧{row.rnSt6Pm}%&nbsp;  */}
                                    {/* {row.wf6Pm}&nbsp; */}
                                    {/* {this.midTermWeatherIcons(row.wf6Pm)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(7)}&nbsp;
                                    {arrDayStr[(todayDay+7)%7]}
                                    <br /> */}
                                    {/* 오전💧{row.rnSt7Am}%&nbsp; */}
                                    {/* {row.wf7Am} */}
                                    {/* {this.midTermWeatherIcons(row.wf7Am)} */}
                                    {/* <br /> */}
                                    {/* 오후💧{row.rnSt7Pm}%&nbsp; */}
                                    {/* {row.wf7Pm}&nbsp; */}
                                    {/* {this.midTermWeatherIcons(row.wf7Pm)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(8)}&nbsp;
                                    {arrDayStr[(todayDay+8)%7]}
                                    <br />
                                    <br />
                                    💧{row.rnSt8}%
                                    <br />
                                    {row.wf8}&nbsp;
                                    {this.midTermWeatherIcons(row.wf8)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(9)}&nbsp;
                                    {arrDayStr[(todayDay+9)%7]}
                                    <br />
                                    <br />
                                    💧{row.rnSt9}%
                                    <br />
                                    {row.wf9}&nbsp;
                                    {this.midTermWeatherIcons(row.wf9)}
                                </div>
                                <div className='jejuWeatherDiv'>
                                    {this.AfterDays(10)}&nbsp;
                                    {arrDayStr[(todayDay+10)%7]}
                                    <br />
                                    <br />
                                    💧{row.rnSt10}%
                                    <br />
                                    {row.wf10}&nbsp;
                                    {this.midTermWeatherIcons(row.wf10)}
                                </div> */}
                             {/* </React.Fragment> */}
                            {/* </>
                        ))
                    } */}
                    
                    {/* </div> */}
                    
                    
                <br />
                
                {/* '체감온도'
                {
                    this.state.c_weatherInfo_2.map((row)=>(
                        <>
                        {row.btIndex}℃
                        </>
                        ))
                }
                <br /> */}
                {/* {this.state.c_midTermWeather_1} */}
                <div className="weatherInfo">
                    {infoTag}
                </div>

                <br />
                {/* <img src = { OPENNURI } alt='OPENNURI' /> */}
                </div>


                {
                    // this.state.c_weatherInfo_6.filter(w => w.category === 'SKY' || w.category === 'TMN' || w.category === 'TMX').map((row)=>(
                    //     this.state.c_weatherInfo_6.filter(w => w.category === 'SKY' || w.category === 'TMN' || w.category === 'TMX').map((row, index)=>(
                    //         <div className="jejuWeatherDiv">
                    //             {/* <span>
                    //                 발표시각
                    //                 ({row.baseTime})
                    //             </span> */}
                    //             <span>
                    //                 예보일자
                    //                 ({row.fcstDate})
                    //                 변경전({changeDateFormat.getFullYear()}, {changeDateFormat.getMonth()+1}, {changeDateFormat.getDate()}, {arrDayStr[changeDateFormat.getDay()]}요일)
                                    
                    //                 예보일자 섭스트링({changeYear = Number(row.fcstDate.substr(0, 4))});
                                    
                    //                 예보일자 섭스트링2({changeMonth = Number(row.fcstDate.substr(4, 1)) === 0 ? Number(row.fcstDate.substr(5, 1)) : Number(row.fcstDate.substr(4, 2))});
                                    
                    //                 예보일자 섭스트링3({changeDate = Number(row.fcstDate.substr(6, 1)) === 0 ? Number(row.fcstDate.substr(7, 1)) : Number(row.fcstDate.substr(6, 2))});

                    //                 {changeDay = changeDateFormat.getDay()}
                                    
                    //                 <input type='hidden' value={changeDateFormat.setFullYear(changeYear)}></input>
                    //                 <input type='hidden' value={changeDateFormat.setMonth(changeMonth-1)}></input>
                    //                 <input type='hidden' value={changeDateFormat.setDate(changeDate)}></input>

                    //                 변경후({changeDateFormat.getFullYear()}&nbsp;{changeDateFormat.getMonth()+1}&nbsp;{changeDateFormat.getDate()}&nbsp;{arrDayStr[changeDay]}요일)
                    //             </span>
                    //             <br />
                    //             <span>
                    //                 예보시각
                    //                 ({row.fcstTime})
                                    
                    //             </span>
                    //             <br />
                    //             <span>
                    //                 자료구분문자
                    //                 ({row.category})
                    //             </span>
                    //             <br />
                    //             <span>
                    //                 예보 값
                    //                 ({row.fcstValue})
                    //             </span>
                    //             <ColorSkycons
                    //                 type = { Object.keys(skyStatusEnum).find(name => skyStatusEnum[name] === row.fcstValue-1) }
                    //                 animate = { defaults.animate }
                    //                 size = { defaults.size }
                    //                 resizeClear = { true }
                    //                 // {...svgProps}
                    //             />
                    //             ({krSkyStatus[row.fcstValue-1]})
                    //         </div>

                    // ))
                }
            </div>
        )
    }
}

export default Weather;