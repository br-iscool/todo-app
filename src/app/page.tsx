"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
    const [items, setItems] = useState<{ id: number; content: string; done: boolean }[]>([]);
    const [input, setInput] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    const editInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (editId !== null) {
            editInputRef.current?.focus();
            const el = editInputRef.current;
            if (el) {
                const val = el.value;
                el.value = "";
                el.value = val;
            }
        }
    }, [editId]);

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

    const confirmEdit = (id: number) => {
        setItems(items.map(it => it.id === id ? { ...it, content: editText.trim() } : it));
        setEditId(null);
        setEditText("");
    }

    const cancelEdit = () => {
        setEditId(null);
        setEditText("");
    }

    return (
        <>
            <div className="min-h-screen p-20">
                <div className="mx-auto">
                    <h1 className="p-12 text-4xl text-center font-bold">To Do App</h1>
                    <main className="flex flex-col items-center p-6">
                        <div className="w-full max-w-6xl">
                            <div
                                style={{ maxHeight: "calc(100vh - 450px)", overflowY: "auto" }}
                                className="scroll rounded-xl"
                            >
                                <ul className="space-y-3">
                                    {items.map(item => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between px-5 bg-gray-950/50 rounded-xl w-full min-h-20"
                                        >
                                            {editId === item.id ? (
                                                <input
                                                    ref={editInputRef}
                                                    value={editText}
                                                    onChange={e => setEditText(e.target.value)}
                                                    onKeyDown={e => {
                                                        if (e.key === "Enter") {
                                                            confirmEdit(item.id);
                                                        } else if (e.key === "Escape") {
                                                            cancelEdit();
                                                        }
                                                    }}
                                                    onBlur={() => cancelEdit()}
                                                    className="flex-1 p-3 rounded-md bg-gray-800 text-gray-50 outline-none"
                                                />
                                            ) : (
                                                <span
                                                    className="text-gray-200 cursor-pointer"
                                                    onClick={() => {
                                                        setEditId(item.id);
                                                        setEditText(item.content);
                                                    }}
                                                >
                                                    {item.content}
                                                </span>
                                            )}

                                            <button
                                                onClick={() => deleteItem(item.id)}
                                                className="ml-4 cursor-pointer"
                                            >
                                                ❌
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
 
                        <div className="flex w-full justify-center pt-10">
                            <div className="flex gap-6 w-full max-w-6xl">
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
            <style>
                {`
                .scroll {
                    scrollbar-width: thin;
                    scrollbar-color: slategray transparent;
                }
                `}
            </style>
        </>
     );
}
