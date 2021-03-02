package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import boot.jeju.data.ShareplanDto;

@Mapper
public interface ShareplanMapper {

	public List<ShareplanDto> getSharePlanList(@Param("start") int start,@Param("perPage") int perPage);
	public int getTotalCount(String memId);
	public ShareplanDto getData(String wishnum);
	
	//public List<ShareplanDto> getGroupData(@Param("memId") String memId, @Param("wishday") String wishday);
	public void insert(ShareplanDto dto);
	public void delete(String num);
	public String maxGroupNum();
//	public List<ShareplanDto> getgroup(String groupnum);
	public List<ShareplanDto> getgroupnum();
	
	public int getAllTotalCount();
	public List<ShareplanDto> getAllgroupnum(@Param("start") int start,@Param("perPage") int perPage);
	public String getgroupnumDay(String groupnum);
	public List<ShareplanDto> getgroupdata(String groupnum);
	public List<ShareplanDto> getPlan(String wishday);
	public void groupdelete(String groupnum);
	public List<ShareplanDto> getList(String wishday);
//	public List<ShareplanDto> groupnumList();
	public int getplancount(String groupnum);
//	public List<ShareplanDto> getAllgroupnum();
//	public List<ShareplanDto> getmemId();
}
