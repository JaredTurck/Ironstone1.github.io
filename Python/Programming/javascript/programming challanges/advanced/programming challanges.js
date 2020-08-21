// Input and Output Problems (String and Numeric Variables)
function IO1() {
	var name = prompt("Enter your Name: ");
	var age = prompt("Enter your Age: ");
	while (/^\d*$/.test(age) === false) {
		var age = prompt("Invalid Input!\nEnter your Age: ");
	}
	var tv = prompt("Enter your favourite TV Program: ");
	alert(name +" is "+ age +" years old and likes "+ tv);
}

function IO2() {
	var first = prompt("Enter yout first name: ");
	var last = prompt("Enter your lastname: ");
	alert(last+" "+first+"\nYour names have "+last.length
	+" and "+first.length+" letters\nYour initials are "+last[0]+" "+first[0]);
}

function IO3() {
	var c = prompt("Enter the number of Carbon atoms? ");
	while (/^\d*$/.test(c) === false) {
		var c = prompt("Invalid Input!\nEnter the number of Carbon atoms? ");
	}
	var h = (c*2)+2;
	var mass = (c*12)+h;
	alert("The molecular mass of C"+c+"H"+h+" is "+mass);
}

// Selection Problems (IF ELSE, ELIF)
function SP1() {
	var temp = Number(prompt("Enter the number of current temperature: "));
	while (isNaN(temp) === true) {
		temp = Number(prompt("Invalid Input!\nEnter the number of current temperature: "));
		
	} if (temp <= 0) {
		state = "solid"
	} else if (temp > 0 && temp < 100) {
		state = "liquid"
	} else {
		state == "gas"
	} alert("At "+temp+" degrees centigrade, water will be a "+state+"!");
}

function SP2() {
	total = 0
	for (i = 0;i < 3;i++) {
		amount = Number(prompt("How many pounds did friend "+i+" raise?"));
		while (isNaN(amount) === true) {
			amount = Number(prompt("Invalid amount!\nHow many pounds did friend "+i+" raise?"));
		} total += amount;
	}
	if (total < 1000) {
		total += 100
	} else if (total >= 1000 && total <= 2000) {
		total *= 2
	} alert("your rasied a total of £"+total+"!");
}

function SP3() {
	error = ""; mass = "mass"; height = "height";
	while (isNaN(mass+height) === true) {
		mass = prompt(error+"Enter your weight in kilograms(KG)!")
		height = prompt(error+"Enter your height in meters (M)!")
		error = "Invalid Input!\n"
	}
	var BMI = parseFloat(mass) / (parseFloat(height)**2)
	if (BMI < 18.5) {
		state = "underweight"
	} else if (BMI >= 18.5 && BMI < 25) {
		state = "a healthy height"
	} else if (BMI >= 25 && BMI < 30) {
		state = "overweight"
	} else if (BMI >= 30 && BMI < 40) {
		state = "obese"
	} else if (BMI >= 40) {
		state = "very obese"
	} alert("Your BMI is "+BMI+" you are "+state)
}

//Iteration (Unconditional loops)
function I1() {
	var total = 0;
	for (i = 1;i <= 50;i++) {
		time = prompt("Enter the time for Pupil "+i+":")
		while (isNaN(time) === true) {
			time = prompt("Invalid Time!\nEnter the time for Pupil "+i+":")
		} total += Number(time)
	} alert("The average time was: "+(total/50)+" seconds!")
}

function I2() {
	fib = [0,1]
	for (i = 0;i < 10;i++) {
		fib.push(fib[fib.length-1] + fib[fib.length-2])
	}
	alert("Fibonacci: "+fib)
}

function I3() {
	fib = [0,1]
	n = prompt("How many places would you like to display?");
	while (isNaN(n) === true) {n = prompt("Invalid Input!\nHow many places would you like to display?")}
	
	for (i = 0;i < Number(n);i++) {
		fib.push(fib[fib.length-1] + fib[fib.length-2])
	}
	alert("The Fibonacci sequence to "+n+" places!\n"+fib)
}

function I4() {
	e = "";loan = "loan";intrest = "intrest";years = "years";
	while (isNaN(loan+intrest+years) === true) {
		var loan = prompt(e+"How much did you loan: ");
		var intrest = prompt(e+"Intrest rate: ");
		var years = prompt(e+"Number of years: ");
		e = "Invalid Input!\n";
	}
	for (i = 0;i < years;i++) {
		rate = loan / intrest;
		total = parseFloat(loan) + parseFloat(rate);
		alert("Year "+i+": £"+loan+"x "+intrest+"%=£"+rate+" Total=£"+total);loan = total
	}
}

//Iteration (Conditional loops)
function II1() {
	var tempArray = []
	for (i=1;i <= 7;i++) {
		temp = prompt("Enter temperature "+i+"!");
		while (isNaN(temp) === true || temp < -40 || temp > 55) {
			temp = prompt("Invalid Input!\nEnter temperature "+i+"!");
		} tempArray.push(temp)
	} 
	total = tempArray.reduce(function(a,b){return Number(a)+Number(b)},0)
	alert("This weeks average, round to 0 decimal places was: "+Math.round(total / 7, 0)+"°C")
}

function II2() {
	var number = Math.round(Math.random()*100, 0)+1
	var counter = 0
	user = prompt("Guess the random number from 1 to 100: ")
	while (user !== number) {
		if (user < number) {state = "higher!"} 
		else if (user > number) {state = "lower!"}
		else {state = "Invalid Input!"}counter++;
		user = Number(prompt(state + "\nguess again: "))
	} alert("welldone the number was: "+number+"! You took "+counter+" guesses!")
}

//Functions and Procedures
function F1() {
	num1="num1";num2="num2"
	while (isNaN(num1*num2)) {
		num1 = prompt("Enter the first number: ")
		num2 = prompt("Enter the second number: ")
		if (isNaN(num1*num2)) {alert("Invalid Input!")}
	} alert(num1+" X "+num2+" = "+(num1*num2))
}

function drawstars(spaces, stars) {
	alert(Array(spaces+1).join(" ") + Array(stars+1).join("*"))
}

function UMS2grade(mark) {
	marks = [[10,"A"],[9,"A"],[8,"A"],[7,"B"],[6,"C"],[5,"D"],[4,"E"],[3,"F"],[2,"G"],[1,"U"]]
	grade = marks[(10 - Math.floor(Number(mark)/10))][1]
	return grade
}