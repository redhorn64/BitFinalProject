package boot.jeju.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;


@RestController
@CrossOrigin
public class WeatherController {
	
	public class Weather {
		private String category;
		private String fcstDate;
		private String fcstTime;
		private String fcstValue;
		public String getCategory() {
			return category;
		}
		public void setCategory(String category) {
			this.category = category;
		}
		public String getFcstDate() {
			return fcstDate;
		}
		public void setFcstDate(String fcstDate) {
			this.fcstDate = fcstDate;
		}
		public String getFcstTime() {
			return fcstTime;
		}
		public void setFcstTime(String fcstTime) {
			this.fcstTime = fcstTime;
		}
		public String getFcstValue() {
			return fcstValue;
		}
		public void setFcstValue(String fcstValue) {
			this.fcstValue = fcstValue;
		}
		
		
	}
	
	@GetMapping("/weather/list")
	public List<Weather> getWeatherList(@RequestParam String nx, @RequestParam String ny, @RequestParam String today, @RequestParam String hours) {
		
		String urlStr = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst";
		

		List<Weather> res = new ArrayList<Weather>();
		
		try {
			urlStr += '?' + URLEncoder.encode("ServiceKey","UTF-8") + "=" + "ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D";
			urlStr += '&' + URLEncoder.encode("pageNo","UTF-8") + "=1";
			urlStr += '&' + URLEncoder.encode("numOfRows","UTF-8") + "=250"; // 한 페이지 결과 수
			urlStr += '&' + URLEncoder.encode("dataType","UTF-8") + "=JSON";
			urlStr += '&' + URLEncoder.encode("base_date","UTF-8") + "=" + today;
			urlStr += '&' + URLEncoder.encode("base_time","UTF-8") + "=" + hours + "00"; 
			urlStr += '&' + URLEncoder.encode("nx","UTF-8") + "=" + nx;
			urlStr += '&' + URLEncoder.encode("ny","UTF-8") + "=" + ny;
			
			URL url = new URL(urlStr);
			BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			String line = "";
			String result = "";
			
			// 버퍼에 있는 정보를 문자열로 변환
			while((line = bf.readLine()) != null) {
				// 읽어와서 하나의 문자열로 만들기
				result = result.concat(line);
			}
			
			//System.out.println(result);
			
			// 문자열을 JSON으로 파싱
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject)jsonParser.parse(new StringReader(result));
			/*
			 * JSONObject parse_response = (JSONObject)jsonObj.get("response"); JSONObject
			 * parse_body = (JSONObject)parse_response.get("body");
			 */
			JSONObject parse_items = (JSONObject)jsonObj.get("response");
			JSONObject parse_items2 = (JSONObject)parse_items.get("body");
			JSONObject parse_items3 = (JSONObject)parse_items2.get("items");
//			JSONArray parse_item = (JSONArray)jsonObj.get("item");ds
			JSONArray item = (JSONArray)parse_items3.get("item");
			
			//System.out.println(parse_item.size());
			
			
			for(int i=0; i<item.size(); i++) {
				JSONObject weather = (JSONObject)item.get(i);
				String category = (String) weather.get("category");
//				System.out.println(category);
//				if(category.equals("SKY")) {
					Weather wdto = new Weather();
					wdto.setCategory(category);
					wdto.setFcstDate((String) weather.get("fcstDate"));
					wdto.setFcstValue((String) weather.get("fcstValue"));
					wdto.setFcstTime((String) weather.get("fcstTime"));
					res.add(wdto);
//				}
				
				
			}
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e ) {
			System.out.println("ParseException : " + e.getMessage());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return res;
	}
	
	@GetMapping("/weather/nowTem")
	public String getTemp(@RequestParam String nx, @RequestParam String ny, @RequestParam String today, @RequestParam String hours) {
		
		String urlStr = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst";
		
		String temp = "";
		
		try {
			urlStr += '?' + URLEncoder.encode("ServiceKey","UTF-8") + "=" + "ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D";
			urlStr += '&' + URLEncoder.encode("pageNo","UTF-8") + "=1";
			urlStr += '&' + URLEncoder.encode("numOfRows","UTF-8") + "=8"; // 한 페이지 결과 수
			urlStr += '&' + URLEncoder.encode("dataType","UTF-8") + "=JSON";
			urlStr += '&' + URLEncoder.encode("base_date","UTF-8") + "=" + today;
			urlStr += '&' + URLEncoder.encode("base_time","UTF-8") + "=" + hours + "00"; 
			urlStr += '&' + URLEncoder.encode("nx","UTF-8") + "=" + nx;
			urlStr += '&' + URLEncoder.encode("ny","UTF-8") + "=" + ny;
			
			URL url = new URL(urlStr);
			BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			String line = "";
			String result = "";
			
			// 버퍼에 있는 정보를 문자열로 변환
			while((line = bf.readLine()) != null) {
				// 읽어와서 하나의 문자열로 만들기
				result = result.concat(line);
			}
			
			//System.out.println(result);
			
			// 문자열을 JSON으로 파싱
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject)jsonParser.parse(new StringReader(result));
			/*
			 * JSONObject parse_response = (JSONObject)jsonObj.get("response"); JSONObject
			 * parse_body = (JSONObject)parse_response.get("body");
			 */
			JSONObject parse_items = (JSONObject)jsonObj.get("response");
			JSONObject parse_items2 = (JSONObject)parse_items.get("body");
			JSONObject parse_items3 = (JSONObject)parse_items2.get("items");
//			JSONArray parse_item = (JSONArray)jsonObj.get("item");ds
			JSONArray item = (JSONArray)parse_items3.get("item");
			
			//System.out.println(parse_item.size());
			
			
			for(int i=0; i<item.size(); i++) {
				JSONObject weather = (JSONObject)item.get(i);
				String category = (String) weather.get("category");
//				System.out.println(category);
				if(category.equals("T1H")) {
					temp = (String) weather.get("obsrValue");
				}
				
				
			}
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e ) {
			System.out.println("ParseException : " + e.getMessage());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return temp;
	}
	
	@GetMapping("/weather/info")
	public String getInfo(@RequestParam String tmFc) {
		
		String urlStr = "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst";
		
		String res = "";
		
		try {
			urlStr += '?' + URLEncoder.encode("ServiceKey","UTF-8") + "=" + "ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D";
			urlStr += '&' + URLEncoder.encode("pageNo","UTF-8") + "=1";
			urlStr += '&' + URLEncoder.encode("numOfRows","UTF-8") + "=10"; // 한 페이지 결과 수
			urlStr += '&' + URLEncoder.encode("dataType","UTF-8") + "=JSON";
			urlStr += '&' + URLEncoder.encode("stnId","UTF-8") + "=184";
			urlStr += '&' + URLEncoder.encode("tmFc","UTF-8") + "=" + tmFc; 
//			urlStr += '&' + URLEncoder.encode("nx","UTF-8") + "=" + nx;
//			urlStr += '&' + URLEncoder.encode("ny","UTF-8") + "=" + ny;
			
			URL url = new URL(urlStr);
			BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			String line = "";
			String result = "";
			
			// 버퍼에 있는 정보를 문자열로 변환
			while((line = bf.readLine()) != null) {
				// 읽어와서 하나의 문자열로 만들기
				result = result.concat(line);
			}
			
			//System.out.println(result);
			
			// 문자열을 JSON으로 파싱
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject)jsonParser.parse(new StringReader(result));
			/*
			 * JSONObject parse_response = (JSONObject)jsonObj.get("response"); JSONObject
			 * parse_body = (JSONObject)parse_response.get("body");
			 */
			JSONObject parse_items = (JSONObject)jsonObj.get("response");
			JSONObject parse_items2 = (JSONObject)parse_items.get("body");
			JSONObject parse_items3 = (JSONObject)parse_items2.get("items");
//			JSONArray parse_item = (JSONArray)jsonObj.get("item");ds
			JSONArray item = (JSONArray)parse_items3.get("item");
			
			//System.out.println(parse_item.size());
			
			
			for(int i=0; i<1; i++) {
				JSONObject weather = (JSONObject)item.get(i);
				res = (String) weather.get("wfSv");
				
				
			}
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e ) {
			System.out.println("ParseException : " + e.getMessage());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return res;
	}
}
