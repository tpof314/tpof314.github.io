## 欢迎光临

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220519/CHmO2xn7/index.m3u8')">欢迎光临04</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220520/almuP8m1/index.m3u8')">欢迎光临05</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220520/kyz33Mg9/index.m3u8')">欢迎光临06</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220521/BrAZB3pa/index.m3u8')">欢迎光临07</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220522/95RYZu5q/index.m3u8')">欢迎光临08</button>

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220522/Fsyl4QuE/index.m3u8')">欢迎光临09</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220523/4dYcB8ja/index.m3u8')">欢迎光临10</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220523/6SybpPSw/index.m3u8')">欢迎光临11</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220524/oioUkbdi/index.m3u8')">欢迎光临12</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220524/ouEOqwq2/index.m3u8')">欢迎光临13</button>

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220525/5xKWs0LI/index.m3u8')">欢迎光临14</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220525/0rlH2glI/index.m3u8')">欢迎光临15</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220526/XaM68A44/index.m3u8')">欢迎光临16</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220527/p8GwLURu/index.m3u8')">欢迎光临17</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220527/0qib83yL/index.m3u8')">欢迎光临18</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220527/DAA6fqzO/index.m3u8')">欢迎光临19</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220528/PvpfmWsi/index.m3u8')">欢迎光临20</button>

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220529/G6k1F46f/index.m3u8')">欢迎光临21</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20220529/fvyoRuvA/index.m3u8')">欢迎光临22</button>

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