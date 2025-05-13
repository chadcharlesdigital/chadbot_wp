export async function callLLM(prompt) {
    console.log("calling LLM with prompt: ", prompt);
    try {
        const response = await fetch('/wp-json/chadbot/v1/process-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // If you have nonce verification in your WordPress backend, include it here
                // 'X-WP-Nonce': wpApiSettings.nonce // Example if using wp_localize_script
            },
            body: JSON.stringify({ message: prompt }),
        });

        if (!response.ok) {
            // Try to get error message from response body
            const errorData = await response.json().catch(() => null); // Gracefully handle non-JSON error responses
            const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`;
            console.error("Error calling LLM endpoint:", errorMessage, errorData);
            // Consider throwing a more specific error or returning a structured error object
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("LLM response data:", data);
        // Assuming the useful part of the response is directly in data or data.reply, adjust as needed
        return data.content[0].text; // Or data.reply, or whatever your Express server actually returns
    } catch (error) {
        console.error("Failed to call LLM:", error);
        // Depending on how you want to handle errors, you might re-throw,
        // return a specific error structure, or return null/undefined.
        throw error; // Re-throwing the error so the caller can handle it
    }
}

export function formatChatHistory(history) {
    const formattedEntries = history.map((i) => {
        if (i.sender === "USER" || i.sender === "BOT") {
            return `Role: ${i.sender} Message: ${i.content}`; // Remove trailing \n for now, join will handle newlines
        }
        return null; // Return null for entries to be filtered out
    }).filter(entry => entry !== null); // Remove any null entries

    // Join with double newlines to separate messages clearly
    const finalString = formattedEntries.join('\n\n');
    console.log("formatted history string:", finalString);
    return finalString;
}