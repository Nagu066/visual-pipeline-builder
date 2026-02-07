from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes, edges):
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sort) to detect cycles.
    """
    # Build adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {node['id'] for node in nodes}
    
    # Initialize in-degree for all nodes
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in node_ids and target in node_ids:
            graph[source].append(target)
            in_degree[target] += 1
    
    # Find all nodes with no incoming edges
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    processed_count = 0
    
    # Process nodes with no incoming edges
    while queue:
        node = queue.popleft()
        processed_count += 1
        
        # Remove this node and decrease in-degree of its neighbors
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG (no cycles)
    # If there are cycles, some nodes will have in-degree > 0
    return processed_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    # Parse the pipeline JSON string
    try:
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        dag_check = is_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': dag_check
        }
    except json.JSONDecodeError as e:
        return {'status': 'error', 'message': f'Invalid JSON: {str(e)}'}
    except Exception as e:
        return {'status': 'error', 'message': f'Error processing pipeline: {str(e)}'}
