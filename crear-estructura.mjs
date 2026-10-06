import { mkdirSync, writeFileSync } from 'node:fs';

const N = Number(process.argv[2]);
if (!N || N < 1) {
  console.error('Uso: node crear-estructura.mjs <numero-de-integrantes>');
  process.exit(1);
}

mkdirSync('src/components', { recursive: true });
writeFileSync('src/components/.gitkeep', '');

const partes = Array.from({ length: N }, (_, i) => i + 1);

for (const n of partes) {
  mkdirSync(`src/features/parte${n}/components`, { recursive: true });
  writeFileSync(`src/features/parte${n}/components/.gitkeep`, '');
  writeFileSync(
    `src/features/parte${n}/Parte${n}Page.jsx`,
    `import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Parte${n}Page() {
  return (
    <h1 className="text-2xl font-bold p-6">
      <FontAwesomeIcon icon={faHouse} /> Parte ${n}
    </h1>
  )
}
`
  );
}

const imports = partes
  .map((n) => `import Parte${n}Page from './features/parte${n}/Parte${n}Page'`)
  .join('\n');
const links = partes.map((n) => `        <Link to="/parte${n}">Parte ${n}</Link>`).join('\n');
const routes = partes
  .map((n) => `        <Route path="/parte${n}" element={<Parte${n}Page />} />`)
  .join('\n');

writeFileSync(
  'src/App.jsx',
  `import { Routes, Route, Link } from 'react-router-dom'
${imports}

export default function App() {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-gray-100">
${links}
      </nav>
      <Routes>
${routes}
      </Routes>
    </>
  )
}
`
);

console.log(`Estructura creada para ${N} integrantes`);
