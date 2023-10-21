const API_KEY = "AIzaSyBtpCmb4WHmKy3I10fzVprfjfW172m8ZnQ";
const searchForm = document.getElementById("form");
const containerVideo = document.getElementById("container-videos");

const getYoutubeVideos = (query) =>
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${query}&type=video`
  );

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(searchForm);
  const videoName = formData.get("video-name");
  const response = getYoutubeVideos(videoName);
  const videosIDs = [];
  response
    .then((result) => result.json())
    .then((videos) => {
      console.log(videos);
      videos.items.forEach((video) => videosIDs.push(video.id.videoId));
    })
    .then(() => {
      videosIDs.forEach((videoID) => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="col">
        <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoID}" 
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        ></iframe>
        </div>`;
        containerVideo.appendChild(card);
      });
    });
});
