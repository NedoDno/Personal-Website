import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';


dayjs.extend(relativeTime)

interface ComicResponse {
    img: string;
    transcript: string;
    safe_title: string;
    year: number;
    month: number;
    day: number;
}

const userEmail: string = 'm.ginzburg@innopolis.university';

const idUrl: string = `https://fwd.innopolis.university/api/hw2?email=${userEmail}`;
let id: number;

fetch(idUrl)
    .then((response: Response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data: number) => {
        id = data;
        console.log('ID retrieved:', id);

        const imageUrl: string = `https://fwd.innopolis.university/api/comic?id=${id}`;

        fetch(imageUrl)
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch image data');
                }
                return response.json();
            })
            .then((response: ComicResponse) => {
                const image = document.getElementById('imageElement');
                if (image === null) {
                    alert('oops');
                }
                else {
                    image.setAttribute('src', response.img);
                    image.setAttribute('alt', response.transcript);
                }
                const title = document.getElementById('imgTitle');
                if (title === null) {
                    alert('oops');
                }
                else {
                    title.textContent = response.safe_title;
                }

                const date: Date = new Date(Date.UTC(response.year, response.month - 1, response.day));
                const options: Intl.DateTimeFormatOptions = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };
                const img_date = document.getElementById('imgDate');
                if (img_date === null) {
                    alert('oops');
                }
                else {
                    img_date.textContent = date.toLocaleDateString('en-UK', options);
                    const img_from_now = document.getElementById('imgPostedFromNow');
                    if (img_from_now === null) {
                        alert('oops');
                    } else {
                        img_from_now.textContent = (dayjs(img_date.textContent)).fromNow();
                    }
                }
            })
            .catch((error: Error) => {
                console.error('Error fetching image:', error);
            });
    })
    .catch((error: Error) => {
        console.error('Error fetching ID data:', error);
    });
