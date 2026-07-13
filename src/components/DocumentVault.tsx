import React, { useState, useCallback } from 'react';
import { Upload, Camera, FileCheck, AlertCircle, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentVaultProps {
  requiredDocs: string[];
  accentColor?: string;
}

interface UploadedDoc {
  name: string;
  status: 'processing' | 'verified' | 'failed';
  type: string;
}

const DocumentVault: React.FC<DocumentVaultProps> = ({ requiredDocs, accentColor = '#60a5fa' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);

  const simulateOCR = useCallback((fileName: string) => {
    const newDoc: UploadedDoc = {
      name: fileName,
      status: 'processing',
      type: fileName.split('.').pop()?.toUpperCase() || 'PDF',
    };
    setUploadedDocs((prev) => [...prev, newDoc]);

    // Simulate OCR processing
    setTimeout(() => {
      setUploadedDocs((prev) =>
        prev.map((d) =>
          d.name === fileName
            ? { ...d, status: Math.random() > 0.15 ? 'verified' : 'failed' }
            : d
        )
      );
    }, 1500 + Math.random() * 1000);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      files.forEach((f) => simulateOCR(f.name));
    },
    [simulateOCR]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      files.forEach((f) => simulateOCR(f.name));
      e.target.value = '';
    },
    [simulateOCR]
  );

  const handleCameraCapture = useCallback(() => {
    simulateOCR(`camera_capture_${Date.now()}.jpg`);
  }, [simulateOCR]);

  const removeDoc = useCallback((name: string) => {
    setUploadedDocs((prev) => prev.filter((d) => d.name !== name));
  }, []);

  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold text-white/90 mb-6 flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: `${accentColor}20`, color: accentColor }}
        >
          <FileText className="w-4 h-4" />
        </span>
        Document Vault
      </h2>

      {/* Required documents list */}
      <div className="glass rounded-2xl p-4 mb-4">
        <p className="text-white/50 text-xs tracking-wider uppercase mb-3">Required Documents</p>
        <div className="flex flex-wrap gap-2">
          {requiredDocs.map((doc, i) => {
            const isUploaded = uploadedDocs.some(
              (u) => u.status === 'verified'
            );
            return (
              <span
                key={i}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                  isUploaded
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                {doc}
              </span>
            );
          })}
        </div>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer
          ${
            isDragging
              ? 'border-opacity-80 bg-white/[0.06] scale-[1.01]'
              : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
          }
        `}
        style={isDragging ? { borderColor: accentColor } : undefined}
      >
        <Upload
          className={`w-10 h-10 mx-auto mb-4 transition-all duration-300 ${
            isDragging ? 'scale-110' : ''
          }`}
          style={{ color: isDragging ? accentColor : 'rgba(255,255,255,0.3)' }}
        />
        <p className="text-white/60 text-sm mb-1">
          {isDragging ? 'Drop files here' : 'Drag & drop your documents here'}
        </p>
        <p className="text-white/30 text-xs mb-4">
          Aadhaar, PAN, Income Certificate, etc. — PDF, JPG, PNG supported
        </p>

        <div className="flex items-center justify-center gap-3">
          <label>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 hover:text-white border border-white/10 hover:bg-white/10 rounded-xl"
              asChild
            >
              <span>
                <Upload className="w-3.5 h-3.5 mr-2" />
                Browse Files
              </span>
            </Button>
          </label>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCameraCapture}
            className="text-white/50 hover:text-white border border-white/10 hover:bg-white/10 rounded-xl"
          >
            <Camera className="w-3.5 h-3.5 mr-2" />
            Camera
          </Button>
        </div>
      </div>

      {/* Uploaded documents with OCR status */}
      {uploadedDocs.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedDocs.map((doc, i) => (
            <div
              key={i}
              className="glass rounded-xl p-3 flex items-center gap-3 animate-float-up"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  doc.status === 'processing'
                    ? 'bg-amber-500/15'
                    : doc.status === 'verified'
                    ? 'bg-green-500/15'
                    : 'bg-red-500/15'
                }`}
              >
                {doc.status === 'processing' ? (
                  <div className="w-4 h-4 border-2 border-amber-400/50 border-t-amber-400 rounded-full animate-spin" />
                ) : doc.status === 'verified' ? (
                  <FileCheck className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs font-medium truncate">{doc.name}</p>
                <p
                  className={`text-[10px] ${
                    doc.status === 'processing'
                      ? 'text-amber-400'
                      : doc.status === 'verified'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {doc.status === 'processing'
                    ? 'OCR Processing...'
                    : doc.status === 'verified'
                    ? '✓ Document Verified via OCR'
                    : '✗ Verification Failed — Please retry'}
                </p>
              </div>

              <button
                onClick={() => removeDoc(doc.name)}
                className="text-white/20 hover:text-white/60 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DocumentVault;
