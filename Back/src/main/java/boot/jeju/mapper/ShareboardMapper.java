package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import boot.jeju.data.ShareboardDto;

@Mapper
public interface ShareboardMapper {
	public int getMaxNum();
	public int getTotalCount();
	public List<ShareboardDto> getList(@Param("start") int start,@Param("perPage") int perPage);
	public void insertBoard(ShareboardDto dto);
	public ShareboardDto getData(String num);
	public List<ShareboardDto> getReviewList(int regroup);
	public List<ShareboardDto> getDelReviewList(@Param("regroup")int regroup,@Param("restep") int restep);
	public void updateLikes(String num);
	public void updateRestep(@Param("regroup") int regroup,@Param("restep") int restep);
	public void isGroupStep(int regroup);
	public int isNextStep(@Param("regroup") int regroup,@Param("relevel") int relevel,@Param("restep") int restep);
	public void sharedelete(@Param("num") String num,@Param("regroup") int regroup);
	public void deleteReview(String num);
	public int getCount(@Param("regroup") String regroup);
	public void updateShareBoard(ShareboardDto dto);
	public List<ShareboardDto> getSearchList(@Param("start") int start,@Param("perPage") int perPage,@Param("search") String search);
	public int getSearchTotalCount(String search);
	public void updateShareBoardAnswer(@Param("content") String content,@Param("num") String num);
	public List<ShareboardDto> getPhotos(int regroup);
	public String getNum();
	
}
