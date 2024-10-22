
// import React from 'react';

const VideoPlayer = ( videoUrl ) => {
  return (
    <div>
      <iframe
        src={videoUrl}
        title="Video Player"
        width="100%"
        height="500px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default VideoPlayer;
