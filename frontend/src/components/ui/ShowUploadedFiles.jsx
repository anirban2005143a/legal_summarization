import { Loader2, X } from "lucide-react";
import { FileIcon, defaultStyles } from "react-file-icon";

export const ShowUploadedFiles = ({
  files,
  setFiles,
  extractedText,
  setExtractedText,
  isLoading,
  textareaRef,
}) => {
  if (!files || files.length === 0) return null;

  const getFileExtension = (filename) =>
    filename?.split(".").pop().toLowerCase();

  return (
    <div className="w-full">
      {/* Files List */}
      <div className="flex flex-col gap-2 mb-3">
        {files.map((file, index) => {
          const ext = getFileExtension(file.name);
          if (!["pdf", "txt"].includes(ext)) return null;

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-t-2xl rounded-b-md px-4 py-2 bg-amber-200/20 border border-amber-900/40 "
            >
              <div
                className={`flex items-center gap-4 py-2 ${
                  isLoading ? "pointer-events-none" : ""
                }`}
              >
                <div className="w-8 h-8 relative">
                  <FileIcon
                    extension={ext}
                    {...(defaultStyles[ext] || defaultStyles.doc)}
                  />
                  {isLoading && (
                    <div className=" absolute top-1/2 left-1/2 -translate-1/2">
                      <Loader2 className=" w-5 animate-spin text-gray-800" />
                    </div>
                  )}
                </div>
                <span className="text-sm truncate text-gray-600">
                  {file.name}
                </span>
              </div>

              <button
                disabled={isLoading}
                type="button"
                aria-label="Remove file"
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedFiles = files.filter((_, i) => i !== index);
                  console.log(setFiles);
                  setFiles(updatedFiles);
                }}
                className="p-1 cursor-pointer rounded-full hover:bg-gray-300 transition"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          );
        })}
      </div>
      {isLoading && (
        <p className="w-full p-2 text-gray-700 text-sm rounded-md">
          Extracting text
        </p>
      )}
      {/* Extracted Text Input */}
      {!isLoading && (
        <textarea
          ref={textareaRef}
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          placeholder="Extracted text"
          className="w-full p-2 text-gray-700 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800/0"
          disabled={isLoading}
        />
      )}
    </div>
  );
};
