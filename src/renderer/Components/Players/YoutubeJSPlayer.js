/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ReloadButton from 'renderer/Components/Common/ReloadButton';
import YouTubePlayer from 'react-player';

const PLAYER_STATUS = {
  normal: 'normal',
  pause: 'pause',
  stalled: 'stalled',
};

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  position: relative;
  background-color: black;
`;

function YoutubePlayer(props, ref) {
  const {
    source = {},
    onClick,
    setPlayer,
    aspectRatio,
    objectFit = 'cover',
    objectPosition = '50% 50%',
    scale = 1,
    translateX = 0,
    translateY = 0,
    show,
    displayMode
  } = props;
  const { url } = source;

  React.useEffect(() => {
    if (!show){
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }, [displayMode, ref, show]);

  const onLoadDataHandler = React.useCallback((event) => {
    // console.log(lastLoaded)
    if (ref.current === null) {
      return;
    };
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(ref.current.duration)) {
      ref.current.play();
    };
  }, [ref]);

  const reloadPlayer = React.useCallback(() => {
    ref.current.load();
  }, [ref]);

  const setPlayerRef = React.useCallback((player) => {
    if(!player) return;
    ref.current = player;
    },
    [ref],
  );

  return (
    <Container>
      <YouTubePlayer
        src={url}
        ref={setPlayerRef}
        muted
        // width="100%"
        height="100%"
        onReady={onLoadDataHandler}
        onClick={onClick}
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '16/9',
          objectFit: 'fill'
        }}
        // onPlay={setPlayerNormal}
        // onPause={setPlayerPaused}
        // onEnded={setPlayerPaused}
        // onError={setPlayerStalled}
      />
      <ReloadButton reload={reloadPlayer} />
    </Container>
  );
}

export default React.memo(React.forwardRef(YoutubePlayer));
