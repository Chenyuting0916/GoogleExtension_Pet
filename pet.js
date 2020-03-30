var image = document.createElement("img");
image.src = chrome.extension.getURL("pet_image/1r.png");
image.id='drag-source';
image.style="position:absolute;";
document.getElementsByTagName("body")[0].appendChild(image);

drag();

function drag(){
    let dragSouce = document.querySelector('#drag-source');
    let startX = 0;
    let startY = 0;

    dragSouce.addEventListener('mousedown', dragStart);

    function dragStart(e) {
        e.preventDefault();
        //記錄點擊相對被點擊物件的座標
        startX = e.clientX - dragSouce.offsetLeft;
        startY = e.clientY - dragSouce.offsetTop;
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', stop);
    }
    function move(e) {
        //計算出拖曳物件最左上角座標
        x = e.clientX - startX;
        y = e.clientY - startY;
        dragSouce.style.left = x + 'px';
        dragSouce.style.top = y + 'px';
    }

    function stop() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stop)
    }
}
