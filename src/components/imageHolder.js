import React from 'react';
import LazyLoad from 'react-lazyload';
import { CircularProgress } from '@mui/material'; 

const LazyImage = ({ src, alt }) => {
  return (
    <LazyLoad height={50} offset={40} placeholder={<CircularProgress />}>
      <img src={src} alt={alt}  height={50} offset={40}/>
    </LazyLoad>
  );
};

export default LazyImage;