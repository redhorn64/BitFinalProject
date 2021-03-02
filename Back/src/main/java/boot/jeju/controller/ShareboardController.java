package boot.jeju.controller;


import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import boot.jeju.data.ShareboardDto;
import boot.jeju.mapper.ShareboardMapper;


//@MultipartConfig
//(
//location = "C:\\Users\\tkd97\\git\\jeju-back\\FinalProjectSpringBoot\\src\\main\\webapp\\WEB-INF\\photo",        // 공용 파일을 통해 경로를 하나로 관리한다.
//fileSizeThreshold = 1024 * 1024 * 512,        // 512MB : maxRequestSize 보다 높게 설정하여 임시파일을 하드디스크에 기록하지 않도록 만든다.
//maxRequestSize = 1024 * 1024 * 20,            // 20MB : 연결이 끊어져도 될만한 충분한 용량을 설정한다. 다중파일을 받는다면 해당만큼 올려준다.
//maxFileSize = 1024 * 1024 * 12                // 12MB : 10메가 정도 받는다는 생각으로 12메가를 선언했다.
//)
@RestController
@CrossOrigin
public class ShareboardController {
    @Autowired
    ShareboardMapper mapper;
    MultipartFile upload;

    String photoname;

    @GetMapping("/share/count")
    public int getTotalCount() {
        return mapper.getTotalCount();
    }

    @GetMapping("/share/list")
    public List<ShareboardDto> shareList(@RequestParam int start, @RequestParam int perPage) {
        return mapper.getList(start, perPage);

    }
    
    @GetMapping("/share/photolist")
    public List<String> sharePhotoList(@RequestParam int start, @RequestParam int perPage) {
    	List<ShareboardDto> list = mapper.getList(start, perPage);
        List<String> result = new ArrayList<String>();
        
        for(ShareboardDto dto : list) {
        	result.add(dto.getPhoto());
        }

        return result;
    }

    @PostMapping(value = "/share/upload", consumes = {"multipart/form-data"})
    public Map<String, String> fileUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request) {
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
    
    @GetMapping("/share/delupload")
	public void delUpload(@RequestParam String num, HttpServletRequest request) {
    	
    	if(mapper.getData(num).getPhoto() != "no") {
    		ShareboardDto dto = mapper.getData(num);
    		String path = request.getSession().getServletContext().getRealPath("");
            
    		File file = new File(path + mapper.getData(num).getPhoto());
            if (file.exists())
                file.delete();
            
            dto.setPhoto("no");
            mapper.updateShareBoard(dto);
    	}
		photoname = null;
		upload = null;
	}

    @PostMapping(value = "/share/insert")
    public void insert(
            @RequestParam(value = "num", defaultValue = "0") String num,
            @RequestParam(value = "regroup", defaultValue = "0") int regroup,
            @RequestParam(value = "restep", defaultValue = "0") int restep,
            @RequestParam(value = "relevel", defaultValue = "0") int relevel,
            @RequestBody ShareboardDto dto,
            HttpServletRequest request) {
//        System.out.println(dto);
//        System.out.println("num:" + num);
//        System.out.println("regroup:" + regroup);
//        System.out.println("restep:" + restep);
//        System.out.println("relevel:" + relevel);
//
//        System.out.println("dto.getNum():" + dto.getNum());
//        System.out.println("dto.getContent():" + dto.getContent());

        if (photoname == null) {
            dto.setPhoto("no");
        } else {
            String path = request.getSession().getServletContext().getRealPath("");
            System.out.println(path);

            // 저장폴더에 저장
            try {
                upload.transferTo(new File(path + photoname));
            } catch (IllegalStateException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            dto.setPhoto(photoname);
        }


        if (dto.getNum() == null) {
            regroup = mapper.getMaxNum() + 1;
            restep = 0;
            relevel = 0;
        } else {
            mapper.updateRestep(regroup, restep);

            relevel += 1;
            restep += 1;

        }

        //댓글 구별.
        if (dto.getRelevel() != 0) {
            dto.setSubject("no");
            dto.setAddr("no");
            dto.setLikes(0);
            dto.setStar("0");

            dto.setRegroup(regroup);
            dto.setRestep(restep);
        } else {
            dto.setLikes(0);
            dto.setRegroup(regroup);
            dto.setRelevel(relevel);
            dto.setRestep(restep);
        }
        mapper.insertBoard(dto);

        photoname = null;
        upload = null;
    }


    @GetMapping("/share/select")
    public ShareboardDto getData(@RequestParam String num) {
        return mapper.getData(num);
    }

    @GetMapping("/share/answer")
    public List<ShareboardDto> getReviewList(@RequestParam int regroup) {
        return mapper.getReviewList(regroup);
    }

    @GetMapping("/share/updatelikes")
    public void updatelikes(@RequestParam String num) {
        mapper.updateLikes(num);
    }


    @PostMapping("/share/delete")
    public void sharedelete(@RequestBody ShareboardDto dto, HttpServletRequest request) {
        List<ShareboardDto> deletePhotos = mapper.getPhotos(dto.getRegroup());

        for (int i = 0; i < deletePhotos.size(); i++) {
            String photos = deletePhotos.get(i).getPhoto();

            if (!photos.equals("no")) {
                String path = request.getSession().getServletContext().getRealPath("");
                //System.out.println(path);
                File file = new File(path + photos);
                if (file.exists())
                    file.delete();
            }
        }

        mapper.sharedelete(dto.getNum(), dto.getRegroup());
    }

    @GetMapping("/share/deleteanswer")
    public void deleteReview(@RequestParam String num, HttpServletRequest request) {
//        String deletePhoto = mapper.getData(num).getPhoto();
//        if (!deletePhoto.equals("no")) {
//            String path = request.getSession().getServletContext().getRealPath("");
//            File file = new File(path + deletePhoto);
//            if (file.exists())
//                file.delete();
//        }
//        mapper.deleteReview(num);
    	if(mapper.getData(num).getRelevel() == 1) {
    		int regroup = mapper.getData(num).getRegroup();
    		int restep = mapper.getData(num).getRestep();
    		List<ShareboardDto> list = mapper.getDelReviewList(regroup, restep);
    		
    		for(ShareboardDto dto : list) {
    			if(dto.getRelevel() == 1 && dto.getNum()!=num)
    				break;
    			else if(dto.getRelevel() >= 1) {
    				mapper.deleteReview(dto.getNum());
    			}
    		}
    		mapper.deleteReview(num);
    	}
    	else {
            mapper.updateShareBoardAnswer("삭제된 글입니다.", num);
    	}
    }

    @GetMapping("/share/answercount")
    public int getCount(@RequestParam String regroup) {
        return mapper.getCount(regroup);
    }

    @PostMapping(value = "/share/update")
    public void updateShareboard(@RequestBody ShareboardDto dto, HttpServletRequest request) {

        if (photoname == null)
            dto.setPhoto(null);
        else {
            //기존 이미지존재할 경우 지우기
            String deletePhoto = mapper.getData(dto.getNum()).getPhoto();
            String path = request.getSession().getServletContext().getRealPath("");
            System.out.println(path);

            if (!deletePhoto.equals("no")) {
                File file = new File(path + deletePhoto);
                if (file.exists())
                    file.delete();
            }

            try {
                upload.transferTo(new File(path + photoname));
            } catch (IllegalStateException | IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            dto.setPhoto(photoname);

        }

        mapper.updateShareBoard(dto);
        photoname = null;
        upload = null;
    }

    @GetMapping("/share/search")
    public List<ShareboardDto> getsearchList(@RequestParam int start, @RequestParam int perPage, @RequestParam String search) {
        return mapper.getSearchList(start, perPage, search);
    }

    @GetMapping("/share/searchcount")
    public int getsearchTotalCount(@RequestParam String search) {
        return mapper.getSearchTotalCount(search);
    }

    @PostMapping("/share/updateanswer")
    public void updateshareboardanswer(@RequestParam String content, @RequestParam String num) {
        mapper.updateShareBoardAnswer(content, num);
    }

}
