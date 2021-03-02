package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import boot.jeju.data.NoticeDto;

@Mapper
public interface NoticeMapper {
	public List<NoticeDto> getListOfNotice(@Param("start") int start, @Param("perPage") int perPage);
	public NoticeDto getDataOfNotice(String num);
	public void insertOfNotice(NoticeDto dto);
	public void deleteOfNotice(String num);
	public void updateOfNotice(NoticeDto dto);
	public void updateOfStar(@Param("num") String num, @Param("star") String star);
	public int totalCountOfNotice();
}
