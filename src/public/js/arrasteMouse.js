// Selecione a div que você deseja tornar arrastável
const draggableDiv = document.getElementById("myDiv");

let offsetX, offsetY;
let isDragging = false;

// Event listeners para iniciar o arraste quando o mouse é pressionado ou o dedo toca a div
draggableDiv.addEventListener("mousedown", startDragging);
draggableDiv.addEventListener("touchstart", startDragging);

// Função para iniciar o arraste
function startDragging(e) {
    
    isDragging = true;
    offsetX = getClientX(e) - draggableDiv.offsetLeft;
    offsetY = getClientY(e) - draggableDiv.offsetTop;
    draggableDiv.style.cursor = "grabbing";

    // Adicionar event listeners para continuar o arraste e parar o arraste
    document.addEventListener("mousemove", whileDragging);
    document.addEventListener("touchmove", whileDragging);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);
}

// Função para obter a posição X do evento (mouse ou toque)
function getClientX(e) {
    if (e.type === "touchmove" || e.type === "touchstart") {
        return e.touches[0].clientX;
    } else {
        return e.clientX;
    }
}

// Função para obter a posição Y do evento (mouse ou toque)
function getClientY(e) {
    if (e.type === "touchmove" || e.type === "touchstart") {
        return e.touches[0].clientY;
    } else {
        return e.clientY;
    }
}

// Função para mover a div enquanto o mouse ou o dedo estão sendo arrastados
function whileDragging(e) {
    if (isDragging) {
        // Calcular as coordenadas de posicionamento
        let x = getClientX(e) - offsetX;
        let y = getClientY(e) - offsetY;

        // Evitar que a div seja arrastada para fora da página (no eixo x)
        const maxX = window.innerWidth - draggableDiv.offsetWidth;
        x = Math.max(0, Math.min(x, maxX));

        // Evitar que a div seja arrastada para fora da página (no eixo y)
        const maxY = window.innerHeight - draggableDiv.offsetHeight;
        y = Math.max(0, Math.min(y, maxY));

        // Atualizar as coordenadas de posicionamento da div
        draggableDiv.style.left = `${x}px`;
        draggableDiv.style.top = `${y}px`;
    }
}

// Função para parar o arraste
function stopDragging() {
    isDragging = false;
    draggableDiv.style.cursor = "grab";

    // Remover os event listeners de arraste e parada do evento
    document.removeEventListener("mousemove", whileDragging);
    document.removeEventListener("touchmove", whileDragging);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchend", stopDragging);
}


