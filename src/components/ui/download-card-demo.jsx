import React, { useState } from "react";
import { Video, Music, FileImage } from "lucide-react";
import { DownloadCard } from "./download-card";
import { Button } from "./button";

export default function DownloadCardDemo() {
  const [status, setStatus] = useState("idle");

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus("loading");
    
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 2500);
    }, 3000);
  };

  const downloadFormats = [
    {
      name: "MP4",
      icon: <Video className="h-6 w-6" />,
      onSelect: handleDownload,
    },
    {
      name: "MP3", 
      icon: <Music className="h-6 w-6" />,
      onSelect: handleDownload,
    },
    {
      name: "GIF",
      icon: <FileImage className="h-6 w-6" />,
      onSelect: handleDownload,
    },
  ];

  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">Export your</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
            AI-generated website
          </span>
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Download your website in multiple formats for different use cases
        </p>
      </div>
      
      <div className="flex justify-center">
        <DownloadCard
          title="Export Website"
          description="Choose your preferred format"
          status={status}
          formats={downloadFormats}
          loadingMessage="Generating your website..."
          successMessage="Website ready for download!"
        />
      </div>
    </div>
  );
}
