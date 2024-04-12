const searchEngine = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('show-more');

const accessKey = "XzXpM8GUmFssj8Tj6K-HBlOKnxCh3jUUJLrgjWe-DWg";

let pages = 1;
let keyword = '';

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        const results = data.results;
        if (!results || results.length === 0) {
            throw new Error('No results found.');
        }
        results.forEach((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    showMore.style.display = 'block'
}

searchEngine.addEventListener('submit', (e) => {
    e.preventDefault();
    pages = 1;
    searchResult.innerHTML = ''; // Clear previous results
    searchImages();
});

showMore.addEventListener('click',function(){
    pages++;
    searchImages()
})

document.addEventListener('DOMContentLoaded', () => {
    searchBox.value = ''; // Clear input value
});
