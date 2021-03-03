import { splitAtIndex } from '@blakek/array-split';

export function sourceSet(src: string, maxResolution = 3) {
  const lastDotPosition = src.lastIndexOf('.');
  const [filename, extension] = splitAtIndex(lastDotPosition, src);

  return Array.from({ length: maxResolution }, (_, i) => {
    if (i === 0) return `${src} 1x`;

    const resolution = i + 1;
    return `${filename}@${resolution}x${extension} ${resolution}x`;
  }).join(',');
}
