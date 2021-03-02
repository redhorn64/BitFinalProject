package boot.jeju.data;

import org.apache.ibatis.type.Alias;

@Alias("spotlist")
public class SpotlistDto {
	private String contentsid;
	private String title;
	private String label1;
	private String label2;
	private String roadaddr;
	private String addr;
	private String latitude;
	private String longitude;
	private String tag;
	private String introduction;
	private String img;
	private String thumbnail;
	private int star;
	private int likes;
	public String getContentsid() {
		return contentsid;
	}
	public void setContentsid(String contentsid) {
		this.contentsid = contentsid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getLabel1() {
		return label1;
	}
	public void setLabel1(String label1) {
		this.label1 = label1;
	}
	public String getLabel2() {
		return label2;
	}
	public void setLabel2(String label2) {
		this.label2 = label2;
	}
	public String getRoadaddr() {
		return roadaddr;
	}
	public void setRoadaddr(String roadaddr) {
		this.roadaddr = roadaddr;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
}