import { showToast } from "./ShowToast";

export const extractTextFromPdf = async (
  file,
  setInput,
  setisTextExtracting
) => {
  if (!file) return;
  try {
    setisTextExtracting(true);

    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res(200);
    //     console.log("dfjvndn")
    //   }, 2000);
    // });

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FAST_URL}/extract-text`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setInput(data.text);
  } catch (error) {
    console.log(error);
    showToast(error.message || "Fail to extract text", 1);
  } finally {
    setisTextExtracting(false);
  }
};
