import map from "../data/map1.json" assert { type: "json"};
import suggestions from "../data/suggestions.json" assert { type: "json"};

var floor = 2;
var ROW = 50;
var COL = 50;
var currentPath = [];
// positions: [x, y]
var origin = [];
var destination = [];
// structure for information of each cell
class cell {
    constructor(x, y, distance) {
        this.x = x;
        this.y = y;
        this.distance = distance;
    }
};

function check(i, j, grid) {
    return (i >= 0 && i < ROW && j >= 0 && j < COL && grid[i][j] != 0);
}


function shortest(grid, row, col, y1, x1, y2, x2) {
    let path = [];
    var dis = Array.from(Array(row), () => Array(col).fill(0));

    // initializing distance array by INT_MAX
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            dis[i][j] = 1000000000;
        }
    }

    // direction arrays
    var dx = [-1, 0, 1, 0];
    var dy = [0, 1, 0, -1];

    var st = [];

    // insert (0, 0) cell with 0 distance
    st.push(new cell(x1, y1, 0));

    // initialize distance of (0, 0) with its grid value
    dis[x1][y1] = grid[x1][y1];

    while (st.length!=0) {
    // get the cell with minimum distance and delete
    // it from the set
    var k = st[0];
    st.shift();

    // looping through all neighbours
    for (var i = 0; i < 4; i++) {
        var x = k.x + dx[i];
        var y = k.y + dy[i];

        // if not inside boundary, ignore them
        if (!check(x, y, grid))
        continue;

        // If distance from current cell is smaller, then
        // update distance of neighbour cell
        if (dis[x][y] > dis[k.x][k.y] + grid[x][y]) {
            // update the distance and insert new updated
            // cell in set
            dis[x][y] = dis[k.x][k.y] + grid[x][y];
            st.push(new cell(x, y, dis[x][y]));
        }
    }

    st.sort((a,b)=>{
        if (a.distance == b.distance){
            if (a.x != b.x) {
                return (a.x - b.x);
            } else {
                return (a.y - b.y);
            }
        }
        return (a.distance - b.distance);
    });
    }

  let  pos = [x2, y2];

    while(pos[0] != x1 || pos[1] != y1) {
        let minn = 1000000000;
        let temp;
        for (let j = 0; j < 4; j++) {
            let x = pos[0] + dx[j];
            let y = pos[1] + dy[j];
            // if not inside boundary, ignore them
            if (!check(x, y, grid)) {
                continue;
            }

            if(x == x1 && y == y1) {
                temp = [x1, y1];
                break;
            }

            if(dis[x][y] < minn) {
                minn = dis[x][y];
                temp = [x, y];
            }
        }
        pos = temp;

        path.push(pos);

    }

    return path;
}

const changeFloorUp = function() {
    if (floor < 6) {
        floor++;
        currentPath = [];
        document.getElementById("map-image").src = "assets/img/floor_" + floor + ".png";

        updateTable();
    }
}

const changeFloorDown = function() {
    if (floor > 1) {
        floor--;
        currentPath = [];
        document.getElementById("map-image").src = "assets/img/floor_" + floor + ".png";

        updateTable();
    }
}

function updateTable() {
    const origin = document.getElementById("searchbar-origin").value;
    const destination = document.getElementById("searchbar-origin").value;
    
    // origin = suggestions.find(item => item.id === origin).pos;
    // destination = suggestions.find(item => item.id === destination).pos;
    // need json

    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            let cell = document.getElementById("cell" + ((COL * i) + j));
            cell.style.backgroundColor = "";
        }
    }
    
    for (let i = 0; i < currentPath.length; i++) {
        document.getElementById("cell" + (COL * currentPath[i][0] + currentPath[i][1])).style.backgroundColor ="red";
    }
}

window.onload = () => {
    document.getElementById("search-button").addEventListener("click", function() {
        if (origin[0] === undefined) {
            alert("Enter an origin/destination!");
            return;
        }
        currentPath = shortest(map.content[floor-1], ROW, COL, origin[0], origin[1], destination[0], destination[1]);
        currentPath.reverse();
        currentPath.push([destination[1], destination[0]]);
        updateTable();
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
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
}