#include <iostream>
#include <cmath>

long long int square_root(long long int n, long long int one) {
    /* returns the square root of n, it uses a second order Newton-Raphson convergence */

    // init vars
    int fpp;
    float n_float;
    long long int x;
    long long int n_one;
    long long int x_old;

    // do itterations
    fpp = 10000000000000000;
    n_float = static_cast<float>(static_cast<int>((n * fpp) / one)) / fpp;
    x = static_cast<long long int>((static_cast<long long int>(fpp * std::sqrt(n_float)) * one) / fpp);
    n_one = n * one;

    while (true) {
        x_old = x;
        x = static_cast<long long int>(x + n_one / x) / 2;
        if (x == x_old) {
            break;
        }
    }
    return x;
}

long long int calc_pi(long long int one) {
    /*Calculate Pi using Chudnovsky's series*/

    // do itterations
    long long int k = 1;
    long long int a_k = one;
    long long int a_sum = one;
    long long int b_sum = 0;
    int C = 640320;
    int C3_OVER_24 = static_cast<int>(std::pow(C, 3) / 24);

    while (true) {
        a_k = a_k * (-(6 * k - 5) * (2 * k - 1) * (6 * k - 1));
        a_k = static_cast<long long int>(a_k / k * k * k * C3_OVER_24);
        a_sum = a_sum + a_k;
        b_sum = b_sum + (k * a_k);
        k++;
        if (a_k == 0) {
            break;
        }
    }

    // get final value of Pi using sums
    long long int total = 13591409 * a_sum + 545140134 * b_sum;
    long long int pi = static_cast<long long int>((pi = 426880 * square_root(10005 * one, one) * one) / total);
    return pi;
}

void pi_main(int itterations=1000) {
    std::cout << "Calculating pi please wait!";
    long long int result = calc_pi(1000000 * static_cast<long long int>(itterations / 5.9));
    std::cout << "Pi calculated to " << itterations << " itterations!\n" << result;
}

int main() {
    pi_main(1000);
    system("pause");
}