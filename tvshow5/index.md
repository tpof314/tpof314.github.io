

## 父亲节

* <button class="btn btn-link" onclick="play('https://res.cloudinary.com/handyman/video/upload/v1655636394/video/fathers_day.mp4')">父亲节照片剪辑</button>
* <button class="btn btn-link" onclick="play('https://res.cloudinary.com/handyman/video/upload/v1655636565/video/fathers_day_2.mp4')">父亲节照片剪辑2</button>

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