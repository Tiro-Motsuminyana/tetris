const StartButton = ({ callback }) => (
  <button
    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded transition-colors"
    onClick={callback}
  >
    Start Game
  </button>
);

export default StartButton;