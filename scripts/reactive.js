var floor = 2;

changeFloorUp = function() {
    if (floor < 6) {
        floor++;
        document.getElementById("map-image").src = "assets/img/floor" + floor + ".png";
    }
}

changeFloorDown = function() {
    if (floor > 1) {
        floor--;
        document.getElementById("map-image").src = "asssets/img/floor" + floor + ".png";
    }
}

window.onload = () => {
    document.getElementById("search-button").addEventListener("click", function() {
        alert("Path found");
    });
    
    document.getElementById("path-clear").addEventListener("click", function() {
        alert("Path cleared");
    });

    document.getElementById("floor-up").addEventListener("click", changeFloorUp);
    document.getElementById("floor-down").addEventListener("click", changeFloorDown); 
}