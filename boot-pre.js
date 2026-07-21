// Runtime shim — runs BEFORE the design component.
// Provides DCLogic (the base class the component extends), a lightweight
// <image-slot> element, and an on-brand fallback for any dish image that
// hasn't been dropped in yet.

// DCLogic / StreamableLogic only need setState + lifecycle + renderVals,
// all of which a real React.Component provides.
window.DCLogic = class extends React.Component {
  renderVals() { return {}; }
};
window.StreamableLogic = window.DCLogic;

// Paper-cut "bowl" placeholder, tinted per-dish so the grid stays lively.
window.sundoFallback = function (seed) {
  const cols = ['#CB9C8B', '#8FB3C8', '#7C8A5E', '#C8754E', '#B98A6B', '#A98B6F'];
  let h = 2166136261;
  const s = String(seed || 'sundo');
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; }
  const food = cols[h % cols.length];
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
    "<rect width='100' height='100' fill='#F2E8D5'/>" +
    "<circle cx='71' cy='27' r='10' fill='#C8754E'/>" +
    "<ellipse cx='50' cy='55' rx='27' ry='16' fill='" + food + "'/>" +
    "<path d='M17 57 h66 a33 27 0 0 1 -66 0 Z' fill='#EFE6D2'/>" +
    "<path d='M17 57 h66' stroke='rgba(56,44,36,.16)' stroke-width='1.5'/>" +
    "</svg>";
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

// Any <img> whose dish PNG is missing falls back to the paper-cut bowl.
document.addEventListener('error', function (ev) {
  const t = ev.target;
  if (t && t.tagName === 'IMG' && !t.dataset.fb && /dish-/.test(t.getAttribute('src') || '')) {
    t.dataset.fb = '1';
    t.src = window.sundoFallback(t.getAttribute('src'));
  }
}, true);

// Minimal <image-slot>: renders `src` as a cover image with the requested
// shape; falls back to the paper-cut bowl. (The design's full editor version
// isn't needed outside the canvas.)
class SundoImageSlot extends HTMLElement {
  static get observedAttributes() { return ['src', 'shape', 'radius']; }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this.isConnected) this._render(); }
  _radius() {
    const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
    if (shape === 'circle') return '50%';
    if (shape === 'pill') return '9999px';
    const n = parseFloat(this.getAttribute('radius'));
    return (Number.isFinite(n) ? n : 12) + 'px';
  }
  _render() {
    const src = this.getAttribute('src') || '';
    const r = this._radius();
    this.style.display = this.style.display || 'inline-block';
    this.style.overflow = 'hidden';
    this.style.borderRadius = r;
    if (!this._img) {
      this._img = document.createElement('img');
      this._img.alt = '';
      this._img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
      this._img.addEventListener('error', () => {
        if (this._img.dataset.fb) return;
        this._img.dataset.fb = '1';
        this._img.src = window.sundoFallback(src || this.id);
      });
      this.appendChild(this._img);
    }
    if (this._img.getAttribute('src') !== src) {
      this._img.dataset.fb = '';
      this._img.src = src || window.sundoFallback(this.id);
    }
  }
}
if (!customElements.get('image-slot')) customElements.define('image-slot', SundoImageSlot);
