export const review = async (payload) => {
    try {
        const response = await fetch('/api/reviews', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (!response.ok) {
            console.log('Error: ' + response)
        }
        console.log(data + ': data');
        return data;
    } catch (error) {
        console.error('Error in review:', error);
        throw error;
    }
};