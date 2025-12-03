"use client";
import { Sparkles, Bot, TreeDeciduous, Copy, Download } from "lucide-react";
import { useCallback, useState } from "react";
import { HomePageSummaryTextArea } from "./homepage_summary_textarea";
import { showToast } from "@/utils/ShowToast";
import axios from "axios";
import { handleDownload } from "@/utils/downlaodPdfFromText";
import { copyToClipboard } from "@/utils/copyToClipboard";

export const HomePageSummary = ({}) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setselectedModel] = useState("T5");
  const [selectedLang, setselectedLang] = useState("English");
  const [input, setinput] = useState("");
  const [isReady, setisReady] = useState(TreeDeciduous);

  const handelGetSummary = useCallback(async () => {
    setIsLoading(true);
    // setTimeout(() => {
    //     setOutput(`One Kumar Krishna Prasad Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal w Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal wi Singh granted a perma nent lease of the right to the underground coal in 5,800 bighas of land belonging to him to Shibsaran Singh and Sitaram Singh (hereinafter referred to as the Singhs) by a registered patta stipulating for a salami of Rs. 8,000 and royalty at the rate of 2a. per ton of coal raised subject to a minimum of Rs 750 a year and for certain other cesses and Sub section (1) of the , enumerates five categories of documents of which regis tration is made compulsory which include leases of immoveable property from year to year or for any term exceeding one year, or reserving a yearly rent. Before the amendment, the clause was held to cover even compromise decrees comprising immovable property which was not the subject matter of the suit. The High Court held that if the compromise decree failed within clause (d) of sub section (1) it would not be protected under clause (vi) In Hemanta Kumar vs. Deoshi, J., the High Court held that a lease is a document which creates a present and immediate interest in the land. The compromise decree provided that unless the sum of Rs. 8,000 was paid within the stipulated time the Singhs were not to execute the decree or to take possession of the disputed property. Until the payment was made it was impossible to determine whether there would be any under lease or not. The High Court dismissed the appeal wth costs. The`)
    //     setIsLoading(false)
    // }, 2000);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_FAST_URL}/predict`,
        {
          text: input,
          parameters: {
            max_new_tokens: 128,
            num_beams: 8,
            length_penalty: 0.8,
          },
          model_name: selectedModel || "t5",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setOutput(res.data.summary);
    } catch (error) {
      console.log(error);
      showToast(
        error.response?.data?.detail ||
          error.message ||
          "Unknown error. Please try again",
        1
      );
    } finally {
      setIsLoading(false);
    }
    // console.log(input);
  }, [input, selectedModel]);

  return (
    <>
      <section id="home-page-summary">
        <HomePageSummaryTextArea
          isEmpty={input ? false : true}
          handelSubmitQuery={handelGetSummary}
          isReady={isReady}
          setisReady={setisReady}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          selectedLang={selectedLang}
          setselectedLang={setselectedLang}
          input={input}
          setInput={setinput}
        />
        <AskAiButton
          isDisabled={input ? false : true}
          onClick={() => {
            if (isLoading) return;
            handelGetSummary();
          }}
        />
        <AIResponseDisplay isLoading={isLoading} output={output} />
      </section>
    </>
  );
};

const AIResponseDisplay = ({ output, isLoading }) => {
  return (
    <div className="relative md:pb-4 mt-3 max-w-4xl mx-auto border border-gray-100 bg-gray-50  rounded-lg">
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1  p-4 overflow-auto ">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm  text-gray-600 font-medium">AI Response</h3>
          </div>

          {isLoading ? (
            <div className="animate-pulse">
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ) : output ? (
            <div className=" max-w-none">
              {output.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-800 text-sm mb-2 whitespace-pre-wrap"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm">
              AI response will appear here...
            </p>
          )}
        </div>
      </div>

      {/* copy and download summary  */}
      <div className={`${output && !isLoading ? "" : "hidden"} absolute left-5 bottom-0 flex items-center gap-4 w-fit`}>
        <button
          aria-label="copy answer"
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(output);
          }}
          className=" cursor-pointer py-2"
        >
          <Copy className=" hover:text-gray-800 text-gray-600 w-3.5 h-3.5 " />
        </button>
        <button
          aria-label="download answer"
          onClick={(e) => {
            e.preventDefault();
            handleDownload({
              data: { title: "Judgment Summary" },
              textContent: output,
            });
          }}
          className=" cursor-pointer py-2"
        >
          <Download className=" hover:text-gray-800 text-gray-600 w-3.5 h-3.5 " />
        </button>
      </div>
    </div>
  );
};

const AskAiButton = ({ className, isDisabled, onClick = () => {} }) => {
  return (
    <>
      <button
        disabled={isDisabled}
        onClick={onClick}
        // onClick={()=>{
        //   console.log("dfjnd")
        // }}
        tabIndex={0}
        className={`disabled:opacity-78 disabled:cursor-default flex max-w-4xl mx-auto items-center justify-start sm:justify-end text-sm bg-amber-500/10 border-1 border-amber-500 font-semibold cursor-pointer text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg transition-all duration-200  ${className}`}
      >
        <Sparkles size={16} className="mr-2 text-amber-700" />
        Summarize with AI
      </button>
    </>
  );
};
