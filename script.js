app.use(express.static('public'));
async function explore(category) {
    const modal = document.getElementById('exploreModal');
    const display = document.getElementById('modalData');
    modal.style.display = "block";

    try {
        // This calls your Node.js API we built earlier!
        const response = await fetch(`/api/destinations?category=${category}`);
        const data = await response.json();
        
        if(data.length > 0) {
            display.innerHTML = `<h3>Top ${category} Spots</h3>` + 
                data.map(item => `<div class='item'><strong>${item.name}</strong>: ${item.description}</div>`).join('');
        } else {
            display.innerHTML = `<h3>Exploring ${category}...</h3><p>We are gathering the best data for you!</p>`;
        }
    } catch (err) {
        display.innerHTML = "Error connecting to database.";
    }
}

function closeModal() {
    document.getElementById('exploreModal').style.display = "none";
}
const express = require('express');
const path = require('path'); // Add this at the top
const app = express();

app.use(express.static('public'));

// ADD THIS ROUTE BELOW
app.get('/transport', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'transport.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
