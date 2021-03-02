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

import boot.jeju.data.SpotreviewDto;
import boot.jeju.mapper.SpotreviewMapper;

@CrossOrigin
@RestController
public class SpotreviewController {
	
	MultipartFile upload;
	String photoname;
	
	@Autowired
	SpotreviewMapper mapper;
	
	@GetMapping("/sreview/list")
	public List<SpotreviewDto> getList(@RequestParam int start, @RequestParam int perPage, @RequestParam String contentsid){
		
		return mapper.getList(start, perPage, contentsid);
	}
	
	@GetMapping("/sreview/select")
	public SpotreviewDto getData(@RequestParam String num) {
		return mapper.getData(num);
	}
	
	@GetMapping("/sreview/count")
	public int getTotalCount(@RequestParam String contentsid) {
		return mapper.getTotalCount(contentsid);
	}
	
	@PostMapping(value = "/sreview/upload", consumes = {"multipart/form-data"})
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
		
		upload = uploadFile;
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("photoname", uploadFile.getOriginalFilename());
		return map;
	}
	
	@PostMapping(value = "/sreview/insert")
	public void insert(@RequestBody SpotreviewDto dto, HttpServletRequest request) {
		
		if(photoname == null)
			dto.setPhoto("no");
		else {
			
			String path = request.getSession().getServletContext().getRealPath("");
			System.out.println(path);
			
			try {
				upload.transferTo(new File(path +photoname));
				
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			dto.setPhoto(photoname);
			
		}
		
		mapper.insert(dto);
		
		photoname = null;
		upload = null;
	}
	
	@PostMapping(value = "/sreview/update")
	public void update(@RequestBody SpotreviewDto dto, HttpServletRequest request) {
		
		if(photoname == null) {
			dto.setPhoto(null); // 이미지 변경 안할 시 null로 입력
		}
		else {
			// 기존 이미지 지우기
			String deletePhoto = mapper.getData(dto.getNum()).getPhoto();

			String path = request.getSession().getServletContext().getRealPath("");
			System.out.println(path);
			
			if(!deletePhoto.equals("no")) { // 기존 이미지가 존재할 경우 삭제
				File file = new File(path +deletePhoto);
			
				if(file.exists())
					file.delete();
			}
			
			if(!photoname.equals("no")) {
				try {
					
					upload.transferTo(new File(path + photoname));
					
				} catch (IllegalStateException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			dto.setPhoto(photoname);
		}
		
		mapper.update(dto);
		
		photoname = null;
		upload = null;
	}
	
	@GetMapping("/sreview/delupload")
	public void delUpload() {
		photoname = null;
		upload = null;
	}
	
	@GetMapping("/sreview/updatenoupload")
	public void updateNoUpload() {
		photoname = "no";
	}
	
	@GetMapping("/sreview/delete")
	public void delete(@RequestParam String num, HttpServletRequest request) {
		String deletePhoto = mapper.getData(num).getPhoto();
		
		if(!deletePhoto.equals("no")) {
			String path = request.getSession().getServletContext().getRealPath("");
			File file = new File(path +deletePhoto);
		
			if(file.exists())
				file.delete();
		}
		mapper.delete(num);
	}
	
	@GetMapping("/sreview/updatelikes")
	public void updateLikes(@RequestParam String num) {
		mapper.updateLikes(num);
	}
	
	@GetMapping("/sreview/avgstar")
	public int getAvgStar(@RequestParam String contentsid) {
		int count = this.getTotalCount(contentsid);
		
		if(count == 0)
			return 0;
		else 
			return (int)mapper.getAvgStar(contentsid)/count;
	}
	
}