## 时光音乐会

* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211022/NXQFK3nX/index.m3u8')">时光音乐会01</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211029/Xy7pXyVI/index.m3u8')">时光音乐会02</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211106/PTxz5f1L/index.m3u8')">时光音乐会03</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211113/xI8Wm5fd/index.m3u8')">时光音乐会04</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211119/LZJtHU9T/index.m3u8')">时光音乐会05</button>

* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211127/ahpstwV2/index.m3u8')">时光音乐会06</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211204/cL4besIg/index.m3u8')">时光音乐会07</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211210/O78IzekG/index.m3u8')">时光音乐会08</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211218/H3dtMvoj/index.m3u8')">时光音乐会09</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20211225/v3dwAyNc/index.m3u8')">时光音乐会10</button>

* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20220108/HT0UnGUM/index.m3u8')">时光音乐会11</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20220115/pRvaw5AM/index.m3u8')">时光音乐会12</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20220122/Pbzy4HAY/index.m3u8')">时光音乐会13</button>
* <button class="btn btn-link" onclick="play('https://sod.bunediy.com/20220129/rQXW6hPQ/index.m3u8')">时光音乐会14</button>


---

## 声生不息

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220424/u6CP9GE8/index.m3u8')">声生不息01</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220501/mkKnpQRc/index.m3u8')">声生不息02</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220508/dCYkUOp1/index.m3u8')">声生不息03</button>

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220515/X4IR1tUg/index.m3u8')">声生不息04</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220522/JpRm5csJ/index.m3u8')">声生不息05</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220529/1YZ53bJ0/index.m3u8')">声生不息06</button>

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