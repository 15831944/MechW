package com.mechw.service.docx;

import org.docx4j.TraversalUtil;
import org.docx4j.finders.ClassFinder;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.Text;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

public class DocxTool {

    /**
     * 获取主文档内表格和文本框的 text 元素
     *
     * @param mainDocumentPart 主文档
     * @return text集合
     */
    protected static List<Object> getText(MainDocumentPart mainDocumentPart) {
        ClassFinder finder = new ClassFinder(Text.class);
        new TraversalUtil(mainDocumentPart.getContent(), finder);
        return finder.results;
    }

    protected static void copyDocx(File from, File to) {
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
