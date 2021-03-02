package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import boot.jeju.data.SpotlistDto;

@Mapper
public interface SpotlistMapper {
	public List<SpotlistDto> getList(@Param("start") int start, @Param("perPage") int perPage, 
									@Param("label2") String label2, @Param("select") String select);
	public int getTotalCount(String label2);
	public List<SpotlistDto> getSearchList(@Param("start") int start, @Param("perPage") int perPage, 
									@Param("category") String category, @Param("search") String search);
	public int getSearchTotalCount(@Param("category") String category, @Param("search") String search);
	public SpotlistDto getData(String contentsid);
	public void insert(SpotlistDto dto);
	public void update(SpotlistDto dto);
	public void delete(String contentsid);
	public void updateLikes(String contentsid);
	public void updateStar(@Param("contentsid") String contentsid, @Param("avgStar") int avgStar);
	public List<SpotlistDto> getHotSpotList();
		
}