package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import boot.jeju.data.RentCarDto;

@Mapper
public interface ReservationMapper {
	public List<RentCarDto> getListOfRentCar();
}
