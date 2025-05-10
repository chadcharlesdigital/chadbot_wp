const buildWebsiteConversation = {
    "start": {
        message: "Welcome to our websites page. Here you will find information about the types of websites/web apps we can build for you.",
        chatDisabled: true,
        transition: {duration: 1000},
        path: "howCanIHelp"
    },
    "howCanIHelp": {
        message: "For more information about a specific type of website select one of the options or feel free to ask me a question about our services.",
        options: ["Brouchure Websites", "Modular Websites", "Ecommerce Sites", "Web Apps"],
        path: (params) => {
            if(params.userInput === "Brouchure Websites" || params.userInput === "Modular Websites" || params.userInput === "Ecommerce Sites" || params.userInput === "Web Apps") {
                return `scrollTo`;
            } else {
                return `respondWithLLM`;
            }
        }
    },
    "scrollTo": {
        message: (params) => {
            console.log(params);
            let scrollTo = '/';
            if (params.userInput === "Brouchure Websites") {
                scrollTo = '#brochure-websites';
            } else if (params.userInput === "Modular Websites") {
                scrollTo = '#modular-websites'; 
            } else if (params.userInput === "Ecommerce Sites") {
                scrollTo = '#ecommerce';
            } else if (params.userInput === "Web Apps") {
                scrollTo = '#web-apps';
            }
            setTimeout(() => {
                if (document.querySelector(scrollTo)) {
                    const element = document.querySelector(scrollTo);
                    const offset = 150; // Adjust this value as needed
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            }, 1500);
            return `Ok, take you there.`
        },

        transition: {duration: 1500},

        path: "explainService"

    },
    "explainService": {
        message: "I'll explain the service you selected.",
        path: "respondWithLLM"
    },
    // "respondWithLLM": {
    //     message: "This will go to an LLM eventually and give a nice response",
    //     path: "respondWithLLM"
    // }
  }

export default buildWebsiteConversation;