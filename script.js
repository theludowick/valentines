// Function to handle Yes button click
function sayYes() {
    window.location.href = 'yes.html';
}

// Get the No button
const noBtn = document.getElementById('noBtn');

// Function to move the No button away from cursor
function moveButton(e) {
    const btn = e.target;
    const btnRect = btn.getBoundingClientRect();
    
    // Get cursor position relative to button
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    // Calculate distance from cursor to button center
    const distanceX = e.clientX - btnCenterX;
    const distanceY = e.clientY - btnCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If cursor is close enough, move the button
    if (distance < 100) {
        // Get container dimensions
        const container = document.querySelector('.buttons');
        const containerRect = container.getBoundingClientRect();
        
        // Calculate new position (opposite direction from cursor)
        let newX = btnRect.left - distanceX * 0.5;
        let newY = btnRect.top - distanceY * 0.5;
        
        // Keep button within viewport
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;
        
        newX = Math.max(20, Math.min(newX, maxX));
        newY = Math.max(20, Math.min(newY, maxY));
        
        // Apply new position
        btn.style.position = 'fixed';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
    }
}

// Function to jump button to a nearby position
function jumpToNearbyPosition(currentX, currentY, btnWidth, btnHeight) {
    const jumpDistance = 100; // How far to jump (in pixels)
    
    // Pick a random direction: 0=left, 1=right, 2=up, 3=down
    const direction = Math.floor(Math.random() * 4);
    
    let newX = currentX;
    let newY = currentY;
    
    switch(direction) {
        case 0: // Left
            newX = currentX - jumpDistance;
            break;
        case 1: // Right
            newX = currentX + jumpDistance;
            break;
        case 2: // Up
            newY = currentY - jumpDistance;
            break;
        case 3: // Down
            newY = currentY + jumpDistance;
            break;
    }
    
    // Keep button within viewport
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;
    
    newX = Math.max(20, Math.min(newX, maxX));
    newY = Math.max(20, Math.min(newY, maxY));
    
    return { x: newX, y: newY };
}

// Add mousemove event listener to the entire document
document.addEventListener('mousemove', function(e) {
    if (!noBtn) return;
    
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    const distanceX = e.clientX - btnCenterX;
    const distanceY = e.clientY - btnCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Detection radius - jump if cursor gets within 100px
    if (distance < 100) {
        // Jump to a nearby position (left, right, up, or down)
        const newPos = jumpToNearbyPosition(btnRect.left, btnRect.top, btnRect.width, btnRect.height);
        
        // Instantly jump (no transition)
        noBtn.style.position = 'fixed';
        noBtn.style.transition = 'none';
        noBtn.style.left = newPos.x + 'px';
        noBtn.style.top = newPos.y + 'px';
    }
});

// Prevent clicking the No button (just for fun)
if (noBtn) {
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Move it away when clicked
        const newX = Math.random() * (window.innerWidth - 150);
        const newY = Math.random() * (window.innerHeight - 80);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    });
}

