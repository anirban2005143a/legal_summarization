import { showToast } from "./ShowToast";

export const extractTextFromPdf = async (
  file,
  setInput,
  setisTextExtracting,
  setisReady ,
  onError = ()=>{}
) => {
  if (!file) return;
  try {
    setisTextExtracting(true);
    setisReady && setisReady(false);

    console.log("calling");
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
    
    if(data.text?.trim().length == 0){
      throw new Error("Empty file. Please try with another.")
    }

    setInput(data.text?.trim());
  } catch (error) {
    console.log(error);
    showToast(error.message || "Fail to extract text", 1);
    onError()
  } finally {
    setisTextExtracting(false);
    setisReady && setisReady(true);
  }
};
