const { useState, useMemo } = React;

const DRAFT_URL = 'https://novareresbiercafe.com/wp-content/uploads/draught.pdf';
const BOTTLE_URL = 'https://novareresbiercafe.com/wp-content/uploads/bottlelist.pdf';

const BEERS = [
  { id: 'bunker libbytown brown', drunk: true },
  { id: 'barreled souls east brown & down', drunk: true },
  { id: 'sam smith nut brown ale', drunk: true, bottle: { brewery: 'Sam Smith', style: 'Nut Brown Ale', abvNum: 5.0, abv: '5.0%', sz: '500 ml', price: '$10', ut: 3.5 } },
  { id: 'sam smith taddy porter', drunk: true, bottle: { brewery: 'Sam Smith', style: 'English Porter', abvNum: 5.0, abv: '5.0%', sz: '14.9 oz', price: '$10', ut: 3.6 } },
  { id: 'deschutes black butte', drunk: true, bottle: { brewery: 'Deschutes', style: 'American Porter', abvNum: 5.5, abv: '5.5%', sz: '12 oz', price: '$7', ut: 3.7 } },
  { id: 'mayflower porter', drunk: false },
  { id: 'nogne o porter', drunk: false },
  { id: 'jacks abby framinghammer series', drunk: false },
  { id: 'bissell angels series', drunk: false, bottle: { brewery: 'Bissell Brothers', style: 'BA Imperial Porter', abvNum: 12.8, abv: '12.8%', sz: '500 ml', price: '$30', ut: 4.3 } },
  { id: 'sam smith oatmeal stout', drunk: true },
  { id: 'oharas irish stout', drunk: false },
  { id: 'lake st george oatmeal stout', drunk: true },
  { id: 'harviestoun old engine oil', drunk: true, bottle: { brewery: 'Harviestoun', style: 'Scottish Craft Stout', abvNum: 6.0, abv: '6.0%', sz: '12 oz', price: '$9', ut: 3.6 } },
  { id: 'maine beer mean old tom', drunk: true },
  { id: 'north coast old rasputin', drunk: true, draft: { brewery: 'North Coast', style: 'Imperial Stout (Nitro)', abvNum: 9.0, abv: '9.0%', sz: '8 oz', price: '$8.00', ut: 4.0 } },
  { id: 'dieu du ciel peche mortel', drunk: true, draft: { brewery: 'Dieu du Ciel', style: 'Imp. Coffee Stout (Nitro)', abvNum: 9.5, abv: '9.5%', sz: '8 oz', price: '$10.00', ut: 4.3 } },
  { id: 'tributary mott the lesser', drunk: false },
  { id: 'barreled souls stay puft series', drunk: true, bottle: { brewery: 'Barreled Souls', style: 'Imperial Stout', abvNum: 11.5, abv: '11.5%', sz: '500 ml', price: '$30', ut: 4.3 } },
  { id: 'marshall wharf sexy chaos', drunk: false },
  { id: 'prairie bomb series', drunk: true },
  { id: 'lrbc straight to black:out', drunk: true },
  { id: 'pohjala pime oo series', drunk: false },
  { id: 'bissell sigil series', drunk: false },
  { id: 'de struise choice', drunk: false, bottle: { brewery: 'De Struise', style: 'BA Imperial Stout', abvNum: 13.0, abv: '13.0%', sz: '330 ml', price: '$15', ut: 4.2 } },
  { id: 'sierra nevada pale', drunk: true },
  { id: 'maine beer peeper', drunk: true, bottle: { brewery: 'Maine Beer Co.', style: 'American Pale Ale', abvNum: 5.5, abv: '5.5%', sz: '500 ml', price: '$10', ut: 3.9 } },
  { id: 'dogfish head 30 min', drunk: true },
  { id: 'tributary pale', drunk: true },
  { id: 'mast landing dh tell tale', drunk: false },
  { id: 'bissell brothers lux', drunk: false },
  { id: 'trillium fort point pale', drunk: false },
  { id: 'maine beer dinner', drunk: false, draft: { brewery: 'Maine Beer Co.', style: 'Double IPA', abvNum: 8.2, abv: '8.2%', sz: '12 oz', price: '$10.00', ut: 4.5, utUrl: 'https://untappd.com/b/maine-beer-company-dinner/519536' } },
  { id: 'sierra nevada celebration', drunk: true },
  { id: 'russian river pliny the elder', drunk: true, draft: { brewery: 'Russian River', style: 'Double IPA', abvNum: 8.0, abv: '8.0%', sz: '12 oz', price: '$9.50', ut: 4.4 } },
  { id: 'boothbay thirsty botanist', drunk: false },
  { id: 'orono the way life should be', drunk: false },
  { id: 'bissell brothers swish', drunk: false },
  { id: 'mast landing pantless thunder', drunk: true },
  { id: 'battery steele flume squared', drunk: false, draft: { brewery: 'Battery Steele', style: 'Hazy DIPA', abvNum: 8.0, abv: '8.0%', sz: '12 oz', price: '$9.00', ut: 4.2, utUrl: 'https://untappd.com/b/battery-steele-brewing-flume2/2747800' } },
  { id: 'goodfire ddh prime', drunk: false },
  { id: 'northcoast old stock', drunk: false, bottle: { brewery: 'North Coast', style: 'British Barleywine', abvNum: 12.5, abv: '12.5%', sz: '355 ml', price: '$8', ut: 3.9 } },
  { id: 'j.w.lees harvest ale', drunk: false, bottle: { brewery: 'J.W. Lees', style: 'English Barley Wine', abvNum: 11.5, abv: '11.5%', sz: '220 ml', price: '$12', ut: 3.9 } },
  { id: 'de struise clash of the titans', drunk: false, bottle: { brewery: 'De Struise', style: 'BA Barleywine', abvNum: 12.6, abv: '12.6%', sz: '330 ml', price: '$15', ut: 4.1 } },
  { id: 'sierra nevada big foot', drunk: false },
  { id: 'coniston bluebird bitter', drunk: true },
  { id: 'green king old speckled hen', drunk: true },
  { id: 'lake st george diver pale', drunk: false },
  { id: 'ridgeway esb', drunk: true },
  { id: 'tynt meadow dark english', drunk: false, bottle: { brewery: 'Tynt Meadow', style: 'Trappist English Strong', abvNum: 7.4, abv: '7.4%', sz: '330 ml', price: '$9', ut: 3.7 } },
  { id: 'tributary esb', drunk: false },
  { id: 'st peters english ale', drunk: false, bottle: { brewery: "St Peter's", style: 'Cream Stout', abvNum: 6.5, abv: '6.5%', sz: '500 ml', price: '$10', ut: 3.4 } },
  { id: 'barreled souls munro', drunk: true },
  { id: 'cushnoc rust bucket red', drunk: true },
  { id: 'ettaler edel hell', drunk: false, bottle: { brewery: 'Ettaler', style: 'Helles Lager', abvNum: 5.0, abv: '5.0%', sz: '500 ml', price: '$9', ut: 3.4 } },
  { id: 'hofbrau original', drunk: true },
  { id: 'jacks abby house lager', drunk: false },
  { id: 'von trapp boho pils', drunk: false },
  { id: 'pilsner urquell', drunk: true },
  { id: 'schilling palmovka 12', drunk: false },
  { id: 'czechvar original', drunk: true },
  { id: 'sacred profane pale lager', drunk: false },
  { id: 'einbecker brauherren pils', drunk: false },
  { id: 'ayinger bairisch pils', drunk: true },
  { id: 'flensberger pils', drunk: false, draft: { brewery: 'Flensburger', style: 'Northern German Pils', abvNum: 4.8, abv: '4.8%', sz: '.4 L', price: '$9.00', ut: 3.3 } },
  { id: 'italiano tipopils', drunk: true, draft: { brewery: 'Birrificio Italiano', style: 'Italian Pils', abvNum: 5.2, abv: '5.2%', sz: '.3 L', price: '$9.50', ut: 3.9 } },
  { id: 'human robot hallertau pils', drunk: false },
  { id: 'sacred profane amber lager', drunk: false },
  { id: 'schilling petrin 11', drunk: false },
  { id: 'st georgenbrau kellerbier', drunk: false, draft: { brewery: 'St. Georgen Brau', style: 'Franconian Lager', abvNum: 4.9, abv: '4.9%', sz: '.5 L', price: '$9.50', ut: 3.6 }, bottle: { brewery: 'St. Georgen Brau', style: 'Franconian Lager', abvNum: 4.9, abv: '4.9%', sz: '16 oz', price: '$9', ut: 3.6 } },
  { id: 'von trapp vienna', drunk: false, bottle: { brewery: 'Von Trapp', style: 'Vienna Lager', abvNum: 5.0, abv: '5.0%', sz: '12 oz', price: '$7', ut: 3.6 } },
  { id: 'oec coolship black lager', drunk: true },
  { id: 'ayinger dunkel', drunk: false },
  { id: 'schilling modernism', drunk: true },
  { id: 'sacred profane dark lager', drunk: true },
  { id: 'ettaller hellerbock', drunk: true },
  { id: 'einbecker winterbock', drunk: false },
  { id: 'ayinger celebrator', drunk: true, draft: { brewery: 'Ayinger', style: 'Doppelbock', abvNum: 6.7, abv: '6.7%', sz: '.3 L', price: '$9.00', ut: 3.9 } },
  { id: 'weihenstephan korbinian', drunk: true },
  { id: 'samichlaus vintage', drunk: false },
  { id: 'schlenkerla rauch helles', drunk: false, bottle: { brewery: 'Schlenkerla', style: 'Rauch Helles', abvNum: 4.3, abv: '4.3%', sz: '16 oz', price: '$9', ut: 3.5 } },
  { id: 'schlenkerla maerzen', drunk: false },
  { id: 'sacred profane smoked dark lager', drunk: true },
  { id: 'ayinger brau-weisse', drunk: true },
  { id: 'schneider weisse', drunk: false },
  { id: 'plank weissbier', drunk: true },
  { id: 'schlenkerla weizen', drunk: false, bottle: { brewery: 'Schlenkerla', style: 'Smoked Wheat Beer', abvNum: 5.2, abv: '5.2%', sz: '500 ml', price: '$9', ut: 3.6 } },
  { id: 'weihenstephan vitus', drunk: true },
  { id: 'schneider aventinus', drunk: true, bottle: { brewery: 'Schneider', style: 'Dunkelweizen Doppelbock', abvNum: 8.0, abv: '8.0%', sz: '500 ml', price: '$10', ut: 4.0 } },
  { id: 'lemke berliner woodruff', drunk: false, bottle: { brewery: 'Lemke', style: 'Berliner Weisse', abvNum: 4.0, abv: '4.0%', sz: '12 oz', price: '$10', ut: 3.5 } },
  { id: 'prof fritz briem 1809 berliner', drunk: false, bottle: { brewery: 'Prof Fritz Briem', style: 'Berliner Weisse', abvNum: 5.0, abv: '5.0%', sz: '500 ml', price: '$10', ut: 3.6 } },
  { id: 'banhof leipzig gose', drunk: false },
  { id: 'ritterguts gose', drunk: true },
  { id: 'fruh kolsch', drunk: true, draft: { brewery: 'Fruh', style: 'Kolsch', abvNum: 4.8, abv: '4.8%', sz: '.4 L', price: '$8.75', ut: 3.6 } },
  { id: 'gaffel kolsch', drunk: false, bottle: { brewery: 'Gaffel', style: 'German Kolsch', abvNum: 4.8, abv: '4.8%', sz: '16.9 oz', price: '$9', ut: 3.5 } },
  { id: 'reissdorf kolsch', drunk: true },
  { id: 'uerige alt', drunk: false },
  { id: 'westmalle extra', drunk: true, draft: { brewery: 'Westmalle', style: 'Abbey Single', abvNum: 4.8, abv: '4.8%', sz: '330 ml', price: '$10', ut: 3.7 } },
  { id: 'st. bernardus extra 4', drunk: true },
  { id: 'chimay doree gold', drunk: true },
  { id: 'val dieu blonde', drunk: false },
  { id: 'cuvee de trolls', drunk: false },
  { id: 'allagash curieux', drunk: true },
  { id: 'piraat', drunk: true },
  { id: 'de dolle dulle teve', drunk: true, bottle: { brewery: 'De Dolle', style: 'Belgian Triple', abvNum: 10.0, abv: '10.0%', sz: '16 oz', price: '$13', ut: 3.9 } },
  { id: 'de dolle stille nacht', drunk: false },
  { id: 'de glazen toren ondineke', drunk: false, bottle: { brewery: 'De Glazen Toren', style: 'Belgian Tripel', abvNum: 8.5, abv: '8.5%', sz: '750 ml', price: '$22', ut: 3.8 } },
  { id: 'st bernardus tripel', drunk: true, draft: { brewery: 'St Bernardus', style: 'Belgian Tripel', abvNum: 8.0, abv: '8.0%', sz: '12 oz', price: '$10.00', ut: 4.0 } },
  { id: 'unibroue la fin du monde', drunk: true, bottle: { brewery: 'Unibroue', style: 'Belgian Tripel', abvNum: 9.0, abv: '9.0%', sz: '12 oz', price: '$9', ut: 4.0 } },
  { id: 'de garre tripel', drunk: true },
  { id: 'duvel golden strong', drunk: false, bottle: { brewery: 'Duvel', style: 'Belgian Golden Strong', abvNum: 8.5, abv: '8.5%', sz: '330 ml', price: '$9', ut: 3.9 } },
  { id: 'westmalle trippel', drunk: false, bottle: { brewery: 'Westmalle', style: 'Trappist Tripel', abvNum: 9.5, abv: '9.5%', sz: '330 ml', price: '$11', ut: 4.1 } },
  { id: 'chimay cing cents white', drunk: false, bottle: { brewery: 'Chimay', style: 'Trappist Tripel', abvNum: 8.0, abv: '8.0%', sz: '330 ml', price: '$12', ut: 3.8 } },
  { id: 'chimay cent cinquante green', drunk: true },
  { id: 'st bernardus pater 6', drunk: false, bottle: { brewery: 'St Bernardus', style: 'Abbey Dubbel', abvNum: 6.7, abv: '6.7%', sz: '330 ml', price: '$9', ut: 3.7 } },
  { id: 'westmalle dubbel', drunk: true },
  { id: 'rochefort 6', drunk: false, bottle: { brewery: 'Rochefort', style: 'Trappist Dubbel', abvNum: 7.5, abv: '7.5%', sz: '330 ml', price: '$11', ut: 3.8 } },
  { id: 'allagash foliage report', drunk: false },
  { id: 'chimay premiere red', drunk: false, bottle: { brewery: 'Chimay', style: 'Trappist Dubbel', abvNum: 7.0, abv: '7.0%', sz: '330 ml', price: '$11', ut: 3.7 } },
  { id: 'achel brune', drunk: true },
  { id: 'st bernardus prior 8', drunk: false, bottle: { brewery: 'St Bernardus', style: 'Strong Dubbel', abvNum: 8.0, abv: '8.0%', sz: '330 ml', price: '$9', ut: 4.0 } },
  { id: 'chimay grand reserve blue', drunk: false, bottle: { brewery: 'Chimay', style: 'Trappist Strong Dark', abvNum: 9.0, abv: '9.0%', sz: '330 ml', price: '$12', ut: 4.0 } },
  { id: 'st bernardus abt 12', drunk: false, bottle: { brewery: 'St Bernardus', style: 'Belgian Dark Strong', abvNum: 10.5, abv: '10.5%', sz: '330 ml', price: '$10', ut: 4.3 } },
  { id: 'rochefort 8', drunk: false, bottle: { brewery: 'Rochefort', style: 'Trappist Dark Ale', abvNum: 9.2, abv: '9.2%', sz: '330 ml', price: '$11', ut: 4.2 } },
  { id: 'rochefort 10', drunk: false, bottle: { brewery: 'Rochefort', style: 'Trappist Dark Strong', abvNum: 11.0, abv: '11.0%', sz: '330 ml', price: '$12', ut: 4.4 } },
  { id: 'de struise pannepot', drunk: true },
  { id: 'ommegang three philosophers', drunk: true },
  { id: 'rodenbach dogfish crison cru', drunk: false },
  { id: 'rodenbach grand cru', drunk: false, bottle: { brewery: 'Rodenbach', style: 'Flemish Red-Brown', abvNum: 6.0, abv: '6.0%', sz: '330 ml', price: '$9', ut: 3.9 } },
  { id: 'monks sour red', drunk: false },
  { id: 'petrus 40/40/20', drunk: false },
  { id: 'de la senne ouden vat', drunk: false },
  { id: 'dupont saison', drunk: true, bottle: { brewery: 'Dupont', style: 'Saison', abvNum: 6.5, abv: '6.5%', sz: '375 ml', price: '$12', ut: 3.9 } },
  { id: 'de ranke xx bitter', drunk: false, bottle: { brewery: 'De Ranke', style: 'Hop-Forward Saison', abvNum: 6.2, abv: '6.2%', sz: '330 ml', price: '$9', ut: 3.8 } },
  { id: 'de la senne taras boulba', drunk: true },
  { id: 'kazematten saison', drunk: false },
  { id: 'de glazen toren saison', drunk: false, bottle: { brewery: 'De Glazen Toren', style: 'Saison', abvNum: 6.5, abv: '6.5%', sz: '750 ml', price: '$22', ut: 3.7 } },
  { id: 'oxbow loretta grisette', drunk: true },
  { id: 'oude orval', drunk: true, bottle: { brewery: 'Orval', style: 'Trappist Ale (Aged)', abvNum: 6.9, abv: '6.9%', sz: '330 ml', price: '$12', ut: 4.1 } },
  { id: 'dupont avec les bons voeux', drunk: true, bottle: { brewery: 'Dupont', style: 'Strong Saison', abvNum: 9.5, abv: '9.5%', sz: '375 ml', price: '$14', ut: 4.1 } },
  { id: 'thiriez ambre', drunk: false },
  { id: 'ommegang hennepin', drunk: false },
  { id: 'allagash white', drunk: true },
  { id: 'st. bernardus witbier', drunk: true },
  { id: 'hitachino nest white', drunk: true },
  { id: 'unibroue blanche de chambly', drunk: false },
  { id: 'drie fonteinen a & g', drunk: false, bottle: { brewery: 'Drie Fonteinen', style: 'Gueuze', abvNum: 6.2, abv: '6.2%', sz: '375 ml', price: '$25', ut: 4.4 } },
  { id: 'tilquin gueze', drunk: false, bottle: { brewery: 'Tilquin', style: 'Gueuze', abvNum: 7.0, abv: '7.0%', sz: '375 ml', price: '$22', ut: 4.2 } },
  { id: 'timmermans gueuze', drunk: false },
  { id: 'girardin gueuze', drunk: true },
  { id: 'drie fonteinen kriek', drunk: false, bottle: { brewery: 'Drie Fonteinen', style: 'Oude Kriek', abvNum: 6.5, abv: '6.5%', sz: '750 ml', price: '$60', ut: 4.5 } },
  { id: 'allagash coolship resurgem', drunk: false },
  { id: 'oxbow native/wild series', drunk: false, bottle: { brewery: 'Oxbow', style: 'Spontaneous Farmhouse', abvNum: 6.0, abv: '6.0%', sz: '750 ml', price: '$45', ut: 4.0 } },
  { id: 'russian river tion series', drunk: true },
  { id: 'jester king petite prince', drunk: false },
  { id: 'plan bee barn beer', drunk: false },
  { id: 'allagash coolship red', drunk: false, draft: { brewery: 'Allagash', style: 'Spontaneous Framboise', abvNum: 5.6, abv: '5.6%', sz: '8 oz', price: '$10.50', ut: 4.2, utUrl: 'https://untappd.com/b/allagash-brewing-company-coolship-red/64052' }, bottle: { brewery: 'Allagash', style: 'Spontaneous Framboise', abvNum: 5.6, abv: '5.6%', sz: '375 ml', price: '$25', ut: 4.2, utUrl: 'https://untappd.com/b/allagash-brewing-company-coolship-red/64052' } },
  { id: 'jester king atrial rubicite', drunk: false },
  { id: 'koelbus apricot', drunk: true },
  { id: 'underberg', drunk: true },
  { id: 'fernet michaud', drunk: false },
  { id: 'anything from a porron', drunk: false },
];

// Choice slots omitted for brevity in this file - see full version in Claude artifact
const ALL_CHOICES = [];

const T = 234, BD = BEERS.filter(x => x.drunk).length, CT = ALL_CHOICES.length, CD = ALL_CHOICES.filter(x => x.drunk).length;
const CR = CT - CD, CM = ALL_CHOICES.filter(x => !x.drunk && x.m && x.m.length > 0).length, TD = BD + CD;

function App() {
  const [tab, setTab] = useState('chalice');
  const [cf, setCf] = useState('available');
  const [lf, setLf] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('abv');
  const rows = useMemo(() => { const r = []; for (const b of BEERS) { if (b.drunk) continue; if (b.draft) r.push({ id: b.id, src: 'Draft', ...b.draft }); if (b.bottle) r.push({ id: b.id, src: 'Bottle/Can', ...b.bottle }); } return r; }, []);
  const pn = id => id.replace(/\b\w/g, c => c.toUpperCase());
  const filt = useMemo(() => { const s = q.toLowerCase(); return rows.filter(r => lf === 'all' || r.src === lf).filter(r => !s || r.id.includes(s) || r.brewery.toLowerCase().includes(s) || r.style.toLowerCase().includes(s)).sort((a, b) => sort === 'ut' ? ((b.ut || 0) - (a.ut || 0)) || a.abvNum - b.abvNum : a.abvNum - b.abvNum); }, [rows, lf, q, sort]);
  const uc = useMemo(() => new Set(rows.map(r => r.id)).size, [rows]);
  const pct = Math.round((TD / T) * 100);
  const utLink = (brewery, name) => `https://untappd.com/search?q=${encodeURIComponent(brewery + ' ' + name)}`;
  const ts = a => ({ padding: '9px 18px', borderRadius: '8px 8px 0 0', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 'bold', background: a ? '#2a1200' : '#1a0a00', color: a ? '#f5c842' : '#c9a87a', borderBottom: a ? '2px solid #f5c842' : '2px solid transparent' });
  const sb = (l, v, c) => React.createElement('div', { key: l, style: { flex: '1 1 130px', background: '#2a1200', border: `1px solid ${c}44`, borderRadius: 10, padding: '10px 14px', textAlign: 'center' } }, React.createElement('div', { style: { fontSize: 26, fontWeight: 'bold', color: c } }, v), React.createElement('div', { style: { fontSize: 10, color: '#c9a87a', marginTop: 2 } }, l));

  return React.createElement('div', { style: { fontFamily: 'Georgia, serif', background: '#1a0a00', minHeight: '100vh', color: '#f5e6c8' } },
    React.createElement('div', { style: { background: 'linear-gradient(135deg, #3d1a00, #6b3010)', padding: '18px 24px', borderBottom: '3px solid #c17f3a' } },
      React.createElement('div', { style: { maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 } },
        React.createElement('img', { src: 'https://novareresbiercafe.com/wp-content/uploads/novare-brl-wm-cr.png', alt: '', style: { height: 50, flexShrink: 0, filter: 'brightness(1.2)' }, onError: e => { e.target.style.display = 'none'; } }),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h1', { style: { margin: 0, fontSize: 22, color: '#f5c842', letterSpacing: 2, textTransform: 'uppercase' } }, 'Chalice Tracker'),
          React.createElement('p', { style: { margin: '4px 0 0', color: '#c9a87a', fontSize: 11 } },
            React.createElement('a', { href: DRAFT_URL, target: '_blank', rel: 'noopener', style: { color: '#7ab8f5', textDecoration: 'none' } }, 'Draft 5/2/26'), ' | ',
            React.createElement('a', { href: BOTTLE_URL, target: '_blank', rel: 'noopener', style: { color: '#d4a862', textDecoration: 'none' } }, 'Bottle 4/23/26'), ' | Spreadsheet: 5/3/26'
          )
        )
      )
    ),
    React.createElement('div', { style: { maxWidth: 900, margin: '0 auto', padding: '16px' } },
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' } }, sb('Total Chalice', T, '#c9a87a'), sb('Drunk at Novare', TD, '#4caf78'), sb('Still Needed', T - TD, '#e87040'), sb('Named Available', uc, '#f5c842')),
      React.createElement('div', { style: { marginBottom: 16, background: '#2a1200', borderRadius: 10, padding: '12px 16px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12, color: '#c9a87a' } }, React.createElement('span', null, `Progress: ${TD}/234 (${BD} named)`), React.createElement('span', null, `${pct}%`)),
        React.createElement('div', { style: { background: '#3d1a00', borderRadius: 20, height: 14, overflow: 'hidden' } }, React.createElement('div', { style: { height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #c17f3a, #f5c842)', borderRadius: 20 } }))
      ),
      React.createElement('div', { style: { background: '#1a2a3a', border: '1px solid #4a90d9', borderRadius: 10, padding: '9px 14px', marginBottom: 14, fontSize: 12, color: '#a8c8e8' } },
        React.createElement('strong', null, 'Draft 5/2/26!'), ' Maine Beer Dinner, Allagash Coolship Red, Tilquin Airelle Sauvage, Boon Geuze Selection, Battery Steele Flume + Flensburger Pils on draft!'
      ),
      React.createElement('div', { style: { background: '#2a1200', borderRadius: 8, padding: '14px' } },
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' } },
          React.createElement('input', { value: q, onChange: e => setQ(e.target.value), placeholder: 'Search beer, brewery, or style...', style: { flex: '1 1 180px', padding: '7px 12px', borderRadius: 8, border: '1px solid #6b3010', background: '#1a0a00', color: '#f5e6c8', fontSize: 12, outline: 'none' } }),
          ['all', 'Draft', 'Bottle/Can'].map(f => React.createElement('button', { key: f, onClick: () => setLf(f), style: { padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 'bold', background: lf === f ? '#c17f3a' : '#3d1a00', color: lf === f ? '#fff' : '#c9a87a' } }, f === 'all' ? 'All' : f)),
          React.createElement('span', { style: { width: 1, background: '#3d1a00', margin: '0 2px' } }),
          [['abv', 'ABV \u2191'], ['ut', '\u2605 Rating \u2193']].map(([v, l]) => React.createElement('button', { key: v, onClick: () => setSort(v), style: { padding: '7px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 'bold', background: sort === v ? '#4a3a10' : '#3d1a00', color: sort === v ? '#f5c842' : '#8a6a4a' } }, l))
        ),
        React.createElement('p', { style: { color: '#c9a87a', fontSize: 11, marginBottom: 10 } }, React.createElement('strong', { style: { color: '#f5c842' } }, filt.length), ` entries — sorted by ${sort === 'ut' ? 'Untappd rating' : 'ABV'} — tap \u2605 for Untappd`),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
          filt.map((o, i) => React.createElement('div', { key: i, style: { background: '#1a0a00', borderLeft: `4px solid ${o.src === 'Draft' ? '#4a90d9' : '#c17f3a'}`, border: `1px solid ${o.src === 'Draft' ? '#4a90d922' : '#c17f3a22'}`, borderRadius: 7, padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
            React.createElement('div', { style: { flex: '1 1 180px' } },
              React.createElement('div', { style: { fontWeight: 'bold', fontSize: 13, color: '#f5e6c8' } }, pn(o.id)),
              React.createElement('div', { style: { fontSize: 11, color: '#c9a87a', marginTop: 1 } }, `${o.brewery} — ${o.style}`)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' } },
              o.ut && React.createElement('a', { href: o.utUrl || utLink(o.brewery, o.id), target: '_blank', rel: 'noopener', style: { display: 'inline-flex', alignItems: 'center', gap: 2, textDecoration: 'none', background: o.ut >= 4.3 ? '#3a2a00' : '#2a1200', borderRadius: 4, padding: '2px 6px' } },
                React.createElement('span', { style: { color: o.ut >= 4.3 ? '#f5c842' : o.ut >= 3.8 ? '#c9a87a' : '#8a6a4a', fontSize: 10, fontWeight: 'bold' } }, `\u2605 ${o.ut.toFixed(1)}`)
              ),
              React.createElement('span', { style: { background: o.src === 'Draft' ? '#1a3a5a' : '#3a2800', color: o.src === 'Draft' ? '#7ab8f5' : '#d4a862', borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 'bold' } }, o.src === 'Draft' ? 'DRAFT' : 'BOTTLE'),
              React.createElement('span', { style: { color: '#f5c842', fontWeight: 'bold', fontSize: 12 } }, o.abv),
              React.createElement('span', { style: { color: '#c9a87a', fontSize: 11 } }, o.sz),
              React.createElement('span', { style: { color: '#4caf78', fontSize: 12, fontWeight: 'bold' } }, o.price)
            )
          ))
        )
      ),
      React.createElement('div', { style: { marginTop: 12, padding: '10px 13px', background: '#2a1200', borderRadius: 9, fontSize: 10, color: '#6b4020' } }, React.createElement('strong', { style: { color: '#c9a87a' } }, 'Note:'), ' Only spreadsheet-eligible beers shown. Confirm availability with staff.'),
      React.createElement('div', { style: { marginTop: 16, padding: '12px 16px', background: '#2a1200', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('img', { src: 'https://novareresbiercafe.com/wp-content/uploads/novare-logo-ft-cr@2x.png', alt: '', style: { height: 30, opacity: 0.7 }, onError: e => { e.target.style.display = 'none'; } }),
          React.createElement('span', { style: { fontSize: 10, color: '#6b4020' } }, '4 Canal Plaza · Portland, ME 04101 · (207) 761-2437')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12 } },
          React.createElement('a', { href: DRAFT_URL, target: '_blank', rel: 'noopener', style: { fontSize: 10, color: '#7ab8f5', textDecoration: 'none' } }, 'Draft PDF'),
          React.createElement('a', { href: BOTTLE_URL, target: '_blank', rel: 'noopener', style: { fontSize: 10, color: '#d4a862', textDecoration: 'none' } }, 'Bottle PDF'),
          React.createElement('a', { href: 'https://novareresbiercafe.com', target: '_blank', rel: 'noopener', style: { fontSize: 10, color: '#c17f3a', textDecoration: 'none' } }, 'novareresbiercafe.com')
        )
      )
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));