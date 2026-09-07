const fs = require('fs');
const vm = require('vm');
const assert = require('node:assert/strict');
const path = require('path');
const payload = JSON.parse(fs.readFileSync(path.join(__dirname, 'dictionnaire-inclusif.json')));
const source = fs.readFileSync(path.join(__dirname, 'javascript.js'), 'utf8');
async function setup(options = {}) {
    let calls = 0, written = 0;
    const handlers = {};
    const field = { value: '', selectionStart: 0, selectionEnd: 0, parentNode: { querySelector: () => null },
        setRangeText(t,s,e) { this.value = this.value.slice(0,s) + t + this.value.slice(e); }, dispatchEvent() {}, focus() {} };
    const button = { addEventListener(n,fn) { handlers[n] = fn; } };
    function $(arg) { return { ready: fn => fn(), sceditor: () => null }; }
    $.fn = {};
    const context = { $, document: { getElementById: id => id === 'replaceButton' ? button : field },
        localStorage: { getItem: () => options.cache || null, setItem() { written++; } },
        fetch: async () => { calls++; if (options.fail) throw Error('offline'); return { ok: true, json: async () => options.payload || payload }; },
        setTimeout, clearTimeout, AbortController, Event: class {}, alert: m => { throw Error(m); }, console: { warn() {} } };
    vm.runInNewContext(source.replace('    function editorInstance()', '    globalThis.testAPI = { convert, dictionaryReady };\n    function editorInstance()'), context);
    await context.testAPI.dictionaryReady;
    return { convert: context.testAPI.convert, calls, written, handlers, field };
}
(async () => {
    const online = await setup();
    assert.equal(online.calls, 1); assert.equal(online.written, 1);
    const c = online.convert;
    const exceptions = JSON.parse(fs.readFileSync(path.join(__dirname, 'exceptions-blog.json')));
    for (const [word, value] of Object.entries(exceptions.entries)) {
        assert.equal(c(word), value, 'exception : ' + word);
        assert.equal(c(value), value, 'exception au second clic : ' + word);
        assert.equal(c(word.toLocaleUpperCase('fr')), value.toLocaleUpperCase('fr'), 'majuscule : ' + word);
    }
    for (const [word, value] of Object.entries(exceptions.aliases)) assert.equal(c(word), value, 'ancienne forme : ' + word);
    const cases = [
        ['animateur animatrice animateurs animatrices', 'animateur·ice animateur·ice animateur·ice·s animateur·ice·s'],
        ['animateur.ice animateur.ice.s ANIMATEUR.ICE.S', 'animateur·ice animateur·ice·s ANIMATEUR·ICE·S'],
        ['étudiantes motivées', 'étudiant·e·s motivé·e·s'],
        ['bénévoles responsables', 'bénévoles responsables'],
        ['https://test.fr/animateur.ice test.ice@example.fr', 'https://test.fr/animateur.ice test.ice@example.fr'],
        ['[url=https://test.fr/amis]amis[/url] [code]amis[/code]', '[url=https://test.fr/amis]ami·e·s[/url] [code]amis[/code]'],
        ['vice-président', 'vice-président·e'],
        ['motinconnu.xyz', 'motinconnu.xyz'],
        ['étudiant·e·s animateur·ice', 'étudiant·e·s animateur·ice'],
        ['étudiantes'.normalize('NFD'), 'étudiant·e·s']
    ];
    for (const [a,b] of cases) assert.equal(c(a), b, a);
    // Une entrée apportée par la nouvelle base, absente de l'ancien dictionnaire.
    assert.equal(c('acrobatiques'), 'acrobatiques');
    assert.equal(c('informaticiens'), 'informaticien·ne·s');
    assert.equal(c('une animatrice, la responsable, lae bénévole'), 'un·e animateur·ice, lae responsable, lae bénévole');
    assert.equal(c('un livre, la table, je la vois, le lire'), 'un livre, la table, je la vois, le lire');
    assert.equal(c('Le directeur, LA responsable, le·la bénévole, la.e responsable'), 'Lae directeur·ice, LAE responsable, lae bénévole, lae responsable');
    assert.equal(c('Lae directeur·ice'), 'Lae directeur·ice');
    const blogCases = [
      ['Celui ou celle, ceux et celles, eux/elles', 'Cellui, celleux, elleux'],
      ['Il arrive. Elle arrive. Ils arrivent. Elles arrivent.', 'Iel arrive. Iel arrive. Iels arrivent. Iels arrivent.'],
      ['avec elle, pour lui, chez elles, avec eux, je lui parle', 'avec ellui, pour ellui, chez elleux, avec elleux, je lui parle'],
      ['Il faut partir. Il y a du pain. Il pleut.', 'Il faut partir. Il y a du pain. Il pleut.'],
      ['Il fait beau. Il est important de lire.', 'Il fait beau. Il est important de lire.'],
      ['ce copain, cette copine, cet étudiant, ce livre', 'ce·tte copain·ine, ce·tte copain·ine, ce·tte étudiant·e, ce livre'],
      ['Lequel ou laquelle ? Le roi et la reine.', 'Laequelle ? Lae roi·eine et lae roi·eine.'],
      ['Mon frère, ma sœur, ton oncle, ta tante, son père, sa mère', 'Maon frœur, maon frœur, taon tancle, taon tancle, saon parent, saon parent'],
      ['mon livre, ma table, du pain, au cinéma', 'mon livre, ma table, du pain, au cinéma'],
      ['au docteur, du chef, une nouvelle cheffe', 'à lae docteur·e, de lae chef·fe, un·e nouvelle·au chef·fe'],
      ['monsieur, madame, messieurs, mesdames', 'mondame, mondame, mondames, mondames'],
      ['fou folle vieux vieille beaux belles', 'fou·lle fou·lle vieux·eille vieux·eille beaux·elles beaux·elles'],
      ['municipaux municipales nombreux nombreuses', 'municipaux·ales municipaux·ales nombreux·ses nombreux·ses'],
      ['chef.fe fou.lle nouvelle.au nouvelle.aux', 'chef·fe fou·lle nouvelle·au nouvelle·aux'],
      ['[url=https://exemple.fr/elle]elle[/url]', '[url=https://exemple.fr/elle]iel[/url]']
    ];
    for (const [a,b] of blogCases) { assert.equal(c(a), b, a); assert.equal(c(b), b, 'second clic : '+b); }
    const paragraph = 'Un nouvel étudiant motivé rejoint aujourd’hui notre équipe. Chaque participant est invité à se présenter à son voisin, puis un animateur accompagnera les nouveaux inscrits. Le directeur souhaite également remercier les bénévoles, les salariés et les professionnels présents. Chaque candidat sélectionné pourra ensuite échanger avec un conseiller, un formateur ou un responsable.';
    const expected = 'Un·e nouvelle·au étudiant·e motivé·e rejoint aujourd’hui notre équipe. Chaque participant·e est invité·e à se présenter à saon voisin·e, puis un·e animateur·ice accompagnera les nouvelle·aux inscrit·e·s. Lae directeur·ice souhaite également remercier les bénévoles, les salarié·e·s et les professionnel·le·s présent·e·s. Chaque candidat·e sélectionné·e pourra ensuite échanger avec un·e conseiller·ère, un·e formateur·ice ou un·e responsable.';
    assert.equal(c(paragraph), expected);
    assert.equal(c(expected), expected);
    online.field.value = 'avant animateur après'; online.field.selectionStart = 6; online.field.selectionEnd = 15;
    online.handlers.mousedown({ button:0, preventDefault() {} });
    online.field.selectionEnd = 6;
    await online.handlers.click({ preventDefault() {} });
    assert.equal(online.field.value, 'avant animateur·ice après');
    const offline = await setup({ fail:true }); assert.equal(offline.convert('animateur.ice amis'), 'animateur·ice ami·e·s');
    assert.equal(offline.convert('mon frère et celle'), 'maon frœur et cellui');
    const legacy = await setup({ payload: { version: 1, entries: { nouveau: 'nouveau·elle', frère: 'frère', celui: 'celui' } } });
    assert.equal(legacy.convert('nouveau frère celui'), 'nouvelle·au frœur cellui');
    const cache = JSON.stringify({ url:'https://raw.githubusercontent.com/passifloram/inclusivwriting/main/dictionnaire-inclusif.json', savedAt:Date.now(), payload });
    const cached = await setup({ cache }); assert.equal(cached.calls,0); assert.equal(cached.convert('informaticiens'),'informaticien·ne·s');
    const invalid = await setup({ payload:{ version:1, entries:{ amis:'<script>bad</script>' } } });
    assert.equal(invalid.convert('amis'),'ami·e·s');
    console.log('OK : conversions, paragraphe, sélection au clic, Unicode, URL/BBCode, cache, secours et validation JSON.');
})().catch(e => { console.error(e); process.exitCode=1; });
