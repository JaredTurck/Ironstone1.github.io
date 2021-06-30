import unittest
from unittest.mock import patch
from employee import Employee

class TestEmployee(unittest.TestCase):

    # setUp runs before every test
    def setup(self):
        print("SetUp was run!")
        self.emp_1 = Employee("Corey", "Schafer", 50_000)
        self.emp_2 = Employee("Sue", "Smith", 60_000)

    # tearDown runs after all the tests are complete
    def tearDown(self):
        pass

    def test_email(self):
        print("test_email")
        self.assertEqual(self.emp_1.email, "Corey.Schafer@email.com")
        self.assertEqual(self.emp_2.email, "Sue.Smith@email.com")

        self.emp_1.first = "John"
        self.emp_2.first = "Jane"

        self.assertEqual(self.emp_1.email, "John.Schafer@email.com")
        self.assertEqual(self.emp_2.email, "Jane.Smith@email.com")


    def test_fullname(self):
        print("test_fullname")
        self.assertEqual(self.emp_1.fullname, "Corey Schafer")
        self.assertEqual(self.emp_2.fullname, "Sue Smith")

        self.emp_1.first = "John"
        self.emp_2.first = "Jane"

        self.assertEqual(self.emp_1.fullname, "John Schafer")
        self.assertEqual(self.emp_2.fullname, "Jane Smith")

    def test_apply_raise(self):
        print("test_raise")
        self.emp_1.apply_raise()
        self.emp_2.apply_raise()

        self.assertEqual(self.emp_1.pay, 52500)
        self.assertEqual(self.emp_2.pay, 63000)

    # mocking
    def test_monthly_schedyle(self):
        with patch("employee.requests.get") as mocked_get:
            # test 1
            mocked_get.return_value.ok = True
            mocked_get.return_value.text = "Success"

            schedule = self.emp_1.monthly_schedule("May")
            mocked_get.assert_called_with("http://company.com/name/month")
            self.assertEqual(schedule, "Success")

            # test 2
            mocked_get.return_value.ok = False

            schedule = self.emp_2.monthly_schedule("June")
            mocked_get.assert_called_with("http://company.com/name/month")
            self.assertEqual(schedule, "Success")

if __name__ == "__main__":
    unittest.main()

# tests don't always run in order
# setup is run before every test
# you only want tests to fail if there is something wrong with the code
# mocking lets you fake outputs from methods

# test should be isolated and not reply on each other

# mocking
# We don’t want the success of you test to depend on depend on
# that website being up, we only care that the get method was
# called with the correct URL and that our code behaves correctly
# regardless of if is the request.get returns an error (because it
# can’t connect to web server).
