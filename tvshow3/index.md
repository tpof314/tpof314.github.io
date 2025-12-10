## 大生意人

* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/cCmjNytV/1459kb/hls/index.m3u8')">第01集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/6TshPGUj/1339kb/hls/index.m3u8')">第02集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/0MSpPa0u/1372kb/hls/index.m3u8')">第03集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251125/14iO25kp/1343kb/hls/index.m3u8')">第04集</button>

* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251126/g4hFtjEv/1542kb/hls/index.m3u8')">第05集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251126/MYKr9AjD/1302kb/hls/index.m3u8')">第06集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251127/i58JI47Y/1181kb/hls/index.m3u8')">第07集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251127/vXBYJJcA/1215kb/hls/index.m3u8')">第08集</button>

* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251128/VGlZblmS/1152kb/hls/index.m3u8')">第09集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251128/eTNsWXmc/1215kb/hls/index.m3u8')">第10集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251129/MkFDu2O4/1310kb/hls/index.m3u8')">第11集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251129/ykw6l5Pf/1354kb/hls/index.m3u8')">第12集</button>

* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251130/L1E5GLPR/1279kb/hls/index.m3u8')">第13集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251130/GX3VjazA/1265kb/hls/index.m3u8')">第14集</button>
* <button class="btn btn-link" onclick="play('https://bfikuncdn.com/20251201/8U0aMqzO/1269kb/hls/index.m3u8')">第15集</button>

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
  async function play(url) {
    var payload = {
        "video_url": url
    };
    
    var resp = await fetch('https://audiodown.fly.dev/api/play_on_tv', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    console.log(resp);

  }
</script>
