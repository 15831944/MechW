package com.mechw.service.asmprt;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;

public class ASMPRTTool {

    protected static void copyASMPRT(File from, File to) {
        int byteread;
        try {
            if (from.exists()) {

                InputStream inStream = new FileInputStream(from);
                FileOutputStream fs = new FileOutputStream(to);
                byte[] buffer = new byte[1024];
                while ((byteread = inStream.read(buffer)) != -1) {
                    fs.write(buffer, 0, byteread);
                }
                inStream.close();
                fs.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
