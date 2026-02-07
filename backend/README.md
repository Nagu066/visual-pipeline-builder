# Backend Setup

## Installation

1. Create a virtual environment (if not already created):
   ```bash
   python3 -m venv venv
   ```

2. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

1. Make sure the virtual environment is activated:
   ```bash
   source venv/bin/activate
   ```

2. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

The server will start on `http://localhost:8000`

## API Endpoints

- `GET /` - Health check endpoint
- `POST /pipelines/parse` - Parse pipeline data (expects `pipeline` form field with JSON string)

