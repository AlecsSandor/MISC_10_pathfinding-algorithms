var allVisitedNodes = []
var finalPath = []

class GridNode {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.g = 0 // Cost from the start node to this node
    this.h = 0 // Estimated cost from this node to the goal node (heuristic)
    this.f = 0 // Total cost (g + h)
    this.parent = null
    this.isWall = false
  }
}

class AStar {
  constructor(row, col) {
    this.row = row
    this.col = col
    this.grid = this.initializeGrid()
  }

  initializeGrid() {
    const grid = []
    for (let x = 0; x < this.row; x++) {
      const row = []
      for (let y = 0; y < this.col; y++) {
        row.push(new GridNode(x, y))
      }
      grid.push(row)
    }
    return grid
  }

  getNeighbors(node) {
    const { x, y } = node
    const neighbors = []
    if (x > 0) neighbors.push(this.grid[x - 1][y])
    if (x < this.row - 1) neighbors.push(this.grid[x + 1][y])
    if (y > 0) neighbors.push(this.grid[x][y - 1])
    if (y < this.col - 1) neighbors.push(this.grid[x][y + 1])
    return neighbors
  }

  heuristic(node, goal) {
    // A simple heuristic, like Manhattan distance
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y)
  }

  findPath(start, goal) {
    const openSet = [start]
    const closedSet = []

    while (openSet.length > 0) {
      const current = openSet.reduce((minNode, node) =>
        node.f < minNode.f ? node : minNode
      )

      if (current === goal) {
        const path = []
        let node = current
        while (node !== null) {
          path.unshift(node)
          node = node.parent
        }
        finalPath = path
        return path
      }

      openSet.splice(openSet.indexOf(current), 1)
      closedSet.push(current)
      allVisitedNodes.push(current)

      const neighbors = this.getNeighbors(current)
      for (const neighbor of neighbors) {
        if (neighbor.isWall || closedSet.includes(neighbor)) continue

        const tentativeGScore = current.g + 1
        if (!openSet.includes(neighbor) || tentativeGScore < neighbor.g) {
          neighbor.parent = current
          neighbor.g = tentativeGScore
          neighbor.h = this.heuristic(neighbor, goal)
          neighbor.f = neighbor.g + neighbor.h

          if (!openSet.includes(neighbor)) openSet.push(neighbor)
        }
      }
    }

    return null // No path found
  }
}

// Example usage:
const row = 25
const col = 30
const astar = new AStar(row, col)

const startNode = astar.grid[3][8]
const goalNode = astar.grid[22][24]

// Convert nodes to an array of lists containing the coordinates of the nodes
const convertToCoordinates = (nodes) => {
  var listPath = []
  for (let i = 0; i < nodes.length; i++) {
    let coordinates = { row: nodes[i].x, col: nodes[i].y }
    listPath.push(coordinates)
  }
  return listPath
}

export const aStar = (grid) => {

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j].isWall) {
                
                astar.grid[i][j].isWall = grid[i][j].isWall
            }
        }
    }
  
  const path = astar.findPath(startNode, goalNode)
  return convertToCoordinates(allVisitedNodes)
}

export const getNodesInShortestPathOrder = () => {
  return convertToCoordinates(finalPath)
}

