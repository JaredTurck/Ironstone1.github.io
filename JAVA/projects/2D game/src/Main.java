import java.awt.*;
import java.io.File;
import javax.imageio.ImageIO;
import javax.swing.JFrame;

public class Main extends JFrame {
	
	String img1 = "img\\grass.png";
	String img2 = "img\\cloud1.png";
	String img3 = "img\\horse1.png";
	
	public static void main(String args[]) {
		Main screen = new Main(); // Intitilise screen object.
		screen.setDefaultCloseOperation(EXIT_ON_CLOSE);
		screen.setSize(1000, 500);
		screen.setVisible(true);
		screen.setBackground(Color.cyan);
	}
	
	public void paint(Graphics g) { // draws data to screen.
		try {
			g.drawImage(ImageIO.read(new File(img2)), 0, 0, null);
			g.drawImage(ImageIO.read(new File(img3)), 50, 220, null);
			g.drawImage(ImageIO.read(new File(img1)), 0, 320, null);
			
		} catch (Exception error) {}
	}
}