"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [name, setName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [gameOver, setGameOver] = useState(false);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNameEntered(true);
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
      setMessage("Please enter a valid number between 1 and 10.");
      return;
    }

    if (userGuess > randomNumber) {
      setMessage("Too high!");
      setAttempts((prevAttempts) => prevAttempts - 1);
    } else if (userGuess < randomNumber) {
      setMessage("Too low!");
      setAttempts((prevAttempts) => prevAttempts - 1);
    } else {
      setMessage("Congratulations! You guessed the number.");
      endGame();
      return;
    }

    if (attempts - 1 === 0) {
      setMessage(`Better luck next time! The correct number was ${randomNumber}.`);
      endGame();
    }
  };

  const endGame = () => {
    setGameOver(true);
    setTimeout(() => {
      resetGame();
    }, 3000);
  };

  const resetGame = () => {
    setIsNameEntered(false);
    setName("");
    setGuess("");
    setRandomNumber(Math.floor(Math.random() * 10) + 1);
    setAttempts(3);
    setGameOver(false);
    setMessage("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-800">
      <div className="text-blue-950 container w-[90%] sm:w-[100%] flex items-center justify-between flex-nowrap gap-2 shadow-xl p-4" >
      <div className="container w-[80%] sm:w-[50%] bg-white border-2 border-black rounded-xl shadow-xl p-4 ">
        {!isNameEntered ? (
          <form onSubmit={handleNameSubmit} className="flex items-center justify-between flex-nowrap gap-2  text-blue-950">
            <input
              type="text"
              className="px-2 p-4 rounded-xl w-full border-2 border-black"
              placeholder="Enter Your Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" className="bg-sky-700 hover:bg-indigo-700 rounded-2xl text-white font-semibold">
              Enter
            </Button>
          </form>
        ) : (
          <div>
            <p className="text-xl font-semibold text-blue-950 mb-2 text-center">
              Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}!
            </p>
            <div className="flex flex-col items-center">
              {!gameOver && (
                <>
                  <p>Enter a number between 1 - 10:</p>
                 <form onSubmit={handleGuessSubmit} className="guess w-full flex items-center justify-between flex-nowrap gap-2 custom-form-color ">
                    <input
                      type="text"
                      className="px-2 p-4 rounded-xl w-full border-2 border-black"
                      placeholder="Enter a number..."
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                    />
                    <Button type="submit" className="bg-sky-700 hover:bg-indigo-700 rounded-2xl text-white font-semibold">
                      Guess
                    </Button>
                  </form>
                </>
              )}
              {message && <p className="text-blue-950 font-semibold ">{message}</p>}
              <p>Attempts remaining: {attempts}</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </main>
  );
}