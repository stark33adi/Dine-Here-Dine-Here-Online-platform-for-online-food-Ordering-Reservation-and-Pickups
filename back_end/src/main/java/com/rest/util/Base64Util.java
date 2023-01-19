package com.rest.util;

import org.apache.commons.codec.binary.Base64;

public class Base64Util {
    public static String byteArray2Base64(byte[] byteData) {
        return Base64.encodeBase64String(byteData);
    }
    public static byte[] Base642byteArray(String base64Str) {
        return Base64.decodeBase64(base64Str);
    }
    public static String delBase64Suffix(String base64Str) {
        String stringSuffix = "base64";
        int index = base64Str.indexOf(stringSuffix) + 7;
        return base64Str.substring(index);
    }
    public static String addBase64Suffix(String base64Str) {
        String stringSuffix = "data:image/png;base64,";
        StringBuffer sBuffer = new StringBuffer();
        sBuffer.append(stringSuffix);
        sBuffer.append(base64Str);
        return sBuffer.toString();
    }
    public static String photoFromDB(byte[] byteData) {
        return addBase64Suffix(byteArray2Base64(byteData));
    }
    public static byte[] photoToDB(String base64Str) {
        return Base642byteArray(delBase64Suffix(base64Str));
    }
}
