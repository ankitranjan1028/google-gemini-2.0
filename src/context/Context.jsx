import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    // typing effect dikhane k liye
    const delayPara = (index, nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord)
        }, 75*index)
    }

    //new chat pr click krne se new page khul jaye
    const newChat = ()=>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async(prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)

        //recent pe click krne se uska ans display hona chahiye
        //ya fir prompt me enter krne se
        let response;
        if(prompt!==undefined){
            response=await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            //jo prompt enter kr rhe h usko state me save krna h
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input);
        }


        // **  ko bold krne k liye
        let resArr = response.split("**");
        let newRes="";
        for(let i=0;i<resArr.length;i++)
        {
            if(i===0 || i%2!==1){
                newRes+=resArr[i];
            }
            else{
                newRes+= "<b>"+resArr[i]+"</b>";
            }
        }

        //ab single star ko gayab krna h
        let newRes2 = newRes.split("*").join("</br>");
        let newResArr = newRes2.split(" ");
        for(let i=0;i<newResArr.length;i++){
            const nextWord = newResArr[i];
            delayPara(i, nextWord+"  ")
        }

        setLoading(false)
        setInput("")
    }

    // onSent("What is React JS ")

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput, 
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;