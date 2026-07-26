import React, { useState, useEffect } from 'react';
import { playClick, playHover, playSuccess } from '../utils/sfx';

export default function ResumeModal({ isOpen, onClose }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  const handleDownload = () => {
    playClick();
    setIsDownloading(true);
    setDownloadProgress(0);
    setIsDone(false);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsDone(true);
          playSuccess();

          // Trigger file download
          const link = document.createElement('a');
          link.href = resumeUrl;
          link.download = 'Abhilash_KK_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => setIsDone(false), 3000);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        className="bg-[#0b0b0f] border border-border-dark w-full max-w-5xl h-[90vh] sm:h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border-dark flex flex-wrap gap-4 items-center justify-between bg-bg-dark/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <i className="fas fa-file-pdf text-xl"></i>
            </div>
            <div>
              <span className="text-[0.65rem] sm:text-xs font-display font-bold tracking-[0.25em] text-primary block uppercase">
                DOCUMENT PREVIEW
              </span>
              <h3 className="font-display text-base sm:text-xl font-bold text-white uppercase tracking-wide">
                ABHILASH K K — RESUME
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Open in new tab */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hidden sm:flex items-center gap-2 font-display text-[0.75rem] font-bold tracking-wider border border-white/20 hover:border-primary/50 text-slate-300 hover:text-white px-4 py-2.5 rounded-lg transition-all duration-300 bg-white/5 hover:bg-white/10"
              title="Open PDF in new tab"
            >
              <i className="fas fa-external-link-alt text-xs"></i>
              <span>FULLSCREEN</span>
            </a>

            {/* Download Resume Button */}
            <button
              onClick={handleDownload}
              onMouseEnter={playHover}
              disabled={isDownloading}
              className="font-display text-[0.75rem] font-bold tracking-wider bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center gap-2 cursor-pointer disabled:opacity-80"
            >
              {isDownloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>DOWNLOADING {downloadProgress}%</span>
                </>
              ) : isDone ? (
                <>
                  <i className="fas fa-check text-white"></i>
                  <span>DOWNLOADED</span>
                </>
              ) : (
                <>
                  <i className="fas fa-download text-xs"></i>
                  <span>DOWNLOAD PDF</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              onMouseEnter={playHover}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-border-dark flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-base cursor-pointer"
              title="Close Preview"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-[#121218] relative w-full overflow-hidden flex flex-col items-center justify-center">
          <iframe
            src={`${resumeUrl}#toolbar=1&view=FitH`}
            className="w-full h-full border-0"
            title="Abhilash K K Resume Preview"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-border-dark bg-bg-dark/80 flex flex-wrap items-center justify-between text-xs text-slate-400 font-sans">
          <span>
            Having trouble viewing?{' '}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Click here to open directly
            </a>
          </span>
          <span className="hidden sm:inline text-slate-500">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
