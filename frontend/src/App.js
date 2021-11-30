import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
    const [imageArray, setImageArray] = useState([])

    const [imageWidth, setImageWidth] = useState(6)
    const [imageHeight, setImageHeight] = useState(4)
    const [iterations, setIterations] = useState(10)
    const [loadBalancer, setLoadBalancer] = useState('')

    const complexPlane = {
        real: {
            start: -2,
            end: 1,
            total: 3 
        },
        imaginary: {
            start: -1,
            end: 1,
            total: 2
        }
    }

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = imageWidth
        canvas.height = imageWidth/1.5;
        const context = canvas.getContext('2d'); 
        const imageData = context.createImageData(imageWidth, imageWidth/1.5)
        console.log(imageArray)
        for (let i = 0; i < imageData.data.length; i += 4) {
            // Modify pixel data
            imageData.data[i] = imageArray[i];  // R value
            imageData.data[i + 1] = imageArray[i + 1];    // G value
            imageData.data[i + 2] = imageArray[i + 2];  // B value
            imageData.data[i + 3] = imageArray[i + 3];  // A value
        }
        context.putImageData(imageData, 0, 0);
        contextRef.current = context;
    }, [imageArray])

    const computeComplexCoordinates = (x, y, halfPixelSize) => {
        let real = complexPlane.real.start + (x/imageWidth)*complexPlane.real.total - halfPixelSize
        let imaginary = complexPlane.imaginary.end - (y/imageHeight)*complexPlane.imaginary.total + halfPixelSize
        
        return {real: real, imaginary: imaginary}
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const halfPixelSize = (complexPlane.imaginary.total/imageHeight)/2
        let imageArray = []
        let requests = []
        for (let y=1; y<=imageHeight; y++){
            for (let x=1; x<=imageWidth; x++){
                let { real, imaginary } = computeComplexCoordinates(x, y, halfPixelSize)
                requests.push({real: real, imaginary: imaginary, iterations: iterations})
                // let response = await axios.get(, {params: })
                // let rgba = response.data

                // imageArray.push({
                //     coordinates: {
                //         x: x,
                //         y: y
                //     },
                //     rgba: rgba
                // })
            }
        }

        axios.all(requests.map((params) => axios.get('http://localhost:8080/mandelbrot', {params: params})))
        

        // imageArray.sort(function(a, b){
        //     return(
        //       a.coordinates.y - b.coordinates.y || a.coordinates.x - b.coordinates.x
        //     )
        //   })

        // let mandelbrotImage =[]
        // for (let pixel of imageArray){
        //     mandelbrotImage.push(... pixel.rgba)
        // }
        
        // setImageArray(mandelbrotImage)
    }

    return(
        <div>
            <form onSubmit={handleSubmit} >
                <canvas ref={canvasRef}></canvas>
                <label>Choose image size:
                    <select onChange={(e) => {
                        setImageWidth(e.target.value);
                        setImageHeight(e.target.value*2/3)
                    }}>
                        <option value={6}>60x40</option>
                        <option value={120}>120x80</option>
                        <option value={240}>240x160</option>
                        <option value={1200}>1200x800</option>
                    </select>
                </label>
                <label>Choose number of iterations:
                    <select onChange={(e) => setIterations(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={10000}>10000</option>
                    </select>
                </label>
                <label>
                    <select onChange={(e) => setLoadBalancer(e.target.value)}>
                        <option value={''}>None</option>
                        <option value={'cluster'}>Using cluster module</option>
                        <option value={'nginx'}>Using Nginx</option>
                    </select>
                </label>
                <input type="submit" />
            </form>
        </div>
    )
}

export default App;
