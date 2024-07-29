import { useState } from "react";

function Cell({
	val,
	onClick,
	disabled,
	colored,
}: {
	val?: "x" | "o";
	onClick: () => void;
	disabled: boolean;
	colored: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className={`${colored ? "bg-emerald-200" : "bg-gray-200"} text-4xl min-w-10 min-h-10 p-auto`}
			disabled={disabled}
		>
			{val ? val : ""}
		</button>
	);
}

export default function App() {
	const [board, setBoard] = useState<Array<"x" | "o" | undefined>>(
		Array(9).fill(undefined),
	);
	const [cellsColored, setCellsColored] = useState<Array<number>>(
		Array(3).fill(false),
	);

	const [xTurn, setXTurn] = useState(false);

	const [p1, setP1] = useState("");
	const [p2, setP2] = useState("");
	const [winner, setWinner] = useState<string | undefined>(undefined);

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
				setCellsColored([x, y, z]);
				setWinner(p2 || "x");
				return;
			} else if (b[x] === "o" && b[y] === "o" && b[z] === "o") {
				setCellsColored([x, y, z]);
				setWinner(p1 || "o");
				return;
			}
		}

		if (!winner && b.every((v) => v === "o" || v === "x")) {
			setWinner("Nobody");
		}
	};

	return (
		<>
			<h1 className="text-red-500 text-center text-5xl my-4">Tic Tac Toe</h1>
			<main>
				<div className="flex justify-between p-4  mx-auto">
					<label>
						Player O:{" "}
						<input
							disabled={!!winner}
							className="outline outline-1"
							type="text"
							onBlur={(e) => setP1(e.target.value)}
						/>
					</label>
					<label>
						Player X:{" "}
						<input
							disabled={!!winner}
							className="outline outline-1"
							type="text"
							onBlur={(e) => setP2(e.target.value)}
						/>
					</label>
				</div>
				<div className="grid grid-rows-3 grid-cols-3 w-1/2 m-auto gap-3">
					{board.map((v, i) => (
						<Cell
							key={i}
							val={v}
							disabled={winner ? true : false}
							onClick={() => handleClick(i)}
							colored={cellsColored.includes(i)}
						/>
					))}
				</div>
				{winner && (
					<div className="my-3  text-center min-w-full bg-red-400">
						<h2 className="text-2xl my-3">{winner} won!</h2>
						<button
							className="text-lg bg-yellow-200 p-3 my-3 transition-all hover:outline hover:outline-black"
							onClick={() => {
								setBoard(Array(9).fill(undefined));
								setWinner(undefined);
								setCellsColored([]);
								setXTurn(false);
							}}
						>
							reset
						</button>
					</div>
				)}
			</main>
		</>
	);
}
