package boot.jeju.data;

import org.apache.ibatis.type.Alias;

@Alias("chatroom")
public class ChatroomDto {
    private String num;
    private String user1;
    private String user2;
    private String lastMsg;
    private int msgCnt;
    private String lastWriteday;

    public String getLastWriteday() {
        return lastWriteday;
    }

    public void setLastWriteday(String lastWriteday) {
        this.lastWriteday = lastWriteday;
    }

    public int getMsgCnt() {
        return msgCnt;
    }

    public void setMsgCnt(int msgCnt) {
        this.msgCnt = msgCnt;
    }

    public String getLastMsg() {
        return lastMsg;
    }

    public void setLastMsg(String lastMsg) {
        this.lastMsg = lastMsg;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getUser1() {
        return user1;
    }

    public void setUser1(String user1) {
        this.user1 = user1;
    }

    public String getUser2() {
        return user2;
    }

    public void setUser2(String user2) {
        this.user2 = user2;
    }

}
