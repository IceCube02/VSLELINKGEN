function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayRandomData(data) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';
    shuffleArray(data);
    for (let i = 0; i < 5; i++) {
      const li = document.createElement('li');
      li.textContent = data[i];
      dataList.appendChild(li);
    }
  }
  
  const randomizeBtn = document.getElementById('randomizeBtn');
  randomizeBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('DATABASE FILES.txt');
      const text = await response.text();
      const data = text.split('\n').filter(line => line.trim() !== '');
      displayRandomData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  });
  

  