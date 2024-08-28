import * as React from 'react';

import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

const rawHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Stream Player</title>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</head>
<body>
    <h1>Live Stream Player</h1>
    <video id="video" controls></video>

    <script>
        var video = document.getElementById('video');
        var videoSrc = "{{ stream_url }}";

        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }
    </script>
</body>
</html>
`
const Video = () => (
  <div>
    { <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} /> }
  </div>
)

export default Video