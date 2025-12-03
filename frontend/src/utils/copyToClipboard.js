import { showToast } from "./ShowToast";

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
