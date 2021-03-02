/*global kakao */
import React, { useEffect, useState} from "react";
import './kakaomap.css';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import HotelIcon from '@material-ui/icons/Hotel';
import AroundModal from "./AroundModal";
import UseModal from './UseModal';

const MapComp=(props)=> {

    let longitude = useState(0);
    let latitude = useState(0);
    let title = useState("");
    const [category, setCategory] = useState("");
    const [wishTitle, setWishTitle] = useState("");
    const [wishContent, setWishContent] = useState("");
    
    const [value, setValue] = React.useState(0);

    console.log("longitude : " + props.longitude);
    useEffect(() => {
        
        longitude = props.longitude;
        latitude = props.latitude;
        title = props.title;

        mapscript();
    });

  const mapscript = () => {
    
    //let markers = [];
    let placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
        contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
        markers = [], // 마커를 담을 배열입니다
        currCategory = '';


    let mapContainer = document.getElementById("map"), mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    let ps = new kakao.maps.services.Places(map);
    
    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
        latitude,
        longitude
    );

    // 마커를 생성
    let marker = new kakao.maps.Marker({
        map:map,
      position: markerPosition,
      title: title
    });

    let content = '<div className="wrap"><div className="info"><div className="mtitle">' + title
            + '<div className="close" onClick={this.closeOverlay.bind(this)} title="닫기"></div></div></div></div>';

    //마커 위에 커스텀오버레이를 표시합니다
    //마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    let overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()       
    });
    //마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        overlay.setMap(map);
    });
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});

    //커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    function closeOverlay() {
        overlay.setMap(null);     
    }
    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', searchPlaces);
    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
    contentNode.className = 'placeinfo_wrap';
    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);
    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);  
    // 각 카테고리에 클릭 이벤트를 등록합니다
    addCategoryClickEvent();   
    
    //searchPlaces();

    function addEventHandle(target, type, callback) {
        if (target.addEventListener) {
            target.addEventListener(type, callback);
        } else {
            target.attachEvent('on' + type, callback);
        }
    }
    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
        if (!currCategory) {
            return;
        }
        
        // 커스텀 오버레이를 숨깁니다 
        placeOverlay.setMap(null);
        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();
        
        ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true});
        
    }
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {

    if (status === kakao.maps.services.Status.OK) {
         // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다

         displayPlaces(data);
         
      // 페이지 번호를 표출합니다
         displayPagination(pagination);
     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
         // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
         displayPlaces(null);
     } else if (status === kakao.maps.services.Status.ERROR) {
         // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
         
     }
 }
 // 검색 결과 목록과 마커를 표출하는 함수입니다
 function displayPlaces(places) {
    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
     // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
     var order = document.getElementById(currCategory).getAttribute('data-order');
     var listEl = document.getElementById('placesList'), 
     menuEl = document.getElementById('menu_wrap'),
     fragment = document.createDocumentFragment(), 
     bounds = new kakao.maps.LatLngBounds(), 
     listStr = '';
  // 검색 결과 목록에 추가된 항목들을 제거합니다
     removeAllChildNods(listEl);
     // 지도에 표시되고 있는 마커를 제거합니다
     removeMarker();
     
     if(places == null){
        itemEl = getListItem(-1, null);
        fragment.appendChild(itemEl);
     }
    else{
        for ( var i=0; i<places.length; i++ ) {
            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i), 
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);
            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function(marker, place) {
                kakao.maps.event.addListener(marker, 'click', function() {
                    displayPlaceInfo(place);
                });
            })(marker, places[i]);
            fragment.appendChild(itemEl);
        }
    }
    
     // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
     listEl.appendChild(fragment);
    // menuEl.scrollTop = 0;
     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
     //map.setBounds(bounds);
 }
 // 검색결과 항목을 Element로 반환하는 함수입니다
 function getListItem(index, places) {
     
     if(index == -1){
        var el = document.createElement('li'),
        itemStr = "<div><br/>검색 결과가 존재하지 않습니다.</div>";
        el.innerHTML = itemStr;
        el.className = 'item';
    
        return el;
     }
    else{
        // setting(places);
        var el = document.createElement('li'),
        itemStr = '<table className="table table-bordered" id="placeListTable"><tr>' +
                    '<td style={{width:"20%"}}><span class="markerbg marker_' + (index+1) + '"></span></td>' +
                    '<td style={{width:"60%"}}><a class="info" href="' + places.place_url + '" target="_blank" title="' + places.place_name + '">' +
                    '<p>' + places.place_name + '</p>';
        itemStr += '<span class="gray">' +  places.address_name  + '</span>';      
        itemStr += '<span class="tel">' + places.phone  + '</span>' + 
                    '</a></td>' +
                    '<td style={{width:"20%"}}><div class="addWishBtn">일정추가</div></td></tr></table>';
        el.innerHTML = itemStr;
        el.onclick=function(){
            setWishTitle(places.place_name);
            setWishContent(places.address_name);
            toggle();
        }
        el.className = 'item';
                
        return el;

        // return <div dangerouslySetInnerHTML={{ __html : itemStr}}></div>;
    }    
 }
 
 
 
 // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
 function addMarker(position, idx, title) {
     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
         imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
         imgOptions =  {
             spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
             spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
             offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
         },
         markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
             marker = new kakao.maps.Marker({
             position: position, // 마커의 위치
             image: markerImage 
         });
     marker.setMap(map); // 지도 위에 마커를 표출합니다
     markers.push(marker);  // 배열에 생성된 마커를 추가합니다
     return marker;
 }
 // 지도 위에 표시되고 있는 마커를 모두 제거합니다
 function removeMarker() {
     for ( var i = 0; i < markers.length; i++ ) {
         markers[i].setMap(null);
     }   
     markers = [];
 }
 // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
 function displayPagination(pagination) {
     var paginationEl = document.getElementById('pagination'),
         fragment = document.createDocumentFragment(),
         i; 
     // 기존에 추가된 페이지번호를 삭제합니다
     while (paginationEl.hasChildNodes()) {
         paginationEl.removeChild (paginationEl.lastChild);
     }
     for (i=1; i<=pagination.last; i++) {
         var el = document.createElement('a');
         el.href = "#";
         el.innerHTML = i;
         if (i===pagination.current) {
             el.className = 'on';
         } else {
             el.onclick = (function(i) {
                 return function() {
                     pagination.gotoPage(i);
                 }
             })(i);
         }
         fragment.appendChild(el);
     }
     paginationEl.appendChild(fragment);
 }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo (place) {
        var content = '<div class="placeinfo">' +
                        '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

        if (place.road_address_name) {
            content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                        '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
        }  else {
            content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
        }                
    
        content += '    <span class="tel">' + place.phone + '</span>' + 
                    '</div>' + 
                    '<div class="after"></div>';

        contentNode.innerHTML = content;
        placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
        placeOverlay.setMap(map);  
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {   
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }
  
    //각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
        var category = document.getElementById('category'),
            children = category.children;
        for (var i=0; i<children.length; i++) {
            children[i].onclick = onClickCategory;
        }
    }

    //카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
        var id = this.id, className = this.className;

        placeOverlay.setMap(null);
        if (className === 'on') {
            currCategory = '';
            // changeCategoryClass();
            removeMarker();
        } else {
            currCategory = id;
            setCategory(currCategory);
            // changeCategoryClass(this);
            searchPlaces();
        }
    }

    //클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    // function changeCategoryClass(el) {
    //     var category = document.getElementById('category'),
    //         children = category.children,
    //         i;
    //     for ( i=0; i<children.length; i++ ) {
    //         children[i].className = '';
    //     }
    //     if (el) {
    //         el.className = 'on';
    //     } 
    // } 
    // 마커를 지도 위에 표시
    marker.setMap(map);
  };


    const {isShowing, toggle} = UseModal();
  return (
      <div>
          {/* <div id="map" style={{ width: "500px", height: "500px" }}></div> */}
          
          {/* <button className="button-default" onClick={toggle}>Show Modal</button> */}
          {/* 모달 */}
          <AroundModal
                isShowing={isShowing}
                hide={toggle}
                wishTitle = {wishTitle}
                wishContent = {wishContent}
                category = {category}
            />

          <Box className="map_wrap" style={{textAlign: 'center'}}
                        display="flex"
                        flexWrap="wrap"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                        justifyContent="center"
                        css={{ maxWidth: '100%' }}
                    >
                        
                        <Box m={1} id="map" style={{position:'relative', overflow:'hidden'}}>
                            <input type="hidden" value={title} id="keyword" size="15"></input>
                        </Box>

                        <br/><br/>
                        
                        <Box m={1} id="placeListBox">
                            <BottomNavigation
                                    id="category"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    showLabels
                                    >
                                    <BottomNavigationAction id="FD6" data-order="0" label="Food" icon={<RestaurantIcon />} 
                                        style={{borderLeft: '1px solid #ddd', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd'}} />
                                    <BottomNavigationAction id="CE7" data-order="1" label="Cafe" icon={<LocalCafeIcon />} style={{border: '1px solid #ddd'}} />
                                    <BottomNavigationAction id="AD5" data-order="2" label="Rooms" icon={<HotelIcon />}
                                        style={{borderRight: '1px solid #ddd', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd'}}/>
                                    </BottomNavigation>
                            <div id="menu_wrap" class="bg_white">
                                <ul id="placesList">
                                    <li style={{marginTop: '30px'}}>원하시는 카테고리를 선택해주세요.</li>
                                </ul>
                                <div id="pagination"></div>
                            </div>
                        </Box>
                        
                    </Box>

                    {/* 일정 추가 모달 */}
                    {/* <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className="aroundmodal"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <div className="aroundpaper">
                            <span className="aroundmodalTitle">일정 추가</span><br/> */}
                            {/* 🏰&nbsp;&nbsp;{this.state.spotdata.title}<br/> */}
                            {/* 🗺&nbsp;&nbsp;{this.state.spotdata.roadaddr}<br/> */}
                            {/* 🗓&nbsp;&nbsp;여행 날짜
                            <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                            ⏰&nbsp;&nbsp;예정 시간
                            <input type="time" class="form-control form-control-sm" ref="wishtime"></input><br/>
                            <div style={{textAlign: 'center'}}>
                                <button type="button" class="btn btn-warning aroundmodalBtn"><b>추가</b></button>
                            </div>

                        </div>
                        </Fade>
                    </Modal> */}

                    
      </div>   
  );
}

export default MapComp;