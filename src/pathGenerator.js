class PathGenerator {
  /**
   * @param {Array} start - The start point [X, Y]
   * @param {Array} end - The end point [X, Y]
   * @param {Array} map - The map matrix. ex: [[0,0,0], [0,1,0], [0,1,0]]
   */
  constructor(start, end, map) {
    this.start = start
    this.end = end
    this.map = map
    this.cells = []
    this.path = []
    this.currentCell = undefined
  }

  calculateDistance(x, y) {
    let diffY = Math.abs(y - this.end[1])
    let diffX = Math.abs(x - this.end[0])
    return diffX + diffY
  }

  isCurrentCell (x, y) {
    return (y === 0 && x === 0)
  }

  isValidCell(nextX, nextY) {
    return this.map[nextY] && this.map[nextY][nextX] === 0
  }

  isProcessedCell(x, y) {
    return this.cells.find(cell => cell.x === x && cell.y === y)
  }

  generate() {
    this.cells.push({
      processed: 1,
      x: this.start[0],
      y:  this.start[1],
      pathId: 0,
      cost: 9999
    })
    this.currentCell = this.cells[0]
    try {
      this.findPath()
      let lastNode = this.cells.filter(cell => cell.cost < 1)[0]
      this.path = []
      for(;;) {
        this.path.push(lastNode)
        if (lastNode.parent) {
          lastNode = lastNode.parent
        } else {
          break
        }
      }
    }
    catch (e) {
      console.log('no result')
      return 1
    }
  }

  findPath() {
    for(;;) {
      for (let y = -1; y < 2; y++) {
        for (let x = -1; x < 2; x++) {
          let posY = this.currentCell.y + y
          let posX = this.currentCell.x + x
          if (!this.isCurrentCell(x, y) && this.isValidCell(posX, posY) && !this.isProcessedCell(posX, posY)) {
            let item = {
              parent: this.currentCell,
              processed: 0,
              x: posX,
              y: posY,
              pathId: this.currentCell.pathId + 1,
              cost: this.calculateDistance(posX, posY)
            }
            if (Math.abs(x) === Math.abs(y)) { // if diagonal
              item.pathId += 0.5
            }
            this.cells.push(item)
          }
        }
      }
      let cells = this.cells.filter(x => !x.processed).sort((a, b) => ((a.cost + a.pathId) - (b.cost + b.pathId)))
      this.currentCell = cells[0]
      this.currentCell.processed = 1
      if (this.currentCell.cost < 1) {
        break
      }
    }
  }
}

export default PathGenerator
