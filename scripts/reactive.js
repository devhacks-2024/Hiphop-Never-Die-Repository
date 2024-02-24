import map from "../data/map1.json" assert { type: "json"};

var floor = 2;

const changeFloorUp = function() {
    if (floor < 6) {
        floor++;
        document.getElementById("map-image").src = "assets/img/floor_" + floor + ".png";

        updateTable();
    }
}

const changeFloorDown = function() {
    if (floor > 1) {
        floor--;
        document.getElementById("map-image").src = "assets/img/floor_" + floor + ".png";

        updateTable();
    }
}

function updateTable() {
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            document.getElementById("cell" + ((50 * i) + j)).innerHTML = 
                map.content[floor - 1][i][j] == 1 ? "." : "";
        }
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

    let table = document.getElementById("grid");
    let tbody = document.createElement("tbody");

    for (let i = 0; i < 50; i++) {
        let row = document.createElement("tr");
        row.id = "row" + i;
        for (let j = 0; j < 50; j++) {
            let cell = document.createElement("td");
            cell.id = "cell" + ((50 * i) + j);
            cell.innerHTML = map.content[floor - 1][i][j];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
}