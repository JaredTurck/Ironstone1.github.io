from google_search import google_search

req = google_search()
req.search("cat")
req.write_2_file()
