export function nodeBufferToBlob(nodeBuffer, mimeType = "image/png") {
  if (
    typeof nodeBuffer === "object" &&
    nodeBuffer.type === "Buffer" &&
    Array.isArray(nodeBuffer.data)
  ) {
    return new Blob([new Uint8Array(nodeBuffer.data)], { type: mimeType });
  }

  console.error("Invalid buffer format:", nodeBuffer);
  return null;
}

/**
 * Converts a real Blob to an object URL usable in <img src="..." />
 */
export function blobToImageUrl(blob) {
  /*if (!(blob instanceof Blob)) {
    console.error("blobToImageUrl expected a real Blob:", blob);
    return null;
  }*/
  const realBlob = nodeBufferToBlob(blob, "image/png");

  return URL.createObjectURL(realBlob);
}
