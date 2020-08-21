from selenium import webdriver
import time

# --------------------------------
# - Meeting Bot by © Jared Turck -
# --------------------------------

# enter meeting ID 700-760-517
# enter the same meeting with 200 bots

NO_bots = 200

def timeout(cm, tm=1):
    time.sleep(tm)


bot_names = (lambda x : [x+str(i) for i in range(NO_bots)])(input("Enter name: "))

meeting_ID = input("Enter meeting ID: ")
while False in (lambda m : [m.isdigit() == True, len(m) == 9])(meeting_ID.replace("-", "")):
    meeting_ID = input("Incorrect input!\nEnter meeting ID: ")

def add_bot(current_bot_name):
    driver = webdriver.Chrome("chromedriver.exe")

    driver.get("https://app.gotomeeting.com/home.html")
    input1 = driver.find_element_by_id("meetingId")
    timeout(input1.send_keys((lambda x : x[:3]+"-"+x[3:6]+"-"+x[6:])(meeting_ID.replace("-",""))), tm=3)
    timeout(driver.find_element_by_id("joinMeeting").click(), tm=1)
    timeout(driver.find_element_by_xpath('//button[@data-automation-id="onboarding-continue-no-audio"]').click(), tm=1)

    # add a bot to the meeting
    driver.find_element_by_id("attendee-name").send_keys(current_bot_name)
    driver.find_element_by_xpath('//button[@data-automation-id="change-name-and-email-dialog__submit"]').click()

for i in range(NO_bots):
    add_bot(bot_names[i])
