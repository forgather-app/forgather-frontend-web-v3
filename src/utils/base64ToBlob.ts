/** RN 브릿지(postMessage)로 전달받은 base64 문자열을 Blob으로 복원한다 */
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64);
  const bytes = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
};
