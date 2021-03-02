package boot.jeju.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import boot.jeju.data.NoticeDto;
import boot.jeju.mapper.NoticeMapper;

@RestController
@CrossOrigin
public class NoticeController {

	@Autowired
	NoticeMapper mapper;
	
	MultipartFile upload;
	String photoname;
	
	@GetMapping("/notice/list")
	public List<NoticeDto> getList(@RequestParam int start, @RequestParam int perPage){
		return mapper.getListOfNotice(start, perPage);
	}
	
	@GetMapping("/notice/count")
	public int getTotalCount() {
		return mapper.totalCountOfNotice();
	}
	
	@PostMapping(value = "/notice/upload", consumes = {"multipart/form-data"})
	public Map<String, String> fileUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request){
		String uploadPath = request.getSession().getServletContext().getRealPath("");
		System.out.println(uploadPath);
		
		// 이미지의 확장자 가져오기
		int pos = uploadFile.getOriginalFilename().lastIndexOf("."); // 마지막 도트의 위치
		String ext = uploadFile.getOriginalFilename().substring(pos);
		
		// 저장할 이미지명 변경하기
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		photoname = "jeju" + sdf.format(date) + ext;
		
		try {
			uploadFile.transferTo(new File(uploadPath + photoname));
			
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("photoname", photoname);
		return map;
	}
	
	@PostMapping("/notice/insert")
	public void insert(@RequestBody NoticeDto dto)
	{
		//db 에 저장
		mapper.insertOfNotice(dto);
	}
	
	@GetMapping("/notice/delete")
	public void delete(@RequestParam String num)
	{	
		mapper.deleteOfNotice(num);
	}
	
	@GetMapping("/notice/detail")
	public NoticeDto getData(@RequestParam String num)
	{
		return mapper.getDataOfNotice(num);
	}
	
	@PostMapping("/notice/update")
	public void update(@RequestBody NoticeDto dto)
	{
		mapper.updateOfNotice(dto);
	}
	
	@GetMapping("/notice/updatestar")
	public void update(@RequestParam String num)
	{
		if(mapper.getDataOfNotice(num).getStar().equals("0"))
			mapper.updateOfStar(num, "1");
		else
			mapper.updateOfStar(num, "0");
	}
}
