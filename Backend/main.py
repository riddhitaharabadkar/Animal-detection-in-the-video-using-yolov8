from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import os
from pathlib import Path
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
RESULTS_DIR = Path("results")
UPLOAD_DIR.mkdir(exist_ok=True)
RESULTS_DIR.mkdir(exist_ok=True)

@app.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    """
    Upload a video file and convert it into frames.
    Returns the folder link containing all extracted frames.
    """
    try:
        # Create a unique folder for this video processing session
        session_id = str(uuid.uuid4())
        session_folder = RESULTS_DIR / session_id
        session_folder.mkdir(exist_ok=True)
        
        # Save uploaded video
        video_path = UPLOAD_DIR / f"{session_id}_{file.filename}"
        with open(video_path, "wb") as f:
            f.write(await file.read())
        
        # Extract frames from video
        vidcap = cv2.VideoCapture(str(video_path))
        success, image = vidcap.read()
        frame_paths = []
        count = 0
        
        while success:
            frame_file = session_folder / f"frame_{count:05d}.jpg"
            cv2.imwrite(str(frame_file), image)
            frame_paths.append(f"/frames/{session_id}/frame_{count:05d}.jpg")
            success, image = vidcap.read()
            count += 1
        
        vidcap.release()
        
        # Clean up uploaded video file (optional - you may want to keep it)
        # os.remove(video_path)
        
        # Return the folder link and frame information
        folder_url = f"http://127.0.0.1:8000/frames/{session_id}/"
        
        return JSONResponse({
            "success": True,
            "session_id": session_id,
            "folder_url": folder_url,
            "frames_count": count,
            "frames": frame_paths[:10],  # Return first 10 frame URLs as preview
            "message": f"Video processed successfully. {count} frames extracted."
        })
    
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": str(e),
                "message": "Failed to process video"
            }
        )

# Mount static files for serving frames
from fastapi.staticfiles import StaticFiles
app.mount("/frames", StaticFiles(directory="results"), name="frames")

@app.get("/")
async def root():
    return {"message": "Animal Detection API is running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

