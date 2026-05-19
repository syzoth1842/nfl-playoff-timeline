const table = require('./components/table');
const tooltip = require('./components/tooltip');

document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/playoffs.json')
        .then(response => response.json())
        .then(data => {
            const playoffTable = table.createTable(data);
            document.getElementById('playoff-timeline').appendChild(playoffTable);
        })
        .catch(error => console.error('Error fetching playoff data:', error));
});

// Event delegation for tooltip
document.getElementById('playoff-timeline').addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('team')) {
        const teamDetails = event.target.dataset.details;
        tooltip.showTooltip(event.target, teamDetails);
    }
});

document.getElementById('playoff-timeline').addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('team')) {
        tooltip.hideTooltip();
    }
});