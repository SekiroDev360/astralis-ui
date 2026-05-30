import { useEffect } from "react";

self.onmessage = function (event) {
     const massiveArray = event.data
     console.log("Worker received data. Starting heavy computation");

     const processedData = massiveArray
     .map((item) => ({ ...item, calculatedValue: item.score * Math.random()}))
     .sort((a, b) => b.calculatedValue - a.calculatedValue)

     self.postMessage(processedData)
}


export default function AnalyticsDashboard() {
    const [results, setResults] = useState([])
    const [isCalculating, setIsCalculating] = useState(false)

    const workerRef = useRef<Worker | null>(null)

    useEffect(() => {
        workerRef.current = new Worker(new URL('./worler.js', import.meta.url))
        workerRef.current.onmessage = (event) => {
            const finalData = event.data
        }
    })
}