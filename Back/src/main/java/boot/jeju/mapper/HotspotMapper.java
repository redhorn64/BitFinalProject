package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import boot.jeju.data.HotspotDto;

@Mapper
public interface HotspotMapper {

	public List<HotspotDto> getList(@Param("groupNum") String groupNum, @Param("day") String num);
	public List<HotspotDto> getGroupNum();
	public List<HotspotDto> getDay(@Param("groupNum") String groupNum);
	public List<HotspotDto> getDays(@Param("groupNum") String groupNum);
	public int getCountOfDay(String groupNum);
}
