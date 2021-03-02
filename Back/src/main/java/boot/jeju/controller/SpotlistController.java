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

import boot.jeju.data.SpotlistDto;
import boot.jeju.mapper.SpotlistMapper;
import boot.jeju.mapper.SpotreviewMapper;

@RestController
@CrossOrigin
public class SpotlistController {

	@Autowired
	SpotlistMapper mapper;

	@Autowired
	SpotreviewMapper reviewMapper;

	MultipartFile imgUpload;
	String imgName;
	MultipartFile thumbnaiilUpload;
	String thumbnailName;

	@GetMapping("/spot/list")
	public List<SpotlistDto> getList(@RequestParam int start, @RequestParam int perPage,
									@RequestParam String label2, @RequestParam(defaultValue = "star") String select){
		switch(label2) {
		case "jeju" :
			label2 = "제주";
			break;
		case "jocheon" :
			label2 = "조천";
			break;
		case "gujwa" :
			label2 = "구좌";
			break;
		case "sungsan" :
			label2 = "성산";
			break;
		case "pyoseon" :
			label2 = "표선";
			break;
		case "namwon" :
			label2 = "남원";
			break;
		case "seogwipo" :
			label2 = "서귀포";
			break;
		case "andeok" :
			label2 = "안덕";
			break;
		case "daejung" :
			label2 = "대정";
			break;
		case "hangyeong" :
			label2 = "한경";
			break;
		case "hanrim" :
			label2 = "한림";
			break;
		case "aewol" :
			label2 = "애월";
			break;
		case "udo" :
			label2 = "우도";
			break;
		}

		return mapper.getList(start, perPage, label2, select);
	}
@GetMapping("/spot/hotspotlist")
	public List<SpotlistDto> getHotSpotList(){

		return mapper.getHotSpotList();
	}

	@GetMapping("/spot/count")
	public int getTotalCount(String label2) {
		switch(label2) {
		case "jeju" :
			label2 = "제주";
			break;
		case "jocheon" :
			label2 = "조천";
			break;
		case "gujwa" :
			label2 = "구좌";
			break;
		case "sungsan" :
			label2 = "성산";
			break;
		case "pyoseon" :
			label2 = "표선";
			break;
		case "namwon" :
			label2 = "남원";
			break;
		case "seogwipo" :
			label2 = "서귀포";
			break;
		case "andeok" :
			label2 = "안덕";
			break;
		case "daejung" :
			label2 = "대정";
			break;
		case "hangyeong" :
			label2 = "한경";
			break;
		case "hanrim" :
			label2 = "한림";
			break;
		case "aewol" :
			label2 = "애월";
			break;
		case "udo" :
			label2 = "우도";
			break;
		}

		return mapper.getTotalCount(label2);
	}

	@GetMapping("/spot/searchlist")
	public List<SpotlistDto> getSearchList(@RequestParam int start, @RequestParam int perPage,
										   @RequestParam String category, String search) {
//		System.out.println("start:" + start);
//		System.out.println("perPage:" + perPage);
//		System.out.println("category:" + category);
//		System.out.println("search:" + search);

		return mapper.getSearchList(start, perPage, category, search);
	}

	@GetMapping("/spot/searchcount")
	public int getSearchTotalCount(@RequestParam String category, @RequestParam String search) {
		return mapper.getSearchTotalCount(category, search);
	}

	@GetMapping("/spot/select")
	public SpotlistDto getData(@RequestParam String contentsid) {
		return mapper.getData(contentsid);
	}

	@PostMapping(value = "/spot/imgupload", consumes = {"multipart/form-data"})
	public Map<String, String> imgUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request){
		String uploadPath = request.getSession().getServletContext().getRealPath("");
		System.out.println(uploadPath);

		// 이미지의 확장자 가져오기
		int pos = uploadFile.getOriginalFilename().lastIndexOf("."); // 마지막 도트의 위치
		String ext = uploadFile.getOriginalFilename().substring(pos);

		// 저장할 이미지명 변경하기
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		imgName = "img" + sdf.format(date) + ext;

		imgUpload= uploadFile;

		Map<String, String> map = new HashMap<String, String>();
		map.put("photoname", imgName);
		return map;
	}

	@PostMapping(value = "/spot/thumbnailupload", consumes = {"multipart/form-data"})
	public Map<String, String> thumbnailUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request){
		String uploadPath = request.getSession().getServletContext().getRealPath("");
		System.out.println(uploadPath);

		// 이미지의 확장자 가져오기
		int pos = uploadFile.getOriginalFilename().lastIndexOf("."); // 마지막 도트의 위치
		String ext = uploadFile.getOriginalFilename().substring(pos);

		// 저장할 이미지명 변경하기
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		thumbnailName = "thumbnail" + sdf.format(date) + ext;

		thumbnaiilUpload = uploadFile;

		Map<String, String> map = new HashMap<String, String>();
		map.put("photoname", thumbnailName);
		return map;
	}

	@PostMapping(value = "/spot/insert")
	public void insert(HttpServletRequest request, @RequestBody SpotlistDto dto) {

		/* img, thumbnail은 required로 무조건 이미지 설정하기 */

		// 경로
		String path = request.getSession().getServletContext().getRealPath("");
		System.out.println(path);

		try {
			imgUpload.transferTo(new File(path + imgName));
			thumbnaiilUpload.transferTo(new File(path +thumbnailName));
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		dto.setImg(imgName);
		dto.setThumbnail(thumbnailName);

		mapper.insert(dto);

		imgName = null;
		thumbnailName = null;
		imgUpload = null;
		thumbnaiilUpload = null;
	}

	@PostMapping(value = "/spot/update")
	public void update(HttpServletRequest request, @RequestBody SpotlistDto dto) {

		String path = request.getSession().getServletContext().getRealPath("");

		if(imgName == null) {
			dto.setImg(null);
		}
		else {
			// 기존 이미지 지우기
			String delImg = mapper.getData(dto.getContentsid()).getImg();
			File file = new File(path + delImg);
			if(file.exists())
				file.delete();


			try {
				imgUpload.transferTo(new File(path + imgName));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			dto.setImg(imgName);
		}

		if(thumbnailName == null) {
			dto.setThumbnail(null);
		}
		else {
			// 기존 이미지 지우기
			String delThumbnail = mapper.getData(dto.getContentsid()).getThumbnail();
			File file = new File(path +delThumbnail);
			if(file.exists())
				file.delete();

			try {
				thumbnaiilUpload.transferTo(new File(path + thumbnailName));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			dto.setThumbnail(thumbnailName);
		}

		mapper.update(dto);

		imgName = null;
		thumbnailName = null;
		imgUpload = null;
		thumbnaiilUpload = null;
	}

	@GetMapping("/spot/delete")
	public void delete(@RequestParam String contentsid, HttpServletRequest request) {
		String img = mapper.getData(contentsid).getImg();
		String thumbnail = mapper.getData(contentsid).getThumbnail();

		String path = request.getSession().getServletContext().getRealPath("");
		if(!img.equals("no")) {
			File file = new File(path + img);
			if(file.exists())
				file.delete();
		}

		if(!thumbnail.equals("no")) {
			File file = new File(path +thumbnail);
			if(file.exists())
				file.delete();
		}

		mapper.delete(contentsid);
	}

	@GetMapping("/spot/updatelikes")
	public void updateLikes(@RequestParam String contentsid) {
		mapper.updateLikes(contentsid);
	}

	@GetMapping("/spot/updatestar")
	public void updateStar(@RequestParam String contentsid) {
		if(reviewMapper.getTotalCount(contentsid) != 0) {
			int avgStar = reviewMapper.getAvgStar(contentsid) / reviewMapper.getTotalCount(contentsid);
		
			mapper.updateStar(contentsid, avgStar);
		}
		else{
			if(mapper.getData(contentsid).getStar() != 0)
				mapper.updateStar(contentsid, 0);
		}
	}

}
