import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import socket from './socket'

function App() {
    const [number, setNumber] = useState(0) 
    const [imageArray, setImageArray] = useState([])

    const [imageWidth, setImageWidth] = useState(60)
    const [iterations, setIterations] = useState(10)

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    useEffect(() => {
        console.log('hello')
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

    const openListener = useCallback(() => {
        console.log('connected to WS server');
    }, [])

    const messageListener = useCallback((event) => {
        console.log('message from server : ', event.data)
        setImageArray(JSON.parse(event.data))
    }, [])

    useEffect(() => {
        socket.addEventListener('open', openListener);
        socket.addEventListener('message', messageListener);
        return () => {
            socket.removeEventListener('open', openListener);
            socket.removeEventListener('message', messageListener);
        }
    }, [openListener, messageListener])

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.send(JSON.stringify({width: imageWidth, height: imageWidth/1.5, iterations: iterations}))
    }

    
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <canvas ref={canvasRef}></canvas>
                <label>Choose image size:
                    <select onChange={(e) => setImageWidth(e.target.value)}>
                        <option value={60}>60x40</option>
                        <option value={120}>120x80</option>
                        <option value={240}>240x160</option>
                    </select>
                </label>
                <label>Choose number of iterations:
                    <select onChange={(e) => setIterations(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
                <input type="submit" />
            </form>
        </div>
    )
}

export default App;
