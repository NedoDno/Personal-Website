import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import type { PageServerLoad } from "./$types";
import type { PageData } from "../$types";

dayjs.extend(relativeTime);

interface SSRComicResponse {
  imageElement_src: string;
  imageElement_alt: string;
  imgTitle: string;
  imgDate: string;
  imgPostedFromNow: string;
}

interface ComicResponse {
  img: string;
  transcript: string;
  safe_title: string;
  year: number;
  month: number;
  day: number;
}

export const load: PageServerLoad = async ({ fetch }) => {
  const userEmail: string = "m.ginzburg@innopolis.university";
  const idUrl: string = `https://fwd.innopolis.university/api/hw2?email=${userEmail}`;
  let id: number;

  const imageUrl: string = await fetch(idUrl)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data: number) => {
      id = data;
      console.log("ID retrieved:", id);

      const imageUrl_: string = `https://fwd.innopolis.university/api/comic?id=${id}`;
      return imageUrl_;
    })
    .catch((error: Error) => {
      console.error("Error fetching ID data:", error);
      return "";
    });
  if (imageUrl != "") {
    const comicInfo: SSRComicResponse = await fetch(imageUrl)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image data");
        }
        return response.json();
      })
      .then((response: ComicResponse) => {
        const comicInfo_: SSRComicResponse = {
          imageElement_src: "",
          imageElement_alt: "",
          imgTitle: "",
          imgDate: "",
          imgPostedFromNow: "",
        } as SSRComicResponse;

        comicInfo_.imageElement_src = response.img;
        comicInfo_.imageElement_alt = response.transcript;
        comicInfo_.imgTitle = response.safe_title;

        const date: Date = new Date(
          Date.UTC(response.year, response.month - 1, response.day),
        );
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        comicInfo_.imgDate = date.toLocaleDateString("en-UK", options);
        comicInfo_.imgPostedFromNow = dayjs(comicInfo_.imgDate).fromNow();
        return comicInfo_;
      })
      .catch((error: Error) => {
        console.error("Error fetching image:", error);
        return {} as SSRComicResponse;
      });
    console.log(comicInfo);
    return {
      comicInfo,
    } as PageData;
  }
};
