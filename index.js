const timelineEl = document.getElementById('playoff-timeline');

const tooltip = document.createElement('div');
tooltip.id = 'tooltip';
tooltip.style.position = 'absolute';
tooltip.style.pointerEvents = 'none';
tooltip.style.opacity = '0';
tooltip.style.transition = 'opacity 0.1s ease';
tooltip.style.background = 'rgba(10, 10, 10, 0.9)';
tooltip.style.color = '#fff';
tooltip.style.padding = '6px 8px';
tooltip.style.borderRadius = '6px';
document.body.appendChild(tooltip);

fetch('./data/playoffs.json')
  .then((res) => {
    if (!res.ok) throw new Error('Could not load data');
    return res.json();
  })
  .then(buildTimeline)
  .catch((err) => {
    timelineEl.innerHTML = `<div class="error">Error: ${err.message}</div>`;
    console.error(err);
  });

const teamColorMap = {
  'ARZ Cardinals': '#6d111d',
  'STL Cardinals': '#6d111d',
  'Cardinals': '#6d111d',
  'ARZ/STL Cardinals': '#6d111d',
  'ATL Falcons': '#970920',
  'BAL Ravens': '#4c0071',
  'BUF Bills': '#00338D',
  'Bills': '#00338D',
  'CAR Panthers': '#0986b7',
  'CHI Bears': '#224262',
  'CIN Bengals': '#be421d',
  'CLE Browns': '#d2352c',
  'DAL Cowboys': '#0e2b52',
  'Cowboys': '#0e2b52',
  'DEN Broncos': '#e44e24',
  'DET Lions': '#004d8d',
  'GB Packers': '#053422',
  'Packers': '#053422',
  'HOU Texans': '#121930',
  'Texans': '#121930',
  'BAL Colts': '#203951',
  'IND Colts': '#203951',
  'Colts': '#203951',
  'BAL/IND Colts': '#203951',
  'JAX Jaguars': '#0b777e',
  'KC Chiefs': '#cd1a25',
  'Chiefs': '#cd1a25',
  'SD Chargers': '#078cd7',
  'LAC Chargers': '#078cd7',
  'Chargers': '#078cd7',
  'SD/LAC Chargers': '#078cd7',
  'LAR Rams': '#FFD100',
  'STL Rams': '#FFD100',
  'Rams': '#FFD100',
  'LAR/STL Rams': '#FFD100',
  'OAK Raiders': '#86888a',
  'LA Raiders': '#86888a',
  'LV Raiders': '#86888a',
  'Raiders': '#86888a',
  'OAK/LA/LV Raiders': '#86888a',
  'MIA Dolphins': '#02868b',
  'Dolphins': '#02868b',
  'MIN Vikings': '#4f2683',
  'Vikings': '#4f2683',
  'NWE Patriots': '#012f5f',
  'NE Patriots': '#012f5f',
  'Patriots': '#012f5f',
  'NO Saints': '#574d2b',
  'Saints': '#574d2b',
  'NYG Giants': '#143a69',
  'Giants': '#143a69',
  'NYJ Jets': '#224436',
  'Jets': '#224436',
  'PHI Eagles': '#1e6850',
  'Eagles': '#1e6850',
  'PIT Steelers': '#f7ce35',
  'Steelers': '#f7ce35',
  'SEA Seahawks': '#062346',
  'Seahawks': '#062346',
  'SF 49ers': '#6c0022',
  '49ers': '#6c0022',
  'TAM Buccaneers': '#8d0607',
  'TB Buccaneers': '#8d0607',
  'Buccaneers': '#8d0607',
  'TAM Bucs': '#8d0607',
  'TEN Titans': '#4788ad',
  'HOU Oilers': '#4788ad',
  'Titans': '#4788ad',
  'HOU/TEN Oilers/Titans': '#4788ad',
  'WAS Redskins': '#55031f',
  'WAS Football Team': '#55031f',
  'WAS Commanders': '#55031f',
  'Commanders': '#55031f',
  'WAS Redskins/Football Team/Commanders': '#55031f'
};

const aliasMap = {
  'ARZ Cardinals': 'ARZ/STL Cardinals',
  'STL Cardinals': 'ARZ/STL Cardinals',
  'OAK Raiders': 'OAK/LA/LV Raiders',
  'LA Raiders': 'OAK/LA/LV Raiders',
  'LV Raiders': 'OAK/LA/LV Raiders',
  'WAS Redskins': 'WAS Redskins/Football Team/Commanders',
  'WAS Football Team': 'WAS Redskins/Football Team/Commanders',
  'WAS Commanders': 'WAS Redskins/Football Team/Commanders',
  'HOU Oilers': 'HOU/TEN Oilers/Titans',
  'TEN Oilers': 'HOU/TEN Oilers/Titans',
  'Tennessee Oilers': 'HOU/TEN Oilers/Titans',
  'TEN Titans': 'HOU/TEN Oilers/Titans',
  'STL Rams': 'LAR/STL Rams',
  'LAR Rams': 'LAR/STL Rams',
  'TAM Buccaneers': 'TAM Bucs',
  'TB Buccaneers': 'TAM Bucs',
  'NWE Patriots': 'NWE Patriots',
  'NE Patriots': 'NWE Patriots',
  'GB Packers': 'GB Packers',
  'DAL Cowboys': 'DAL Cowboys',
  'BUF Bills': 'BUF Bills',
  'KC Chiefs': 'KC Chiefs',
  'NYJ Jets': 'NYJ Jets',
  'MIA Dolphins': 'MIA Dolphins',
  'SF 49ers': 'SF 49ers',
  'PIT Steelers': 'PIT Steelers',
  'NO Saints': 'NO Saints',
  'SEA Seahawks': 'SEA Seahawks',
  'PHI Eagles': 'PHI Eagles',
  'DEN Broncos': 'DEN Broncos',
  'NYG Giants': 'NYG Giants',
  'BAL Ravens': 'BAL Ravens',
  'IND Colts': 'BAL/IND Colts',
  'BAL Colts': 'BAL/IND Colts',
  'LAC Chargers': 'SD/LAC Chargers',
  'SD Chargers': 'SD/LAC Chargers',
  'MIN Vikings': 'MIN Vikings',
  'CHI Bears': 'CHI Bears',
  'CIN Bengals': 'CIN Bengals',
  'CLE Browns': 'CLE Browns',
  'DET Lions': 'DET Lions',
  'JAX Jaguars': 'JAX Jaguars',
  'Cardinals': 'ARZ/STL Cardinals',
  'Falcons': 'ATL Falcons',
  'Ravens': 'BAL Ravens',
  'Bills': 'BUF Bills',
  'Panthers': 'CAR Panthers',
  'Bears': 'CHI Bears',
  'Bengals': 'CIN Bengals',
  'Browns': 'CLE Browns',
  'Cowboys': 'DAL Cowboys',
  'Broncos': 'DEN Broncos',
  'Lions': 'DET Lions',
  'Packers': 'GB Packers',
  'Texans': 'HOU Texans',
  'Colts': 'BAL/IND Colts',
  'Jaguars': 'JAX Jaguars',
  'Chiefs': 'KC Chiefs',
  'Chargers': 'SD/LAC Chargers',
  'Rams': 'LAR/STL Rams',
  'Raiders': 'OAK/LA/LV Raiders',
  'Dolphins': 'MIA Dolphins',
  'Vikings': 'MIN Vikings',
  'Patriots': 'NWE Patriots',
  'Saints': 'NO Saints',
  'Giants': 'NYG Giants',
  'Jets': 'NYJ Jets',
  'Eagles': 'PHI Eagles',
  'Steelers': 'PIT Steelers',
  'Seahawks': 'SEA Seahawks',
  '49ers': 'SF 49ers',
  'Buccaneers': 'TAM Bucs',
  'Titans': 'HOU/TEN Oilers/Titans',
  'Commanders': 'WAS Redskins/Football Team/Commanders'
};

const teamOrder = [
  'ARZ/STL Cardinals',
  'ATL Falcons',
  'BAL Ravens',
  'BUF Bills',
  'CAR Panthers',
  'CHI Bears',
  'CIN Bengals',
  'CLE Browns',
  'DAL Cowboys',
  'DEN Broncos',
  'DET Lions',
  'GB Packers',
  'HOU Texans',
  'BAL/IND Colts',
  'JAX Jaguars',
  'KC Chiefs',
  'SD/LAC Chargers',
  'LAR/STL Rams',
  'OAK/LA/LV Raiders',
  'MIA Dolphins',
  'MIN Vikings',
  'NWE Patriots',
  'NO Saints',
  'NYG Giants',
  'NYJ Jets',
  'PHI Eagles',
  'PIT Steelers',
  'SEA Seahawks',
  'SF 49ers',
  'TAM Bucs',
  'HOU/TEN Oilers/Titans',
  'WAS Redskins/Football Team/Commanders'
];

const franchiseAge = {
  'ARZ/STL Cardinals': 59,
  'ATL Falcons': 59,
  'BAL Ravens': 29,
  'BUF Bills': 59,
  'CAR Panthers': 30,
  'CHI Bears': 59,
  'CIN Bengals': 59,
  'CLE Browns': 59,
  'DAL Cowboys': 59,
  'DEN Broncos': 59,
  'DET Lions': 59,
  'GB Packers': 59,
  'HOU Texans': 23,
  'BAL/IND Colts': 59,
  'JAX Jaguars': 30,
  'KC Chiefs': 59,
  'SD/LAC Chargers': 59,
  'LAR/STL Rams': 59,
  'OAK/LA/LV Raiders': 59,
  'MIA Dolphins': 59,
  'MIN Vikings': 59,
  'NWE Patriots': 59,
  'NO Saints': 58,
  'NYG Giants': 59,
  'NYJ Jets': 59,
  'PHI Eagles': 59,
  'PIT Steelers': 59,
  'SEA Seahawks': 49,
  'SF 49ers': 59,
  'TAM Bucs': 49,
  'HOU/TEN Oilers/Titans': 59,
  'WAS Redskins/Football Team/Commanders': 59
};

function getConference(team, year) {
  if (year < 1970) {
    const AFL = new Set([
      'OAK/LA/LV Raiders', 'KC Chiefs', 'SD/LAC Chargers',
      'BUF Bills', 'NYJ Jets', 'MIA Dolphins',
      'HOU/TEN Oilers/Titans', 'DEN Broncos', 'CIN Bengals'
    ]);
    return AFL.has(team) ? 'AFL' : 'NFL';
  }
  if (team === 'SEA Seahawks') return year <= 2001 ? 'AFC' : 'NFC';
  const AFC = new Set([
    'BAL Ravens', 'BUF Bills', 'CIN Bengals', 'CLE Browns',
    'DEN Broncos', 'HOU Texans', 'JAX Jaguars', 'KC Chiefs',
    'SD/LAC Chargers', 'OAK/LA/LV Raiders', 'MIA Dolphins',
    'NWE Patriots', 'NYJ Jets', 'PIT Steelers', 'BAL/IND Colts',
    'HOU/TEN Oilers/Titans'
  ]);
  const NFC = new Set([
    'ARZ/STL Cardinals', 'ATL Falcons', 'CAR Panthers', 'CHI Bears',
    'DAL Cowboys', 'DET Lions', 'GB Packers', 'LAR/STL Rams',
    'MIN Vikings', 'NO Saints', 'NYG Giants', 'PHI Eagles',
    'SEA Seahawks', 'SF 49ers', 'TAM Bucs',
    'WAS Redskins/Football Team/Commanders'
  ]);
  if (AFC.has(team)) return 'AFC';
  if (NFC.has(team)) return 'NFC';
  return 'NFL';
}

function normalizeName(name) {
  if (!name) return null;
  const trimmed = name.trim();
  if (aliasMap[trimmed]) return aliasMap[trimmed];
  if (teamColorMap[trimmed]) return trimmed;
  const lastWord = trimmed.split(/\s+/).pop();
  if (aliasMap[lastWord]) return aliasMap[lastWord];
  return trimmed;
}

function getTeamColor(team) {
  if (!team) return getColorFromString('unknown');
  if (teamColorMap[team]) return teamColorMap[team];
  const fallbackKey = Object.keys(teamColorMap).find((key) => key.toLowerCase() === team.toLowerCase());
  return fallbackKey ? teamColorMap[fallbackKey] : getColorFromString(team);
}

function getColorFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 45%)`;
}

function buildTimeline(data) {
  const items = Array.isArray(data.playoffData) ? data.playoffData : [];
  if (!items.length) {
    timelineEl.innerHTML = '<div class="error">No playoffData found</div>';
    return;
  }

  const years = items.map((item) => item.year).filter((year) => year != null);

  const yearMap = new Map();
  items.forEach((item) => {
    const teamSet = new Set();
    (item.teams || []).forEach((team) => {
      const normalized = normalizeName(team);
      if (normalized) teamSet.add(normalized);
    });
    const superWinner = normalizeName(item.superBowlWinner);
    const notes = item.notes || {};
    const confChamps = new Set(
      (item.conferenceChampions || []).map((t) => normalizeName(t)).filter(Boolean)
    );
    const confLosers = new Set(
      (item.conferenceLosers || []).map((t) => normalizeName(t)).filter(Boolean)
    );
    const negativeRecord = new Set(
      (item.negativeRecord || []).map((t) => normalizeName(t)).filter(Boolean)
    );
    yearMap.set(item.year, { teams: teamSet, superWinner, notes, confChamps, confLosers, negativeRecord });
  });

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');

  const thTeam = document.createElement('th');
  thTeam.textContent = 'Team';
  headerRow.appendChild(thTeam);

  const thApps = document.createElement('th');
  thApps.textContent = 'Playoff Seasons';
  headerRow.appendChild(thApps);

  const thPct = document.createElement('th');
  thPct.textContent = 'Playoff Season%';
  headerRow.appendChild(thPct);

  years.forEach((year) => {
    const th = document.createElement('th');
    th.textContent = year;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  teamOrder.forEach((team) => {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.className = 'team-name-cell';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'team-name';
    nameSpan.textContent = team;
    nameSpan.style.backgroundColor = getTeamColor(team);
    nameSpan.style.color = '#fff';
    tdName.appendChild(nameSpan);
    tr.appendChild(tdName);

    const appearances = years.filter((year) => {
      const yd = yearMap.get(year);
      return yd && yd.teams.has(team);
    }).length;

    const tdApps = document.createElement('td');
    tdApps.textContent = appearances;
    tdApps.style.textAlign = 'center';
    tdApps.style.fontWeight = 'bold';
    tdApps.style.minWidth = '60px';
    tr.appendChild(tdApps);

    const age = franchiseAge[team] || 59;
    const pct = ((appearances / age) * 100).toFixed(1);
    const tdPct = document.createElement('td');
    tdPct.textContent = `${pct}%`;
    tdPct.style.textAlign = 'center';
    tdPct.style.fontWeight = 'bold';
    tdPct.style.minWidth = '80px';
    tr.appendChild(tdPct);

    years.forEach((year) => {
      const td = document.createElement('td');
      const yearData = yearMap.get(year);
      if (yearData && yearData.teams.has(team)) {
        const mark = document.createElement('span');
        mark.className = 'team-cell';

        const isSuper = yearData.superWinner &&
          yearData.superWinner.toLowerCase() === team.toLowerCase();
        const isConfChamp = yearData.confChamps && yearData.confChamps.has(team);
        const isConfLoser = yearData.confLosers && yearData.confLosers.has(team);
        const conf = getConference(team, year);

        if (isSuper) {
          mark.textContent = '🏆';
        } else if (isConfChamp) {
          mark.textContent = '✕';
        } else if (isConfLoser) {
          mark.textContent = '▼';
        } else if (yearData.negativeRecord && yearData.negativeRecord.has(team)) {
          mark.textContent = '!';
        } else {
          mark.textContent = '●';
        }

        let detail;
        if (isSuper) {
          detail = 'Super Bowl Winner';
        } else if (isConfChamp) {
          detail = 'Super Bowl Loser';
        } else if (isConfLoser) {
          detail = `${conf} Runner-Up`;
        } else {
          detail = 'Playoff Team';
        }

        mark.dataset.team = team;
        mark.dataset.year = year;
        mark.dataset.detail = detail;
        mark.dataset.note = (yearData.notes && yearData.notes[team]) || '';
        mark.style.backgroundColor = getTeamColor(team);
        mark.style.color = '#fff';
        mark.addEventListener('mouseenter', showTooltip);
        mark.addEventListener('mouseleave', hideTooltip);
        td.appendChild(mark);
      }
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  timelineEl.innerHTML = '';
  timelineEl.appendChild(table);
}

function showTooltip(event) {
  const target = event.currentTarget;
  const note = target.dataset.note;
  tooltip.innerHTML = `
    <strong>${target.dataset.team} (${target.dataset.year})</strong><br>
    ${target.dataset.detail}
    ${note ? `<br><em>${note}</em>` : ''}
  `;
  tooltip.style.opacity = '1';
  const rect = target.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
}

function hideTooltip() {
  tooltip.style.opacity = '0';
}
