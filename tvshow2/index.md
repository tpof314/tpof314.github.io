## 大侠霍元甲


* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/V3jmmsXp/index.m3u8')">大侠霍元甲34</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211028/z5rhywNi/index.m3u8')">大侠霍元甲35</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/2J0fIBGL/index.m3u8')">大侠霍元甲36</button>


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