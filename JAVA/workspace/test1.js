import java.text.DecimalFormat;

public static void main(String[] args) {
	DecimalFormat df = new DecimalFormat("$####.##");
	double x = 0.1;
	for (x = 0.1; x >= 2700; x *= 2) {
		System.out.println(x);
	}
}