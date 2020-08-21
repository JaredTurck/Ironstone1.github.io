"""
question_to_edit_name = input("Enter the question name(s) that should be edited (f.e. st_ess_questiontopic, no numbers.): ")
last_question_num = float(input("Enter the number of the very last question:")) + 1

actual_question_num = 0
while actual_question_num < last_question_num:
    actual_question_num = actual_question_num + 1
    question_to_edit_name = question_to_edit_name, actual_question_num
    print(question_to_edit_name)
"""

/code

name = input("Enter the question name(s) that should be edited (f.e. st_ess_questiontopic, no numbers.): ")
for question_num in range(int(input("Enter the number of the very last question:"))):
    current_name = [name, question_num]
    print(current_name)
    
