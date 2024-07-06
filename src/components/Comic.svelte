<script lang="ts">

import {onMount} from 'svelte';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';


dayjs.extend(relativeTime)

let imageElement_src : string = "";
let imageElement_alt : string = "";
let imgTitle : string = "";
let imgDate : string = "";
let imgPostedFromNow : string = "";

interface ComicResponse {
    img: string;
    transcript: string;
    safe_title: string;
    year: number;
    month: number;
    day: number;
}
onMount(()=>{
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
                    
                    imageElement_src = response.img;
                    imageElement_alt = response.transcript;

                    imgTitle = response.safe_title;

                    const date: Date = new Date(Date.UTC(response.year, response.month - 1, response.day));
                    const options: Intl.DateTimeFormatOptions = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    };
                
                        imgDate = date.toLocaleDateString('en-UK', options);
                        imgPostedFromNow = (dayjs(imgDate)).fromNow();
                    
                })
                .catch((error: Error) => {
                    console.error('Error fetching image:', error);
                });
        })
        .catch((error: Error) => {
            console.error('Error fetching ID data:', error);
        });
})
</script>

<div class="comic">
    <h2 id="imgTitle">{imgTitle}</h2>
        <img id="imageElement" src={imageElement_src} alt={imageElement_alt}>
        <p id="imgDate">{imgDate}</p>
        <p id="imgPostedFromNow">{imgPostedFromNow}</p>
</div>