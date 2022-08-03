
## 电影

* <button class="btn btn-link" onclick="play('https://xlzycdn1.sy-precise.com:65/20220802/N4gsLyzX/2602kb/hls/index.m3u8')">小黄人大眼萌2</button>


<style>
  .btn-link {
    background: hsl(171, 100%, 41%);
  }

  .btn-link:hover {
    background: hsl(48, 100%, 67%);
  }

  ul {
    list-style-type: none;
  }

  section.page-header {
    display: none;    
	}
</style>

<script>
  document.title = "电影";

  function play(url) {
    window.location.href = "/tv/?url=" + url;
  }
</script>
