class Main {
	public static void main(String args[]) {
		// Taylor Series
		// Pi/4 = 1 - 1/3 + 1/5 - 1/7 + ...
		// PI = (1 - (1/3) + (1/5) - (1/7) + (1/9)...)*4
		
		double n = 1.0;
		long end = 1000000;
		
		for (int i=3;i<end;i++) {
			if (i % 2 == 1) {		// 1, 3, 5, 7, 9,...
				if (i % 4 == 1) {	// 5, 9, 13, 17,...
					n += (1.0/(double)i);
				} else {			// 3, 7, 11, 15,...
					n -= (1.0/(double)i);
				}
			}
		} n *= 4;
		System.out.println(n);
	}
}