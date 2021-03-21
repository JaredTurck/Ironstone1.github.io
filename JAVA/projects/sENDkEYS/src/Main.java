import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;
//import java.util.concurrent.TimeUnit;

//public class Main {
	
	//public static void Sleep(int tm) {
	//	try {
	//		TimeUnit.SECONDS.sleep(tm);
	//	} catch (
	//			InterruptedException e) {
	//		e.printStackTrace();
	//	}
	//}
	
	//public static void main(String args[]) {
	//	try {
	//		Robot robot = new Robot();
	//		
	//		while (true) {
	//			robot.keyPress(KeyEvent.VK_I);
	//			Sleep(1);
	 //       	robot.keyRelease(KeyEvent.VK_I);
	  //      	Sleep(1);
	//		}
	//		
	//	} catch (AWTException e) {
	//		e.printStackTrace();
	//	}
	//}
	
public class Main implements Runnable {
public volatile String command;
	public void run() {
		try {
			Robot r = new Robot();
			while (command.equals("up") && !Thread.currentThread().isInterrupted()) {
				r.keyPress(KeyEvent.VK_UP);
				r.delay(20);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	
}