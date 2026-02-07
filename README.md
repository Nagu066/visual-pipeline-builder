# Visual Pipeline Builder

A visual canvas for building and validating data pipelines. Drag-and-drop nodes, connect them with edges, and submit to verify your pipeline is a valid DAG (Directed Acyclic Graph). Built with React Flow and FastAPI.

A screen recording demo is included in the repo (`app-demo.mp4`).

## Features

- **Visual pipeline editor** — Drag nodes from the toolbar onto the canvas and connect them
- **Multiple node types** — Input, Output, Text, LLM, Transform, Condition, API, Merge, Filter, Delay
- **Text node with variables** — Use `{{ variableName }}` in text; dynamic input handles are created automatically
- **DAG validation** — Submit your pipeline to check for cycles; backend uses a topological sort (Kahn's algorithm)
- **Modern UI** — Color-coded nodes, minimap, zoom/pan controls, and result modal

## Tech Stack

| Layer    | Stack                    |
| -------- | ------------------------ |
| Frontend | React, React Flow, Zustand |
| Backend  | Python, FastAPI, Uvicorn |

## Prerequisites

- **Node.js** (v14+) and **npm**
- **Python** (3.8+)

## How to Run

Run both backend and frontend. Use two terminals.

### 1. Backend

**Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

**macOS / Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at **http://localhost:8000**.

### 2. Frontend

In a **second terminal**:

```powershell
cd frontend
npm install
npm start
```

Frontend runs at **http://localhost:3000** and usually opens in your browser automatically.

---

**Quick run (if you already have dependencies):**

- Backend: `cd backend` → activate venv → `uvicorn main:app --reload`
- Frontend: `cd frontend` → `npm start`

## How to Use the App

### Building a pipeline

1. **Add nodes** — In the left toolbar, drag a node type (e.g. Input, Text, LLM, Output) onto the canvas.
2. **Connect nodes** — Drag from a **source handle** (right side of a node) to a **target handle** (left side of another node).
3. **Configure nodes** — Click a node and edit its fields (labels, options, etc.); data is saved automatically.
4. **Move and zoom** — Pan by dragging the canvas; use the bottom-left controls to zoom in/out; use the minimap (bottom-right) for an overview.

### Text node variables

In a **Text** node, use the syntax `{{ variableName }}` (e.g. `Hello {{ name }}, you have {{ count }} items`). The node will show input handles for each variable and list them below the text area.

### Submitting and validating (DAG check)

1. Click **Submit Pipeline** (top of the canvas).
2. The app sends the current nodes and edges to the backend.
3. A modal shows:
   - Number of nodes and edges
   - **Whether the graph is a valid DAG** (no cycles) or contains cycles.

**Valid DAG example:** `Input → Text → LLM → Output`  
**Invalid (cycle):** `Input → Text → LLM → Input`

### Tips

- **Valid DAG** — No path along the edges should lead back to a node you’ve already visited.
- **Disconnected nodes** are allowed; they don’t create cycles.
- Close the result modal by clicking outside it or using the close control.

## Project Structure

```
├── frontend/           # React app (React Flow, Zustand)
│   ├── public/
│   └── src/
│       ├── nodes/      # Node components (Input, Output, LLM, Text, etc.)
│       ├── App.js
│       ├── toolbar.js
│       ├── submit.js
│       └── ...
├── backend/            # FastAPI app
│   ├── main.py         # CORS, POST /pipelines/parse, DAG detection
│   └── requirements.txt
├── README.md
├── IMPLEMENTATION_SUMMARY.md
└── TESTING_GUIDE.md
```

## API (Backend)

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| GET    | `/`                 | Health check                         |
| POST   | `/pipelines/parse`  | Submit pipeline JSON; returns node/edge counts and `is_dag` |

Request: form field `pipeline` = JSON string of `{ nodes, edges }` (React Flow format).

## License

MIT
