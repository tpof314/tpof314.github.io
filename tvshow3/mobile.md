## 大生意人

* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/cCmjNytV/1459kb/hls/index.m3u8')">第01集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/6TshPGUj/1339kb/hls/index.m3u8')">第02集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/0MSpPa0u/1372kb/hls/index.m3u8')">第03集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/14iO25kp/1343kb/hls/index.m3u8')">第04集</button>

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

</style>

<script>
  function play(url) {
    window.location.href = "/tv/?url=" + url;
  }
</script>
