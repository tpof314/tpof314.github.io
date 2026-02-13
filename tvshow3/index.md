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

* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251129/41922_ab1417ec/3000k/hls/mixed.m3u8')">第11集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251129/41923_09a0cc9c/3000k/hls/mixed.m3u8')">第12集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251130/63280_9d5cc282/3000k/hls/mixed.m3u8')">第13集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251130/63281_d2d39ff7/3000k/hls/mixed.m3u8')">第14集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251201/63356_f33413eb/3000k/hls/mixed.m3u8')">第15集</button>

* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251201/63357_bee5ca25/3000k/hls/mixed.m3u8')">第16集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251202/42175_14a479de/3000k/hls/mixed.m3u8')">第17集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251202/42176_788e8dcc/3000k/hls/mixed.m3u8')">第18集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251203/63547_4c80ba4f/3000k/hls/mixed.m3u8')">第19集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251203/63548_22cc9980/3000k/hls/mixed.m3u8')">第20集</button>

* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251204/42356_624de0e2/3000k/hls/mixed.m3u8')">第21集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cinema.com/20251204/42357_59a05c7d/3000k/hls/mixed.m3u8')">第22集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251205/63776_29badebf/3000k/hls/mixed.m3u8')">第23集</button>
* <button class="btn btn-link" onclick="play('https://vip.dytt-cine.com/20251205/63777_1a5ac893/3000k/hls/mixed.m3u8')">第24集</button>

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
