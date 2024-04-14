document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
  
    fetch('http://your-server-url/db.json')
      .then(response => response.json())
      .then(data => {
        data.pups.forEach(pup => {
          const span = document.createElement('span');
          span.textContent = pup.name;
          span.addEventListener('click', () => showPupInfo(pup));
          dogBar.appendChild(span);
        });
      });
  
    function showPupInfo(pup) {
      dogInfo.innerHTML = ''; 
      const img = document.createElement('img');
      img.src = pup.image;
  
      const h2 = document.createElement('h2');
      h2.textContent = pup.name;
  
      const button = document.createElement('button');
      button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
      button.addEventListener('click', () => toggleGoodDog(pup));
  
      dogInfo.appendChild(img);
      dogInfo.appendChild(h2);
      dogInfo.appendChild(button);
    }
  
    function toggleGoodDog(pup) {
      pup.isGoodDog = !pup.isGoodDog;
      fetch(`http://your-server-url/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isGoodDog: pup.isGoodDog })
      })
      .then(response => response.json())
      .then(data => {
        const button = dogInfo.querySelector('button');
        button.textContent = data.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
      })
      .catch(error => console.error('Error toggling good dog:', error));
    }
  });
  