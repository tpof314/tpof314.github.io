## 节目

* <button class="btn btn-link" onclick="play('https://b.baobuzz.com/m3u8/22625.m3u8?sign=43d4a655a026be178983958582b9c4ec')">大侠霍元甲21</button>
* <button class="btn btn-link" onclick="play('https://b.baobuzz.com/m3u8/22626.m3u8?sign=d802fb300ae72b6dc6e69edbe3249e4e')">大侠霍元甲22</button>
* <button class="btn btn-link" onclick="play('https://b.baobuzz.com/m3u8/22627.m3u8?sign=a78b2eba4318c56097b8f14e44c9cab0')">大侠霍元甲23</button>
* <button class="btn btn-link" onclick="play('https://b.baobuzz.com/m3u8/22628.m3u8?sign=e41a3c3e76fede34dda403434edfe2ab')">大侠霍元甲24</button>


<style>
  .btn-link {
    background: hsl(171, 100%, 41%);
  }

  .btn-link:hover {
    background: hsl(48, 100%, 67%);
  }
</style>

<script>
  function play(url) {
    var payload = {
        "video_url": url
    };

    fetch('https://ofhnindco6.execute-api.ap-southeast-2.amazonaws.com/video_pub', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(resp => console.log(resp));
  }
</script>