import React from 'react';
import PropTypes from 'prop-types';

const SnippetPreviewMedia = ({
  title,
  previewImage,
  className,
  fallbackLabel,
  showStatus,
}) => {
  return (
    <div className={className} data-has-video="false">
      <div className="media-shell">
        <img
          src={previewImage}
          alt={`${title} preview`}
          className="media-image"
          loading="lazy"
          style={{ transform: 'scale(1.25)' }}
        />
      </div>

      {showStatus && (
        <span className="media-status">{fallbackLabel}</span>
      )}
    </div>
  );
};

SnippetPreviewMedia.propTypes = {
  title: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallbackLabel: PropTypes.string,
  showStatus: PropTypes.bool,
  slug: PropTypes.string,
  previewVideo: PropTypes.string,
};

SnippetPreviewMedia.defaultProps = {
  className: 'media-frame',
  fallbackLabel: 'preview',
  showStatus: false,
};

export default SnippetPreviewMedia;
