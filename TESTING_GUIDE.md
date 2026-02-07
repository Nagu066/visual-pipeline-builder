# Testing DAG Detection Guide

This guide explains how to test the DAG (Directed Acyclic Graph) detection feature by creating pipelines with and without cycles.

## Prerequisites

1. **Start the backend server:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload
   ```
   The backend should be running on `http://localhost:8000`

2. **Start the frontend:**
   ```bash
   cd frontend
   npm start
   ```
   The frontend should open at `http://localhost:3000`

## Test Case 1: Valid DAG (No Cycles) ✅

A valid DAG has no cycles - you can follow the edges from any node and never return to where you started.

### Steps to Create a Valid DAG:

1. **Drag nodes onto the canvas:**
   - Drag an **Input** node
   - Drag a **Text** node
   - Drag an **LLM** node
   - Drag an **Output** node

2. **Connect them in a linear flow:**
   - Connect **Input** → **Text** (drag from Input's right handle to Text's left handle)
   - Connect **Text** → **LLM** (drag from Text's right handle to LLM's left handle)
   - Connect **LLM** → **Output** (drag from LLM's right handle to Output's left handle)

   **Visual representation:**
   ```
   Input → Text → LLM → Output
   ```

3. **Click Submit**
   - Expected result: `is_dag: true`
   - Message should show: "Graph is a DAG"

### Another Valid DAG Example (Branching):

1. Create nodes: Input, Text, LLM, Output
2. Connect:
   - Input → Text
   - Text → LLM
   - LLM → Output

   **Visual representation:**
   ```
        Input
         ↓
        Text
         ↓
        LLM
         ↓
       Output
   ```

3. **Click Submit** - Should return `is_dag: true`

## Test Case 2: Invalid DAG (Contains Cycles) ❌

A cycle occurs when you can follow edges and return to a node you've already visited.

### Steps to Create a Cycle:

1. **Drag nodes onto the canvas:**
   - Drag an **Input** node
   - Drag a **Text** node
   - Drag an **LLM** node

2. **Create a cycle by connecting:**
   - Connect **Input** → **Text**
   - Connect **Text** → **LLM**
   - Connect **LLM** → **Input** (This creates a cycle!)

   **Visual representation:**
   ```
   Input → Text → LLM → Input (cycle!)
   ```

3. **Click Submit**
   - Expected result: `is_dag: false`
   - Message should show: "Graph is NOT a DAG (contains cycles)"

### Another Cycle Example:

1. Create nodes: Input, Text, LLM, Output
2. Connect:
   - Input → Text
   - Text → LLM
   - LLM → Output
   - Output → Text (This creates a cycle: Text → LLM → Output → Text)

   **Visual representation:**
   ```
   Input → Text → LLM → Output
            ↑              ↓
            └──────────────┘
   ```

3. **Click Submit** - Should return `is_dag: false`

## Test Case 3: Disconnected Nodes

1. **Drag multiple nodes** but don't connect them all
2. **Connect some nodes:**
   - Input → Text
   - (Leave LLM and Output unconnected)

3. **Click Submit**
   - Should return `is_dag: true` (disconnected nodes don't create cycles)

## Test Case 4: Single Node

1. **Drag just one node** (e.g., Input)
2. **Click Submit**
   - Should return `is_dag: true` (a single node with no edges is a valid DAG)

## Understanding the Results

When you click Submit, you'll see a message like:

**For a valid DAG:**
```
Pipeline submitted successfully! Nodes: 4, Edges: 3, Graph is a DAG
```

**For a graph with cycles:**
```
Pipeline submitted successfully! Nodes: 3, Edges: 3, Graph is NOT a DAG (contains cycles)
```

## Tips for Testing

1. **Use the MiniMap** (bottom-right) to see your entire pipeline
2. **Use the Controls** (bottom-left) to zoom and pan
3. **Check the browser console** (F12) to see the full API response
4. **Try different node combinations** to test various scenarios

## Common Patterns

### Linear Pipeline (Valid DAG):
```
Input → Text → LLM → Output
```

### Parallel Branches (Valid DAG):
```
        Input
       ↙    ↘
     Text   Text
       ↘    ↙
        LLM
         ↓
       Output
```

### Cycle (Invalid DAG):
```
Input → Text → LLM → Input
```

### Self-Loop (Invalid DAG):
```
Input → Input (if self-connections were possible)
```

## Troubleshooting

- **If you can't connect nodes:** Make sure you're dragging from a source handle (right side) to a target handle (left side)
- **If the backend isn't responding:** Check that the backend server is running on port 8000
- **If you see CORS errors:** Make sure the backend CORS middleware is configured correctly

