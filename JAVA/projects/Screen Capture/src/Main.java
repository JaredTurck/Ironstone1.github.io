import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

import javax.imageio.ImageIO;

public class Main {
	static ArrayList<BufferedImage> AllFrames = new ArrayList<BufferedImage>();
	static Scanner scan = new Scanner(System.in);
	
	static boolean run = true;
	static int timeout = 50;
	static int global_FrameCounter = 0;
	
	public static void main(String[] args) {
		System.out.print("Menu:\n" +
		"1. Write frames to disk as they are captured.\n" +
		"2. Write frames to RAM until full, then copy to disk.\n> ");
		String UserInput = scan.next();
		
		while (UserInput.matches("[1-2]") != true) {
			System.out.println("Invalid Input, Try again!");
			UserInput = scan.next();
		}
		takeScreenShot(Integer.parseInt(UserInput)-1);
	}
	
	public static void writeFramesToDisk() {
		//Takes frame from memory buffer and writes to disk.
		ArrayList<BufferedImage> frames = new ArrayList<BufferedImage>(AllFrames);
		AllFrames.clear();
		System.gc();
		
		System.out.println("Writing " + frames.size() + " frames to disk!");
		for (int i=0;i<frames.size();i++) {
			try {
				ImageIO.write(frames.get(i), "png", new File("output/screenshot" + global_FrameCounter+".png"));
				global_FrameCounter++;
			} catch (Exception error1) {
				System.out.println("failed to write frame " + global_FrameCounter);
			}
		} System.out.println("Done!");
	}
	
	public static void takeScreenShot(int option) {
		System.out.println("Started Recording...");
		
		while (run) {
			Dimension ScreenSize = Toolkit.getDefaultToolkit().getScreenSize();
			long start = System.currentTimeMillis();
			int FPS = 0;
			
			while (System.currentTimeMillis() - start <= 1000) {
				try {
					Thread.sleep(timeout);
					BufferedImage frame = new Robot().createScreenCapture(new Rectangle(ScreenSize));
					AllFrames.add(frame);
					FPS ++;
					
					//write frames to disk as they are captured.
					if (option == 0) {
						ImageIO.write(frame, "png", new File("output/screenshot" + global_FrameCounter+".png"));
						global_FrameCounter++;
						AllFrames.clear();
						System.gc();
					}
					
				} catch (java.lang.OutOfMemoryError error) {
					System.out.println("Out of memory error!");
					
					//write frames from ram to disk.
					if (option == 1) {
						writeFramesToDisk();
						System.out.println("Finished Recording!");
						System.exit(0);
					}
					
				} catch (Exception error) {
					System.out.println(error);
				}
			} System.out.println("FPS: "+FPS);
		}
	}
}