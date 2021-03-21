import java.util.*;
import java.text.DecimalFormat;
class wagesRevised {
  public static void main(String[] args) {
    
    Scanner sc= new Scanner(System.in);
	System.out.println("First employee’s name"); //Employee's name
	String name1=sc.nextLine();
    System.out.println("What is " + name1 + "'s hourly wage? "); //Employee's hourly wage
    double wage1=sc.nextDouble();
    System.out.println("How many regular hours did " + name1 + " work?"); //Employee's regular hours
    double rhour1=sc.nextDouble();
    System.out.println("How many overtime hours did " + name1 + " work?"); //Employee's Overtime hours
    double ohour1=sc.nextDouble();
    double earn1 = (rhour1 + ohour1) * wage1; //Employee's earned calculation
    DecimalFormat df = new DecimalFormat("$###.##");
    System.out.println(name1 + " earned " + df.format(earn1)); //Employee #1's earnings this week
    String output=sc.nextLine();
   
    System.out.println("Second employee’s name?");
	String name2=sc.nextLine();
    System.out.println("What is " + name2 + "'s hourly wage? ");
    double wage2=sc.nextDouble();
    System.out.println("How many regular hours did " + name2 + " work?");
    double rhour2=sc.nextDouble();
    System.out.println("How many overtime hours did " + name2 + " work?");
    double ohour2=sc.nextDouble();
    double earn2 = (rhour2 + ohour2) * wage2;
    System.out.println(name2 + " earned " + df.format(earn2)); //Employee #2's earnings this week
    String output1=sc.nextLine();
    
    System.out.println("Third employee’s name?");
	String name3=sc.nextLine();
    System.out.println("What is " + name3 + "'s hourly wage? ");
    double wage3=sc.nextDouble();
    System.out.println("How many regular hours did " + name3 + " work?");
    double rhour3=sc.nextDouble();
    System.out.println("How many overtime hours did " + name3 + " work?");
    double ohour3=sc.nextDouble();
    double earn3 = (rhour3 + ohour3) * wage3;
    System.out.println(name1 + " earned " + df.format(earn3)); //Employee #3's earnings this week
    String output2=sc.nextLine();
    
    System.out.println("Fourth employee’s name?");
	String name4=sc.nextLine();
    System.out.println("What is " + name4 + "'s hourly wage? ");
    double wage4=sc.nextDouble();
    System.out.println("How many regular hours did " + name4 + " work?");
    double rhour4=sc.nextDouble();
    System.out.println("How many overtime hours did " + name4 + " work?");
    double ohour4=sc.nextDouble();
    double earn4 = (rhour4 + ohour4) * wage4;
    System.out.println(name2 + " earned " + df.format(earn4)); //Employee #4's earnings this week
    String output3=sc.nextLine();
    
    System.out.println("Fifth employee’s name?");
	String name5=sc.nextLine();
    System.out.println("What is " + name5 + "'s hourly wage? ");
    double wage5=sc.nextDouble();
    System.out.println("How many regular hours did " + name5 + " work?");
    double rhour5=sc.nextDouble();
    System.out.println("How many overtime hours did " + name5 + " work?");
    double ohour5=sc.nextDouble();
    double earn5 = (rhour5 + ohour5) * wage5;
    System.out.println(name1 + " earned " + df.format(earn5)); //Employee #5's earnings this week
    
    System.out.println(name1 + " earned " + df.format(earn1)); //Employee #1's earnings this week
    System.out.println(name2 + " earned " + df.format(earn2)); //Employee #2's earnings this week
    System.out.println(name1 + " earned " + df.format(earn3)); //Employee #3's earnings this week
    System.out.println(name2 + " earned " + df.format(earn4)); //Employee #4's earnings this week
    System.out.println(name1 + " earned " + df.format(earn5)); //Employee #5's earnings this week
    
  }
}