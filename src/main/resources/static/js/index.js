console.log("inside index.js")

    // Get the elements by their IDs
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const text3 = document.getElementById('text3');

    // Function to toggle visibility of headings
    function toggleHeadings() {
    if (text1.style.display === 'block') {
    text1.style.display = 'none';
    text2.style.display = 'block';
} else if (text2.style.display === 'block') {
    text2.style.display = 'none';
    text3.style.display = 'block';
} else {
    text3.style.display = 'none';
    text1.style.display = 'block';
}
}








// Call toggleHeadings every 3 seconds (3000 milliseconds)
    setInterval(toggleHeadings, 3000);


