import {URL} from "./redux/config";
import store from "./redux/store";
import axios from "axios";

class ChattingLogic {

    getRoomList(callback = null) {
        let url = URL + "/chat/getRoom" +
            "?user=" + store.getState().loginId;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("getRoomList() res :", res);
            if (callback != null) {
                callback(res);
            }
        }).catch(err => {
            console.log("getRoomList() err :", err);
        });
    }

    getMsgList(callback = null) {
        let url = URL + "/chat/getMsgs" +
            "?roomNum=" + store.getState().selectedRoomNum;

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    isCheckOfChatRoom(loginId, searchId, callback = null) {
        let url = URL + "/chat/idCheckOfChat" +
            "?user=" + loginId +
            "&searchId=" + searchId;

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log("isCheckOfChatRoom()", res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log("isCheckOfChatRoom()", err);
            });
    }

    isMemberIdCheck(searchId, callback = null) {
        let url = URL + '/member/checkid' +
            '?id=' + searchId;

        console.log("isMemberIdCheck()", url);

        axios.get(url)
            .then(res => {
                console.log("isMemberIdCheck()", res);
                if (callback != null) {
                    callback(res);
                }
            }).catch(err => {
            console.log("isMemberIdCheck()", err);
        })
    }

    createRoom(friendId, callback = null) {
        let url = URL + "/chat/createRoom";
        let user1 = store.getState().loginId;
        let user2 = friendId;

        console.log(url);

        axios.post(url, {user1, user2})
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    /*
    // 메시지 입력
	@PostMapping("/chat/insertMsg")
	public void insertMsg(@RequestBody ChatmsgDto dto) {
		mapper.insertMsg(dto);
	}
    * */
    sendMessage(_msg, callback = null) {
        let roomNum = store.getState().selectedRoomNum;
        let msg = _msg;
        let sender = store.getState().loginId;

        let url = URL + "/chat/insertMsg";
        let data = {
            roomNum, msg, sender,
        };

        console.log(url, data);

        axios.post(url, data)
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    /*
    // 각 방마다 마지막 메시지
	@GetMapping("/chat/lastMsg")
	public Map<String, String> getLastMsg(@RequestParam String roomNum){
		String lastMsg = mapper.getLastMsg(roomNum).get(0).getMsg();

		Map<String, String> map = new HashMap<String, String>();
		map.put("lastMsg", lastMsg);
		return map;
	}
    * */
    getLastMsg(roomNum, callback = null) {
        let url = URL + "/chat/lastMsg" +
            "?roomNum=" + roomNum;
        console.log(url);

        axios.get(url)
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    getLastWriteDay(_lastWriteDay) {
        let _date = new Date(_lastWriteDay.replaceAll("-", "/"));
        let _strTime = ""; //_date.getHours() + ":" + _date.getMinutes();
        let _now = new Date(Date.now());
        let _nowYear = _now.getFullYear();
        let _nowMonth = _now.getMonth() + 1;
        let _nowDate = _now.getDate();

        let isToday = true;

        if (_nowYear > _date.getFullYear()) {
            _strTime += _date.getFullYear() + "년 ";
            isToday = false;
        }

        if (_nowMonth > _date.getMonth() + 1 || _nowDate > _date.getDate()) {
            _strTime += (_date.getMonth() + 1).toString().padStart(2, '0') + "월 "
                + _date.getDate().toString().padStart(2, '0') + "일";
            isToday = false;
        }

        if (isToday) {
            _strTime = _date.getHours().toString().padStart(2, '0') + ":"
                + _date.getMinutes().toString().padStart(2, '0');
        }

        return _strTime;
    }

    getSearchIdRoom(user, searchId, callback = null) {
        let url = URL + "/chat/getSearchIdRoom" +
            "?user=" + user +
            "&searchId=" + searchId;

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    getProfileImage(id, callback = null) {
        let url = URL + "/member/getdata" +
            "?id=" + id;

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log("getProfileImage() ", res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log("getProfileImage() ", err);
            });
    }

}

export default ChattingLogic;

