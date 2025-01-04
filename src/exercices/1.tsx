/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import { calculateNextValue, calculateStatus } from "../lib/tictactoe/helpers";

// 🦁 Supprime ce commentaire et définis correctement les types pour ce composant
type SquareProps = {
  isWinningSquare?: boolean;
} & ComponentPropsWithoutRef<"button">;

const Square = ({ isWinningSquare, children, ...props }: SquareProps) => {
  // 🦁 Remplace ça par les props définies en haut
  return (
    <button
      className={clsx("square", {
        "winning-square": isWinningSquare, // 🦁 Remplace ça par la prop isWinningSquare
      })}
      {...props}
    >
      {children} {/* 🦁 Remplace ça par la prop children */}
    </button>
  );
};

type squareValue = "O" | "X" | null;

type BoardProps = {
  // ...
  squares: squareValue[];
  winningSquares?: number[];
  onClick?: (index: number) => void;
};
const Board = ({ squares, onClick, winningSquares }: BoardProps) => {
  return (
    <div className="game-board">
      {squares.map((square, i) => (
        <Square
          onClick={() => onClick?.(i)}
          key={i}
          isWinningSquare={winningSquares?.includes(i)}
        >
          {square}
        </Square>
      ))}
    </div>
  );
};

const getDefaultSquares = (): SquareValue[] => [
  null,
  null,
  null,
  null,
  null,
  null,
  "O",
  null,
  "X",
];

type GameInfoProps = { status: string };

const GameInfo = ({ status, userNames }: GameInfoProps) => {
  return (
    <div className="game-info">
      <div>{status}</div>
    </div>
  );
};

const Game = () => {
  const squares = getDefaultSquares();
  const nextPlayer = calculateNextValue(squares);
  const status = calculateStatus(squares, nextPlayer);

  return (
    <div className="game">
      <GameInfo status={status} />
      <Board squares={squares} winningSquares={[0, 1, 2, 3]} />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h2>TicTacToe</h2>
      <Game />
    </div>
  );
}
