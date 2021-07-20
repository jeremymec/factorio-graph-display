interface FactorioNode {
    connection: number[];
    type: string;
    connected_to: number[];
    connection_from: number[];
}


export function processGraph(data: FactorioNode[]) {

    // Set up canvas
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Filter for nodes
    const input_nodes = data.filter((node) => node.type == 'input');
    const splitter_nodes = data.filter((node) => node.type == 'splitter');
    const output_nodes = data.filter((node) => node.type == 'output');

    // Calculate size of canvas
    const width = 1000;
    const height = 1500;

    // Set dimensions of canvas
    canvas.width = width;
    canvas.height = height;

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
        ctx.fillRect(x_cursor, y_cursor, input_size_x, input_size_y);
        x_cursor += (input_size_x + input_padding_x);
        if (x_cursor > input_x_breakpoint) {
            x_cursor = input_padding_x;
            y_cursor += (input_size_y + input_padding_y)
        }
    }

    // Set parameters for drawing splitter nodes
    const number_of_splitter_nodes = splitter_nodes.length;

    const splitter_size_x = 75;
    const splitter_size_y = 75;
    
    const splitter_padding_x = 150;
    const splitter_padding_y = 125;

    const splitter_x_breakpoint = 700;

    const input_splitter_padding = 200;

    // Reset cursor and add padding
    x_cursor = splitter_padding_x;
    y_cursor += input_splitter_padding;

    // Set color of rectangle
    ctx.fillStyle = 'red'

    // Draw splitter nodes on canvas
    for (let node of splitter_nodes) {
        ctx.fillRect(x_cursor, y_cursor, splitter_size_x, splitter_size_y);
        x_cursor += (splitter_size_x + splitter_padding_x);
        if (x_cursor > splitter_x_breakpoint) {
            x_cursor = splitter_padding_x;
            y_cursor += (splitter_size_y + splitter_padding_y)
        }
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
        ctx.fillRect(x_cursor, y_cursor, output_size_x, output_size_y);
        x_cursor += (output_size_x + output_padding_x);
        if (x_cursor > output_x_breakpoint) {
            x_cursor = output_padding_x;
            y_cursor += (output_size_y + output_padding_y)
        }
    }
}

const data = [
    {
        connection: [2],
        type: 'input',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [3],
        type: 'input',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [5, 4],
        type: 'splitter',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [5, 4],
        type: 'splitter',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [6, 3],
        type: 'splitter',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [7, 6],
        type: 'splitter',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [8, 7],
        type: 'splitter',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [10, 9],
        type: 'splitter',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [],
        type: 'output',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [],
        type: 'output',
        connected_to: [],
        connection_from: []
    },
    {
        connection: [],
        type: 'output',
        connected_to: [],
        connection_from: []
    }
];

processGraph(data);