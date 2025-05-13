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
            }, 1000);
            return `Ok, take you there.`
        },

        transition: {duration: 1000},

        path: "explainService"

    },
    "explainService": {
        message: (params) => {
            if (params.userInput === "Brouchure Websites") {
                return "A brochure website is a simple, static website that serves as a digital marketing tool, typically consisting of a few key pages like About, Services, and Contact, designed to provide essential information about a business or organization. These websites function much like a traditional print brochure, showcasing a company's offerings, values, and contact details without complex functionalities like e-commerce or user accounts. Often used by small businesses, freelancers, and service providers, brochure websites are cost-effective, easy to maintain, and focused on converting visitors into leads or customers through clear calls-to-action. While they lack dynamic features, their straightforward design and quick load times make them ideal for businesses that simply need an online presence to establish credibility and share fundamental information with potential clients.";
            } else if (params.userInput === "Modular Websites") {
                return "A modular website is a structured site that uses standardized templates and interchangeable content blocks to efficiently create and manage large numbers of pages with consistent design and functionality. Think of it like building with blocks – you have different types of pre-designed sections that can be combined in various ways to create unique pages while maintaining a cohesive look and feel throughout the entire site. This approach is perfect for organizations that need to publish lots of content regularly, such as news sites, educational institutions, or large companies with extensive product catalogs. The beauty of modular websites lies in their efficiency – once the basic building blocks are established, content creators can quickly assemble new pages without needing design or technical expertise, while visitors experience a seamless, professional interface regardless of which page they're viewing.";
            } else if (params.userInput === "Ecommerce Sites") {
                return "An ecommerce website is a digital storefront that enables businesses to sell products or services online, featuring shopping carts, secure payment processing, inventory management, and customer account systems. These websites can range from simple single-vendor stores to complex marketplaces, offering various functionalities like product catalogs, real-time inventory tracking, order management, customer reviews, and integrated shipping solutions. Whether you're selling physical products, digital downloads, or services, an ecommerce site provides the infrastructure to reach customers globally while automating many aspects of the sales process. We can build your ecommerce solution on any platform you prefer, or recommend the best option based on your specific needs, such as your product catalog size, expected traffic volume, budget considerations, and desired features – ensuring your online store aligns perfectly with your business goals while providing a seamless shopping experience for your customers.";
            } else if (params.userInput === "Web Apps") {
                return "Take your business to the next level with a web app that puts your website to work for you. Web apps allow for powerful features like user login portals, automated data processing, personalized dashboards, and custom workflows that can transform how you run your business. Instead of just having a website that shows information, you'll have a smart online tool that actively helps manage customers, streamline operations, and grow your revenue. Whether you need clients to book appointments automatically, teams to collaborate in real-time, or systems that handle repetitive tasks for you, a web app can make it happen – saving you time, reducing costs, and delivering a premium experience that keeps customers coming back. Stop settling for a basic website when you could have a dynamic platform that actively drives your business forward every single day.";
            }
            return "I'll explain the service you selected.";
        },
        options: ["Brouchure Websites", "Modular Websites", "Ecommerce Sites", "Web Apps"],
        path: (params) => {
            if (params.userInput === "Brouchure Websites" || 
                params.userInput === "Modular Websites" || 
                params.userInput === "Ecommerce Sites" || 
                params.userInput === "Web Apps") {
                return "scrollTo";
            }
            return "respondWithLLM";
        }
    }
  }

export default buildWebsiteConversation;