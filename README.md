# Script Canvas

This package implements the script canvas WebComponent. This WebComponent allows you to run a script in a canvas element. This component runs scripts which are Dwitter-compatible. This means that if the script can be run in the browser console at [www.dwitter.net](https://www.dwitter.net), it will work in the script canvas.

## Usage

pass the script directly by passing text or a function in the script attribute:
```html
<script-canvas script="t=>t"></script-canvas>
```

## Attributes

The script canvas element takes a 'src' attribute which is the script to run. The script can be in text format or passed as a function.

The script also has an 'fps' attribute which is the number of frames per second to run the script at. The default is 60.

The script also has a 'active' property which is a boolean that can be set to true or false to start and stop the script.

The script also has a 'paused' property which is a boolean that can be set to true or false to pause and unpause the script.

The script also has a 'reset' method which can be called to reset the script.

The script also has a 'clear' method which can  be called to clear the canvas.

The script also has a 'canvas' property which is the canvas element that the script is running on.

# The Script Canvas context

The script canvas context contains the following functions and properties:

## Functions

The script canvas context contains the following functions:

### a

The absolute value function.

### ac

The arccosine function.

### acs

The inverse hyperbolic cosine function.

### as

The arcsine function.

### ass

The inverse hyperbolic sine function.

### at

The arctangent function.

### ats

The inverse hyperbolic tangent function.

### at2

The arctangent of the quotient of its arguments.

### cbrt

The cube root function.

### ce

The ceiling function.

### clz

The number of leading zero bits in the 32-bit binary representation of a number.

### C

The cosine function.

### cosh

The hyperbolic cosine function.

### E

The exponential function.

### expm1

The exponential function minus one.

### F

The floor function.

### fr

The nearest single precision float representation of a number.

### H

The square root of the sum of squares of its arguments.

### imul

The 32-bit integer multiplication of two numbers.

### L

The natural logarithm function.

### lp1

The natural logarithm of one plus its argument.

### l10

The base 10 logarithm function.

### l2

The base 2 logarithm function.

### max

The maximum of zero or more numbers.

### min

The minimum of zero or more numbers.

### pow

The power function.

### R

The random number function.

### ro

The nearest integer function.

### s

The sign function.

### S

The sine function.

### sh

The hyperbolic sine function.

### Q

The square root function.

### T

The tangent function.

### th

The hyperbolic tangent function.

### tr

The integer part of the number by removing any fractional digits.

## Classes

The script canvas context contains a number of useful classes:

### M

## Properties

### M

The Math object.

### t

The time in seconds since the script started running.

### x

The canvas context.

# License

MIT