import { useRef, useState, useEffect, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs";

export default function PdfJs({ src }) {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let renderTask = null;

  const renderPage = useCallback(
    (pageNum) => {
      const canvas = canvasRef.current;
      if (!canvas || !pdfDoc) return;

      canvas.height = 0;
      canvas.width = 0;

      pdfDoc.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const context = canvas.getContext("2d");
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        if (renderTask) renderTask.cancel();
        renderTask = page.render(renderContext);
      });
    },
    [pdfDoc]
  );

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(src);
    loadingTask.promise.then(setPdfDoc).catch(console.error);
  }, [src]);

  const nextPage = () => {
    if (pdfDoc && currentPage < pdfDoc.numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={prevPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {pdfDoc?.numPages || "?"}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage >= (pdfDoc?.numPages || 0)}
        >
          Next
        </button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}