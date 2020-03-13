const CSS = require('./gallery.scss');
import * as React from 'react';
import { Thumbnail, ThumbnailProps } from './thumbnail';

type ThumbnailShape = {
  /** A unique identifier for this thumbnail. */
  uuid: string;
  /** The image's source url for small screens. (phones) */
  sourceSmall: string;
  /** The image's source url for medium screens. (tablets, low-end laptops) */
  sourceMedium: string;
  /** The image's source url for large screens. (freestanding monitors) */
  sourceLarge: string;
  /** A very short description of the project that the thumbnail represents. */
  description: ThumbnailProps['altText']
  /** Fires when the thumbnail is clicked, passing a URl. */
  onClick: ThumbnailProps['onClick'];
};

/** For computing the size of the image that will be loaded by a thumbnail. */
type ThumbnailSize = 'SMALL' | 'MEDIUM' | 'LARGE';

/** Props used by the Gallery component. */
export interface GalleryProps {
  /**
   * Information about the thumbnails that should be displayed in the gallery.
   */
  thumbnails: ThumbnailShape[];
  /** The size at which thumbnails should render. */
  thumbnailSize: ThumbnailSize;
}

function computeThumbnailSource (
  size: ThumbnailSize,
  thumbnail: ThumbnailShape
): string {
  switch(size) {
    case 'LARGE':
      return thumbnail.sourceLarge;
    case 'MEDIUM':
      return thumbnail.sourceMedium;
    default:
      return thumbnail.sourceSmall;
  }
}

function mapThumbnails(
  thumbnails: ThumbnailShape[],
  size: ThumbnailSize
): JSX.Element {
  const mapped = thumbnails.map(thumbnail => {
    const {
      description,
      uuid,
      onClick
    } = thumbnail;
    
    const src = computeThumbnailSource(size, thumbnail);

    return(
      <Thumbnail
        key={uuid}
        src={src}
        altText={description}
        onClick={onClick}
      />
    );
  });

  return <>{mapped}</>;
}

function Gallery (props: GalleryProps): JSX.Element {
  const {
    thumbnails,
    thumbnailSize
  } = props;

  const mappedThumbs = mapThumbnails(thumbnails, thumbnailSize);

  return (
    <div className={CSS['root']}>{mappedThumbs}</div>
  );
}

const GALLERY_MEMO = React.memo<GalleryProps>(Gallery);

export { GALLERY_MEMO as Gallery };