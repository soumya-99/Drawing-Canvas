import { useEffect, useRef, useState } from "react"

function App() {
	const canvasRef = useRef(null)
	const contextRef = useRef(null)
	const [isDrawing, setIsDrawing] = useState(false)

	useEffect(() => {
		const canvas = canvasRef.current
		canvas.width = window.innerWidth * 2
		canvas.height = window.innerHeight * 2

		// Style of the canvas
		canvas.style.width = `${window.innerWidth}px`
		canvas.style.height = `${window.innerHeight}px`

		const context = canvas.getContext("2d")
		context.scale(2, 2)
		context.lineCap = "round"
		context.strokeStyle = "black"
		context.lineWidth = 4
		contextRef.current = context
	}, [])

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent
		contextRef.current.beginPath()
		contextRef.current.moveTo(offsetX, offsetY)
		setIsDrawing(true)
	}

	const endDrawing = () => {
		contextRef.current.closePath()
		setIsDrawing(false)
	}

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) return
		const { offsetX, offsetY } = nativeEvent
		contextRef.current.lineTo(offsetX, offsetY)
		contextRef.current.stroke()
	}

	return (
    <div style={{ width: "100px", height: "50px" }}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
	)
}

export default App
