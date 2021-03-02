package boot.jeju.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import boot.jeju.data.RentCarDto;
import boot.jeju.mapper.ReservationMapper;

@RestController
@CrossOrigin
public class ReservationController {
	@Autowired
	ReservationMapper mapper;
	
	@GetMapping("/reservation/carlist")
	public List<RentCarDto> getCarlist(){
		return mapper.getListOfRentCar();
	}
}
