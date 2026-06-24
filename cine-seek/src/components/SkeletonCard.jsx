import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster"></div>
      <div className="skeleton-info">
        <div className="skeleton-text meta"></div>
        <div className="skeleton-text title"></div>
        <div className="skeleton-text meta" style={{ width: '30%' }}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
