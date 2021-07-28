export interface FactorioNode {
    id: number,
    connection: number[];
    type: string;
    connected_to: number[];
    connection_from: number[];
    info?: RenderedNodeInformation
}

export interface RenderedNodeInformation {
    x: number,
    y: number
}

type Coord = [number, number]

export function processGraph(ctx: CanvasRenderingContext2D, data: FactorioNode[]) {

    // Filter for nodes
    const input_nodes = data.filter((node) => node.type == 'input');
    const splitter_nodes = data.filter((node) => node.type == 'splitter');
    const output_nodes = data.filter((node) => node.type == 'output');

    // Calculate size of canvas
    const width = 2000;
    const height = 1500;

    // Set dimensions of canvas
    // canvas.width = width;
    // canvas.height = height;

    // Set parameters for drawing input nodes
    const number_of_input_nodes = input_nodes.length;

    const input_size_x = 75;
    const input_size_y = 75;
    
    const input_padding_x = 150;
    const input_padding_y = 50;

    const input_x_breakpoint = 500;

    // Set initial drawing cursor values
    let x_cursor = input_padding_x;
    let y_cursor = input_padding_y;

    // Set color of rectangle
    ctx.fillStyle = 'blue'

    // Draw input nodes on canvas
    for (let node of input_nodes) {
        // Check wrapping
        if (x_cursor > input_x_breakpoint) {
            x_cursor = input_padding_x;
            y_cursor += (input_size_y + input_padding_y)
        }
        // Draw node
        ctx.fillRect(x_cursor, y_cursor, input_size_x, input_size_y);
        
        // Set node informationa
        node.info = { 
            x: x_cursor,
            y: y_cursor
        }

        // Update cursor
        x_cursor += (input_size_x + input_padding_x);
    }

    // Set parameters for drawing splitter nodes
    const number_of_splitter_nodes = splitter_nodes.length;

    const splitter_size_x = 75;
    const splitter_size_y = 75;
    
    const splitter_padding_x = 150;
    const splitter_padding_y = 125;

    const splitter_x_breakpoint = width - splitter_padding_x;

    const input_splitter_padding = 200;

    // Reset cursor and add padding
    x_cursor = splitter_padding_x;
    y_cursor += input_splitter_padding;

    // Set color of rectangle
    ctx.fillStyle = 'red'

    // Draw splitter nodes on canvas
    for (let node of splitter_nodes) {
        // Check wrapping
        if (x_cursor > splitter_x_breakpoint) {
            x_cursor = splitter_padding_x;
            y_cursor += (splitter_size_y + splitter_padding_y)
        }
        // Draw node
        ctx.fillRect(x_cursor, y_cursor, splitter_size_x, splitter_size_y);
        
        // Set node informationa
        node.info = { 
            x: x_cursor,
            y: y_cursor
        }

        // Update cursor
        x_cursor += (splitter_size_x + splitter_padding_x);
    }

    // Set parameters for drawing output nodes
    const number_of_output_nodes = output_nodes.length;

    const output_size_x = 75;
    const output_size_y = 75;
    
    const output_padding_x = 150;
    const output_padding_y = 125;

    const output_x_breakpoint = 700;

    const splitter_output_padding = 200;

    // Reset cursor and add padding
    x_cursor = output_padding_x;
    y_cursor += splitter_output_padding;

    // Set color of rectangle
    ctx.fillStyle = 'green'

    // Draw output nodes on canvas
    for (let node of output_nodes) {
        // Check wrapping
        if (x_cursor > output_x_breakpoint) {
            x_cursor = output_padding_x;
            y_cursor += (output_size_y + output_padding_y)
        }
        // Draw node
        ctx.fillRect(x_cursor, y_cursor, output_size_x, output_size_y);
        
        // Set node informationa
        node.info = { 
            x: x_cursor,
            y: y_cursor
        }

        // Update cursor
        x_cursor += (output_size_x + output_padding_x);
    }

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    // Connect input nodes
    for (let node of input_nodes) {
        for (let connection_id of node.connected_to) {
            // Get node to connect to
            let connecting_node = getNodeWithID(connection_id, splitter_nodes)
            if (connecting_node) {
                // Get node information for start and end
                let origin_info = node.info!
                let end_info = connecting_node.info!
                
                // [Line to middle]
                let line_start: Coord = [origin_info.x + (input_size_x / 2), origin_info.y + input_size_y]
                let line_end: Coord = [origin_info.x + (input_size_x / 2), halfwayBetween(origin_info.y, end_info.y + input_size_y)]
                drawLineWithCoords(line_start, line_end, ctx)

                // [Align X]
                line_start = line_end
                line_end = [end_info.x + input_size_x / 2, line_start[1]]
                drawLineWithCoords(line_start, line_end, ctx)

                // [Line to destination]
                line_start = line_end
                line_end = [line_start[0], end_info.y]
                drawLineWithCoords(line_start, line_end, ctx)
            }
        }
    }

    // Connect splitter nodes
    for (let node of splitter_nodes) {
        for (let connection_id of node.connected_to) {
            // Get node to connect to
            let connecting_node = getNodeWithID(connection_id, output_nodes)
            if (connecting_node) {
                // Get node information for start and end
                let origin_info = node.info!
                let end_info = connecting_node.info!
                
                // [Line to middle]
                let line_start: Coord = [origin_info.x + (input_size_x / 2), origin_info.y + input_size_y]
                let line_end: Coord = [origin_info.x + (input_size_x / 2), halfwayBetween(origin_info.y, end_info.y + input_size_y)]
                drawLineWithCoords(line_start, line_end, ctx)

                // [Align X]
                line_start = line_end
                line_end = [end_info.x + input_size_x / 2, line_start[1]]
                drawLineWithCoords(line_start, line_end, ctx)

                // [Line to destination]
                line_start = line_end
                line_end = [line_start[0], end_info.y]
                drawLineWithCoords(line_start, line_end, ctx)
            }
        }
    }
    
}

function drawLineWithCoords(start: Coord, end: Coord, ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(start[0], start[1])
    ctx.lineTo(end[0], end[1])
    ctx.stroke()
}

function halfwayBetween(first: number, second: number): number {
    let distance_between = (second) - (first)
    return first + (distance_between / 2)
}


function getNodeWithID(id: number, nodes: FactorioNode[]): FactorioNode | undefined {
    return nodes.find(node => node.id == id)
}