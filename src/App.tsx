function Cell({ val }: { val?: "x" | "o" }) {
  return (
    <button className="bg-gray-200 text-4xl min-w-10 min-h-10">{val}</button>
  );
}

export default function App() {
  return (
    <>
      <h1 className="text-red-500 text-center text-5xl my-4">Tic Tac Toe</h1>
      <main>
        <div className="grid grid-rows-3 grid-cols-3 w-1/2 m-auto gap-3">
          {[...Array(9).keys()].map((i) => (
            <Cell key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
