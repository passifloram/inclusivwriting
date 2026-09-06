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
    const paragraph = 'Un nouvel étudiant motivé rejoint aujourd’hui notre équipe. Chaque participant est invité à se présenter à son voisin, puis un animateur accompagnera les nouveaux inscrits. Le directeur souhaite également remercier les bénévoles, les salariés et les professionnels présents. Chaque candidat sélectionné pourra ensuite échanger avec un conseiller, un formateur ou un responsable.';
    const expected = 'Un nouveau·elle étudiant·e motivé·e rejoint aujourd’hui notre équipe. Chaque participant·e est invité·e à se présenter à son voisin·e, puis un animateur·ice accompagnera les nouveau·elle·s inscrit·e·s. Le directeur·ice souhaite également remercier les bénévoles, les salarié·e·s et les professionnel·le·s présent·e·s. Chaque candidat·e sélectionné·e pourra ensuite échanger avec un conseiller·ère, un formateur·ice ou un responsable.';
    assert.equal(c(paragraph), expected);
    assert.equal(c(expected), expected);
    online.field.value = 'avant animateur après'; online.field.selectionStart = 6; online.field.selectionEnd = 15;
    online.handlers.mousedown({ button:0, preventDefault() {} });
    online.field.selectionEnd = 6;
    await online.handlers.click({ preventDefault() {} });
    assert.equal(online.field.value, 'avant animateur·ice après');
    const offline = await setup({ fail:true }); assert.equal(offline.convert('animateur.ice amis'), 'animateur·ice ami·e·s');
    const cache = JSON.stringify({ url:'https://raw.githubusercontent.com/delulucriminou/en_inclusif/main/dictionnaire-inclusif.json', savedAt:Date.now(), payload });
    const cached = await setup({ cache }); assert.equal(cached.calls,0); assert.equal(cached.convert('informaticiens'),'informaticien·ne·s');
    const invalid = await setup({ payload:{ version:1, entries:{ amis:'<script>bad</script>' } } });
    assert.equal(invalid.convert('amis'),'ami·e·s');
    console.log('OK : conversions, paragraphe, sélection au clic, Unicode, URL/BBCode, cache, secours et validation JSON.');
})().catch(e => { console.error(e); process.exitCode=1; });
