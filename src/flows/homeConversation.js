const homeConversation = {
    "start": {
        message: "Hey, I'm ChadBot.",
        transition: {duration: 1000},
        chatDisabled: true,
        path: "introduction"
    },
    "introduction": {
        message: `The owner of Digital Easy wanted to spend more time building cool stuff so he built me in his likeness to help customers.`,
        transition: {duration: 1000},
        chatDisabled: true,
        path: "howCanIHelp"
    },
    "howCanIHelp": {
        message: "Select one of our areas of expertise or feel free to ask me a question about our services.",
        options: ["Websites", "SEO", "AI Services"],
        path: (params) => {
            if(params.userInput === "Websites" || params.userInput === "SEO" || params.userInput === "AI Services") {
                return `processRedirect`;
            } else {
                return `respondWithLLM`;
            }
        }
    },
    "processRedirect": {
        message: (params) => {
            console.log(params);
            let redirectUrl = '/';
            if (params.userInput === "Websites") {
                redirectUrl = '/build-a-website';
            } else if (params.userInput === "SEO") {
                redirectUrl = '/seo';
            } else if (params.userInput === "AI Services") {
                redirectUrl = '/ai-services';
            }
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1500);
            return `Ok, I'll meet you at the ${params.userInput} page.`
        },

    },
    // "respondWithLLM": {
    //     message: "This will go to an LLM eventually and give a nice response",
    //     path: "respondWithLLM"
    // }
  }

export default homeConversation;