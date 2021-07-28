import React, { useState, useRef } from 'react';
import { processGraph } from './graphDisplay'
import { FactorioNode } from './graphDisplay'

interface RenderedGraphProps {
    nodes: FactorioNode[],
    isLoading: boolean
}
   
  const RenderedGraph = ({ nodes, isLoading }: RenderedGraphProps) => {

    const canvas = React.useRef(null)
    // const [grid, setGrid] = useState<FactorioGrid>()

    React.useEffect(() => {

        if (!isLoading) {
            // let factorioGrid = convertBlueprintToFactorioGrid(blueprintData)
            // console.log(factorioGrid)
            // setGrid(factorioGrid)
            const ctx = canvas.current.getContext('2d')
            processGraph(ctx, nodes)
        }

    }, [nodes, isLoading])

    return <canvas ref={canvas} width={1000} height={1000} />
  }
    
export default RenderedGraph;