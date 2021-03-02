package boot.jeju.data;

import org.apache.ibatis.type.Alias;

@Alias("daylist")
public class DayListDto {
	private String num;
	private String title;
	private String content;
	private String wishday;
	private String wishtime;
	private String addr;
	
	public void setNum(String num) {
		this.num = num;
	}
	public String getNum() {
		return num;
	}
	public String getTitle() {
		return title;
	}
	
	public String getWishday() {
		return wishday;
	}
	public String getWishtime() {
		return wishtime;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public String getAddr() {
		return addr;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public void setWishday(String wishday) {
		this.wishday=wishday;
	}
	
	public void setWishtime(String wishtime) {
		this.wishtime=wishtime;
	}
	
	public void setAddr(String addr) {
		this.addr=addr;
	}
}
