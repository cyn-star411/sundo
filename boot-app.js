// App shell — runs AFTER the design component. Adds tab navigation, a Cart
// (grocery) screen assembled from the design's grocery pieces, and mounts.
(function () {
  const e = React.createElement;

  class SundoApp extends Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, this.state, { tab: 'home', prevTab: 'home' });
    }

    // Tapping a dish (anywhere) opens the recipe detail as a pushed screen.
    openRecipe(name) {
      const cur = this.state.tab;
      super.openRecipe(name);
      this.setState({ tab: 'recipe', prevTab: cur === 'recipe' ? this.state.prevTab : cur });
    }

    goTab(tab) { this.setState({ tab }); }

    // Cart / grocery — the design renders this via template pieces; assemble them.
    renderCart() {
      const C = this.C;
      return e('div', { style: { height: '100%', display: 'flex', flexDirection: 'column' } },
        this.statusBar(false),
        e('div', { key: 'top', style: { padding: '14px 26px 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' } },
          e('div', { style: { width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(56,44,36,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: C.sumi } }, '↑')),
        e('div', { key: 'hd', style: { padding: '12px 26px 0', flex: '0 0 auto' } },
          e('div', { style: { fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 32, color: C.sumi } }, 'Grocery list'),
          e('div', { style: { display: 'flex', gap: 16, marginTop: 8, fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 13, color: '#9a8a76' } }, this.renderGrocerySub())),
        e('div', { key: 'bd', style: { flex: 1, overflowY: 'auto', padding: '14px 26px 8px' } }, this.renderGroceryBody()));
    }

    tabIcon(kind, col) {
      const cc = 'currentColor';
      const wrap = (children) => e('span', { style: { display: 'inline-flex', flexDirection: 'column', alignItems: 'center', color: col } }, children);
      if (kind === 'home') return wrap([
        e('span', { key: 1, style: { width: 11, height: 11, borderRadius: '50%', background: cc, marginBottom: 2.5 } }),
        e('span', { key: 2, style: { width: 17, height: 3, borderRadius: 3, background: cc } })]);
      if (kind === 'recipes') return e('span', { style: { width: 15, height: 19, borderRadius: 4, boxShadow: 'inset 0 0 0 2px ' + col, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2.5, color: col } },
        e('span', { key: 1, style: { width: 7, height: 2, borderRadius: 2, background: cc } }),
        e('span', { key: 2, style: { width: 7, height: 2, borderRadius: 2, background: cc } }));
      if (kind === 'prep') return wrap([
        e('span', { key: 1, style: { width: 11, height: 10, background: cc, borderRadius: '50% 50% 47% 53% / 55% 55% 46% 46%', marginBottom: 1.5 } }),
        e('span', { key: 2, style: { width: 15, height: 8, background: cc, borderRadius: '3px 3px 50% 50% / 3px 3px 96% 96%' } })]);
      // cart
      return e('span', { style: { display: 'inline-flex', flexDirection: 'column', alignItems: 'center', color: col } },
        e('span', { key: 1, style: { width: 10, height: 6, border: '2px solid ' + col, borderBottom: 'none', borderRadius: '6px 6px 0 0' } }),
        e('span', { key: 2, style: { width: 18, height: 11, background: cc, borderRadius: '3px 3px 8px 8px', marginTop: -1 } }));
    }

    renderTabBar(tab) {
      const tabs = [['home', 'Home'], ['recipes', 'Recipes'], ['prep', 'Prep'], ['cart', 'Cart']];
      return e('div', { className: 'sundo-tabs' }, tabs.map(([id, label]) => {
        const active = tab === id;
        return e('button', { key: id, className: 'sundo-tab' + (active ? ' active' : ''), onClick: () => this.goTab(id) },
          e('span', { className: 'ico', style: { color: active ? '#F2E8D5' : '#9a8a76' } }, this.tabIcon(id, active ? '#F2E8D5' : '#9a8a76')),
          e('span', { className: 'lbl' }, label));
      }));
    }

    render() {
      const tab = this.state.tab || 'home';
      let screen;
      if (tab === 'home') screen = e('div', { style: { height: '100%', display: 'flex', flexDirection: 'column' } }, this.renderHome());
      else if (tab === 'recipes') screen = this.renderDiscover();
      else if (tab === 'prep') screen = this.renderPrep();
      else if (tab === 'cart') screen = this.renderCart();
      else if (tab === 'profile') screen = this.renderProfile();
      else if (tab === 'recipe') screen = this.renderRecipe(true);
      else screen = e('div', { style: { height: '100%', display: 'flex', flexDirection: 'column' } }, this.renderHome());

      const showTabs = tab !== 'recipe';
      return e('div', { className: 'sundo-frame' },
        e('div', { className: 'sundo-screen' }, screen),
        showTabs ? this.renderTabBar(tab) : null);
    }
  }

  const mount = document.getElementById('root');
  const root = ReactDOM.createRoot(mount);
  root.render(e(SundoApp));
})();
