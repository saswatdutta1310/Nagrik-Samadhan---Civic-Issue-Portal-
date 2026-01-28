import { useState, DragEvent } from "react";
import { Upload, Image, Video } from "lucide-react";

export default function EvidenceUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setFiles([...files, ...Array.from(selectedFiles)]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <label className="font-semibold text-sm flex items-center gap-2">
        📸 Evidence (optional)
      </label>

      {/* DROPBOX */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted transition"
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="evidence-upload"
        />

        <label htmlFor="evidence-upload" className="cursor-pointer">
          <Upload className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Upload photos/videos (UI only)
          </p>
        </label>
      </div>

      <p className="text-xs text-muted-foreground">
        ⚠ Faces & number plates are auto-blurred
      </p>

      {/* PREVIEW */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {files.map((file, index) => (
            <div key={index} className="relative rounded overflow-hidden">
              {file.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="h-24 w-full object-cover"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="h-24 w-full object-cover"
                  muted
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
