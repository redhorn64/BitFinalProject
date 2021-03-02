package boot.jeju.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import boot.jeju.data.ChatmsgDto;
import boot.jeju.data.ChatroomDto;
import boot.jeju.mapper.ChatMapper;

@RestController
@CrossOrigin
public class ChatController {

    @Autowired
    ChatMapper mapper;

    // 방 생성
    @PostMapping("/chat/createRoom")
    public void createRoom(@RequestBody ChatroomDto dto) {
        mapper.createRoom(dto);
    }

    // user가 속한 방 리스트
    @GetMapping("/chat/getRoom")
    public List<ChatroomDto> getRoom(@RequestParam String user) {
//		return mapper.getRoom(user);
        List<ChatroomDto> list = mapper.getRoom(user);
        for (ChatroomDto dto : list) {
            String lastMsg = "";
            String lastWriteday = "";
            if (mapper.getLastMsg(dto.getNum()).size() > 0) {
                lastMsg = mapper.getLastMsg(dto.getNum()).get(0).getMsg();
                lastWriteday = mapper.getLastMsg(dto.getNum()).get(0).getWriteday();
            }
            dto.setLastMsg(lastMsg);
            dto.setLastWriteday(lastWriteday);
            int msgCnt = mapper.getMsgTotalCount(dto.getNum());
            dto.setMsgCnt(msgCnt);
        }

        return list;
    }

    // user이 searchId 검색
    @GetMapping("/chat/getSearchIdRoom")
    public List<ChatroomDto> getSearchIdRoom(@RequestParam String user, @RequestParam String searchId) {
        return mapper.getSearchIdRoom(user, searchId);
    }

    // 중복 방이 있는지 검색.
    @GetMapping("/chat/idCheckOfChat")
    public int idCheckOfChat(@RequestParam String user, @RequestParam String searchId) {
        return mapper.idCheckOfChat(user, searchId);
    }

    // 해당 방의 메시지 리 스트
    @GetMapping("/chat/getMsgs")
    public List<ChatmsgDto> getMsgs(@RequestParam String roomNum) {
        return mapper.getMsgs(roomNum);
    }

    // 메시지 입력
    @PostMapping("/chat/insertMsg")
    public void insertMsg(@RequestBody ChatmsgDto dto) {
        mapper.insertMsg(dto);
    }

    // 각 방마다 마지막 메시지
    @GetMapping("/chat/lastMsg")
    public Map<String, String> getLastMsg(@RequestParam String roomNum) {
        String lastMsg = mapper.getLastMsg(roomNum).get(0).getMsg();

        Map<String, String> map = new HashMap<String, String>();
        map.put("lastMsg", lastMsg);
        return map;
    }

    // 각 방의 메시지 갯수
    @GetMapping("/chat/msgCount")
    public int getMsgTotalCount(@RequestParam String roomNum) {
        return mapper.getMsgTotalCount(roomNum);
    }
}
