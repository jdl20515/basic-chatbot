import React, { useState } from 'react'
// import bot from "./assets/bot.svg";
// import user from "./assets/user.svg";

function OpenAIComponent() {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Adding user's message
        setMessages((prev) => [...prev, { type: 'user', text: input }])

        const response = await fetch('http://localhost:3001/', {
            // <-- Fixed typo here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
            }),
        })

        if (response.ok) {
            const data = await response.json()
            setMessages((prev) => [
                ...prev,
                { type: 'bot', text: data.bot.trim() },
            ])
        } else {
            const err = await response.text()
            alert(err)
        }

        setInput('')
    }

    return (
        <div className="container mx-auto p-4">
            <div
                id="chat_container"
                className="overflow-y-auto h-96 border p-4"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`wrapper ${message.type === 'bot' && 'ai'}`}
                    >
                        <div className="chat flex">
                            <div className="profile"></div>
                            <div className="message ml-4">{message.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="border rounded p-2 w-3/4"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white p-2 rounded"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default OpenAIComponent
