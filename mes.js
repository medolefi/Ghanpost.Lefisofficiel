// Check if a user is logged in
const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'login.html'; // Redirect to login if no user is logged in
}

let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Function to add a new post
document.getElementById('add-post').addEventListener('click', () => {
    const postContent = document.getElementById('post-content').value.trim();

    if (postContent) {
        // Add new post to the posts array
        posts.push({ content: postContent, user: loggedInUser, date: new Date().toLocaleString() });
        // Save the updated posts array to localStorage
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts(); // Reload posts to show the new post
        document.getElementById('post-content').value = ''; // Clear the textarea
    } else {
        alert('Post content cannot be empty.');
    }
});

// Function to load and display posts
function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        // Create a new div for each post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <p><strong>${post.user}</strong> at ${post.date}</p>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postDiv); // Append the post to the container
    });
}

// Load posts when the page is opened
loadPosts();

// Logout functionality
document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser'); // Remove the user session
    window.location.href = 'index.html'; // Redirect to the login page
});




