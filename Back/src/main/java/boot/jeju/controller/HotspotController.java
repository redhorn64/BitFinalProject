package boot.jeju.controller;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import boot.jeju.data.HotspotDto;
import boot.jeju.data.WishlistDto;
import boot.jeju.mapper.HotspotMapper;
import boot.jeju.mapper.SpotlistMapper;
import boot.jeju.mapper.WishlistMapper;

class Spotdata {
	public String title;
	public String addr;
	public String img;
	public String groupNum;
	public String day;
	public String contentsid;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getGroupNum() {
		return groupNum;
	}
	public void setGroupNum(String groupNum) {
		this.groupNum = groupNum;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getContentsid() {
		return contentsid;
	}
	public void setContentsid(String contentsid) {
		this.contentsid = contentsid;
	}
	
}

@RestController
@CrossOrigin
public class HotspotController {
	
	@Autowired
	HotspotMapper mapper;
	@Autowired
	SpotlistMapper spotMapper;
	@Autowired
	WishlistMapper wishMapper;

	
	@GetMapping("/hotspot/list")
	public List<Spotdata> getList(@RequestParam String groupNum, @RequestParam String day){
		List<HotspotDto> list = mapper.getList(groupNum, day);
		List<Spotdata> result = new ArrayList<Spotdata>();
		
		for(HotspotDto dto : list) {
			Spotdata spotdata = new Spotdata();
			spotdata.setTitle(spotMapper.getData(dto.getTitle()).getTitle());
			spotdata.setAddr(spotMapper.getData(dto.getTitle()).getRoadaddr());
			spotdata.setImg(spotMapper.getData(dto.getTitle()).getThumbnail());
			spotdata.setGroupNum(groupNum);
			spotdata.setDay(day);
			spotdata.setContentsid(dto.getTitle());
			result.add(spotdata);
		}
		return result;
	}
	
	@GetMapping("/hotspot/group")
	public List<HotspotDto> getGroupNum(){
		return mapper.getGroupNum();
	}
	
	@GetMapping("/hotspot/day")
	public List<HotspotDto> getDay(@RequestParam String groupNum){
		return mapper.getDay(groupNum);
	}
	
	@PostMapping("/hotspot/insert")
	public void insert(@RequestParam String groupNum, @RequestParam String startDay, @RequestParam String memId) {
		
		List<HotspotDto> list = mapper.getDays(groupNum);
		startDay += " 00:00:00";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		
		try {
			Date date = sdf.parse(startDay);
			
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			
			int day = 1;
			for(HotspotDto dto : list) {
				if(day != Integer.parseInt(dto.getDay())) {
					cal.add(Calendar.DATE, 1);
					day++;
				}
				
//				System.out.println(sdf.format(cal.getTime()));
				String title = dto.getTitle();
//				System.out.println("TITLE" + title);
				String addr = spotMapper.getData(title).getRoadaddr();
				
				WishlistDto wdto = new WishlistDto();
				wdto.setMemId(memId);
				wdto.setSpotId(dto.getTitle());
				wdto.setContent(addr);
				wdto.setWishday(Timestamp.valueOf(sdf.format(cal.getTime())));
				wdto.setWishtime(dto.getTime());
				
//				System.out.println(wdto.getMemId() + " " + wdto.getSpotId() + " " + wdto.getContent() + " " + wdto.getWishday() + " " + wdto.getWishtime());
				wishMapper.insertSpot(wdto);
			}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
