/* eslint-disable react/jsx-key */
import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const SideBar = () => {
    const [toggle, setToggle] = useState(false)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    //jo recent me uspe click krne pe wo prompt pe aa jaye
    const loadPrompt = async(prompt) =>{
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className='sidebar'>
            <div className='top'>
                <img onClick={() => setToggle(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div
                //new chat krne se home page khul jayega..pehle se screen pe koi ans h to gayab ho jayega
                onClick={()=>newChat()}
                className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {toggle ? <p>New Chat</p> : null}
                </div>
                {toggle ? <div className="recent">
                    <p className='recent-title'>Recent</p>
                    {prevPrompts.map((item, index) => {
                        return (
                            <div 
                            //recent pe click krne se prompt load kr dega
                            onClick={()=>loadPrompt(item)} 
                            className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)} ...</p>
                            </div> 
                        )
                    })}

                </div>
                    :
                    null
                }

            </div>
            <div className='bottom'>
                <div className="bottom-icon recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {toggle ? <p>Help</p> : null}
                </div>
                <div className="bottom-icon recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {toggle ? <p>Activity</p> : null}
                </div>
                <div className="bottom-icon recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {toggle ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default SideBar
