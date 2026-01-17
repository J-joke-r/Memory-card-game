export const WinMessage = ({moves}) => {
    return(
        <div className ="win-message">
            <h2>Congratulations! You've matched all the cards!</h2>
            <p>you completed the game in {moves} moves!</p>
        </div>
    );
};