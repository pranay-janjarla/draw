// const canvas = document.getElementById('drawingCanvas');
// const context = canvas.getContext('2d');
// const brushSizeInput = document.getElementById('brushSize');
// const colorPicker = document.getElementById('colorPicker');
// const backgroundColorPicker = document.getElementById('backgroundColorPicker');
// const drawingModeSelect = document.getElementById('drawingMode');
// const eraseAllButton = document.getElementById('eraseAll');
// const hamburgerBtn = document.getElementById('hamburger-btn');
// const controls = document.getElementById('controls');

// let isDrawing = false;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });

// canvas.addEventListener('mousedown', startDrawing);
// canvas.addEventListener('mousemove', draw);
// canvas.addEventListener('mouseup', stopDrawing);
// canvas.addEventListener('mouseout', stopDrawing);

// brushSizeInput.addEventListener('input', updateBrushSize);
// colorPicker.addEventListener('input', updateColor);
// backgroundColorPicker.addEventListener('input', updateBackgroundColor);
// drawingModeSelect.addEventListener('change', updateMode);
// eraseAllButton.addEventListener('click', eraseAll);

// hamburgerBtn.addEventListener('click', toggleControls);

// function startDrawing(e) {
//     if (e.target.tagName.toLowerCase() === 'button') {
//         return; // Ignore clicks on buttons
//     }

//     isDrawing = true;
//     if (drawingModeSelect.value === 'erase') {
//         context.globalCompositeOperation = 'destination-out';
//         context.beginPath();
//         context.arc(e.clientX, e.clientY, brushSizeInput.value / 2, 0, 2 * Math.PI);
//         context.fill();
//         context.closePath();
//     } else {
//         context.globalCompositeOperation = 'source-over';
//         context.beginPath();
//         context.moveTo(e.clientX, e.clientY);
//     }
// }

// function draw(e) {
//     if (!isDrawing) return;

//     const x = e.clientX;
//     const y = e.clientY;

//     if (drawingModeSelect.value === 'draw') {
//         context.strokeStyle = colorPicker.value;
//         context.lineWidth = brushSizeInput.value;
//         context.lineTo(x, y);
//         context.stroke();
//     } else if (drawingModeSelect.value === 'erase') {
//         context.clearRect(x - brushSizeInput.value / 2, y - brushSizeInput.value / 2, brushSizeInput.value, brushSizeInput.value);
//     }
// }

// function stopDrawing() {
//     isDrawing = false;
// }

// function updateBrushSize() {
//     if (drawingModeSelect.value === 'erase') {
//         context.globalCompositeOperation = 'destination-out';
//         context.fillStyle = backgroundColorPicker.value;
//     } else {
//         context.globalCompositeOperation = 'source-over';
//         context.strokeStyle = colorPicker.value;
//         context.fillStyle = colorPicker.value;
//     }
//     context.lineWidth = brushSizeInput.value;
// }

// function updateColor() {
//     if (drawingModeSelect.value === 'draw') {
//         context.strokeStyle = colorPicker.value;
//         context.fillStyle = colorPicker.value;
//     }
// }

// function updateBackgroundColor() {
//     canvas.style.backgroundColor = backgroundColorPicker.value;
// }

// function updateMode() {
//     // Not needed for seamless line drawing
// }

// function eraseAll() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
// }

// function toggleControls() {
//     controls.style.display = (controls.style.display === 'none' || controls.style.display === '') ? 'flex' : 'none';
// }

const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const brushSizeInput = document.getElementById('brushSize');
const colorPicker = document.getElementById('colorPicker');
const backgroundColorPicker = document.getElementById('backgroundColorPicker');
const drawingModeSelect = document.getElementById('drawingMode');
const eraseAllButton = document.getElementById('eraseAll');
const hamburgerBtn = document.getElementById('hamburger-btn');
const controls = document.getElementById('controls');

let isDrawing = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', stopDrawing);

brushSizeInput.addEventListener('input', updateBrushSize);
colorPicker.addEventListener('input', updateColor);
backgroundColorPicker.addEventListener('input', updateBackgroundColor);
drawingModeSelect.addEventListener('change', updateMode);
eraseAllButton.addEventListener('click', eraseAll);

hamburgerBtn.addEventListener('click', toggleControls);

function startDrawing(e) {
    e.preventDefault(); // Prevent default action for mobile

    if (e.target.tagName.toLowerCase() === 'button') {
        return; // Ignore clicks on buttons
    }

    isDrawing = true;
    const { x, y } = getMousePos(e);
    if (drawingModeSelect.value === 'erase') {
        erase(x, y);
    } else {
        context.globalCompositeOperation = 'source-over';
        context.beginPath();
        context.moveTo(x, y);
    }
}

function draw(e) {
    e.preventDefault(); // Prevent default action for mobile

    if (!isDrawing) return;

    const { x, y } = getMousePos(e);

    if (drawingModeSelect.value === 'draw') {
        context.strokeStyle = colorPicker.value;
        context.lineWidth = brushSizeInput.value;
        context.lineTo(x, y);
        context.stroke();
    } else if (drawingModeSelect.value === 'erase') {
        erase(x, y);
    }
}

function erase(x, y) {
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, brushSizeInput.value / 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    if (e.target.tagName.toLowerCase() === 'button') {
        return; // Ignore touches on buttons
    }

    e.preventDefault(); // Prevent default action for mobile

    isDrawing = true;
    const { x, y } = getTouchPos(e);
    if (drawingModeSelect.value === 'erase') {
        erase(x, y);
    } else {
        context.globalCompositeOperation = 'source-over';
        context.beginPath();
        context.moveTo(x, y);
    }
}

function handleTouchMove(e) {
    if (!isDrawing) return;

    const { x, y } = getTouchPos(e);

    if (drawingModeSelect.value === 'draw') {
        context.strokeStyle = colorPicker.value;
        context.lineWidth = brushSizeInput.value;
        context.lineTo(x, y);
        context.stroke();
    } else if (drawingModeSelect.value === 'erase') {
        erase(x, y);
    }
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function getTouchPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
    };
}

function updateBrushSize() {
    if (drawingModeSelect.value === 'erase') {
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = backgroundColorPicker.value;
    } else {
        context.globalCompositeOperation = 'source-over';
        context.strokeStyle = colorPicker.value;
        context.fillStyle = colorPicker.value;
    }
    context.lineWidth = brushSizeInput.value;
}

function updateColor() {
    if (drawingModeSelect.value === 'draw') {
        context.strokeStyle = colorPicker.value;
        context.fillStyle = colorPicker.value;
    }
}

function updateBackgroundColor() {
    canvas.style.backgroundColor = backgroundColorPicker.value;
}

function updateMode() {
    // Not needed for seamless line drawing
}

function eraseAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// function toggleControls() {
//     controls.style.display = (controls.style.display === 'none' || controls.style.display === '') ? 'flex' : 'none';
// }
function toggleControls() {
    const isControlsVisible = controls.style.display === 'flex' || controls.style.display === '';

    if (isControlsVisible) {
        // Controls are visible, hide them and make them smaller
        controls.style.display = 'none';
        controls.style.width = '50px'; // Adjust the width as needed
    } else {
        // Controls are hidden, show them and make them larger
        controls.style.display = 'flex';
        controls.style.width = '100%'; // Adjust the width as needed
    }
}
