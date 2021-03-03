import test from 'ava';
import { sourceSet } from '.';

test('returns source-set string for images', t => {
  t.is(
    sourceSet('/test.png', 3),
    '/test.png 1x,/test@2x.png 2x,/test@3x.png 3x'
  );

  t.is(sourceSet('/blah.png', 2), '/blah.png 1x,/blah@2x.png 2x');

  t.is(
    sourceSet('/deeply/nesting/test.ing/img.png', 4),
    '/deeply/nesting/test.ing/img.png 1x,/deeply/nesting/test.ing/img@2x.png 2x,/deeply/nesting/test.ing/img@3x.png 3x,/deeply/nesting/test.ing/img@4x.png 4x'
  );

  t.is(sourceSet('/test.png'), '/test.png 1x,/test@2x.png 2x,/test@3x.png 3x');
});
