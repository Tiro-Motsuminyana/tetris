const StartButton = ({ callback }) => (
    <button className="m-2 px-10 py-5 box-border rounded-2xl border-none text-white bg-black font-bold text-lg cursor-pointer" onClick={callback}>
      Start Game
    </button>
  );
  
  export default StartButton;