// Javascript program to get least cost path in a grid from
// top-left to bottom-right
const ROW_COUNT = 50;
const COL_COUNT = 50;
const LAYER_COUNT = 6;

// structure for information of each Cell
class Cell {
  constructor(x, y, distance) {
    this.x = x;
    this.y = y;
    this.distance = distance;
  }

  constructor(x, y, z, distance) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.distance = distance;
  }
}

// Utility method to check whether a point is
// inside the grid or not
function check(i, j, grid, x1, y1, x2, y2)
{
  return (i >= 0 && i < ROW_COUNT && j >= 0 && j < COL_COUNT && grid[i][j] != 0);
}

function checkInGrid(i, j, k, arr, x1, y1, z1, x2, y2, z2) {
  return (i >= 0 && i < ROW_COUNT
    && j >= 0 && j < COL_COUNT
    && k >= 0 && k < LAYER_COUNT
    && grid[k][i][j] !== 0);
}


function shortest(grid, row, col, x1, y1, x2, y2)
{
  var dis = Array.from(Array(row), ()=>Array(col).fill(0));

  // initializing distance array by INT_MAX
  for (var i = 0; i < row; i++)
    for (var j = 0; j < col; j++)
      dis[i][j] = 1000000000;

  // direction arrays for simplification of getting
  // neighbour
  var dx = [-1, 0, 1, 0];
  var dy = [0, 1, 0, -1];

  var st = [];

  // insert (0, 0) Cell with 0 distance
  st.push(new Cell(x1, y1, 0));

  // initialize distance of (0, 0) with its grid value
  dis[x1][y1] = grid[x1][y1];

  // loop for standard dijkstra's algorithm
  while (st.length!=0)
  {
    // get the Cell with minimum distance and delete
    // it from the set
    var k = st[0];
    st.shift();

    // looping through all neighbours
    for (var i = 0; i < 4; i++)
    {
      var x = k.x + dx[i];
      var y = k.y + dy[i];

      // if not inside boundary, ignore them
      if (!check(x, y, grid))
        continue;

      // If distance from current Cell is smaller, then
      // update distance of neighbour Cell
      if (dis[x][y] > dis[k.x][k.y] + grid[x][y])
      {
        // update the distance and insert new updated
        // Cell in set
        dis[x][y] = dis[k.x][k.y] + grid[x][y];
        st.push(new Cell(x, y, dis[x][y]));
      }
    }
    st.sort((a,b)=>{
      if (a.distance == b.distance)
  {
    if (a.x != b.x)
      return (a.x - b.x);
    else
      return (a.y - b.y);
  }
  return (a.distance - b.distance);
    });
  }

  // for(let i = 0; i < 5; ++i)
  //   for(let j = 0; j < 5; ++j)
  //     document.write(dis[i][j] + " ");
  // uncomment below code to print distance
  // of each Cell from (0, 0)
  let  pos = [x2, y2];
  while(pos[0] != x1 || pos[1] != y1)
  {
    let minn = 1000000000;

    for (var j = 0; j < 4; j++)
    {
      var x = pos[0] + dx[j];
      var y = pos[1] + dy[j];

      // if not inside boundary, ignore them
      if (!check(x, y, grid))
        continue;
      
      if(x == x1 && y == y1)
      {
        temp = [x1, y1]
        break;
      }

      if(dis[x][y] < minn)
      {
        minn = dis[x][y]
        temp = [x, y]
      }
    }
    pos = temp

     document.write(pos[0] + " " + pos[1] + " --> ")

   }
  
  // dis[row - 1][col - 1] will represent final
  // distance of bottom right Cell from top left Cell
  return dis[x2][y2];
}

function shortestPath(arr, floor, row, col, x1, y1, z1, x2, y2, z2) {
  let dist = Array.from(Array(floor), () => Array.from(Array(row), ()=>Array(col).fill(0)))

  console.log(dist);
}

// Driver code to test above methods
// var grid =
// [
//   [1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 0],
//   [1, 1, 1, 1, 0],
//   [1, 1, 0, 1, 0],
//   [0, 1, 0, 1, 1]
// ];
// document.write(shortest(grid, ROW_COUNT, COL_COUNT, 1, 0, 3, 3));

// This code is contributed by rutvik_56.


