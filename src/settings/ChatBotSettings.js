const ChatBotSettings = {
    header: {
        title: (
            <div style={{cursor: "pointer", margin: 0, fontSize: 20, fontWeight: "bold", color: "white"}}>
                ChadBot
            </div>
        ),
        showAvatar: true,
        style: {
            backgroundImage: 'linear-gradient(to right, blue, green)',
            color: 'white'
        }
    },
    general: {
        embedded: true
    },
    chatHistory: {
        storageKey: "main_conversation"
    },
    botBubble: {simulateStream: true}
}

export default ChatBotSettings;