import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TopBottomIcon from '@mui/icons-material/ImportExport';
import LeftRightIcon from '@mui/icons-material/CompareArrows';
import Badge, { badgeClasses } from '@mui/material/Badge';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayDisabledIcon from '@mui/icons-material/PlayDisabled';
import MenuImageO from 'renderer/assets/menu_org.png';
import useAssetState from 'renderer/hooks/useAssetState';
import useMessageBox from 'renderer/hooks/useMessageBox';
// import usePlayerEvent from 'renderer/hooks/usePlayerEvent';

const Container = styled.div`
  position: absolute;
  top: ${(props) => !props.isBottomSide && '30px'};
  bottom: ${(props) => props.isBottomSide && '30px'};
  left: ${(props) => !props.isRightSide && '30px'};
  right: ${(props) => props.isRightSide && '30px'};
  z-index: 20000;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  background: #444;
  /* background: ${(props) => (props.isPlaying ? 'red' : '#444')}; */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  font-size: 20px;
  opacity: 0.3;
  text-align: left;
  & > * {
    float: left;
  }
`;
const ToggleButton = styled.input`
  display: block;
  cursor: pointer;
  opacity: 0;
  z-index: 20000;
  margin: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  &:checked ~ ul {
    width: 500px;
    // background-position: 0px -50px;
  }
`;
const ButtonList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 0 0 50px;
  height: 50px;
  width: 0px;
  transition: 0.5s width ease;
  background-image: url(${MenuImageO});
  background-repeat: no-repeat;
`;
const CustomButton = styled.li`
  display: inline-block;
  line-height: 50px;
  width: 50px;
  text-align: center;
  margin: 0;
  a {
    font-size: 1.25em;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
`;

function CSSToggleMenuImage(props) {
  // eslint-disable-next-line react/prop-types
  const {
    assetId,
    srcId,
    objectFit,
    objectPositionLR,
    objectPositionTB,
    isFirstImage,
    displayMode,
    scale,
    translateX,
    translateY,
    autoplay = true,
  } = props;
  const { updateCurrentAssetSrc } = useAssetState();
  const { showMessageBox } = useMessageBox();
  // const { isPlaying } = usePlayerEvent(assetId, srcId);
  const isToggleBtnRightSide =
    !isFirstImage &&
    (displayMode === 'overlaySplit' ||
      displayMode === 'flexRow' ||
      displayMode === 'flexColumn');
  const isToggleBtnDownSide = !isFirstImage && displayMode === 'flexColumn';

  const toggleObjectFit = React.useCallback(() => {
    if (objectFit === undefined) {
      updateCurrentAssetSrc(srcId, 'objectFit', 'cover');
      return;
    }
    if (objectFit === 'cover') {
      updateCurrentAssetSrc(srcId, 'objectFit', 'contain');
      return;
    }
    if (objectFit === 'contain') {
      updateCurrentAssetSrc(srcId, 'objectFit', 'none');
      return;
    }
    updateCurrentAssetSrc(srcId, 'objectFit', 'cover');
  }, [objectFit, srcId, updateCurrentAssetSrc]);

  const toggleObjectPositionLR = React.useCallback(() => {
    if (objectPositionLR === undefined) {
      updateCurrentAssetSrc(srcId, 'objectPositionLR', '50%');
      return;
    }
    if (objectPositionLR === '50%') {
      updateCurrentAssetSrc(srcId, 'objectPositionLR', 'right');
      return;
    }
    if (objectPositionLR === 'right') {
      updateCurrentAssetSrc(srcId, 'objectPositionLR', 'left');
      return;
    }
    if (objectPositionLR === 'left') {
      updateCurrentAssetSrc(srcId, 'objectPositionLR', '50%');
    }
  }, [objectPositionLR, srcId, updateCurrentAssetSrc])
  const toggleObjectPositionTB = React.useCallback(() => {
    if (objectPositionTB === undefined) {
      updateCurrentAssetSrc(srcId, 'objectPositionTB', '50%');
      return;
    }
    if (objectPositionTB === '50%') {
      updateCurrentAssetSrc(srcId, 'objectPositionTB', 'bottom');
      return;
    }
    if (objectPositionTB === 'bottom') {
      updateCurrentAssetSrc(srcId, 'objectPositionTB', 'top');
      return;
    }
    if (objectPositionTB === 'top') {
      updateCurrentAssetSrc(srcId, 'objectPositionTB', '50%');
    }
  }, [objectPositionTB, srcId, updateCurrentAssetSrc]);

  const zoomIn = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'scale', scale + 0.05);
  }, [scale, srcId, updateCurrentAssetSrc]);

  const zoomOut = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'scale', scale - 0.05);
  }, [scale, srcId, updateCurrentAssetSrc]);

  const moveLeft = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateX', translateX - 1);
  }, [srcId, translateX, updateCurrentAssetSrc]);

  const moveRight = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateX', translateX + 1);
  }, [srcId, translateX, updateCurrentAssetSrc]);

  const moveUp = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateY', translateY - 1);
  }, [srcId, translateY, updateCurrentAssetSrc]);

  const moveDown = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateY', translateY + 1);
  }, [srcId, translateY, updateCurrentAssetSrc]);

  const toggleAutoPlay = React.useCallback(() => {
    if (autoplay) {
      showMessageBox('autoplay disabled!', 1000, 'error');
    } else {
      showMessageBox('autoplay enabled!');
    }
    updateCurrentAssetSrc(srcId, 'autoplay', !autoplay);
  }, [autoplay, showMessageBox, srcId, updateCurrentAssetSrc]);

  return (
    <Container
      isRightSide={isToggleBtnRightSide}
      isBottomSide={isToggleBtnDownSide}
      // isPlaying={isPlaying}
    >
      <ToggleButton type="checkbox" />
      <ButtonList>
        <CustomButton>
          <IconButton onClick={toggleObjectFit}>
            <AspectRatioIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={toggleObjectPositionLR}>
            <LeftRightIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
            <Badge
              badgeContent={objectPositionLR}
              color="primary"
              sx={{
                top: '-12px',
                right: '-6px'
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={toggleObjectPositionTB}>
            <TopBottomIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
            <Badge
              badgeContent={objectPositionTB}
              color="primary"
              sx={{
                top: '-12px',
                right: '-6px'
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={zoomIn}>
            <AddIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={zoomOut}>
            <RemoveIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveLeft}>
            <ArrowBackIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveRight}>
            <ArrowForwardIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveUp}>
            <ArrowUpwardIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveDown}>
            <ArrowDownwardIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={toggleAutoPlay}>
            {autoplay ? (
              <PlayArrowIcon
                sx={{
                  fontSize: 30,
                  color: 'white',
                  opacity: 1,
                  borderRadius: '5px',
                }}
              />) : (
              <PlayDisabledIcon
                sx={{
                  fontSize: 30,
                  color: 'white',
                  opacity: 1,
                  borderRadius: '5px',
                }}
              />
            )}
          </IconButton>
        </CustomButton>
      </ButtonList>
    </Container>
  );
}

export default React.memo(CSSToggleMenuImage);
