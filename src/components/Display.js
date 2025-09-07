const Display = ({ gameOver, text }) => (
  <div className={`text-lg ${gameOver ? 'text-red-500 font-bold' : 'text-gray-300'}`}>
    <span className="font-medium">{text.split(':')[0]}:</span>
    {text.includes(':') && <span className="ml-2 font-bold">{text.split(':')[1]}</span>}
  </div>
);

export default Display;