const Display = ({ gameOver, text }) => (
    <div className={`flex items-center justify-start m-2 px-5 py-4 border-4 border-gray-500 rounded-2xl text-white bg-black ${gameOver ? 'text-red-500' : 'text-white'}`}>
      {text}
    </div>
  );
  
  export default Display;