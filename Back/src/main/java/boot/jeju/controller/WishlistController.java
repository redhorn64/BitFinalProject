package boot.jeju.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import boot.jeju.data.DayListDto;

import boot.jeju.data.SpotlistDto;
import boot.jeju.data.SpotreviewDto;
import boot.jeju.data.ShareplanDto;
import boot.jeju.data.WishlistDto;
import boot.jeju.mapper.ShareboardMapper;
import boot.jeju.mapper.SpotlistMapper;
import boot.jeju.mapper.WishlistMapper;
import boot.jeju.mapper.ShareplanMapper;

@RestController
@CrossOrigin
public class WishlistController {
	@Autowired
	WishlistMapper mapper;
	
	@Autowired
	SpotlistMapper spotMapper;
	
	@Autowired
	ShareboardMapper shareMapper;
	
	@Autowired
	ShareplanMapper planMapper;

	WishlistDto dto=new WishlistDto();
	SimpleDateFormat sdf=new SimpleDateFormat("YYYY-MM");
	SimpleDateFormat sdf2=new SimpleDateFormat("YYYY-MM-dd");
	
	@PostMapping("/wish/insertaround")
	public void insertAround(@RequestBody WishlistDto dto) {
		 mapper.insertAround(dto);
	}
	
	@PostMapping("/wish/insertspot")
	public void insertSpot(@RequestBody WishlistDto dto) {
		mapper.insertSpot(dto);
	}
	@GetMapping("/wish/isspot")
	public boolean isspotsearch(@RequestParam String contentsid,@RequestParam String id) {
		boolean find=false;
		if(mapper.isSpotSearch(contentsid, id)!=0)
			find=true;
		return find;
		 
	}
	
	@GetMapping("/wish/isshare")
	public boolean issharesearch(@RequestParam String num) {
		boolean find=false;
		if(mapper.isShareSearch(num)!=0)
			find=true;
		
		return find;
	}
	
	@PostMapping("/wish/insertcontent")
	public void insertcontent(@RequestBody WishlistDto dto) {
		mapper.insertContent(dto);
	}
	
	@PostMapping("/wish/insertshare")
	public void insertshare(@RequestBody WishlistDto dto) {
		mapper.insertshare(dto);
	}
	@GetMapping("/wish/delete")
	public void deletecontent(@RequestParam String num) {
		ShareplanDto sdto=new ShareplanDto();
		sdto = planMapper.getData(num);
		
		if(sdto!=null) {
			planMapper.delete(sdto.getNum());
			
		}
		mapper.deleteContent(num);
	}
	
	@GetMapping("/wish/list")
	public List<WishlistDto> getList(@RequestParam String memId){
		return mapper.getList(memId);
	}
	
	@GetMapping("/wish/budget")
	public List<WishlistDto> getBudget(@RequestParam String memId,
									@RequestParam String wishday1,
									@RequestParam String wishday2){
		return mapper.getBudget(memId, wishday1, wishday2);
	}
	@GetMapping("/wish/budgetsum")
	public int getBudgetSum(@RequestParam String memId,
									@RequestParam String wishday1,
									@RequestParam String wishday2){
		List<WishlistDto> list = mapper.getBudgetSum(memId, wishday1, wishday2);
		int sum = 0;
		
		for(WishlistDto dto : list) {
			sum += Integer.parseInt(dto.getMoney());
		}
		return sum;
	}
	
	
	
	@GetMapping("/wish/capitalsum")
	public int getCapitalSum(@RequestParam String memId,
									@RequestParam String wishday1,
									@RequestParam String wishday2){
		
		List<WishlistDto> list = mapper.getCapitalSum(memId, wishday1, wishday2);
		int sum = 0;
		for(WishlistDto dto : list) {
			sum += Integer.parseInt(dto.getCapital());
		}
		return sum;
	}
	
	@PostMapping("/wish/insertcapital")
	public void insertcapital(@RequestBody WishlistDto dto) {
		mapper.insertCapital(dto);
	}
	
	
	
	@GetMapping("/wish/myreview")
	public List<SpotreviewDto> getMyreviews(@RequestParam String memNum,@RequestParam int start,@RequestParam int end){
		return mapper.getMyreviews(memNum, start, end);
	}
	@GetMapping("/wish/recentreview")
	public List<SpotreviewDto> getRecentreviews(@RequestParam String memNum){
		return mapper.getRecentreviews(memNum);
	}
	
	@GetMapping("/wish/spottitle")
	public String getSpottitle(@RequestParam String contentsid) {
		return mapper.getSpottitle(contentsid);
	}
	@GetMapping("/wish/count")
	public int getTotalCount(@RequestParam String memNum) {
		return mapper.getTotalCount(memNum);
	}
	@GetMapping("/wish/sharesubject")
	public String getsharesubject(@RequestParam String num ) {
		return mapper.getShareSubject(num);
		
	}
	@GetMapping("/wish/wishcount")
	public int getWishtotalCount(@RequestParam String memId) {
		return mapper.getWishTotalCount(memId);
	}
	
	@GetMapping("/wish/daylist")
	public List<DayListDto> getDayMyto(@RequestParam String memId, @RequestParam String day){
		List<WishlistDto> list = mapper.getDayMyto(memId, day);
		List<DayListDto> result = new ArrayList<DayListDto>();
		
		
		for(WishlistDto dto : list) {
//			System.out.println(dto.getWishtime());
			DayListDto dlist = new DayListDto();
			dlist.setNum(dto.getNum());
			dlist.setWishday(sdf2.format(dto.getWishday()));
			
			
			dlist.setWishtime(dto.getWishtime());
			if(dto.getSpotId()!=null) {
				dlist.setTitle(spotMapper.getData(dto.getSpotId()).getTitle());
				dlist.setContent("spot");
				dlist.setAddr(dto.getContent());
				result.add(dlist);
			}
			else if(dto.getShareNum()!=null) {
				dlist.setTitle(shareMapper.getData(dto.getShareNum()).getSubject());
				dlist.setContent("share");
				dlist.setAddr(shareMapper.getData(dto.getShareNum()).getAddr());
				result.add(dlist);
				
			}
			else if(dto.getAroundId() !=null) {
				dlist.setTitle(dto.getAroundId());
				dlist.setContent(dto.getContent());
				dlist.setAddr(dto.getContent().split(",")[1]);
				result.add(dlist);
			}
			else {
				if(!dto.getContent().split(",")[0].equals("여행예산")) {
					dlist.setTitle(dto.getContent());
					dlist.setContent("myplan");
					result.add(dlist);
				}
			}
		}
		return result;
	}
	
	@GetMapping("/wish/planlist")
	public List<WishlistDto> getPlanList(@RequestParam String memId, @RequestParam String day, @RequestParam String category){
		List<WishlistDto> list = mapper.getPlanList(memId, day, category);
		List<WishlistDto> result = new ArrayList<WishlistDto>();
		
		for(WishlistDto dto : list) {
			if(dto.getSpotId()==null&&dto.getShareNum()==null&&dto.getAroundId()==null) {
				if(!dto.getContent().split(",")[0].equals("여행예산"))
					result.add(dto);
			}
			else {
				result.add(dto);
			}
		}
		
		return result;
	}
	
//	@GetMapping("/wish/schedulemonthlist")
//	public List<WishlistDto> getMonthDayList(@RequestParam String memId, @RequestParam String wishday) {
//		List<WishlistDto> list=mapper.getList(memId);
//		List<WishlistDto> result = new ArrayList<WishlistDto>();
//		
//		String preDay = "";
//		
//		for(WishlistDto dto:list) {
//			
//			
//			if(dto.getWishday().toString().split("-")[0].equals(wishday.split("-")[0])) {
//				
//				if(dto.getWishday().toString().split("-")[1].equals(wishday.split("-")[1])) {
//
//					if(!preDay.equals(dto.getWishday().toString())) {
//						WishlistDto wdto = new WishlistDto();
//						wdto.setWishday(dto.getWishday());
//						result.add(wdto);
//						preDay = dto.getWishday().toString();
//					}
//					
//				}	
//				
//			}
//			
//				
//		}
//		return result;
//	}
	
	@GetMapping("/wish/schedulelist")
	public List<DayListDto> getmonthlist(@RequestParam String memId,@RequestParam String wishday){
		List<WishlistDto> list=mapper.getList(memId);
		
		List<DayListDto> result=new ArrayList<DayListDto>();
		for(WishlistDto dto:list) {
			
			if(dto.getWishday().toString().split("-")[0].equals(wishday.split("-")[0])) {
				
				if(dto.getWishday().toString().split("-")[1].equals(wishday.split("-")[1])) {
					DayListDto dlist=new DayListDto();
					
					dlist.setWishday(dto.getWishday().toString());
					if(dto.getShareNum()!=null) {
						dlist.setTitle(shareMapper.getData(dto.getShareNum()).getSubject().split(",")[1]);
						result.add(dlist);
				
					}else if(dto.getAroundId()!=null) {
						dlist.setTitle(dto.getAroundId());
						result.add(dlist);
						
					}else if(dto.getSpotId()!=null) {
						dlist.setTitle(spotMapper.getData(dto.getSpotId()).getTitle());
						result.add(dlist);
					}
					else {
						if(!dto.getContent().split(",")[0].equals("여행예산")) {
							dlist.setTitle(dto.getContent().split(",")[1]);
							result.add(dlist);
						}
					}
				}	
				
			}
			
				
		}
		return result;
		
	}
	
	 


	@GetMapping("/wish/spotlist")
	public List<SpotlistDto> getSpotList(@RequestParam String memId, @RequestParam String day, @RequestParam String category){
		List<WishlistDto> list = mapper.getPlanList(memId, day, category);
		List<SpotlistDto> result = new ArrayList<SpotlistDto>();
		
		for(WishlistDto dto : list) {
			if(dto.getSpotId() != null) {
				SpotlistDto sdto = mapper.getSpot(dto.getSpotId());
				result.add(sdto);
			}
		}
		
		return result;
	}
}