package boot.jeju.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import boot.jeju.data.DayListDto;
import boot.jeju.data.ShareplanDto;
import boot.jeju.data.WishlistDto;
import boot.jeju.mapper.ShareplanMapper;
import boot.jeju.mapper.WishlistMapper;

@RestController
@CrossOrigin
public class ShareplanController {

	@Autowired
	ShareplanMapper mapper;
	
	@Autowired
	WishlistController wishController;
	
	@GetMapping("/plan/list")
	public List<ShareplanDto> getList(@RequestParam int start,@RequestParam int perPage){
		return mapper.getSharePlanList(start, perPage);
	}
	
//	@GetMapping("/plan/id")
//	public List<ShareplanDto> getId(){
//		return mapper.getmemId();
//	}
	
	@GetMapping("/plan/count")
	public int getTotalCount(@RequestParam String memId) {
		return mapper.getTotalCount(memId);
	}
	
	@GetMapping("/plan/allcount")
	public int getAllTotalCount() {
		return mapper.getAllTotalCount();
	}
	
	@GetMapping("/plan/select")
	public ShareplanDto getData(@RequestParam String wishnum) {
		return mapper.getData(wishnum);
	}
	
//	@GetMapping("/plan/group")
//	public List<ShareplanDto> tgetGroupDaa(@RequestParam String memId, @RequestParam String wishday){
//		return mapper.getGroupData(memId, wishday);
//	}
	

	@PostMapping("/plan/insert")
	public void insert(@RequestBody ShareplanDto dto) {
		mapper.insert(dto);
	}
	
	@PostMapping("/plan/groupinsert")
	public boolean groupInsert(@RequestParam String memId, @RequestParam String wishday,@RequestParam String comment) {
		List<DayListDto> list = wishController.getDayMyto(memId, wishday);
		
		if(!list.isEmpty()) {
			String maxNum = String.valueOf(Integer.parseInt(mapper.maxGroupNum()) + 1);
			
			
			for(DayListDto dto : list) {
				ShareplanDto sdto = new ShareplanDto();
				sdto.setMemId(memId);
				sdto.setGroupNum(maxNum);
//				if(dto.getTitle().contains(",")) {
//					sdto.setTitle(dto.getTitle().split(",")[1]);
//				}
//				else {
//					
//				}
				sdto.setTitle(dto.getTitle());
				sdto.setContent(dto.getAddr());
				sdto.setWishday(dto.getWishday());
				sdto.setWishtime(dto.getWishtime());
				sdto.setComment(comment);
				sdto.setWishNum(dto.getNum());
				this.insert(sdto);
//				System.out.println(sdto.getTitle());
			}
			return true;
		}
		else {
			return false;
		}
		
	}
	
	@GetMapping("/plan/delete")
	public void delete(@RequestParam String num) {
		mapper.delete(num);
	}
	
	@GetMapping("/plan/groupnum")
	public List<ShareplanDto> getgroupnum() {
		List<ShareplanDto> list = mapper.getgroupnum();
		List<ShareplanDto> result = new ArrayList<ShareplanDto>();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		Date wishday;
		
		for(ShareplanDto dto : list) {
			
			try {
				wishday = sdf.parse(mapper.getgroupnumDay(dto.getGroupNum()));
				if(today.before(wishday))
					result.add(dto);
				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return result;
	}
	
	@GetMapping("/plan/allgroupnum")
	public List<ShareplanDto> getAllgroupnum(@RequestParam int start, @RequestParam int perPage) {
//		System.out.println(start + ", " + perPage);
		return mapper.getAllgroupnum(start, perPage);
	}
	
	
	@GetMapping("/plan/groupdata")
	public List<ShareplanDto> getgroupdata(@RequestParam String groupnum) {
//		System.out.println(groupnum);
		return mapper.getgroupdata(groupnum);
	}
	
	@GetMapping("/plan/group")
	public List<ShareplanDto> getPlan(@RequestParam String wishday){
		return mapper.getPlan(wishday);
	}
	@GetMapping("/plan/groupdelete")
	public void groupdelete(@RequestParam String groupnum) {
		mapper.groupdelete(groupnum);
	}
	
	@GetMapping("/plan/plancount")
	public int getgroupnumcount(@RequestParam String groupnum) {
		return mapper.getplancount(groupnum);
	}
	
//	@GetMapping("/plan/groupnumlist")
//	public List<ShareplanDto> getgroupnumList(){
//		return mapper.groupnumList();
//	}
//	@GetMapping("/plan/allgroupnum")
//	public List<ShareplanDto> getAllgroupnum(){
//		return mapper.getAllgroupnum();
//	}
}
