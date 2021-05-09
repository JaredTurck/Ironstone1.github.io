import selenium, random, time, os, traceback, subprocess, psutil, signal
from selenium import webdriver
from urllib.request import urlretrieve, urlopen
from googletrans import Translator

driver = webdriver.Chrome("chromedriver.exe")
website_url = "https://danbooru.donmai.us"
henati_tags = "&tags=breasts+"
trust_modules = ["datetime", "math", "random", "hashlib", "time", "getpass", "socket", "urllib"]
dangerious_keywords = ["input", "exec", "eval", "compile", "open", "builtins", "os", "globals", "locals", "breakpoint", "dir", "delattr", "getattr", "repr", "vars"]
cat_memes = []
normal_memes = []

IO_folder = "InputOutput/"

def process():
    commands = open(IO_folder+"commands.txt","r").read()
    if "get-henati" in commands:
        pgnum = str(random.randint(0,50))

        # get and write url to output file
        driver.get(website_url + "/posts?page="+pgnum+henati_tags)
        urls = driver.execute_script("return" + open("get_henati.js","r").read())

        img_href = urls[random.randint(0, len(urls)-1)]
        print("Fetched Henati image!")

        post = website_url + img_href
        driver.get(post)
        src = driver.execute_script('return document.getElementById("image").getAttribute("src")')
        with open(IO_folder+"output.txt", "w", encoding="utf-8") as output:
            output.write(src)

        # clear the commands file
        with open(IO_folder+"commands.txt","w", encoding="utf-8") as commands_file:
            commands_file.write("\n")
