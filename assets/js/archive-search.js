---
# Front matter vuoto: serve a Jekyll per processare il Liquid (relative_url)
---
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('archive-search');
    const staticResults = document.getElementById('archive-static');
    const dynamicResults = document.getElementById('archive-results');
    let posts = [];

    // Fetch posts
    fetch('{{ "/blog/search.json" | relative_url }}')
        .then(response => response.json())
        .then(data => {
            posts = data;
            // Se l'utente ha già scritto qualcosa prima che i dati arrivassero
            if (searchInput.value.trim()) searchInput.dispatchEvent(new Event('input'));
        });

    // Nomi dei mesi (italiano e inglese), riconosciuti anche abbreviati (min. 3 lettere)
    const MONTH_NAMES = [
        ['gennaio', 'january'], ['febbraio', 'february'], ['marzo', 'march'],
        ['aprile', 'april'], ['maggio', 'may'], ['giugno', 'june'],
        ['luglio', 'july'], ['agosto', 'august'], ['settembre', 'september', 'sept'],
        ['ottobre', 'october'], ['novembre', 'november'], ['dicembre', 'december']
    ];

    function monthFromName(token) {
        if (token.length < 3) return null;
        const found = new Set();
        MONTH_NAMES.forEach((names, idx) => {
            if (names.some(n => n.startsWith(token))) found.add(idx + 1);
        });
        return found.size === 1 ? [...found][0] : null;
    }

    // Interpreta day/month, scambiandoli se il formato sembra americano (es. 9/15)
    function dayMonth(a, b) {
        if (b > 12 && a <= 12) return { day: b, month: a };
        return { day: a, month: b };
    }

    /*
     * Date compatte senza separatori. Per evitare letture doppie:
     *  - l'anno deve essere 19xx o 20xx;
     *  - sono accettate solo queste lunghezze:
     *      5 cifre: YYYYM / MYYYY       (20269, 92026)
     *      6 cifre: YYYYMM / MMYYYY     (202611, 112026)  -> sempre mese + anno
     *      8 cifre: YYYYMMDD / DDMMYYYY (20260906, 06092026)
     *  - 7 cifre sono rifiutate: 1112026 potrebbe essere 1/11/2026 o 11/1/2026.
     * Con questi vincoli le due letture di ogni lunghezza non possono essere entrambe valide;
     * se per qualche motivo lo fossero, la query viene comunque scartata.
     */
    const COMPACT_LAYOUTS = {
        5: ['YYYYM', 'MYYYY'],
        6: ['YYYYMM', 'MMYYYY'],
        8: ['YYYYMMDD', 'DDMMYYYY']
    };

    function parseCompactDate(t) {
        const layouts = COMPACT_LAYOUTS[t.length];
        if (!layouts) return null;

        const candidates = [];
        for (const layout of layouts) {
            const yStart = layout.indexOf('Y');
            const year = t.slice(yStart, yStart + 4);
            const rest = t.slice(0, yStart) + t.slice(yStart + 4);    // cifre di mese/giorno
            if (!/^(19|20)\d\d$/.test(year)) continue;

            let month, day = null;
            if (layout.startsWith('DD') || layout.endsWith('DD')) {
                const md = layout.replace('YYYY', '');               // 'MMDD' o 'DDMM'
                month = parseInt(md === 'MMDD' ? rest.slice(0, 2) : rest.slice(2), 10);
                day = parseInt(md === 'MMDD' ? rest.slice(2) : rest.slice(0, 2), 10);
            } else {
                month = parseInt(rest, 10);
            }

            if (month < 1 || month > 12) continue;
            if (day !== null) {
                const check = new Date(+year, month - 1, day);
                if (check.getMonth() !== month - 1 || check.getDate() !== day) continue; // es. 31/02
            }
            candidates.push({ year: +year, yearPrefix: null, month, day });
        }

        return candidates.length === 1 ? candidates[0] : null;
    }

    /*
     * Trasforma la query in un filtro { year, yearPrefix, month, day }.
     * Formati supportati (separatori: / - . spazio virgola):
     *   2025 · /2025/ · 2025/9 · 2025-09 · 2025.9.15 · 2025-09-15
     *   9/2025 · 09-2025 · 15/9/2025 · 15-09-2025 · 15.09.2025
     *   settembre 2025 · set 2025 · sep 2025 · 15 settembre 2025 · settembre
     *   9 (mese) · 15/9 (giorno/mese) · 20, 202 (inizio dell'anno, mentre si scrive)
     *   senza separatori: 20269 · 92026 · 202611 · 112026 · 20260906 · 06092026
     * Restituisce null se la query non è una data valida.
     */
    function parseDateQuery(query) {
        const tokens = query.toLowerCase().split(/[\/\-\.\s,]+/).filter(Boolean);
        if (tokens.length === 0 || tokens.length > 3) return null;

        // Date compatte (solo cifre, almeno 5)
        if (tokens.length === 1 && /^\d{5,}$/.test(tokens[0])) {
            return parseCompactDate(tokens[0]);
        }

        // Anno a 3 cifre: l'utente lo sta ancora scrivendo (es. 202 -> 202x)
        if (tokens.length === 1 && /^\d{3}$/.test(tokens[0])) {
            return { year: null, yearPrefix: tokens[0], month: null, day: null };
        }

        let year = null, monthByName = null;
        const before = [], after = [];

        for (const t of tokens) {
            if (/^\d{4}$/.test(t)) {
                if (year !== null) return null;
                year = parseInt(t, 10);
            } else if (/^\d{1,2}$/.test(t)) {
                (year === null ? before : after).push(parseInt(t, 10));
            } else if (/^[a-zà-ù]+$/.test(t)) {
                const m = monthFromName(t);
                if (m === null || monthByName !== null) return null;
                monthByName = m;
            } else {
                return null;
            }
        }

        const f = { year, yearPrefix: null, month: monthByName, day: null };
        const nums = [...before, ...after];

        if (monthByName !== null) {
            // Con il mese scritto a parole, l'unico numero breve è il giorno
            if (nums.length > 1) return null;
            if (nums.length === 1) f.day = nums[0];
        } else if (year !== null) {
            if (before.length && after.length) return null;
            if (before.length === 1) f.month = before[0];                    // 9/2025
            else if (before.length === 2) Object.assign(f, dayMonth(before[0], before[1])); // 15/9/2025
            else if (after.length >= 1) {                                    // 2025/9[/15]
                f.month = after[0];
                if (after.length === 2) f.day = after[1];
            }
            if (before.length > 2 || after.length > 2) return null;
        } else {
            // Nessun anno a 4 cifre
            if (tokens.length === 1) {
                const t = tokens[0];
                const n = parseInt(t, 10);
                if (n >= 1 && n <= 12) f.month = n;                          // 9 -> settembre
                else f.yearPrefix = t;                                       // 20 -> anno in digitazione
            } else if (tokens.length === 2) {
                Object.assign(f, dayMonth(nums[0], nums[1]));                // 15/9
            } else {
                return null;
            }
        }

        if (f.month !== null && (f.month < 1 || f.month > 12)) return null;
        if (f.day !== null && (f.day < 1 || f.day > 31)) return null;
        return f;
    }

    function parsePostDate(dateStr) {
        const [y, m, d] = dateStr.split('-').map(n => parseInt(n, 10));
        return { year: y, month: m, day: d };
    }

    function matches(post, f) {
        const d = parsePostDate(post.date);
        if (f.year !== null && d.year !== f.year) return false;
        if (f.yearPrefix !== null && !String(d.year).startsWith(f.yearPrefix)) return false;
        if (f.month !== null && d.month !== f.month) return false;
        if (f.day !== null && d.day !== f.day) return false;
        return true;
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (!query) {
            staticResults.style.display = 'block';
            dynamicResults.style.display = 'none';
            return;
        }

        staticResults.style.display = 'none';
        dynamicResults.style.display = 'block';

        let filteredPosts;
        if (query === '*' || /^[\/\-\.\s]+$/.test(query)) {
            filteredPosts = posts;
        } else {
            const filter = parseDateQuery(query);
            filteredPosts = filter ? posts.filter(post => matches(post, filter)) : [];
        }

        renderResults(filteredPosts);
    });

    function renderResults(results) {
        if (results.length === 0) {
            dynamicResults.innerHTML = '<p style="text-align:center; color:var(--text-secondary); margin-top: 40px;">Non ci sono post</p>';
            return;
        }

        let html = '<div class="prose">';
        let currentGroup = '';

        // Ordina per data decrescente (le date sono YYYY-MM-DD, quindi basta il confronto tra stringhe)
        results = [...results].sort((a, b) => b.date.localeCompare(a.date));

        results.forEach(post => {
            const { year, month, day } = parsePostDate(post.date);
            // Costruita in ora locale per evitare slittamenti di fuso orario
            const date = new Date(year, month - 1, day);
            const monthName = date.toLocaleString('it-IT', { month: 'long' });
            const groupKey = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

            if (groupKey !== currentGroup) {
                if (currentGroup !== '') html += '</ul>';
                html += `<h2 style="margin-top: 48px; border-bottom: 1px solid var(--border); padding-bottom: 8px; color: var(--accent);">${groupKey}</h2><ul style="list-style: none; padding: 0;">`;
                currentGroup = groupKey;
            }

            const dayStr = day < 10 ? '0' + day : day;
            const monthShort = date.toLocaleString('it-IT', { month: 'short' });

            html += `
    <li style="margin-bottom: 12px; display: flex; align-items: baseline;">
      <span style="color: var(--text-tertiary); font-size: 14px; min-width: 80px;">${dayStr} ${monthShort}</span>
      <a href="${post.url}" style="font-size: 18px; font-weight: 500; text-decoration: none; color: var(--text-primary); transition: color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--text-primary)'">${post.title}</a>
    </li>
  `;
        });

        html += '</ul></div>';
        dynamicResults.innerHTML = html;
    }
});
