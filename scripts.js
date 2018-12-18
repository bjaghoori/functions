const f = x => x * x * x;

function start() {
    const CANVAS_SIZE = {
        x: 800,
        y: 800
    };
    const FUNCTION_SIZE = {
        x: 10,
        y: 10
    };
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", CANVAS_SIZE.x);
    canvas.setAttribute("height", CANVAS_SIZE.y);
    document.body.append(canvas);
    const context = canvas.getContext("2d");
    plotFunction(f, FUNCTION_SIZE, CANVAS_SIZE, context);
}

function plotFunction(func, functionSize, canvasSize, context) {
    const steps = 1000;
    const dx = functionSize.x / steps;
    let x = -functionSize.x / 2;
    for (i = 0; i < steps; i++) {
        const y = func(x);
        drawPoint({ x, y }, functionSize, canvasSize, context);
        x = x + dx;
    }
}

function drawPoint(p, functionSize, canvasSize, context) {
    const canvasPoint = mapPoint(p, functionSize, canvasSize);
    console.log(canvasPoint);
    context.fillRect(canvasPoint.x, canvasPoint.y, 1, 1);
}

function mapPoint(p, functionSize, canvasSize) {
    return {
        x: p.x * canvasSize.x / functionSize.x + canvasSize.x / 2,
        y: p.y * canvasSize.y / -functionSize.y + canvasSize.y / 2,
    };
}

