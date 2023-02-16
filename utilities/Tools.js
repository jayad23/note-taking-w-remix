export const validator = (text, minLen, maxLen) => {
  return text.trim().length < minLen;
}