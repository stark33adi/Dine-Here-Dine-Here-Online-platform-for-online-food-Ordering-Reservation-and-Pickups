package com.rest.util;

public class ByteUtil {
    public static String byteArrayToHex(byte[] byteData) {
        StringBuilder sb = new StringBuilder();
        for (byte b : byteData) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
