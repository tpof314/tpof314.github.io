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

* <button class="btn btn-link" onclick="play('https://qycache.hs-mould.cn/cache/800e751d817bf0db94460af4e723619f/dryZtpQy5cMwc2xL-VeCZrJKwnAdudcUwjZlB6a6KdJ2-8EEOiXMFuoXfbTNLIrZF9ZbAdaI_UX9a4N8EInmnQ/index.m3u8')">声生不息01</button>
* <button class="btn btn-link" onclick="play('https://qycache.hs-mould.cn/cache/344c8c367bfe86613d60a86c75c5637c/vyMWgFGAX5duoFqcNTvbutuHMiUD9JJC8zUPfzI3DgLaFBk_ePr7VKSjsN8dyl9F8bAe48Qg42Dv-O_Hq21mIQ/index.m3u8')">声生不息02</button>
* <button class="btn btn-link" onclick="play('https://qycache.hs-mould.cn/cache/0476ae2afaac2df77ba6c52e7d4198d7/TCmFlbSfg-5n-SPo2nfn9koaN9uoQw3Wek687dZgYABg8YPG4gj18wWVmzVKOV0rpgjAJdbcD2S7RCZrnHEp4Q/index.m3u8')">声生不息03</button>
* <button class="btn btn-link" onclick="play('https://qycache.hs-mould.cn/cache/15b24ba9f5bef4b0492295f54f0dc7fd/Cx77gTLe4IFFXprvb_kMdcN3PN-nyBMhqnV-JMDWVi9xrDL4Qo_mfHcJZzzPwpuP4LH3mDSfEdgxzRcESCTNUQ/index.m3u8')">声生不息04</button>
* <button class="btn btn-link" onclick="play('https://qycache.hs-mould.cn/cache/9c7d4ba27041557ae2c79795afd9f698/aCPcxkqTsTrL8nneQsecT90mtrDU1F8SZLIv9f8JGmoCyA_uQHlCIgw3DdYplsUXDC4uLufvu3R7btErEaBpgA/index.m3u8')">声生不息05</button>
* <button class="btn btn-link" onclick="play('https://sod.kuaibocaiji.com/20220529/PrYdQRKI/index.m3u8')">声生不息06</button>

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