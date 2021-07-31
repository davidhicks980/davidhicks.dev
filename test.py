import string
import math as m
from random import random
digs = string.digits + string.ascii_letters


def int2base(x, base):
    if x < 0:
        sign = -1
    elif x == 0:
        return digs[0]
    else:
        sign = 1

    x *= sign
    digits = []

    while x:
        digits.append(digs[int(x % base)])
        x = int(x / base)

    if sign < 0:
        digits.append('-')

    digits.reverse()

    return ''.join(digits)
def fn(x):
    y = x;
    while y>1:
        if y%2 == 0:
            y=y/2
        else:
            y = y*3+1
            c=0
    return 1
for x in range(1, 1000):
    for n in range(69, 99):
        into= n * 10 + x
        store = into
        fn(into**x)
