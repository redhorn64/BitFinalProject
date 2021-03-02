package boot.jeju.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import boot.jeju.data.MemberDto;
import boot.jeju.data.ShareboardDto;
import boot.jeju.mapper.MemberMapper;

@RestController
@CrossOrigin
public class MemberController {

	@Autowired
	MemberMapper mapper;
	//이미지명을 저장할 멤버변수

	MultipartFile upload;
	String photoname;
	String idcanUse="false";
	String KakaoAuthCode;
	
//	카카오 REST API 키
	private final static String Kakao_key = "23ac9824a4a7d2262c92c0c80de5eab3";
	private final static String ClientSecret = "iqDBo1s9JirNraT2rLvfz6al7P8bfOa6";
	
	@GetMapping("/member/list")
	public List<MemberDto> getList(){
		return mapper.getListOfMember();
	}

	@GetMapping("/member/count")
	public int getTotalCount() {
		return mapper.totalCountOfMember();
	}

	@PostMapping(value = "/member/upload", consumes = {"multipart/form-data"})
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

	@GetMapping("/member/delupload")
	public void delUpload(@RequestParam String id, HttpServletRequest request) {
		
		if(mapper.getDataOfMember(id).getPhoto() != "no") {
			MemberDto dto = mapper.getDataOfMember(id);
    		String path = request.getSession().getServletContext().getRealPath("");
            
    		File file = new File(path + mapper.getDataOfMember(id).getPhoto());
            if (file.exists())
                file.delete();
            
            dto.setPhoto("no");
            mapper.updateOfMember(dto);
    	}
		
		photoname = null;
		upload = null;
	}

	@GetMapping("/member/checkid")
	public boolean checkid(@RequestParam String id)
	{
		//중복 아이디 있는지 체크
		if (mapper.idCheckOfMember(id) == 0) {
			return true;
		}
		return false;
	}

	   @PostMapping("/member/login")
	   public boolean login(@RequestBody MemberDto dto)
	   {
	      if (mapper.passCheckOfMember(dto) == 0) {
	         return false;
	      }else
	         return true;
	   }

	@PostMapping(value = "/member/insert")
	public void insert(HttpServletRequest request, @RequestBody MemberDto dto)
	{
		if(photoname == null)
			dto.setPhoto("no");
		else {
			//이미지 저장경로 구하기
			String path=request.getSession().getServletContext().getRealPath("");
			System.out.println(path);

			try {
				//이미지를 photo 폴더에 저장하기
				upload.transferTo(new File(path+photoname));
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			dto.setPhoto(photoname);//db에 저장할 파일명(실제 업로드된 파일명)
		}
		//db 에 저장
		mapper.insertOfMember(dto);

		upload = null;
		photoname = null;
	}

	@PostMapping("/member/insertsocial")
	public void insertSosial(@RequestBody MemberDto dto)
	{
		if(this.checkid(dto.getId()))
			mapper.insertOfSosialMember(dto);
		else {
			String num = mapper.getDataOfMember(dto.getId()).getNum();
			dto.setNum(num);
			photoname = dto.getPhoto();
			mapper.updateOfMember(dto);
		}
	}

	@PostMapping("/member/delete")
	public boolean delete(@RequestBody MemberDto dto,
				HttpServletRequest request)
	{


		if (mapper.passCheckOfMember(dto) == 0) {
			return false;
		}

		String path=request.getSession().getServletContext().getRealPath("");
		System.out.println(path);
		String deleteFileName=mapper.getDataOfMember(dto.getId()).getPhoto();
		if(deleteFileName!=null)
		{
			File file=new File(path+deleteFileName);
			if(file.exists())
				file.delete();//업로드했던 이미지 삭제
		}

		mapper.deleteOfMember(dto.getId());
		return true;
	}

	@GetMapping("/member/getdata")
	public MemberDto getData(@RequestParam String id)
	{
		return mapper.getDataOfMember(id);
	}

	@PostMapping(value = "/member/update")
	public void update(@RequestBody MemberDto dto, HttpServletRequest request)
	{
		if(photoname == null)
			dto.setPhoto(null);
		else {
			// 기존 이미지 지우기
				String deletePhoto = mapper.getDataOfMember(dto.getId()).getPhoto();

				//이미지 저장경로 구하기
				String path=request.getSession().getServletContext().getRealPath("");
				System.out.println(path);

				if(!deletePhoto.equals("no") && !deletePhoto.substring(0, 3).equals("http")) { // 기존 이미지가 존재할 경우 삭제
					File file = new File(path  + deletePhoto);

					if(file.exists())
						file.delete();
				}


			try {
				//이미지를 photo 폴더에 저장하기
				upload.transferTo(new File(path+photoname));
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			dto.setPhoto(photoname);//db에 저장할 파일명(실제 업로드된 파일명)
		}
		//db 에 저장
		mapper.updateOfMember(dto);

		upload = null;
		photoname = null;
	}

	@PostMapping("/member/updatepass")
	public void updatePass(@ModelAttribute MemberDto dto)
	{
		mapper.updateOfPass(dto);
	}
	
	@GetMapping("/member/oauthKakao")
	public String oauthKakao(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("Kakao code: " + code);
		KakaoAuthCode = code;
		return code;
	}
	
//	accessToken 역할 = 카카오에 정보를 받기 위한 key (10분 ~ 1시간)
//	refreshToken -> accessToken 을 받을 수 있음. (10일 ~ 30일)
	@PostMapping("/member/tokenKakao")
	public Map<String, String> tokenKakaoUser(/*@RequestParam Map<String, String> parameters */HttpServletRequest request, HttpServletResponse response)
	{
		RestTemplate rest = new RestTemplate();
//		사용자 인증정보 받기 위한 세팅
		Map<String, String> map = new HashMap<String, String>();
		map.put("grant_type", "=authorization_code");
		map.put("client_id", "=" + Kakao_key); // 카카오 앱에 있는 REST KEY
//		인가 코드가 리다이렉트된 URI
		map.put("redirect_uri", "=http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:5000/member/oauthKakao"); // 카카오 앱에 등록한 redirect URL
		map.put("code", "="+KakaoAuthCode); // 인가 코드 받기 요청으로 얻은 인가 코드
		map.put("client_secret", "="+ClientSecret); // 토큰 발급 시, 보안을 강화하기 위해 추가 확인하는 코드
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Context-type", "application/json");
		
		HttpEntity<Map<String, String>> entity = new HttpEntity<>(map, headers);
		
//		사용자 인증정보 요청
		ResponseEntity<Map> rs = rest.postForEntity("https://kauth.kakao.com/oauth/token", entity, Map.class);
		
//		access_token, refresh_token Get
		String Access = rs.getBody().get("access_token").toString();
		String Refresh = rs.getBody().get("refresh_token").toString();
		
		System.out.println("Access 토큰은 : " + Access);
		System.out.println("Refresh 토큰은 : " + Refresh);
		return map;
	}
}
