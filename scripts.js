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
    plotAxes(FUNCTION_SIZE, CANVAS_SIZE, context);
    plotFunction(f, FUNCTION_SIZE, CANVAS_SIZE, context);
}

function plotAxes(functionSize, canvasSize, context) {
    drawLine(
        {
            x: -functionSize.x / 2,
            y: 0
        },
        {
            x: functionSize.x / 2,
            y: 0
        },
        functionSize,
        canvasSize,
        context
    );
    const dx = functionSize.x / 10;
    for (let x = -functionSize.x / 2; x <= functionSize.x; x += dx) {
        if (x !== 0) {
            const canvasPoint = mapPoint({ x, y: 0 }, functionSize, canvasSize);
            context.fillText(x, canvasPoint.x - 4, canvasPoint.y + 10);
        }
    }

    drawLine(
        {
            x: 0,
            y: -functionSize.y / 2
        },
        {
            x: 0,
            y: functionSize.y / 2
        },
        functionSize,
        canvasSize,
        context
    );
    const dy = functionSize.y / 10;
    for (let y = -functionSize.y / 2; y <= functionSize.y; y += dy) {
        if (y !== 0) {
            const canvasPoint = mapPoint({ x: 0, y }, functionSize, canvasSize);
            context.fillText(y, canvasPoint.x + 5, canvasPoint.y + 3);
        }
    }
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
    context.fillRect(canvasPoint.x, canvasPoint.y, 1, 1);
}

function drawLine(p0, p1, functionSize, canvasSize, context) {
    const cp0 = mapPoint(p0, functionSize, canvasSize);
    const cp1 = mapPoint(p1, functionSize, canvasSize);
    context.beginPath();
    context.moveTo(cp0.x, cp0.y);
    context.lineTo(cp1.x, cp1.y);
    context.stroke();
}

function mapPoint(p, functionSize, canvasSize) {
    return {
        x: p.x * canvasSize.x / functionSize.x + canvasSize.x / 2,
        y: p.y * canvasSize.y / -functionSize.y + canvasSize.y / 2,
    };
}

