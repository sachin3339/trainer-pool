package com.alchemy.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@MappedSuperclass
@Setter
@Getter
public abstract class BaseEntity implements Serializable {

    final protected static char[] hexArray = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
    private static final long serialVersionUID = -1104240385244977201L;



    @Column(name = "sid")
    public byte[] sid;

    public static byte[] hexStringToByteArray(String s) {
        if (s == null || s.trim().length() <= 0)
            return null;
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

    public static String bytesToHexStringBySid(byte[] sid) {
        if (sid == null || sid.length <= 0) return "";
        char[] hexChars = new char[sid.length * 2];
        int v;
        for (int j = 0; j < sid.length; j++) {
            v = sid[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    public static byte[] generateByteUuid() {
        String firstPart = UUID.randomUUID().toString().replace("-", "");
        String secondPart = UUID.randomUUID().toString().replace("-", "");
        return hexStringToByteArray(firstPart + secondPart);
    }

    public String getStringSid() {
        return this.bytesToHexString();
    }

    public String bytesToHexString() {
        if (sid == null || sid.length <= 0) return "";
        char[] hexChars = new char[sid.length * 2];
        int v;
        for (int j = 0; j < sid.length; j++) {
            v = sid[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    public void generateUuid() {
        String firstPart = UUID.randomUUID().toString().replace("-", "");
        String secondPart = UUID.randomUUID().toString().replace("-", "");
        this.sid = hexStringToByteArray(firstPart + secondPart);
    }

    public String trimUUID(String uuid, int byteCount) {
        char[] uuidChars = uuid.replace("-", "").toCharArray();
        String newUUID = "";
        for (int i = 0; i < byteCount; i++) {
            newUUID += uuidChars[i];
        }
        return newUUID;
    }
}
