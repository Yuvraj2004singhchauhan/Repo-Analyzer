import { useState } from "react";
import { analyzeRepository } from "./services/repositoryService";

function App() {

    const [repositoryUrl, setRepositoryUrl] = useState("");
    const [repository, setRepository] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {

        if (!repositoryUrl.trim()) {
            setError("Please enter a GitHub repository URL.");
            return;
        }

        setLoading(true);
        setError("");
        setRepository(null);

        try {

            const data = await analyzeRepository(repositoryUrl);

            setRepository(data.repository);

        } catch (error) {

            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Something went wrong. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Navbar */}
            <nav className="border-b border-slate-800">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold">
                            AI
                        </div>

                        <span className="text-lg font-semibold">
                            Repo Analyzer
                        </span>

                    </div>

                    <div className="text-sm text-slate-400">
                        AI-Powered Developer Tool
                    </div>

                </div>

            </nav>


            {/* Hero */}
            <main>

                <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-5xl flex-col items-center justify-center px-6 text-center">

                    <div className="mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                        AI-Powered GitHub Repository Analysis
                    </div>


                    <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">

                        Understand any GitHub

                        <span className="text-blue-500">
                            {" "}repository{" "}
                        </span>

                        with AI.

                    </h1>


                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

                        Analyze architecture, technologies, code structure
                        and project improvements. Ask questions about the
                        repository and get context-grounded AI answers.

                    </p>


                    {/* Repository Input */}

                    <div className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">

                        <input
                            type="text"
                            value={repositoryUrl}
                            onChange={(event) =>
                                setRepositoryUrl(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleAnalyze();
                                }
                            }}
                            placeholder="https://github.com/username/repository"
                            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-sm outline-none transition focus:border-blue-500"
                        />


                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-7 py-4 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading
                                ? "Analyzing..."
                                : "Analyze Repository"
                            }

                        </button>

                    </div>


                    {/* Error */}

                    {error && (
                        <div className="mt-4 w-full max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}


                    {/* Repository Result */}

                    {repository && (

                        <div className="mt-10 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {repository.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-blue-400">
                                        {repository.full_name}
                                    </p>

                                </div>

                                <a
                                    href={repository.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-400 hover:text-blue-300"
                                >
                                    View on GitHub →
                                </a>

                            </div>


                            <p className="mt-5 text-slate-400">
                                {repository.description ||
                                    "No repository description available."}
                            </p>


                            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

                                <div className="rounded-xl bg-slate-800 p-4">
                                    <p className="text-xs text-slate-400">
                                        Language
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {repository.language || "N/A"}
                                    </p>
                                </div>


                                <div className="rounded-xl bg-slate-800 p-4">
                                    <p className="text-xs text-slate-400">
                                        Stars
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {repository.stars}
                                    </p>
                                </div>


                                <div className="rounded-xl bg-slate-800 p-4">
                                    <p className="text-xs text-slate-400">
                                        Forks
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {repository.forks}
                                    </p>
                                </div>


                                <div className="rounded-xl bg-slate-800 p-4">
                                    <p className="text-xs text-slate-400">
                                        Branch
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {repository.default_branch}
                                    </p>
                                </div>

                            </div>

                        </div>

                    )}


                </section>

            </main>

        </div>
    );
}

export default App;