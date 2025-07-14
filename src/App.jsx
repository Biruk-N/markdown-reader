import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import SvgViewer from './SvgViewer';

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Reader!\n\nType your markdown on the left or upload a .md file.`);

  // Handle file upload and read .md file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdown(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid .md file.');
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center font-sans">
              <div className="w-full max-w-5xl mx-auto p-0 md:p-8">
                <header className="mb-6 flex flex-col items-center">
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight mb-2">Markdown Reader</h1>
                  <input
                    type="file"
                    accept=".md"
                    aria-label="Upload markdown file"
                    onChange={handleFileUpload}
                    className="block w-full max-w-xs text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-blue-700 hover:file:bg-blue-50 file:transition file:duration-150 file:cursor-pointer focus:outline-none"
                  />
                </header>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
                  <div className="flex-1 flex flex-col">
                    <textarea
                      className="flex-1 min-h-[220px] md:min-h-[500px] p-6 bg-transparent font-mono text-base text-gray-800 dark:text-gray-100 focus:outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      value={markdown}
                      onChange={e => setMarkdown(e.target.value)}
                      placeholder="Type or paste your markdown here..."
                      aria-label="Markdown input"
                      spellCheck={false}
                    />
                  </div>
                  {/* Divider for desktop */}
                  <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-800" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 min-h-[220px] md:min-h-[500px] p-6 overflow-y-auto prose prose-lg dark:prose-invert max-w-none bg-transparent">
                      <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/svg" element={<SvgViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
