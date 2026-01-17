export const GameHeader = ({score, moves, onReset}) => {
    return<div className="game-header">
        <h1>Memory Card Game</h1>
        <div className="stats">
            <div className="start-item">
                <span className="stat-label">Score:</span>
                <span className="start-value">{score}</span>
            </div>
            <div className="start-item">
                <span className="stat-label">Moves:</span>
                <span className="sart-value">{moves}</span>
            </div>
        </div>
        <button className="reset-btn" onClick={onReset}>New game</button>
    </div>
}