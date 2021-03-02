package boot.jeju.data;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

@Alias("shareplan")
public class ShareplanDto {
	private String num;
	private String groupNum;
	private String memId;
	private String title;
	private String content;
	//@JsonFormat(pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
	private String wishday;
	private String wishtime;
	private String comment;
	private String wishNum;
	
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public String getGroupNum() {
		return groupNum;
	}
	public void setGroupNum(String groupNum) {
		this.groupNum = groupNum;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getWishday() {
		return wishday;
	}
	public void setWishday(String wishday) {
		this.wishday = wishday;
	}
	public String getWishtime() {
		return wishtime;
	}
	public void setWishtime(String wishtime) {
		this.wishtime = wishtime;
	}
	public String getWishNum() {
		return wishNum;
	}
	public void setWishNum(String wishNum) {
		this.wishNum = wishNum;
	}
	
}
