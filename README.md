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

## Math Functions

The script canvas context contains the following Math functions:

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

## Canvas Context Functions

### bp

The begin path function.

### cp

The close path function.

### f

The fill function.

### fs

Set the fill style to a random color.

### fR

The fill rect function.

### lT

The line to function.

### mT

The move to function.

### sT

The stroke function

### sS

Set the stroke style to a random color.

### sL

The stroke line function.

### sR

The stroke rect function.

### sT

The stroke text function.

## Utility Functions

A number of useful functions are available in the script canvas context.

### V2 Function

The V2 function is a 2D vector function. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### V3 Function

The V3 function is a 3D vector function. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### P Function

The P function is a 3D point function. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### M Function

The M function is a 3D matrix function. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### F2 Function

The F2 function returns the distance between two vectors. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### A2 Function

The A2 function returns the angle between two vectors. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### cwt Function

The cwt function is a 2D wavelet transform function. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### cwt3 Function

The cwt3 function is a 3D wavelet transform function. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### madd Function

The madd function adds two matrices together. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### msub Function

The msub function subtracts two matrices. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mmul Function

The mmul function multiplies two matrices. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mdiv Function

The mdiv function divides two matrices. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mzeros Function

The mzeros function creates a matrix of zeros. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mones Function

The mones function creates a matrix of ones. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mrand Function

The mrand function creates a matrix of random numbers. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mfill Function

The mfill function fills a matrix with a value. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mcopy Function

The mcopy function copies a matrix. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mrow Function

The mrow function returns a row from a matrix. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### mcol Function

The mcol function returns a column from a matrix. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vadd Function

The vadd function adds two vectors together. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vsub Function

The vsub function subtracts two vectors. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vmul Function

The vmul function multiplies two vectors. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vdiv Function

The vdiv function divides two vectors. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vdot Function

The vdot function returns the dot product of two vectors. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vcross Function

The vcross function returns the cross product of two vectors. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vnorm Function

The vnorm function returns the norm of a vector. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vunit Function

The vunit function returns the unit vector of a vector. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### vcopy Function

The vcopy function copies a vector. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### pgrav Function

The pgrav function returns the gravitational force between two points. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### electrostatic Function

The electrostatic function returns the electrostatic force between two points. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### gline Function

The gline function returns the line equation for two points. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### gline2 Function

The gline2 function returns the line equation for two points. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### gline3 Function

The gline3 function returns the line equation for two points. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### bounds Function

The bounds function returns the bounding box for a set of points. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### gintersect Function

The gintersect function returns the intersection of two lines. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### rintersect Function

The rintersect function returns the intersection of a line and a plane. Details for this function can be found in the [CLASSES README](./CLASSES.md).

### raytrace Function

The raytrace function returns the intersection of a line and a set of planes. Details for this function can be found in the [CLASSES README](./CLASSES.md).

## Script Canvas Classes

A number of useful classes are available in the script canvas context.

### tObject Class

The tObject class is a base class for all rendered objects in the script canvas Renderer. It provides a number of useful functions.

### tMesh Class

The tMesh class is a class for rendering meshes in the script canvas Renderer. It provides a number of useful functions.

### tLine Class

The tLine class is a class for rendering lines in the script canvas Renderer. It provides a number of useful functions.

### tPoint Class

The tPoint class is a class for rendering points in the script canvas Renderer. It provides a number of useful functions.

### tPlane Class

The tPlane class is a class for rendering planes in the script canvas Renderer. It provides a number of useful functions.

### tSphere Class

The tSphere class is a class for rendering spheres in the script canvas Renderer. It provides a number of useful functions.

### tLight Class

The tLight class is a class for rendering lights in the script canvas Renderer. It provides a number of useful functions.

### tCamera Class

The tCamera class is a class for rendering cameras in the script canvas Renderer. It provides a number of useful functions.

### tScene Class

The tScene class is a class for rendering scenes in the script canvas Renderer. It provides a number of useful functions.

### tRenderer Class

The tRenderer class is a class for rendering scenes in the script canvas Renderer. It provides a number of useful functions.
## License

[MIT](LICENSE)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Sebastian Schepis** - *Initial work* - [joepea](
# License

MIT