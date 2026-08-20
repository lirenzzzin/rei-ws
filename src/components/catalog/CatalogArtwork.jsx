const watchFinishColors = {
  "Meia-noite": "#20242c",
  Estelar: "#e8dfd2",
  Prateado: "#d7d9dc",
  "(PRODUCT)RED": "#b91932",
  "Titânio natural": "#b8b0a5",
  "Titânio preto": "#39383a",
  Rosa: "#e6b5bd",
  "Ouro rosa": "#d5aa9b",
  "Preto brilhante": "#171719",
  "Cinza-espacial": "#55565a",
  Dourado: "#c9ad82",
};

export function getWatchFinishColor(name) {
  return watchFinishColors[name] ?? "#b9bcc1";
}

function WatchFace({ family }) {
  if (family === "ultra") {
    return (
      <>
        <circle cx="132" cy="118" r="58" fill="none" stroke="#ff7a00" strokeWidth="6" strokeDasharray="62 16" />
        <circle cx="132" cy="118" r="44" fill="none" stroke="#667085" strokeWidth="2" strokeDasharray="2 7" />
        <path d="M132 118 161 87" stroke="white" strokeWidth="7" strokeLinecap="round" />
        <path d="M132 118 105 100" stroke="white" strokeWidth="7" strokeLinecap="round" />
        <path d="M132 118v41" stroke="#ff7a00" strokeWidth="2" />
        <circle cx="132" cy="118" r="5" fill="#ff7a00" />
      </>
    );
  }

  return (
    <>
      <circle cx="132" cy="118" r="57" fill="none" stroke={family === "se" ? "#4d8dff" : "#8b5cf6"} strokeWidth="8" strokeDasharray="70 24" />
      <circle cx="132" cy="118" r="38" fill="none" stroke="#253248" strokeWidth="12" />
      <path d="M132 118 161 92" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <path d="M132 118 109 101" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <path d="M132 118v38" stroke={family === "se" ? "#48a2ff" : "#f59e0b"} strokeWidth="2" />
      <circle cx="132" cy="118" r="5" fill={family === "se" ? "#48a2ff" : "#f59e0b"} />
    </>
  );
}

export function WatchArtwork({ modelId, color }) {
  const family = modelId.includes("ultra") ? "ultra" : modelId.startsWith("se-") ? "se" : "series";
  const caseColor = getWatchFinishColor(color);
  const bandColor = family === "ultra" ? "#26303e" : color === "Rosa" || color === "Ouro rosa" ? "#d8aab3" : "#27354a";

  return (
    <svg
      viewBox="0 0 320 300"
      role="img"
      aria-label="Visualização do Apple Watch configurado"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`watch-case-${modelId}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.6" />
          <stop offset="0.32" stopColor={caseColor} />
          <stop offset="1" stopColor="#7b7e84" />
        </linearGradient>
        <linearGradient id={`watch-band-${modelId}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={bandColor} />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
        <filter id={`watch-shadow-${modelId}`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter={`url(#watch-shadow-${modelId})`} transform="translate(18 4)">
        <path
          d="M112 20c0-11 9-20 20-20h39c11 0 20 9 20 20l-8 61h-63z"
          fill={`url(#watch-band-${modelId})`}
        />
        <path
          d="M120 211h63l8 65c0 11-9 20-20 20h-39c-11 0-20-9-20-20z"
          fill={`url(#watch-band-${modelId})`}
        />

        {family === "ultra" ? (
          <path
            d="M61 63c5-12 16-20 30-22h122c17 0 31 11 35 27l8 105c1 18-12 34-30 37l-132 4c-19 0-34-14-36-32l-7-91c-1-10 2-20 10-28z"
            fill={`url(#watch-case-${modelId})`}
          />
        ) : (
          <rect x="59" y="43" width="188" height="171" rx="50" fill={`url(#watch-case-${modelId})`} />
        )}

        <rect
          x={family === "ultra" ? "72" : "69"}
          y="52"
          width={family === "ultra" ? "166" : "168"}
          height="153"
          rx={family === "ultra" ? "34" : "43"}
          fill="#05080d"
        />

        <g transform="translate(21 16)">
          <WatchFace family={family} />
        </g>

        <circle cx="253" cy="104" r={family === "ultra" ? "17" : "13"} fill={caseColor} stroke="#56585d" strokeWidth="5" />
        <rect x="246" y="132" width="12" height="45" rx="6" fill="#74777c" />
        {family === "ultra" ? <rect x="49" y="111" width="10" height="42" rx="5" fill="#ff7a00" /> : null}
      </g>
    </svg>
  );
}

function Cable({ lightning = false, magnetic = false, braided = false }) {
  return (
    <svg viewBox="0 0 360 280" role="img" aria-label="Imagem do cabo" className="h-full w-full">
      <defs>
        <filter id="cable-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000" floodOpacity="0.14" />
        </filter>
      </defs>
      <g filter="url(#cable-shadow)">
        <path
          d="M92 99c-39 30-44 100 3 132 40 27 124 28 168-2 48-33 43-102 4-130-35-25-135-26-175 0Z"
          fill="none"
          stroke={braided ? "#e7e7e9" : "#f5f5f7"}
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path d="M91 101 61 64" stroke="#f5f5f7" strokeWidth="18" strokeLinecap="round" />
        <path d="m268 101 31-38" stroke="#f5f5f7" strokeWidth="18" strokeLinecap="round" />

        {magnetic ? (
          <g>
            <circle cx="54" cy="55" r="33" fill="#f7f7f8" stroke="#c8c9cc" strokeWidth="5" />
            <circle cx="54" cy="55" r="24" fill="#fff" />
          </g>
        ) : (
          <g>
            <rect x="31" y="27" width="46" height="58" rx="13" fill="#f7f7f8" />
            <rect x="41" y="13" width="26" height="25" rx="5" fill="#b7bbc2" />
            {lightning ? <rect x="47" y="7" width="14" height="17" rx="3" fill="#d4b56d" /> : null}
          </g>
        )}

        <g>
          <rect x="278" y="27" width="46" height="58" rx="13" fill="#f7f7f8" />
          <rect x="288" y="12" width="26" height="26" rx="5" fill="#b7bbc2" />
        </g>
      </g>
    </svg>
  );
}

function Adapter20W() {
  return (
    <svg viewBox="0 0 360 280" role="img" aria-label="Adaptador USB-C de 20W" className="h-full w-full">
      <defs>
        <filter id="adapter-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="15" stdDeviation="12" floodColor="#000" floodOpacity="0.16" />
        </filter>
        <linearGradient id="adapter-body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#e9e9eb" />
        </linearGradient>
      </defs>
      <g filter="url(#adapter-shadow)" transform="translate(76 35)">
        <rect x="37" y="26" width="146" height="174" rx="37" fill="url(#adapter-body)" stroke="#d9dade" />
        <rect x="72" y="75" width="77" height="36" rx="18" fill="#d7d8dc" />
        <rect x="82" y="84" width="57" height="18" rx="9" fill="#292b30" />
        <rect x="182" y="62" width="42" height="18" rx="6" fill="#b8bbc1" />
        <rect x="182" y="143" width="42" height="18" rx="6" fill="#b8bbc1" />
      </g>
    </svg>
  );
}

function MagSafe() {
  return (
    <svg viewBox="0 0 360 280" role="img" aria-label="Carregador MagSafe" className="h-full w-full">
      <defs>
        <filter id="magsafe-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="13" stdDeviation="10" floodColor="#000" floodOpacity="0.14" />
        </filter>
      </defs>
      <g filter="url(#magsafe-shadow)">
        <path d="M115 125c-35 32-27 89 18 108 42 18 113 11 137-24 26-38 4-88-36-99" fill="none" stroke="#f3f3f5" strokeWidth="18" strokeLinecap="round" />
        <path d="M112 126 95 95" stroke="#f3f3f5" strokeWidth="18" strokeLinecap="round" />
        <circle cx="91" cy="71" r="46" fill="#f7f7f8" stroke="#c8c9cc" strokeWidth="6" />
        <circle cx="91" cy="71" r="35" fill="#fff" />
        <path d="m236 112 32-47" stroke="#f3f3f5" strokeWidth="18" strokeLinecap="round" />
        <rect x="253" y="24" width="45" height="58" rx="13" fill="#f7f7f8" />
        <rect x="263" y="10" width="25" height="25" rx="5" fill="#b7bbc2" />
      </g>
    </svg>
  );
}

export function ChargerArtwork({ productId }) {
  if (productId === "adapter-20w") return <Adapter20W />;
  if (productId === "magsafe") return <MagSafe />;
  if (productId === "watch-cable") return <Cable magnetic braided />;
  if (productId === "usb-c-lightning") return <Cable lightning />;
  return <Cable />;
}
