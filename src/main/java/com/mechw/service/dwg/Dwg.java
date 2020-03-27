package com.mechw.service.dwg;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Dwg {

    private static final String PREX = "D:/data";
    private static String acCoreConsole = "C:/Progra~1/Autodesk/AutoCA~1/accoreconsole.exe";

    public Dwg() {
    }

    public static String cylinShell(String fileName, double basex, double basey, double id, double od, double l) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("LINE\r\n");
            writer.write(-(od / 2.0D) + basex + "," + basey + "\r\n");
            writer.write(od / 2.0D + basex + "," + basey + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(od / 2.0D) + basex + "," + (basey + l) + "\r\n");
            writer.write(od / 2.0D + basex + "," + (basey + l) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(od / 2.0D) + basex + "," + basey + "\r\n");
            writer.write(-(od / 2.0D) + basex + "," + (basey + l) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(id / 2.0D) + basex + "," + basey + "\r\n");
            writer.write(-(id / 2.0D) + basex + "," + (basey + l) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(od / 2.0D + basex + "," + basey + "\r\n");
            writer.write(od / 2.0D + basex + "," + (basey + l) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(id / 2.0D + basex + "," + basey + "\r\n");
            writer.write(id / 2.0D + basex + "," + (basey + l) + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var36) {
            var36.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var33) {
                var33.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var35) {
            var35.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var38) {
                var38.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var34) {
                var34.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String quasiHemisphere(String fileName, double di, double thickness, double h) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            double ri = di / 2.0D;
            double dOut = di + 2.0D * thickness;
            double rOut = dOut / 2.0D;
            double innerStartX = Math.sqrt(ri * ri - h * h);
            double innerEndX = -innerStartX;
            double outerStartX = Math.sqrt(rOut * rOut - h * h);
            double outerEndX = -outerStartX;
            writer.write("LINE\r\n");
            writer.write(outerEndX + "," + h + "\r\n");
            writer.write(outerStartX + "," + h + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(outerStartX + "," + h + "\r\n");
            writer.write(outerEndX + "," + h + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(innerStartX + "," + h + "\r\n");
            writer.write(innerEndX + "," + h + "\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var40) {
            var40.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var37) {
                var37.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var39) {
            var39.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var42) {
                var42.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var38) {
                var38.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String quasiHemisphereH(String fileName, double di, double thickness, double h) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            double ri = di / 2.0D;
            double dOut = di + 2.0D * thickness;
            double rOut = dOut / 2.0D;
            double innerEndX = -ri;
            double outerEndX = -rOut;
            writer.write("LINE\r\n");
            writer.write(outerEndX + "," + 0 + "\r\n");
            writer.write(rOut + "," + 0 + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(rOut + "," + 0 + "\r\n");
            writer.write(outerEndX + "," + 0 + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(ri + "," + 0 + "\r\n");
            writer.write(innerEndX + "," + 0 + "\r\n");
            writer.write("LINE\r\n");
            writer.write(outerEndX + "," + -h + "\r\n");
            writer.write(rOut + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(outerEndX + "," + 0 + "\r\n");
            writer.write(outerEndX + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(rOut + "," + 0 + "\r\n");
            writer.write(rOut + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(ri + "," + 0 + "\r\n");
            writer.write(ri + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(innerEndX + "," + 0 + "\r\n");
            writer.write(innerEndX + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var40) {
            var40.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var37) {
                var37.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var39) {
            var39.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var42) {
                var42.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var38) {
                var38.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String ellipseI(String fileName, double di, double thickness, double hi, double h) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("ELLIPSE\r\n");
            writer.write("a\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(di / 2.0D + "," + 0 + "\r\n");
            writer.write(hi + "\r\n");
            writer.write("0\r\n");
            writer.write("180\r\n");
            writer.write("ELLIPSE\r\n");
            writer.write("a\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(di / 2.0D + thickness + "," + 0 + "\r\n");
            writer.write(hi + thickness + "\r\n");
            writer.write("0\r\n");
            writer.write("180\r\n");
            writer.write("LINE\r\n");
            writer.write(di / 2.0D + thickness + "," + 0 + "\r\n");
            writer.write(-(di / 2.0D + thickness) + "," + 0 + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(di / 2.0D + thickness + "," + -h + "\r\n");
            writer.write(-(di / 2.0D + thickness) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(di / 2.0D + thickness) + "," + 0 + "\r\n");
            writer.write(-(di / 2.0D + thickness) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(di / 2.0D) + "," + 0 + "\r\n");
            writer.write(-(di / 2.0D) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(di / 2.0D + "," + 0 + "\r\n");
            writer.write(di / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(di / 2.0D + thickness + "," + 0 + "\r\n");
            writer.write(di / 2.0D + thickness + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var34) {
            var34.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var31) {
                var31.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var33) {
            var33.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var36) {
                var36.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var32) {
                var32.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String ellipseO(String fileName, double dOut, double thickness, double ho, double h) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("ELLIPSE\r\n");
            writer.write("a\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(ho + "\r\n");
            writer.write("0\r\n");
            writer.write("180\r\n");
            writer.write("ELLIPSE\r\n");
            writer.write("a\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write(dOut / 2.0D - thickness + "," + 0 + "\r\n");
            writer.write(ho - thickness + "\r\n");
            writer.write("0\r\n");
            writer.write("180\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(dOut / 2.0D - thickness) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D - thickness) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D - thickness + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D - thickness + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var34) {
            var34.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var31) {
                var31.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var33) {
            var33.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var36) {
                var36.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var32) {
                var32.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String dishI(String fileName, double di, double crownRi, double cornerRi, double thickness, double h) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        double rib = crownRi;
        double ris = cornerRi;
        double dOut = di + 2.0D * thickness;
        double rob = di + thickness;
        double ros = di / 10.0D + thickness;
        double ang = Math.acos((di / 2.0D - cornerRi) / (di - cornerRi)) / 3.141592653589793D * 180.0D;
        double centerY = Math.sqrt((di - cornerRi) * (di - cornerRi) - (di / 2.0D - cornerRi) * (di / 2.0D - cornerRi));
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(di / 2.0D - ris + "," + 0 + "\r\n");
            writer.write(di / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rib - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(-(90.0D - ang) + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(di / 2.0D - ris) + "," + 0 + "\r\n");
            writer.write(-(di / 2.0D) + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rib - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(90.0D - ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dOut / 2.0D - ros + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rob - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(-(90.0D - ang) + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dOut / 2.0D - ros) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rob - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(90.0D - ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(dOut / 2.0D - thickness) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D - thickness) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D - thickness + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D - thickness + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var50) {
            var50.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var47) {
                var47.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var49) {
            var49.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var52) {
                var52.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var48) {
                var48.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String dishO(String fileName, double dOut, double crownRo, double cornerRo, double thickness, double h) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        double di = dOut - 2.0D * thickness;
        double rob = crownRo;
        double ros = cornerRo;
        double rib = crownRo - thickness;
        double ris = cornerRo - thickness;
        double ang = Math.acos((dOut / 2.0D - cornerRo) / (dOut - cornerRo)) / 3.141592653589793D * 180.0D;
        double centerY = Math.sqrt((dOut - cornerRo) * (dOut - cornerRo) - (dOut / 2.0D - cornerRo) * (dOut / 2.0D - cornerRo));
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dOut / 2.0D - ros + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rob - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(-(90.0D - ang) + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dOut / 2.0D - ros) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rob - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(90.0D - ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(di / 2.0D - ris + "," + 0 + "\r\n");
            writer.write(di / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rib - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(-(90.0D - ang) + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(di / 2.0D - ris) + "," + 0 + "\r\n");
            writer.write(-(di / 2.0D) + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0," + -centerY + "\r\n");
            writer.write("0," + (rib - centerY) + "\r\n");
            writer.write("a\r\n");
            writer.write(90.0D - ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(dOut / 2.0D) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-(dOut / 2.0D - thickness) + "," + 0 + "\r\n");
            writer.write(-(dOut / 2.0D - thickness) + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D - thickness + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D - thickness + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var50) {
            var50.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var47) {
                var47.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var49) {
            var49.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var52) {
                var52.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var48) {
                var48.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String sdh(String fileName, double dOut, double thk) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        double dInner = dOut - thk;
        double rInner = dInner;
        double rOuter = dInner + thk;
        double ang = 30.0D;
        double radius = ang / 180.0D * 3.141592653589793D;
        double xI = dInner * Math.sin(radius);
        double yI = dInner * Math.cos(radius);
        double xO = rOuter * Math.sin(radius);
        double yO = rOuter * Math.cos(radius);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write("0," + rOuter + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write("0," + rOuter + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write("0," + rInner + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write("0,0\r\n");
            writer.write("0," + rInner + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(xI + "," + yI + "\r\n");
            writer.write(xO + "," + yO + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-xI + "," + yI + "\r\n");
            writer.write(-xO + "," + yO + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(xI + "," + yI + "\r\n");
            writer.write(-xI + "," + yI + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var48) {
            var48.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var45) {
                var45.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var47) {
            var47.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var50) {
                var50.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var46) {
                var46.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String fha(String fileName, double di, double thk, double h, double ri) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        double dOut = di + 2.0D * thk;
        double ro = ri + thk;
        double centerX = di / 2.0D - ri;
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-dOut / 2.0D + "," + 0 + "\r\n");
            writer.write(-dOut / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(centerX + "," + 0 + "\r\n");
            writer.write(dOut / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write("90\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-centerX + "," + 0 + "\r\n");
            writer.write(-dOut / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write("-90\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D - ro + "," + ro + "\r\n");
            writer.write(-(dOut / 2.0D - ro) + "," + ro + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(di / 2.0D + "," + 0 + "\r\n");
            writer.write(di / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-di / 2.0D + "," + 0 + "\r\n");
            writer.write(-di / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(centerX + "," + 0 + "\r\n");
            writer.write(di / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write("90\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-centerX + "," + 0 + "\r\n");
            writer.write(-di / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write("-90\r\n");
            writer.write("LINE\r\n");
            writer.write(di / 2.0D - ri + "," + ri + "\r\n");
            writer.write(-(di / 2.0D - ri) + "," + ri + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dOut / 2.0D + "," + -h + "\r\n");
            writer.write(-dOut / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var40) {
            var40.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var37) {
                var37.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var39) {
            var39.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var42) {
                var42.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var38) {
                var38.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String cha(String fileName, double dib, double h, double dis, double thk, double ri, double ang) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        double dob = dib + 2.0D * thk;
        double dos = dis + 2.0D * thk * Math.cos(ang / 180.0D * 3.141592653589793D);
        double ro = ri + thk;
        double lowerOuterX = dob / 2.0D - ro + ro * Math.cos(ang / 180.0D * 3.141592653589793D);
        double lowerOuterY = ro * Math.sin(ang / 180.0D * 3.141592653589793D);
        double upperOuterX = dos / 2.0D;
        double upperOuterY = lowerOuterY + (lowerOuterX - upperOuterX) / Math.tan(ang / 180.0D * 3.141592653589793D);
        double lowerInnerX = dib / 2.0D - ri + ri * Math.cos(ang / 180.0D * 3.141592653589793D);
        double lowerInnerY = ri * Math.sin(ang / 180.0D * 3.141592653589793D);
        double upperInnerX = dis / 2.0D;
        double upperInnerY = lowerInnerY + (lowerInnerX - upperInnerX) / Math.tan(ang / 180.0D * 3.141592653589793D);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("LINE\r\n");
            writer.write(dob / 2.0D + "," + 0 + "\r\n");
            writer.write(dob / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dob / 2.0D - ro + "," + 0 + "\r\n");
            writer.write(dob / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(lowerOuterX + "," + lowerOuterY + "\r\n");
            writer.write(upperOuterX + "," + upperOuterY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-dob / 2.0D + "," + 0 + "\r\n");
            writer.write(-dob / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dob / 2.0D - ro) + "," + 0 + "\r\n");
            writer.write(-dob / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(-lowerOuterX + "," + lowerOuterY + "\r\n");
            writer.write(-upperOuterX + "," + upperOuterY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dib / 2.0D + "," + 0 + "\r\n");
            writer.write(dib / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dib / 2.0D - ri + "," + 0 + "\r\n");
            writer.write(dib / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(lowerInnerX + "," + lowerInnerY + "\r\n");
            writer.write(upperInnerX + "," + upperInnerY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-dib / 2.0D + "," + 0 + "\r\n");
            writer.write(-dib / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dib / 2.0D - ri) + "," + 0 + "\r\n");
            writer.write(-dib / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(-lowerInnerX + "," + lowerInnerY + "\r\n");
            writer.write(-upperInnerX + "," + upperInnerY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(upperInnerX + "," + upperInnerY + "\r\n");
            writer.write(-upperInnerX + "," + upperInnerY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(upperOuterX + "," + upperOuterY + "\r\n");
            writer.write(-upperOuterX + "," + upperOuterY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(upperInnerX + "," + upperInnerY + "\r\n");
            writer.write(upperOuterX + "," + upperOuterY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-upperInnerX + "," + upperInnerY + "\r\n");
            writer.write(-upperOuterX + "," + upperOuterY + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dob / 2.0D + "," + 0 + "\r\n");
            writer.write(-dob / 2.0D + "," + 0 + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dob / 2.0D + "," + -h + "\r\n");
            writer.write(-dob / 2.0D + "," + -h + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var60) {
            var60.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var57) {
                var57.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var59) {
            var59.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var62) {
                var62.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var58) {
                var58.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }

    public static String cha(String fileName, double dib, double hb, double dis, double hs, double thk, double rib, double ris, double ang) {
        String dwgName = "D:/data" + fileName + ".dwg";
        String scrName = "D:/data" + fileName + ".scr";
        Path scrPath = Paths.get(scrName);
        File scrFile = new File(scrName);
        double dob = dib + 2.0D * thk;
        double dos = dis + 2.0D * thk;
        double rob = rib + thk;
        double ros = ris + thk;
        double rad = ang / 180.0D * 3.141592653589793D;
        double lowerOuterX = dob / 2.0D - rob + rob * Math.cos(rad);
        double lowerOuterY = rob * Math.sin(rad);
        double upperOuterX = dos / 2.0D + (ris - ris * Math.cos(rad));
        double upperOuterY = lowerOuterY + (dob / 2.0D - dos / 2.0D - (ris - ris * Math.cos(rad)) - (rob - rob * Math.cos(rad))) / Math.tan(rad);
        double lowerInnerX = dib / 2.0D - rib + rib * Math.cos(rad);
        double lowerInnerY = rib * Math.sin(rad);
        double upperInnerX = dis / 2.0D + (ros - ros * Math.cos(rad));
        double upperInnerY = lowerInnerY + (dib / 2.0D - dis / 2.0D - (ros - ros * Math.cos(rad)) - (rib - rib * Math.cos(rad))) / Math.tan(rad);
        BufferedWriter writer = null;

        ProcessBuilder pb;
        try {
            Files.createDirectories(scrPath.getParent());
            Files.createFile(scrPath);
            writer = new BufferedWriter(new FileWriter(scrFile));
            writer.write("LINE\r\n");
            writer.write(dob / 2.0D + "," + 0 + "\r\n");
            writer.write(dob / 2.0D + "," + -hb + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dob / 2.0D - rob + "," + 0 + "\r\n");
            writer.write(dob / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(lowerOuterX + "," + lowerOuterY + "\r\n");
            writer.write(upperOuterX + "," + upperOuterY + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dos / 2.0D + ris + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write(dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write(dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad) + hs) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-dob / 2.0D + "," + 0 + "\r\n");
            writer.write(-dob / 2.0D + "," + -hb + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dob / 2.0D - rob) + "," + 0 + "\r\n");
            writer.write(-dob / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(-lowerOuterX + "," + lowerOuterY + "\r\n");
            writer.write(-upperOuterX + "," + upperOuterY + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dos / 2.0D + ris) + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write(-dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(-dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write(-dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad) + hs) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dib / 2.0D + "," + 0 + "\r\n");
            writer.write(dib / 2.0D + "," + -hb + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dib / 2.0D - rib + "," + 0 + "\r\n");
            writer.write(dib / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(lowerInnerX + "," + lowerInnerY + "\r\n");
            writer.write(upperInnerX + "," + upperInnerY + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(dis / 2.0D + ros + "," + (upperInnerY + ros * Math.sin(rad)) + "\r\n");
            writer.write(dis / 2.0D + "," + (upperInnerY + ros * Math.sin(rad)) + "\r\n");
            writer.write("a\r\n");
            writer.write(ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(dis / 2.0D + "," + (upperInnerY + ros * Math.sin(rad)) + "\r\n");
            writer.write(dis / 2.0D + "," + (upperInnerY + ros * Math.sin(rad) + hs) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(-dib / 2.0D + "," + 0 + "\r\n");
            writer.write(-dib / 2.0D + "," + -hb + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dib / 2.0D - rib) + "," + 0 + "\r\n");
            writer.write(-dib / 2.0D + "," + 0 + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(-lowerInnerX + "," + lowerInnerY + "\r\n");
            writer.write(-upperInnerX + "," + upperInnerY + "\r\n");
            writer.write("\r\n");
            writer.write("ARC\r\n");
            writer.write("C\r\n");
            writer.write(-(dis / 2.0D + ros) + "," + (upperInnerY + ros * Math.sin(rad)) + "\r\n");
            writer.write(-dis / 2.0D + "," + (upperInnerY + ros * Math.sin(rad)) + "\r\n");
            writer.write("a\r\n");
            writer.write(-ang + "\r\n");
            writer.write("LINE\r\n");
            writer.write(-dis / 2.0D + "," + (upperInnerY + ros * Math.sin(rad)) + "\r\n");
            writer.write(-dis / 2.0D + "," + (upperInnerY + ros * Math.sin(rad) + hs) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dob / 2.0D + "," + 0 + "\r\n");
            writer.write(-dob / 2.0D + "," + 0 + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dob / 2.0D + "," + -hb + "\r\n");
            writer.write(-dob / 2.0D + "," + -hb + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write(-(dos / 2.0D) + "," + (upperOuterY + ris * Math.sin(rad)) + "\r\n");
            writer.write("\r\n");
            writer.write("LINE\r\n");
            writer.write(dos / 2.0D + "," + (upperOuterY + ris * Math.sin(rad) + hs) + "\r\n");
            writer.write(-(dos / 2.0D) + "," + (upperOuterY + ris * Math.sin(rad) + hs) + "\r\n");
            writer.write("\r\n");
            writer.write("SAVEAS ");
            writer.write("2004 ");
            writer.write(dwgName + "\r\n");
            writer.write("QUIT\r\n");
            writer.flush();
        } catch (Exception var68) {
            var68.printStackTrace();
            pb = null;
        } finally {
            try {
                writer.close();
            } catch (Exception var65) {
                var65.printStackTrace();
            }

        }

        String[] cmdArray = new String[]{acCoreConsole, "/s", scrName, "/l", "en-US"};
        pb = new ProcessBuilder(cmdArray);
        pb.redirectErrorStream(true);
        Process p = null;

        try {
            p = pb.start();
        } catch (IOException var67) {
            var67.printStackTrace();
        }

        InputStream fis = null;
        if (p == null) {
            return "-1";
        } else {
            fis = p.getInputStream();
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            String line;
            try {
                while ((line = br.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException var70) {
                var70.printStackTrace();
            }

            int exitValue = 0;

            try {
                exitValue = p.waitFor();
            } catch (InterruptedException var66) {
                var66.printStackTrace();
            }

            return 0 == exitValue ? "/data" + fileName + ".dwg" : "-1";
        }
    }
}
