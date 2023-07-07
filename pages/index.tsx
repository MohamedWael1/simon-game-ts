import { game } from "@/game/game";
import clsx from "clsx";
import { useReducer } from "react";

export default function Home() {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const buttons = game.getButtons();
    game.getPlayerState() === "playing" ? game.activateButton() : null;
    console.log(game)
    return (
        <div className="bg-blue-400 h-screen flex flex-col justify-center">
            <div className="flex items-center justify-center text-white text-xl">
                Score : {game.getScore()}{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
                {game.getPlayerState() === "lost" ? (
                    <div className="text-white text-6xl font-bold animate-bounce py-4">
                        You lost!
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2 p-2  my-2">
                        {buttons.map((btn) => (
                            <span
                                onClick={() => {
                                    game.pressButton(btn);
                                    forceUpdate();
                                }}
                                key={btn.getButtonType()}
                                className={clsx(
                                    btn.getButtonType() === "yellow" &&
                                        "bg-yellow-500",
                                    btn.getButtonType() === "red" &&
                                        "bg-red-700",
                                    btn.getButtonType() === "green" &&
                                        "bg-green-700",
                                    btn.getButtonType() === "blue" &&
                                        "bg-blue-700",
                                    btn.isActivated && "animate-pulse",
                                    "h-28 w-28 md:h-[200px] md:w-[200px] rounded-lg shadow-md cursor-pointer border-2 border-black"
                                )}
                            ></span>
                        ))}
                    </div>
                )}

                <div>
                    <button
                        className="text-white bg-red-500 p-2 min-w-[200px] shadow-red-600 shadow rounded-sm hover:bg-red-600 transition-all"
                        onClick={() => {
                            game.start();
                            forceUpdate();
                        }}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
}
