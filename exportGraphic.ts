/**
 * Exports an SVG element to high-resolution PNG or SVG download
 */
export async function downloadGraphicPNG(
  svgElement: SVGSVGElement,
  filename = 'football-match-lineup.png',
  scale = 3
): Promise<void> {
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const blobURL = URL.createObjectURL(svgBlob);

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    // High DPI scaling (e.g. 600 * 3 = 1800px width)
    const bbox = svgElement.viewBox.baseVal;
    const width = bbox.width || 600;
    const height = bbox.height || 900;

    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const pngURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngURL;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobURL);
  };
  image.src = blobURL;
}

export function downloadGraphicSVG(
  svgElement: SVGSVGElement,
  filename = 'football-match-lineup.svg'
): void {
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}
