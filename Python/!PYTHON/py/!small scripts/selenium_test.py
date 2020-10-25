import selenium, time
from selenium import webdriver

driver = webdriver.Chrome("chromedriver.exe")

def clever_bot():
    user_input = open("chat_bot_input.txt", "r").read()
    if user_input == "":
        return True
    else:
        print("input:", user_input)

    # clear input file
    with open("chat_bot_input.txt", "w") as input_file:
        input_file.write("")

    # clear output file
    with open("chat_bot_output.txt", "w") as output_file:
        output_file.write("")

    # go to website if it is not open
    if "cleverbot.com" not in driver.current_url:
        driver.get("https://www.cleverbot.com/")
        time.sleep(1)
        driver.execute_script("document.querySelectorAll('[type=\"submit\"][value=\"understood, and agreed\"]')[0].click()")

    # submit input to clever bot
    driver.execute_script("document.querySelectorAll('[placeholder=\"say to cleverbot...\"]')[0].value = '"+user_input+"'")
    driver.find_elements_by_xpath('//form[@id="avatarform"]//input[@name="stimulus"]')
    driver.execute_script("cleverbot.sendAI();")

    # get output
    output = driver.execute_script("return document.querySelector('[id=\"line1\"]').innerText")
    while False not in ["." not in output, "?" not in output]:
        output = driver.execute_script("return document.querySelector('[id=\"line1\"]').innerText")
    print("output:", output)

    # write output to file
    with open("chat_bot_output.txt", "w") as output_file:
        output_file.write(output)
