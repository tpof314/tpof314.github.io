## 播放器

<video class="my-video" id="video" controls></video>

<style>
section.page-header {
    display: none;    
}
</style>
<script src="/js/hls.js"></script>
<script>
  document.title = "播放器"

  function get_video_url() {
    var queryString = window.location
    var urlParams = new URLSearchParams(queryString)
    var url = urlParams.get("url")
    return url
  }

  function playVideo(video_url) {
    var video = document.getElementById('video');

    // Reset video time
    video.currentTime = 0

    // 1. Handle MP4 files
    if (video_url.indexOf(".mp4") > 5) {
      video.src = video_url;
      video.addEventListener('canplay', function () {
        video.muted = false;
        video.play();
        pause = false;
      });
      return ;
    }

    // 2. Handle m3u8 streams
    if (Hls.isSupported()) {
      var hls = new Hls({
        debug: false,
      });
      hls.loadSource(video_url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        video.muted = false;
        video.play();
        pause = false;
      });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = video_url;
      video.addEventListener('canplay', function () {
        video.muted = false;
        video.play();
        pause = false;
      });
    }
  }

  window.onload = function() {
    const video_url = get_video_url()
    playVideo(video_url)
  }
</script>
