## 大侠霍元甲


* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/V3jmmsXp/index.m3u8')">大侠霍元甲34</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211028/z5rhywNi/index.m3u8')">大侠霍元甲35</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/2J0fIBGL/index.m3u8')">大侠霍元甲36</button>

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211028/qI1SAQi1/index.m3u8')">大侠霍元甲37</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/nlaM1FjP/index.m3u8')">大侠霍元甲38</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211028/Mz2BsloR/index.m3u8')">大侠霍元甲39</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211028/H8RpwEVz/index.m3u8')">大侠霍元甲40</button>

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/wd0rghZM/index.m3u8')">大侠霍元甲41</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211028/UDlq51cB/index.m3u8')">大侠霍元甲42</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/dzzsaxQi/index.m3u8')">大侠霍元甲43</button>

* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211028/lXh7ofk2/index.m3u8')">大侠霍元甲44</button>
* <button class="btn btn-link" onclick="play('https://new.eduzone.top/20211027/L342v4pT/index.m3u8')">大侠霍元甲45</button>


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