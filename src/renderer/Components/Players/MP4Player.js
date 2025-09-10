/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: black;
  aspect-ratio: 16/9;
`;

const CustomVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
  object-position: ${props => props.objectPosition};
  transform: ${(props)=> `scale(${props.scale}) translateX(${props.translateX}%) translateY(${props.translateY}%)`};
`;

function MP4Player(props) {
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
  } = props;

  const playerRef = React.useRef(null);
  const { url } = source;

  const [reloadTrigger, setReloadTrigger] = React.useState(true);

  const onLoadDataHandler = React.useCallback((event) => {
    // console.log(lastLoaded)
    if (playerRef.current === null) {
      return;
    }
    // console.log('loadedMetadata mp4', playerRef.current.duration);
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(playerRef.current.duration)) {
      playerRef.current.play();
    }
  }, []);

  React.useLayoutEffect(() => {
    if (playerRef.current === null) {
      return;
    }
    playerRef.current.addEventListener('loadedmetadata', onLoadDataHandler);
    // eslint-disable-next-line consistent-return
    return () => {
      if (playerRef.current === null) return;
      playerRef.current.removeEventListener(
        'loadedmetadata',
        onLoadDataHandler,
      );
    };
  }, [onLoadDataHandler, setPlayer]);

  React.useEffect(() => {
    // console.log('reload while get next player: ', lastLoaded, cctvIndex);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    // console.log('reload mp4 player', lastLoaded)
    setReloadTrigger((reloadTrigger) => {
      return !reloadTrigger;
    });
    // console.log(playerRef.current)
    playerRef.current.load();
  }, []);

  return (
    <Container>
      <CustomVideo
        src={url}
        autoPlay={reloadTrigger}
        ref={playerRef}
        muted
        width="100%"
        crossOrigin="anonymous"
        controls
        aspectRatio={aspectRatio}
        objectFit={objectFit}
        objectPosition={objectPosition}
        scale={scale}
        translateX={translateX}
        translateY={translateY}
        onClick={onClick}
      />
    </Container>
  );
}

export default React.memo(MP4Player);
