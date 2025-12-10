## 大生意人

* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251125/41572_12c43b11/3000k/hls/mixed.m3u8')">第1集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251125/41573_e4c72549/3000k/hls/mixed.m3u8')">第2集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251125/41574_2c2cd764/3000k/hls/mixed.m3u8')">第3集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251125/41575_c3a3a3c8/3000k/hls/mixed.m3u8')">第4集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251126/62891_8a3d71a4/3000k/hls/mixed.m3u8')">第5集</button>

* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251126/62892_c9b5df2a/3000k/hls/mixed.m3u8')">第6集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251127/41768_c78c31af/3000k/hls/mixed.m3u8')">第7集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251127/41769_639b1cbf/3000k/hls/mixed.m3u8')">第8集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251128/63072_74d8f6fc/3000k/hls/mixed.m3u8')">第9集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251128/63073_67f17eb9/3000k/hls/mixed.m3u8')">第10集</button>

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
