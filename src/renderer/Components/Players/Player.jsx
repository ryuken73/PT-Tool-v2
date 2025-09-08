/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import MP4Player from './MP4Player';
import HLSJSPlayer from './HLSJSPlayer';
import YoutubeJSPlayer from './YoutubeJSPlayer';

const viewMap = {
  mp4: MP4Player,
  hls: HLSJSPlayer,
  ytb: YoutubeJSPlayer,
};

const mp4RegExp = /.*\.mp4.*/;
const youtubeRegExp = /.*youtube.com\/.*/;

export default function AssetComponent(props) {
  const {
    assetId,
    src,
    srcId,
    show,
    srcIndex,
    objectFit,
    objectPositionLR='50%',
    objectPositionTB='50%',
    scale = 1,
    translateX = 0,
    translateY = 0,
    autoplay=true,
    displayMode,
    isSwipeActive,
  } = props;
  console.log('###', props)
  const source = {
    url: src
  }
  const type = mp4RegExp.test(source.url)
    ? 'mp4'
    : youtubeRegExp.test(source.url)
      ? 'ytb'
      : 'hls';
  const Viewer = viewMap[type];
  return <Viewer source={source} setPlayer={()=>{}} {...props} />;
}
