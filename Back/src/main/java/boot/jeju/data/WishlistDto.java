package boot.jeju.data;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

@Alias("wishlist")
public class WishlistDto {
	private String num;
	private String memId;
	private String spotId;
	private String shareNum;
	private String aroundId;
	private String content;
	@JsonFormat(pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
	private Timestamp wishday;
	private String title;
	private String subject;
	private String wishtime;
	private String money;
	private String capital;
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	public String getSpotId() {
		return spotId;
	}
	public void setSpotId(String spotId) {
		this.spotId = spotId;
	}
	public String getShareNum() {
		return shareNum;
	}
	public void setShareNum(String shareNum) {
		this.shareNum = shareNum;
	}
	public String getAroundId() {
		return aroundId;
	}
	public void setAroundId(String aroundId) {
		this.aroundId = aroundId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public Timestamp getWishday() {
		return wishday;
	}
	public void setWishday(Timestamp wishday) {
		this.wishday = wishday;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getWishtime() {
		return wishtime;
	}
	public void setWishtime(String wishtime) {
		this.wishtime = wishtime;
	}
	public String getMoney() {
		return money;
	}
	public void setMoney(String money) {
		this.money = money;
	}
	public String getCapital() {
		return capital;
	}
	public void setCapital(String capital) {
		this.capital = capital;
	}
}
