const math = require('mathjs')

const mandelbrotGenerator = (forkNumber, forks) => {
    // const imageArray = []
    // const startImaginary = -1
    // const endImaginary = 1
    // const totalImaginary = endImaginary - startImaginary
    // const startImaginaryFork = (totalImaginary/forks)*(forkNumber-1)
    // const startReal = -2
    // const endReal = 1
    console.log('im fork number', forkNumber)
    // const stepX = (endReal - startReal)/width
    // const stepY = (endImaginary - startImaginary)/height

    // const computeModule = (complex) => {
    //     return Math.sqrt(Math.pow(Math.abs(math.re(complex)), 2) + Math.pow(Math.abs(math.im(complex)), 2))   
    // }

    // const isInMandelbrot = (iterations, x, y) => {
    //     let previousZ = math.complex(0, 0)
    //     let z = math.complex(0, 0)
    //     for (let i = 0; i<iterations; i++){
    //         if (i === 0){
    //             z = math.complex(0, 0)
    //         }
    //         else {
    //             z = math.add(math.multiply(previousZ, previousZ), math.complex(x, y));
    //             if (computeModule(z) > 2){
    //                 return i
    //             }
    //         }
    //         previousZ = z
    //     }
    //     return -1
    // }

    // for (let y = startImaginary + stepY/2; y<endImaginary; y = y + stepY){
    //     for (let x = startReal + stepX/2; x<endReal; x = x + stepX){
    //         //console.log(x, y)
    //         let result = isInMandelbrot(iterations, x, y)
    //         if (result === -1){
    //             imageArray.push(0, 0, 0, 255)
    //         } else {
    //             imageArray.push((35*result)%256, (result/iterations)*255, (10*result)%256, 255)
    //         }
    //     }
    // }
    // return imageArray
}

module.exports = mandelbrotGenerator;