// import React, { useContext } from 'react'
// import './MainScreen.css'
// import { assets } from '../../assets/assets'
// import { Context } from '../../context/Context';

// const MainScreen = () => {

//   const { onSent,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     setInput,
//     input
//   } = useContext(Context);

//   return (
//     <div className='main'>
//       <div className="nav">
//         <p>Gemini</p>
//         <img src={assets.user_icon} alt="" />
//       </div>
//       <div className="main-container">

//         {!showResult
//           ? <> <div className="greetings">
//             <p><span>Hello, ANKIT</span></p>
//             <p>How can I help you today?</p>
//           </div>
//             <div  className="cards">
//               <div className="card">
//                 <p>Explain the key rules of rugby. Start with the basics and go step-by-step</p>
//                 <img src={assets.compass_icon} alt="" />
//               </div>
//               <div className="card">
//                 <p>Give me tips for how to grow my YouTube channel</p>
//                 <img src={assets.bulb_icon} alt="" />
//               </div>
//               <div className="card">
//                 <p>Brainstorm ideas for a mocktail given specific ingredients</p>
//                 <img src={assets.message_icon} alt="" />
//               </div>
//               <div className="card">
//                 <p>Find hotels for a New Year’s trip to San Francisco</p>
//                 <img src={assets.code_icon} alt="" />
//               </div>
//             </div>
//           </>
//           :
//           <div className='result'>
//               <div className='result-title'>
//                  <img src={assets.user_icon} alt="" />
//                  <p>{recentPrompt}</p>
//               </div>
//               <div className='result-data'>
//                 <img src={assets.gemini_icon} alt="" />

//                 {/* jabtak data na mil jaye tbtk load krenge */}
//                 {loading
//                 ?<div className='loader'>
//                   <hr />
//                   <hr />
//                   <hr />
//                 </div>
//                 :
//                  <p dangerouslySetInnerHTML={{__html:resultData}}></p>
//                 //  {/* agar resultData state ko directly curly braces me daal
//                 //  dete jo ye text k sare tags ko v display krega */}
//               }
//               </div>
//           </div>

//         }



//         <div className="main-bottom">
//           <div className="search-box">
//             <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
//             <div>
//               <img src={assets.gallery_icon} width={30} alt="" />
//               <img src={assets.mic_icon} width={30} alt="" />
//               {/* input field khali hoga to arrow ni show hoga */}
//               {(input)?<img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" />:null}
//             </div>
//           </div>
//           <p className='bottom-info'>
//             Gemini may display inaccurate info, including about people,
//             so double-check its responses. Your privacy & Gemini Apps
//           </p>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default MainScreen


import React, { useContext } from 'react';
import './MainScreen.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const MainScreen = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // Function to handle card click
  const handleCardClick = (prompt) => {
    setInput(prompt);
    onSent(prompt); // Pass the prompt directly to onSent
  };

  // Function to handle keypress event
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greetings">
              <p><span>Hello, ANKIT</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => handleCardClick("Explain the key rules of rugby. Start with the basics and go step-by-step")}>
                <p>Explain the key rules of rugby. Start with the basics and go step-by-step</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick("Give me tips for how to grow my YouTube channel")}>
                <p>Give me tips for how to grow my YouTube channel</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick("Brainstorm ideas for a mocktail given specific ingredients")}>
                <p>Brainstorm ideas for a mocktail given specific ingredients</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick("Find hotels for a New Year’s trip to San Francisco")}>
                <p>Find hotels for a New Year’s trip to San Francisco</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key press
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  width={30}
                  alt=""
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy & Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
