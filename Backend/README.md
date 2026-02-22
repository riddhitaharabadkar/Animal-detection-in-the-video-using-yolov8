# Animal Detection Backend API

FastAPI backend for video upload and frame extraction.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Or on Windows:
```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at `http://127.0.0.1:8000`

## API Endpoints

- `POST /upload/` - Upload a video file and extract frames
- `GET /frames/{session_id}/` - Access extracted frames (static files)
- `GET /health` - Health check endpoint
- `GET /` - API root endpoint

## Project Structure

- `uploads/` - Temporary storage for uploaded videos
- `results/` - Storage for extracted frames organized by session ID

## Features

- Video upload via multipart form data
- Automatic frame extraction from uploaded videos
- Unique session IDs for each processing session
- Static file serving for extracted frames
- CORS enabled for frontend integration

