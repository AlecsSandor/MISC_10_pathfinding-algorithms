import React from 'react'

import './Node.css'

const Node = ({ isStart, isFinish, isWall, col, onMouseDown, onMouseEnter, onMouseUp, row, alg }) => {

    const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    :''

  return (
    <div 
        id={`node-${row}-${col}-${alg}`}
        className={`node ${extraClassName} ${alg}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
    >
      
    </div>
  )
}

export default Node
