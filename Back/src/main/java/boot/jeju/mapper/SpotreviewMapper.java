package boot.jeju.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import boot.jeju.data.SpotreviewDto;

@Mapper
public interface SpotreviewMapper {
	public List<SpotreviewDto> getList(@Param("start")int start, @Param("perPage")int perPage, @Param("contentsid")String contentsid);
	public SpotreviewDto getData(String num);
	public int getTotalCount(String contentsid);
	public void insert(SpotreviewDto dto);
	public void delete(String num);
	public void update(SpotreviewDto dto);
	public void updateLikes(String num);
	public int getAvgStar(String contentsid);
}