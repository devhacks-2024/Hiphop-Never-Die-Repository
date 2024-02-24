// import arrData from "../data/map1.json" assert { type: "json" };

// // Javascript program to get least cost path in a grid from
// // top-left to bottom-right
// const ROW_COUNT = 50;
// const COL_COUNT = 50;
// const LAYER_COUNT = 6;
// const arr = arrData.content;

// class Cell {
//   constructor(x, y, z, distance) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.distance = distance;
//   }
// }

// function checkInMap(z, y, x, arr) {
//   return (
//     x >= 0 &&
//     x < COL_COUNT &&
//     y >= 0 &&
//     y < ROW_COUNT &&
//     z >= 0 &&
//     z < LAYER_COUNT &&
//     arr[z][y][x] !== 0
//   );
// }

// function shortestPath(arr, floor, row, col, x1, y1, z1, x2, y2, z2) {
//     const path = [];
  
//     const dist = Array.from(Array(floor), () =>
//       Array.from(Array(row), () => Array(col).fill(Infinity))
//     );
  
//     const directionX = [-1, 0, 0, 1, 0, 0];
//     const directionY = [0, 1, 0, 0, -1, 0];
//     const directionZ = [0, 0, 1, 0, 0, -1];
  
//     const nodeList = [];
  
//     nodeList.push(new Cell(x1, y1, z1, 0));
  
//     dist[z1][y1][x1] = arr[z1][y1][x1];
  
//     while (nodeList.length !== 0) {
//       const minDistNode = nodeList[0];
//       nodeList.shift();
  
//       for (let i = 0; i < 6; i++) {
//         const xNeighbor = minDistNode.x + directionX[i];
//         const yNeighbor = minDistNode.y + directionY[i];
//         const zNeighbor = minDistNode.z + directionZ[i];
  
//         if (!checkInMap(zNeighbor, yNeighbor, xNeighbor, arr)) {
//           continue;
//         }
  
//         const currTileValue = arr[minDistNode.z][minDistNode.y][minDistNode.x];
  
//         switch (currTileValue) {
//           case 1:
//             if (directionZ[i] === 0) {
//               updateNodeList(
//                 nodeList,
//                 dist,
//                 minDistNode,
//                 xNeighbor,
//                 yNeighbor,
//                 zNeighbor,
//                 1
//               );
//             }
//             break;
  
//           case 2:
//             if (
//               arr[zNeighbor][yNeighbor][xNeighbor] === 2 || // Next tile is a stair
//               directionZ[i] === 0 // Or we're moving in the x-y plane
//             ) {
//               updateNodeList(
//                 nodeList,
//                 dist,
//                 minDistNode,
//                 xNeighbor,
//                 yNeighbor,
//                 zNeighbor,
//                 1
//               );
//             }
  
//             // Check diagonal movements if we're moving up or down
//             if (directionZ[i] !== 0) {
//               for (let j = 0; j < 4; j++) {
//                 // Only check left, right, forward, backward
//                 const xDiagonal = xNeighbor + directionX[j];
//                 const yDiagonal = yNeighbor + directionY[j];
//                 const zDiagonal = zNeighbor;
  
//                 if (
//                   xDiagonal >= 0 &&
//                   xDiagonal < col &&
//                   yDiagonal >= 0 &&
//                   yDiagonal < row &&
//                   zDiagonal >= 0 &&
//                   zDiagonal < floor &&
//                   arr[zDiagonal][yDiagonal][xDiagonal] === 2
//                 ) {
//                   updateNodeList(
//                     nodeList,
//                     dist,
//                     minDistNode,
//                     xDiagonal,
//                     yDiagonal,
//                     zDiagonal,
//                     1
//                   );
//                 }
//               }
//             }
//             break;
  
//           case 3:
//             // TODO: implement elevator logic
//             break;
  
//           default:
//             break;
//         }
//       }
  
//       nodeList.sort((a, b) => {
//         if (a.distance === b.distance) {
//           if (a.z !== b.z) {
//             return a.z - b.z;
//           } else if (a.y !== b.y) {
//             return a.y - b.y;
//           } else {
//             return a.x - b.x;
//           }
//         }
  
//         return a.distance - b.distance;
//       });
//     }
  
//     let goal = [x2, y2, z2];
  
//     while (!(goal[0] === x1 && goal[1] === y1 && goal[2] === z1)) {
//       let minDist = Infinity;
//       let nextGoal = [...goal];
  
//       for (let i = 0; i < 6; i++) {
//         const xNeighbor = goal[0] + directionX[i];
//         const yNeighbor = goal[1] + directionY[i];
//         const zNeighbor = goal[2] + directionZ[i];
  
//         if (
//           xNeighbor >= 0 &&
//           xNeighbor < col &&
//           yNeighbor >= 0 &&
//           yNeighbor < row &&
//           zNeighbor >= 0 &&
//           zNeighbor < floor &&
//           dist[zNeighbor][yNeighbor][xNeighbor] < minDist &&
//           (arr[goal[2]][goal[1]][goal[0]] === 2 || directionZ[i] === 0) // Current tile is a stair or we're moving in the x-y plane
//         ) {
//           minDist = dist[zNeighbor][yNeighbor][xNeighbor];
//           nextGoal = [xNeighbor, yNeighbor, zNeighbor];
//         }
  
//         // Check diagonal movements if we're on a stair
//         if (arr[goal[2]][goal[1]][goal[0]] === 2 && directionZ[i] !== 0) {
//           for (let j = 0; j < 4; j++) {
//             // Only check left, right, forward, backward
//             const xDiagonal = xNeighbor + directionX[j];
//             const yDiagonal = yNeighbor + directionY[j];
//             const zDiagonal = zNeighbor;
  
//             if (
//               xDiagonal >= 0 &&
//               xDiagonal < col &&
//               yDiagonal >= 0 &&
//               yDiagonal < row &&
//               zDiagonal >= 0 &&
//               zDiagonal < floor &&
//               dist[zDiagonal][yDiagonal][xDiagonal] < minDist
//             ) {
//               minDist = dist[zDiagonal][yDiagonal][xDiagonal];
//               nextGoal = [xDiagonal, yDiagonal, zDiagonal];
//             }
//           }
//         }
//       }
  
//       goal = nextGoal;
//       path.push(goal);
//     }
    
//     for (let sex of path) {
//         console.log(50 * sex[0] + sex[1]);
//     }
//     return path;
//   }

// function updateNodeList(
//   nodeList,
//   dist,
//   currNode,
//   xNeighbor,
//   yNeighbor,
//   zNeighbor,
//   additionalDistance
// ) {
//   if (
//     dist[zNeighbor][yNeighbor][xNeighbor] >
//     dist[currNode.z][currNode.y][currNode.x] + additionalDistance
//   ) {
//     dist[zNeighbor][yNeighbor][xNeighbor] =
//       dist[currNode.z][currNode.y][currNode.x] + additionalDistance;
//     nodeList.push(
//       new Cell(
//         xNeighbor,
//         yNeighbor,
//         zNeighbor,
//         dist[zNeighbor][yNeighbor][xNeighbor]
//       )
//     );
//   }
// }

// shortestPath(arr, LAYER_COUNT, ROW_COUNT, COL_COUNT, 43, 35, 1, 14, 20, 1);
