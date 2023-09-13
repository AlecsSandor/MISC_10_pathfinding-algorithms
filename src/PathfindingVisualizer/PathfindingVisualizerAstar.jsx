import React from 'react'
import Node from './Node/Node'
import { aStar, getNodesInShortestPathOrder } from '../algorithms/aStar'
import './PathfindingVisualizer.css'

import { useEffect } from 'react'
import { useState } from 'react'

const START_NODE_ROW = 3
const START_NODE_COL = 8
const FINISH_NODE_ROW = 22
const FINISH_NODE_COL = 24

const PathfindingVisualizerAstar = () => {

    const [grid, setGrid] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false)

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(grid, row, col)
        setGrid(newGrid)
        setMouseIsPressed(true)
    }

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid)
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false)
    }

    const animateaStar = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}-astar`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}-astar`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    const visualizeaStar = () => {
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = aStar(grid);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateaStar(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    const getInitialGrid = () => {
        const grid = []
        for (let row = 0; row < 25; row++) {
            const currentRow = []
            for (let col = 0; col < 30; col++) {
                currentRow.push(createNode(col, row))
            }
            grid.push(currentRow)
        }
        return grid
    }

    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        }
    }

    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    useEffect(() => {
        const grid = getInitialGrid()
        setGrid(grid)
    }, [])

    return (
        <div style={{ width: '100%'}} id='Astar'>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 50px', alignItems: 'center' }}>
                <div className='grid' id='grid-astar'>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { isStart, isFinish, row, col, isWall } = node
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            alg={'astar'}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            col={col}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                            onMouseUp={() => handleMouseUp()}
                                            row={row}>
                                        </Node>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
                <button onClick={() => visualizeaStar()} style={{margin: '20px 20px', maxWidth: '200px'}} className='runButton'>
                    Run A* Algorithm
                </button>
            </div>
        </div>
    )
}

export default PathfindingVisualizerAstar
