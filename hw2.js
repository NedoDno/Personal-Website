// Email to be used as query parameter
const userEmail = 'm.ginzburg@innopolis.university';

// URL endpoint with query parameter
const idUrl = `https://fwd.innopolis.university/api/hw2?email=${userEmail}`;
let id;


// Fetch GET request to get the ID
fetch(idUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    id = data;
    console.log('ID retrieved:', id);

    const imageUrl = `https://fwd.innopolis.university/api/comic?id=${id}`;

    // Fetch GET request to get the image
fetch(imageUrl).then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch image data');
  }
  return response.json();
})
.then(response => {
  document.getElementById('imageElement').src = response.img;
  document.getElementById('imageElement').alt = response.transcript;
  document.getElementById('imgTitle').textContent = response.safe_title;
  let date = new Date(Date.UTC(response.year, response.month, response.day));;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  document.getElementById('imgDate').textContent = date.toLocaleDateString('en-UK', options)
})
.catch(error => {
  console.error('Error fetching image:', error);
});
})
.catch(error => {
console.error('Error fetching ID data:', error);
});
