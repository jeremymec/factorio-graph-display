import React from 'react';
import { processGraph, highlightLine, removeHighlightLine, FactorioNode, Line } from './graphDisplay'

interface RenderedGraphProps {
    nodes: FactorioNode[]
}
   
  const RenderedGraph = ({ nodes }: RenderedGraphProps) => {

    const canvas = React.useRef(null)
    const [lines, setLines] = React.useState<Line[]>(null)

    React.useEffect(() => {
        const mouseoverLineCallback = (event: MouseEvent) => {
          
          for (let line of lines) {
            let currentlyHighlited = false
            for (let path of line.paths) {
              if (canvas.current.getContext('2d').isPointInStroke(path, event.offsetX, event.offsetY)) {
                highlightLine(canvas.current.getContext('2d'), line)
                currentlyHighlited = true
              }
            }
            if (!currentlyHighlited) {
              removeHighlightLine(canvas.current.getContext('2d'), line)
            }
            currentlyHighlited = false
          }
        }

        const ctx = canvas.current.getContext('2d')
        canvas.current.addEventListener("mousemove", mouseoverLineCallback, false)

        const lines = processGraph(ctx, nodes)
        console.log("Lines", lines)
        setLines(lines)

    }, [nodes])




    return <canvas ref={canvas} width={2000} height={1000} />
  }
    
export default RenderedGraph;