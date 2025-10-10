"use client";

import { useState } from "react";

export default function Home() {
    const [items, setItems] = useState<{ id: number; content: string; done: boolean }[]>([]);
    const [input, setInput] = useState("");
    
    const addItem = () => {
        if (input.trim() === "") {
            return;
        }

        setItems([...items, { id: Date.now(), content: input.trim(), done: false }])
        setInput("");
    }

    const deleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    }

	return (
        <>
            <div className="min-h-screen p-20">
                <div className="mx-auto">
                    <h1 className="p-12 text-4xl text-center font-bold">To Do App</h1>
                    <main className="flex flex-col items-center p-6">
                        <div className="w-full max-w-4xl">
                            <ul className="space-y-3">
                                {items.map(items => (
                                    <li
                                        key={items.id}
                                        className="flex items-center justify-between px-5 bg-gray-950/50 rounded-xl w-full min-h-20"
                                    >
                                        <span className="text-gray-200">{ items.content }</span>
                                        <button 
                                            onClick={() => deleteItem(items.id)}
                                            className="ml-4"
                                        >
                                            ❌
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
 
                        <div className="flex w-full justify-center pt-10"> {/* center the input area */}
                            <div className="flex gap-6 w-full max-w-4xl">
                                <input
                                     type="text"
                                     value={input}
                                     onChange={e => setInput(e.target.value)}
                                     onKeyDown={e => e.key === "Enter" && addItem()}
                                     placeholder="Add a task"
                                     className="flex-1 p-5 rounded-xl outline-1 outline-gray-950/50 focus:outline-2 placeholder-gray-950/50" 
                                 />
                                 <button
                                     onClick={addItem}
                                     className="px-6 text-white bg-black rounded-xl hover:bg-gray-700 transition-all"
                                 >
                                     +
                                 </button>
                             </div>
                         </div>
                     </main>
                 </div>
             </div>
         </>
     );
}
