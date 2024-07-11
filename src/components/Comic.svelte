<script lang="ts">
    import type { SSRComicResponse } from "../routes/comic/+page.server.ts";
    export let comicInfo :SSRComicResponse;
</script>

<div class="comic">
    <h2 id="imgTitle">{comicInfo.imgTitle}</h2>
        <img id="imageElement" src={comicInfo.imageElement_src} alt={comicInfo.imageElement_alt}>
        <p id="imgDate">{comicInfo.imgDate}</p>
        <p id="imgPostedFromNow">{comicInfo.imgPostedFromNow}</p>
</div>