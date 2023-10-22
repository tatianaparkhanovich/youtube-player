const API_KEY = "AIzaSyBtpCmb4WHmKy3I10fzVprfjfW172m8ZnQ";
const searchForm = document.getElementById("form");
const containerVideo = document.getElementById("container-videos");
const input = document.getElementById("input");
const spinner = `<div class="col-12 d-flex justify-content-center "><div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>`;

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
  containerVideo.innerHTML = spinner;

  response
    .then((result) => result.json())
    .then((videos) => {
      console.log(videos);
      videos.items.forEach((video) => videosIDs.push(video.id.videoId));
    })
    .then(() => {
      containerVideo.innerHTML = "";
      if (!videosIDs.length) {
        containerVideo.innerHTML = `<h5 class="col-12 text-center">Videos not found</h5>`;
        input.value = "";
      } else {
        videosIDs.forEach((videoID) => {
          const card = document.createElement("div");
          card.innerHTML = `<div class="col">
        <iframe width="356" height="200" src="https://www.youtube.com/embed/${videoID}" 
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        ></iframe>
        </div>`;
          containerVideo.appendChild(card);
          input.value = "";
        });
      }
    });
});
