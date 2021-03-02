package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import boot.jeju.data.ChatmsgDto;
import boot.jeju.data.ChatroomDto;

@Mapper
public interface ChatMapper {
	public void createRoom(ChatroomDto dto);
	public List<ChatroomDto> getRoom(String user);
	public List<ChatroomDto> getSearchIdRoom(@Param("user") String user, @Param("searchId") String searchId);
	public int idCheckOfChat(@Param("user") String user, @Param("searchId") String searchId);
	public void insertMsg(ChatmsgDto dto);
	public List<ChatmsgDto> getMsgs(String roomNum);
	public List<ChatmsgDto> getLastMsg(String roomNum);
	public int getMsgTotalCount(String roomNum);
}
