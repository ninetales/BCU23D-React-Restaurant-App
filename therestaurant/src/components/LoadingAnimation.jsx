import React from 'react';

export const LoadingAnimation = () => {
  return (
    <div className="loading-animation ">
      <div className="loading-animation__content">
        <img src="/kitchen-loading.gif" alt="" />
        <span>Loading...</span>
      </div>
    </div>
  );
};
