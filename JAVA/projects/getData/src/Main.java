import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

class Main {
	public static void main(String args[]) {
		//for (int i=0;i<20;i++) {
		//	System.out.println(timeGetRequest("https://ark.intel.com"));
		//}
		
		//"/products/" + document.body.innerHTML.split('<div class="products processors"')[1].split('<a href="/products/')[1].split("</a>")[0]
		// both indexs start at 1.
		
		// Get list of processor familys
		String html = getHTML("https://ark.intel.com");
		ArrayList<String> URLs = new ArrayList<String>();
		
		List<String> family = Arrays.asList(html.split("<div class=\"products processors\""));
		family = family.subList(0, family.size());
		
		for (int i=0; i<family.size()-1; i++) {
			String[] products = family.get(i+1).split("<a href=\"/products/"); // problem, including all hrefs - not just CPUs.
			for (int ii=0; ii<products.length-1; ii++) {
				URLs.add("/products/" + products[ii+1].split("\">")[0]);
			}
		}
		
		// Get list of processors
		HashMap<String, List<String>> products = new HashMap<String, List<String>>();
		for (int i=0; i<URLs.size(); i++) {
			String[] elm = getHTML("https://ark.intel.com" + URLs.get(i)).split("<a href=\"/products/");
			for (int ii=0; ii<elm.length-1; ii++) {
				String url = "/products/" + elm[ii+1].split("\">")[0];
				
				// Get processors spces
				html = getHTML("https://ark.intel.com" + url);
				List<String> product_panel = Arrays.asList(html.split("id=\"tab-blade-"));
				product_panel = product_panel.subList(1, product_panel.size()-2);
				
				// for each spec in panel
				for (int iii=0; iii<product_panel.size(); iii++) {
					String[] product_panel_specs = product_panel.get(iii).split("<span class=\"label");
					System.out.println(product_panel_specs[0]); // skip index 0
					
				}
				
				//products.put(url,  Arrays.asList("Product Collection", "Code Name", "Lithography", "..."));
				//System.out.println(url);
				
			}
		}
		
		
	}
	
	public static String getHTML(String host) {
		String data = ""; String line;
		try {
			URL url = new URL(host);
			HttpURLConnection s = (HttpURLConnection) url.openConnection();
			s.setRequestProperty("Host", "ark.intel.com");
			s.setRequestProperty("Connection", "keep-alive");
			s.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36");
			s.setRequestProperty("Accept", "text/html");
			
			BufferedReader read = new BufferedReader(new InputStreamReader(s.getInputStream()));
			while ((line = read.readLine()) != null) {
				data += line;
			}
			read.close();
			
		} catch (Exception error) {
			System.out.println(error);
		} return data;
	}
	
	public static long timeGetRequest(String url) {
		long start = System.currentTimeMillis();
		getHTML(url);
		long end = System.currentTimeMillis();
		return end - start;
	}
}