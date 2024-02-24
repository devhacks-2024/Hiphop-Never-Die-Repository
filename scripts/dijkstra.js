
// Javascript program to get least cost path in a grid from
// top-left to bottom-right
var ROW = 5
var COL = 5

// structure for information of each cell
class cell
{
  constructor(x, y, distance)
  {
    this.x = x;
    this.y = y;
    this.distance = distance;
  }
};


// Utility method to check whether a point is
// inside the grid or not
function check(i, j, grid, x1, y1, x2, y2)
{
  return (i >= 0 && i < ROW && j >= 0 && j < COL && grid[i][j] != 0);
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

  // insert (0, 0) cell with 0 distance
  st.push(new cell(x1, y1, 0));

  // initialize distance of (0, 0) with its grid value
  dis[x1][y1] = grid[x1][y1];

  // loop for standard dijkstra's algorithm
  while (st.length!=0)
  {
    // get the cell with minimum distance and delete
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

      // If distance from current cell is smaller, then
      // update distance of neighbour cell
      if (dis[x][y] > dis[k.x][k.y] + grid[x][y])
      {
        // update the distance and insert new updated
        // cell in set
        dis[x][y] = dis[k.x][k.y] + grid[x][y];
        st.push(new cell(x, y, dis[x][y]));
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
  // of each cell from (0, 0)
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
  // distance of bottom right cell from top left cell
  return dis[x2][y2];
}

// Driver code to test above methods
var grid =
[
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [0, 1, 0, 1, 1]
];
document.write(shortest(grid, ROW, COL, 1, 0, 3, 3));

// This code is contributed by rutvik_56.


