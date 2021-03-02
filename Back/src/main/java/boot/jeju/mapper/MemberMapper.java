package boot.jeju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import boot.jeju.data.MemberDto;

@Mapper
public interface MemberMapper {
	public List<MemberDto> getListOfMember();
	public MemberDto getDataOfMember(String id);
	public void insertOfMember(MemberDto dto);
	public void insertOfSosialMember(MemberDto dto);
	public void deleteOfMember(String id) ;
	public void updateOfMember(MemberDto dto);
	public void updateOfPass(MemberDto dto);
	public int totalCountOfMember();
	public int idCheckOfMember(String id);
	public int passCheckOfMember(MemberDto dto);
}
