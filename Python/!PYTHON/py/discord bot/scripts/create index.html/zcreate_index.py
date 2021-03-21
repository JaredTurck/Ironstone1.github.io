import os, urllib.parse
from PIL import Image

template = """
<html>
	<head>
		<style>
			body {
			margin: 0;
			background-color: #00222D;
			font-family: Arial;
		}
		
		.topnav {
			overflow: hidden;
			background-color: #331a00;
			padding-left: 1em;
			padding-right: 1em;
			padding-top: 1em;
			padding-bottom: 1em;
		}
		
		.topnav a {
			float: left;
			color: #f2f2f2;
			text-align: center;
			padding-left: 14px;
			padding-right: 14px;
			padding-top: 16px;
			padding-bottom: 16px;
			text-decoration: none;
			font-size: 1em;
			margin: 0;
		}
		
		.nav-text {
			padding-left: 0px;
			padding-right: 0px;
			padding-top: 0px;
			padding-bottom: 0px;
			margin: 0%;
			font-size: 0.8em;
		}
		
		.nav-items-1 {
			padding-left: 14px;
			padding-right: 14px;
			padding-top: 16px;
			padding-bottom: 16px;
		}
		
		.topnav .nav-item-1:hover {
			color: grey;
			display: block;
		}
		
		.topnav .nav-item-2:hover {
			color: grey;
		}
		
		.nav-image {
			width: auto;
			height: 50px;
			position: absolute;
			padding-left: 0;
			padding-right: 0;
			padding-top: 0;
			padding-bottom: 0;
			margin: 0;
			top: 1em;
			left: 2em;
		}
		
		.nav-image-2 {
			width: auto;
			height: 50px;
			position: absolute;
			padding-left: 0;
			padding-right: 0;
			padding-top: 0;
			padding-bottom: 0;
			margin: 0;
			top: 0.8em;
			left: 5.2em;
		}
		
		/* heading */
		.heading-1 {
			color: white;
		}
		
		.sub-header {
			color: white;
		}
		
		/* table */
		.table-div {
			padding-left: 4em;
			padding-right: 0em;
			padding-top:  2em;
			padding-bottom:  2em;
			clear: both;
		}
		
		.table-content {
			border-collape: collapse;
			margin: 25px 0;
			font-size: 0.9em;
			font-family: sans-serif;
			min-width: 400px;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
			color: white;
			padding-left: 4em;
			padding-right: 4em;
			padding-top:  4em;
			padding-bottom:  4em;
			width: 90%;
		}
		
		.table-content thead tr {
			background-color: #009879;
			text-align: left;
		}
		
		.table-content th, .table-content td {
			padding: 12px 15px;
		}
		
		.table-content tbody tr {
			border-bottom: 1px solid #00222D;
			width: 100%;
		}
		
		.td-header {
			width: 80%;
		}

		.td-img {
                    border-radius: 10%;
                    width: 4em;
                    height: 4em;
		}
		
		.table-content tbody tr:nth-of-type(even) {
			background-color: #003444;
			color: #FFFFFF;
		}
		
		.table-content tbody tr:nth-of-type(odd) {
			background-color: #002936;
			color: #E9F2FF;
		}
		
		.table-content tbody tr: last-of-type {
			border-bottom: 2px solid #009879;
		}
		
		.sub-header-2 {
			color: white;
		}
		
		/* Glow */
		.glow {
			font-size: 2em;
			color: #E2E2E2;
			-webkit-animation: glow 1s ease-in-out infinite alternate;
			-moz-animation: glow 1s ease-in-out infinite alternate;
			animation: glow 1s ease-in-out infinite alternate;
		}
		
		@-webkit-keyframes glow {
			from {
				text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #005D7B, 0 0 40px #005D7B, 0 0 50px #005D7B, 0 0 60px #005D7B, 0 0 70px #005D7B;
			}
  
			to {
				text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #005D7B, 0 0 40px #005D7B, 0 0 50px #005D7B, 0 0 60px #005D7B, 0 0 70px #005D7B;
			}
		}
		
		/* footer */
		#foot {
			background-color: #001B25;
			padding-left: 0;
			padding-right: 0;
			padding-top: 2em;
			padding-bottom: 11em;
		}
		
		.logo-img {
			width: 8em;
			height: 8em;
			float: left;
			padding-left: 4em;
			padding-right: 0;
			padding-top: 1em;
			padding-bottom: 0;
			position: absolute;
		}
		
		.logo-text {
			color: white;
			padding-left: 0;
			padding-right: 0;
			padding-top: 0.5em;
			padding-bottom: 0;
			position: absolute;
		}
		
		.logo-text-title {
			padding-left: 6.5em;
			padding-right: 0;
			padding-top: 0;
			padding-bottom: 0;
			text-align: left;
			font-size: 2em;
			position: absolute;
			width: 10%;
			font-family: "Helvetica";
		}
		
		.logo-text-copyright {
			padding-left: 13em;
			padding-right: 0;
			padding-top: 4em;
			padding-bottom: 0;
			font-family: "Times New Roman";
		}
		
		.right-panel {
			float: right;
			position: relative;
			padding-left: 0em;
			padding-right: 1em;
			padding-top: 3em;
			padding-bottom: 0;
		}
		
		.right-panel-colm {
			padding-left: 0em;
			padding-right: 24em;
			padding-top: 0em;
			padding-bottom: 0;
		}
		
		.colm-div-1 {
			text-align: left;
			position: absolute;
			padding-left: 8em;
			padding-right: 0em;
			padding-top: 0;
			padding-bottom: 0;
			z-index: 1;
		}
		
		.colm-div-2 {
			text-align: left;
			position: absolute;
			padding-left: 16em;
			padding-right: 0em;
			padding-top: 0em;
			padding-bottom: 0;
			z-index: 0;
		}
		
		.colm-div-3 {
			text-align: left;
			position: absolute;
			padding-left: 0em;
			padding-right: 0em;
			padding-top: 0;
			padding-bottom: 0;
			z-index: 3;
		}
		
		.colm-link {
			padding-left: 0;
			padding-right: 0;
			padding-top: 0;
			padding-bottom: 0;
			margin: 0;
			text-decoration: none;
			color: white;
			font-family: "Calibri Light";
			position: relative;
		}
		
		/* mobile */
		@media (max-width: 820px) {
			#foot {
				background-color: #001B25;
				padding-left: 0;
				padding-right: 0;
				padding-top: 2em;
				padding-bottom: 6em;
			}
		
			.logo-img {
				width: 8em;
				height: 8em;
				float: left;
				padding-left: 2em;
				padding-right: 0;
				padding-top: 1em;
				padding-bottom: 0;
				position: absolute;
			}
		
			.logo-text {
				color: white;
				padding-left: 0;
				padding-right: 0;
				padding-top: 0.5em;
				padding-bottom: 0;
				position: absolute;
			}
		
			.logo-text-title {
				padding-left: 5.5em;
				padding-right: 0;
				padding-top: 0;
				padding-bottom: 0;
				text-align: left;
				font-size: 2em;
				position: absolute;
				width: 10%;
				font-family: "Helvetica";
			}
		
			.logo-text-copyright {
				padding-left: 11em;
				padding-right: 0;
				padding-top: 4em;
				padding-bottom: 0;
				font-family: "Times New Roman";
				width: 8em;
			}
		
			.right-panel {
				float: none;
				position: relative;
				padding-left: 4em;
				padding-right: 1em;
				padding-top: 10em;
				padding-bottom: 0;
			}
		
			.right-panel-colm {
				padding-left: 0em;
				padding-right: 0em;
				padding-top: 0em;
				padding-bottom: 0;
			}
		
			.colm-div-1 {
				text-align: left;
				position: absolute;
				padding-left: 4em;
				padding-right: 0em;
				padding-top: 0;
				padding-bottom: 0;
				z-index: 1;
			}
		
			.colm-div-2 {
				text-align: left;
				position: absolute;
				padding-left: 10em;
				padding-right: 0em;
				padding-top: 0em;
				padding-bottom: 0;
				z-index: 0;
			}
		
			.colm-div-3 {
				text-align: left;
				position: absolute;
				padding-left: 0em;
				padding-right: 0em;
				padding-top: 0;
				padding-bottom: 0;
				z-index: 3;
			}
		
			.colm-link {
				padding-left: 0;
				padding-right: 0;
				padding-top: 0;
				padding-bottom: 0;
				margin: 0;
				text-decoration: none;
				color: white;
				font-family: "Calibri Light";
				position: relative;
			}
		}
		
		</style>
		<title>JaredBot - Music</title>
		<meta name="description" content="JaredBot is a multipurpose discord bot with a huge range of features, from music, moderation, levels, to image commands."></meta>
		<meta name="viewport" content="width=device-width, initial-scale-1"></meta>
		<link rel="icon" href="img/src/favicon.png" type="image/png" />
	</head>
	<body>
		<nav id="nav-bar">
			<div class="topnav">
				<a href="/"><img class="nav-image" src="http://jaredbot.uk/img/src/web/lion-blur.png"></img></a>
				<a href="/"><img class="nav-image-2" src="http://jaredbot.uk/img/src/web/logo-text-1.png"></img></a>
				<a class="nav-item-1" href="command"><span class="nav-text" style="padding-left: 7em;">Commands</span></a>
				<a class="nav-item-2" href="music"><span class="nav-text">Music</span></a>
				<a class="nav-item-2" href="moderation"><span class="nav-text">Moderation</span></a>
				<a class="nav-item-2" href="image"><span class="nav-text">Image</span></a>
				<a class="nav-item-2" href="https://discord.com/invite/QDeUXq4" target="+blank"><span class="nav-text">Support Server</span></a>
			</div>
		</nav>
		<div class="command-content">
			<div class="table-div" id="music">
				<h1 class="glow">[title tag]</h1>
				<table class="table-content">
"""

row = """
                                        <tr>
                                                <td>
                                                    <img class="td-img" src="[image src]" alt="[file name]"></img>
                                                </td>
						<td class="td-header">[file name]</td>
						<td>[file size]</td>
						<td>
                                                    <a target="_blank" href="[file link]">here</a>
						</td>
					</tr>"""

footer = """
				</table>
			</div>
		</div>
	</body>
	<footer>
		<div id="foot">
			<div class="logo-div">
				<div class="logo-img-div">
					<img class="logo-img" src="http://jaredbot.uk/img/src/web/lion-blur.png"></img>
				</div>
				<div class="logo-text">
					<div class="logo-text-title">
						<p>JaredBot</p>
					</div>
					<div class="logo-text-copyright">
						<p>Copyright © 2020 JaredBot</p>
					</div>
				</div>
				<div class="right-panel">
					<div class="right-panel-colm">
						<div class="colm-div-1">
							<a class="colm-link" href="/">Home</a><br>
							<a class="colm-link" href="command">Commands</a><br>
							<a class="colm-link" target="_blank" href="https://discord.com/invite/QDeUXq4">Discord</a>
						</div>
					</div>
					<div class="right-panel-colm">
						<div class="colm-div-2">
							<a class="colm-link" target="_blank" href="https://steamcommunity.com/id/jaredcat">Steam</a><br>
							<a class="colm-link" target="_blank" href="https://github.com/JaredTurck">GitHub</a><br>
							<a class="colm-link" target="_blank" href="https://www.youtube.com/channel/UCZMhn0olhq5G2ttBqNOv1IQ">YouTube</a>
						</div>
					</div>
					<div class="right-panel-colm">
						<div class="colm-div-3">
							<a class="colm-link" target="_blank" href="https://discord.com/oauth2/authorize?client_id=767561850404864071&scope=bot&permissions=1610088439">Invite</a><br>
							<a class="colm-link" href="#">About</a><br>
							<a class="colm-link" href="#">Privacy</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</html>"""

class create_index():
    def __init__(self):
        self.ignore_extensions = ['py', 'html', 'css', 'js']
        self.thumbnail_path = "thumbnail/"
        self.thumbnail_begin = "thumbnail_"
        self.listdir = os.listdir()
        self.print_itter = 50
        
    def short_byte(self, n):
        sizes = [" bytes", "KB", "MB", "GB", "TB", "PB"]
        count = 0
        while n > 1024:
            n /= 1024
            count += 1
        return str(round(n, 2)) + sizes[count]

    def create_thumbnail(self):
        counter = 0
        if os.path.exists(self.thumbnail_path) == False:
            os.makedirs(self.thumbnail_path)
        for file in self.listdir:
            extension = file.split('.')[-1]
            if extension not in self.ignore_extensions:
                try:
                    current = Image.open(file)
                    current.thumbnail((64, 64), Image.ANTIALIAS)
                    fname = self.thumbnail_begin + file
                    pil_extension = extension.upper().replace("JPG", "JPEG")
                    current.save(self.thumbnail_path + fname)
                    if counter % self.print_itter == 0:
                        print(f"[+] Created thumbnail for '{file}'! {counter}/" + str(len(self.listdir)))
                except Exception as error:
                    print("[-] Failed to create thumbnail of '" + file + "'! " + str(error))
                finally:
                    counter += 1
        

    def main(self):
        print("[+] Added header!")
        dir_name = os.path.abspath(__file__).split('\\')[-2]
        data = template.replace('[title tag]', dir_name)
        row_count = 0
        for file in self.listdir:
            if file.split('.')[-1] not in self.ignore_extensions:
                try:
                    new_row = row
                    new_row = new_row.replace('[file name]', file)
                    new_row = new_row.replace('[file link]', urllib.parse.quote(file))
                    new_row = new_row.replace('[file size]', self.short_byte(os.path.getsize(file)))
                    new_row = new_row.replace('[image src]', self.thumbnail_path + self.thumbnail_begin + file)
                    data += "\n" + new_row
                    row_count += 1
                    if row_count % self.print_itter == 0:
                        print("[+] Added '" + file + "' to table!")
                except Exception as error:
                    print("[-] Failed to add '" + file + "' to table! " + str(error))

        if row_count > 0:
            self.create_thumbnail()
            data += footer
            print("[+] Added footer!")
            with open("index.html", "w") as index:
                index.write(data)
            print("[+] Finished writing data!")

index = create_index()
index.main()
os.popen("pause")
