// JavaScript code here

// Add event listener to the randomize button
const randomizeBtn = document.getElementById('randomizeBtn');

randomizeBtn.addEventListener('click', async () => {
  try {
    // Fetch the data for Model 1
    const data = await fetchData('TWlinks.txt');

    // Randomize the data
    const randomizedData = shuffleArray(data);

    // Display the randomized data without duplicates
    displayRandomData(randomizedData);
  } catch (error) {
    console.error('Error:', error);
  }
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

  const limitedData = data.slice(0, 5); // Limit the data to five items

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

        const openLinkBtn = document.createElement('button');
        openLinkBtn.textContent = 'Open in New Tab';
        openLinkBtn.classList.add('open-link-btn');
        openLinkBtn.addEventListener('click', (event) => {
          if (event.ctrlKey || event.metaKey) {
            // If Ctrl key (Windows) or Command key (Mac) is pressed, open link in new tab without losing focus
            openInNewTabWithoutLosingFocus(item);
          } else {
            // Otherwise, open link in new tab and switch focus to it
            openInNewTab(item);
          }
          listItem.classList.add('used'); // Add 'used' class to indicate the item has been opened
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
}

// Open link in new tab without losing focus on the current page
function openInNewTabWithoutLosingFocus(url) {
  const newTab = window.open('about:blank', '_blank');
  newTab.location.href = url;
}

// Open link in new tab
function openInNewTab(url) {
  const newTab = window.open(url, '_blank');
  newTab.focus();
}

// Add hidden Easter egg
document.addEventListener('keydown', (event) => {
  if (event.key === 'E' && event.ctrlKey && event.shiftKey) {
    const hiddenEasterEgg = document.querySelector('.hidden-easter-egg');
    hiddenEasterEgg.style.display = 'block';
    surpriseUser();
  }
});

// Function to surprise the user
function surpriseUser() {
  // Add your surprising code here
  alert('Surprise! You found the Easter egg!');
}
a