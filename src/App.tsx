import { useState } from "react";

function Cell({
  val,
  onClick,
  disabled,
}: {
  val?: "x" | "o";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 text-4xl min-w-10 min-h-10"
      disabled={disabled}
    >
      {val ? val : ""}
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState<Array<"x" | "o" | undefined>>(
    Array(9).fill(null),
  );

  const [xTurn, setXTurn] = useState(false);

  const [winner, setWinner] = useState<"x" | "o" | undefined>(undefined);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const b = board.slice();
    b[i] = xTurn ? "x" : "o";
    setXTurn(!xTurn);
    setBoard(b);

    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ] as const;

    for (let i = 0; i < winningLines.length; i++) {
      const [x, y, z] = winningLines[i];
      if (b[x] === "x" && b[y] === "x" && b[z] === "x") {
        setWinner("x");
      } else if (b[x] === "o" && b[y] === "o" && b[z] === "o") {
        setWinner("o");
      }
    }
  };

  return (
    <>
      <h1 className="text-red-500 text-center text-5xl my-4">Tic Tac Toe</h1>
      <main>
        <div className="grid grid-rows-3 grid-cols-3 w-1/2 m-auto gap-3">
          {board.map((v, i) => (
            <Cell
              key={i}
              val={v}
              disabled={winner ? true : false}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
