"use client";

import { useEffect, useState } from "react";

type ResultItem = {
  prompt: string;
  reply: string;
};

type SavedItem = {
  userInput: string;
  prompt: string;
  reply: string;
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [prompts, setPrompts] = useState([
    "Explain this like I'm a beginner.",
    "Explain this like a senior engineer.",
    "Summarize this in 3 bullet points.",
  ]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("saved-prompts");
    if (stored) {
      setSavedPrompts(JSON.parse(stored));
    }
  }, []);

  function updatePrompt(index: number, value: string) {
    const updated = [...prompts];
    updated[index] = value;
    setPrompts(updated);
  }

  async function runComparison() {
    if (!userInput.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userInput,
          prompts,
        }),
      });

      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function savePrompt(item: ResultItem) {
    const newItem: SavedItem = {
      userInput,
      prompt: item.prompt,
      reply: item.reply,
    };

    const alreadyExists = savedPrompts.some(
      (saved) =>
        saved.userInput === newItem.userInput &&
        saved.prompt === newItem.prompt &&
        saved.reply === newItem.reply
    );

    if (alreadyExists) return;

    const updated = [...savedPrompts, newItem];
    setSavedPrompts(updated);
    localStorage.setItem("saved-prompts", JSON.stringify(updated));
  }

  function deletePrompt(indexToDelete: number) {
    const updated = savedPrompts.filter((_, index) => index !== indexToDelete);
    setSavedPrompts(updated);
    localStorage.setItem("saved-prompts", JSON.stringify(updated));
  }

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Prompt Engineering Playground</h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Same User Input</label>
        <textarea
          className="w-full border rounded-lg p-4"
          rows={5}
          placeholder="Write the same input you want to test across prompts..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {prompts.map((prompt, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-2">Prompt {index + 1}</h2>
            <textarea
              className="w-full border rounded-lg p-3"
              rows={6}
              value={prompt}
              onChange={(e) => updatePrompt(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={runComparison}
        disabled={loading}
        className="bg-black text-white px-5 py-3 rounded-lg"
      >
        {loading ? "Running..." : "Run Comparison"}
      </button>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {results.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Result {index + 1}</h2>
            <p className="text-sm text-gray-500 mb-3">{item.prompt}</p>

            <div className="border rounded-lg p-3 min-h-[220px] whitespace-pre-wrap mb-4">
              {item.reply}
            </div>

            <button
              onClick={() => savePrompt(item)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save this result
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Saved Results</h2>

        {savedPrompts.length === 0 ? (
          <p className="text-gray-500">No saved results yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {savedPrompts.map((item, index) => (
              <div key={index} className="border rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Input:</strong> {item.userInput}
                </p>

                <p className="text-sm text-gray-500 mb-2">
                  <strong>Prompt:</strong> {item.prompt}
                </p>

                <div className="border rounded-lg p-3 whitespace-pre-wrap mb-4">
                  {item.reply}
                </div>

                <button
                  onClick={() => deletePrompt(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}