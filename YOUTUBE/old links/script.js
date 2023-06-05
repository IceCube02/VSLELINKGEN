// JavaScript code here

// Add event listener to the randomize button
const randomizeBtn = document.getElementById('randomizeBtn');
const resetBtn = document.getElementById('resetBtn');

randomizeBtn.addEventListener('click', async () => {
  try {
    // Fetch the data for Model 1
    let data = [];
    const storedData = localStorage.getItem('randomizedData');
    
    if (storedData) {
      data = JSON.parse(storedData);
    } else {
      data = await fetchData('ytoldlinks.txt');
      localStorage.setItem('randomizedData', JSON.stringify(data));
    }

    // Randomize the data
    const randomizedData = shuffleArray(data);

    // Display the randomized data without duplicates
    displayRandomData(randomizedData);
  } catch (error) {
    console.error('Error:', error);
  }
});

resetBtn.addEventListener('click', () => {
  localStorage.removeItem('randomizedData');
  location.reload();
});

// Fetch the data from the desired source
async function fetchData(url) {
  // Simulate fetching data from an API or file
  // Replace this with your actual data retrieval logic

  // For example, you can fetch data from an API using fetch()
  const response = await fetch(url);
  const text = await response.text();
  const data = text.split('\n').filter(line => line.trim() !== '');

  return data;
}

// Shuffle an array in place using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Display the randomized data without duplicates
function displayRandomData(data) {
  const dataList = document.getElementById('dataList');
  dataList.innerHTML = '';

  const numItemsInput = document.getElementById('numItemsInput');
  const numItems = numItemsInput.value;

  const limitedData = data.slice(0, numItems);

  const uniqueItems = new Set(); // Set to store unique items

  if (limitedData.length === 0) {
    const listItem = document.createElement('li');
    listItem.textContent = 'No data available';
    listItem.classList.add('data-list-item');
    dataList.appendChild(listItem);
  } else {
    limitedData.forEach(item => {
      // Check if the item is unique
      if (!uniqueItems.has(item)) {
        uniqueItems.add(item); // Add item to the set of unique items

        const listItem = document.createElement('li');
        listItem.classList.add('data-list-item');

        const span = document.createElement('span');
        span.textContent = item;
        listItem.appendChild(span);

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.classList.add('copy-btn');
        copyBtn.addEventListener('click', () => {
          copyToClipboard(item);
          copyBtn.classList.add('copied');
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 1300);
        });
        listItem.appendChild(copyBtn);

        const openLinkBtn = document.createElement('button');
        openLinkBtn.textContent = 'Open in New Tab';
        openLinkBtn.classList.add('open-link-btn');
        openLinkBtn.addEventListener('click', () => {
          openInNewTab(item);
        });
        listItem.appendChild(openLinkBtn);

        dataList.appendChild(listItem);
      }
    });
  }

  const openAllBtn = document.getElementById('openAllBtn');
  if (limitedData.length > 0) {
    openAllBtn.style.display = 'block';
    openAllBtn.removeEventListener('click', openAllInNewTabs); // Remove previously attached event listener
    openAllBtn.addEventListener('click', () => {
      const dataListItems = document.querySelectorAll('.data-list-item');
      const currentData = Array.from(dataListItems).map(item => item.firstChild.textContent);
      openAllInNewTabs(currentData);
    });
  } else {
    openAllBtn.style.display = 'none';
  }

  const messageContainer = document.getElementById('messageContainer');
  messageContainer.textContent = limitedData.length === 0 ? 'All data has been used.' : '';
}

// Copy text to clipboard
function copyToClipboard(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}

// Open link in new tab
function openInNewTab(url) {
  const newTab = window.open(url, '_blank');
  newTab.focus();
}

