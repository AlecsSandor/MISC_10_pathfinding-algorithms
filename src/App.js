import './App.css';
import PathfindingVisualizerDijkstra from './PathfindingVisualizer/PathfindingVisualizerDijkstra';
import PathfindingVisualizerAstar from './PathfindingVisualizer/PathfindingVisualizerAstar';

function App() {

  const handleRefreshClick = () => {
    // Refresh the entire page
    window.location.reload();
  };

  return (
    <div className="App">
        <div style={{ position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: '17px', padding: '20px' }}>Pathfinding Algorithms Vizualizer</div>
        <PathfindingVisualizerAstar></PathfindingVisualizerAstar>
        <PathfindingVisualizerDijkstra></PathfindingVisualizerDijkstra>
        <button onClick={() => handleRefreshClick()} style={{margin: '20px 20px', maxWidth: '200px'}} className='runButton absCenter'>
        Refresh
        </button>
        <div style={{color: 'white', position: 'absolute', margin: '20px', bottom: '1px', fontSize: '12px'}}>*Click and drag to draw walls</div>
    </div>
  );
}

export default App;
