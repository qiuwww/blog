import Quill from 'quill'
let Parchment = Quill.import('parchment');
class lineHeightAttributor extends Parchment.Attributor.Style {}
let lineHeight = new lineHeightAttributor('lineHeight', 'line-height', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['1', '1.5','1.8','2','2.5','2.6','2.7','2.8','2.9','3']
});
Quill.register({ "formats/lineHeight": lineHeight }, true);

export default lineHeight;
