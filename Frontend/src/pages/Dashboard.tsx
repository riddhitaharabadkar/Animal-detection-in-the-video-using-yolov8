import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Video, Image as ImageIcon, BarChart3, LogOut, PlayCircle, Loader2, ExternalLink, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProcessingResult {
  success: boolean;
  session_id: string;
  folder_url: string;
  frames_count: number;
  frames: string[];
  message: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [videosProcessed, setVideosProcessed] = useState(0);

  const API_BASE_URL = "http://127.0.0.1:8000";

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProcessingResult(null);
      toast.success(`File selected: ${file.name}`);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      toast.error("Please select a video file first");
      return;
    }

    setIsProcessing(true);
    toast.info("Uploading and processing video...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_BASE_URL}/upload/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProcessingResult = await response.json();

      if (result.success) {
        setProcessingResult(result);
        setVideosProcessed((prev) => prev + 1);
        toast.success(`Video processed successfully! ${result.frames_count} frames extracted.`);
      } else {
        throw new Error(result.message || "Failed to process video");
      }
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process video. Make sure the backend is running.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b border-border/50 backdrop-blur-lg bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Wildlife AI Detection
            </h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Videos Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{videosProcessed}</p>
              <p className="text-sm text-muted-foreground mt-2">Total videos analyzed</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-secondary" />
                Animals Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">0</p>
              <p className="text-sm text-muted-foreground mt-2">Total detections made</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-accent">0%</p>
              <p className="text-sm text-muted-foreground mt-2">Detection accuracy rate</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Video for Analysis</CardTitle>
            <CardDescription>
              Upload a video file to detect and count animals using YOLO AI technology
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-primary animate-bounce" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP4, AVI, MOV (MAX. 100MB)
                  </p>
                  {selectedFile && (
                    <p className="mt-4 text-sm font-medium text-primary">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>

            <Button
              onClick={handleProcess}
              className="w-full"
              variant="default"
              size="lg"
              disabled={!selectedFile || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Video...
                </>
              ) : (
                <>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Detection Analysis
                </>
              )}
            </Button>

            {processingResult && (
              <Card className="mt-4 border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <FolderOpen className="h-5 w-5" />
                    Processing Complete!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Frames Extracted:</span> {processingResult.frames_count}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        <span className="font-semibold">Folder URL:</span>
                      </span>
                      <a
                        href={processingResult.folder_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        {processingResult.folder_url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open(processingResult.folder_url, "_blank")}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Open Result Folder
                  </Button>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Detections</CardTitle>
            <CardDescription>
              Your latest animal detection results will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processingResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {processingResult.frames.slice(0, 8).map((frame, index) => (
                    <a
                      key={index}
                      href={`${API_BASE_URL}${frame}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                    >
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors">
                        <img
                          src={`${API_BASE_URL}${frame}`}
                          alt={`Frame ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <p className="text-xs text-center mt-1 text-muted-foreground">
                        Frame {index + 1}
                      </p>
                    </a>
                  ))}
                </div>
                {processingResult.frames_count > 8 && (
                  <div className="text-center">
                    <a
                      href={processingResult.folder_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View all {processingResult.frames_count} frames
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No detections yet. Upload a video to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
