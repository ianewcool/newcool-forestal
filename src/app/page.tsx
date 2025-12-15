'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas CONAF por region
const OFICINAS = [
  { id: 1, nombre: 'CONAF Arica y Parinacota', region: 'Arica y Parinacota', ciudad: 'Arica', direccion: 'Vicuna Mackenna 820', telefono: '58 2201200', servicios: ['Parques Nacionales', 'Incendios', 'Fiscalizacion'] },
  { id: 2, nombre: 'CONAF Tarapaca', region: 'Tarapaca', ciudad: 'Iquique', direccion: 'Anibal Pinto 452', telefono: '57 2410900', servicios: ['Parques Nacionales', 'Incendios', 'Fiscalizacion'] },
  { id: 3, nombre: 'CONAF Antofagasta', region: 'Antofagasta', ciudad: 'Antofagasta', direccion: 'Av. Argentina 2510', telefono: '55 2268100', servicios: ['Parques Nacionales', 'Incendios', 'Permisos'] },
  { id: 4, nombre: 'CONAF Atacama', region: 'Atacama', ciudad: 'Copiapo', direccion: 'Atacama 898', telefono: '52 2213404', servicios: ['Parques Nacionales', 'Incendios', 'Permisos'] },
  { id: 5, nombre: 'CONAF Coquimbo', region: 'Coquimbo', ciudad: 'La Serena', direccion: 'Cordovez 281', telefono: '51 2227016', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 6, nombre: 'CONAF Valparaiso', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: '3 Norte 541, Vina del Mar', telefono: '32 2320300', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 7, nombre: 'CONAF Metropolitana', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Av. Bulnes 285', telefono: '22 6630000', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Permisos'] },
  { id: 8, nombre: 'CONAF OHiggins', region: 'OHiggins', ciudad: 'Rancagua', direccion: 'Cuevas 480', telefono: '72 2204601', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 9, nombre: 'CONAF Maule', region: 'Maule', ciudad: 'Talca', direccion: '2 Sur 1640', telefono: '71 2233512', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 10, nombre: 'CONAF Nuble', region: 'Nuble', ciudad: 'Chillan', direccion: '5 de Abril 580', telefono: '42 2433100', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 11, nombre: 'CONAF Biobio', region: 'Biobio', ciudad: 'Concepcion', direccion: 'Barros Arana 215', telefono: '41 2624000', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 12, nombre: 'CONAF Araucania', region: 'Araucania', ciudad: 'Temuco', direccion: 'Bilbao 931', telefono: '45 2298100', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 13, nombre: 'CONAF Los Rios', region: 'Los Rios', ciudad: 'Valdivia', direccion: 'Yungay 299', telefono: '63 2245300', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 14, nombre: 'CONAF Los Lagos', region: 'Los Lagos', ciudad: 'Puerto Montt', direccion: 'Ochagavia 458', telefono: '65 2486100', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Incendios'] },
  { id: 15, nombre: 'CONAF Aysen', region: 'Aysen', ciudad: 'Coyhaique', direccion: 'Av. Ogana 1060', telefono: '67 2212125', servicios: ['Parques Nacionales', 'Planes de Manejo', 'Torres del Paine'] },
  { id: 16, nombre: 'CONAF Magallanes', region: 'Magallanes', ciudad: 'Punta Arenas', direccion: 'Av. Bulnes 0309', telefono: '61 2238554', servicios: ['Torres del Paine', 'Parques Nacionales', 'Incendios'] }
];

// Tipos de permisos forestales
const PERMISOS = [
  { nombre: 'Plan de Manejo Forestal', icono: '📋', descripcion: 'Documento tecnico para aprovechamiento sostenible del bosque', duracion: 'Variable segun plan', requisitos: ['Titulo de dominio', 'Estudio tecnico', 'Ingeniero forestal'], costo: 'Variable segun hectareas' },
  { nombre: 'Corta de Bosque Nativo', icono: '🪓', descripcion: 'Autorizacion para corta de arboles nativos', duracion: '30 dias habiles', requisitos: ['Plan de manejo aprobado', 'Inventario forestal', 'Medidas de proteccion'], costo: 'Sin costo' },
  { nombre: 'Roce a Fuego', icono: '🔥', descripcion: 'Permiso para quema controlada de vegetacion', duracion: 'Temporada de quemas', requisitos: ['Solicitud formal', 'Plan de quema', 'Medidas de seguridad'], costo: 'Sin costo' },
  { nombre: 'Plantacion Forestal', icono: '🌲', descripcion: 'Registro de plantaciones de especies exoticas', duracion: 'Permanente', requisitos: ['Declaracion de plantacion', 'Ubicacion georeferenciada', 'Especie a plantar'], costo: 'Sin costo' },
  { nombre: 'Guia de Libre Transito', icono: '🚛', descripcion: 'Documento para transporte legal de madera', duracion: 'Por viaje', requisitos: ['Plan de manejo vigente', 'Origen de la madera', 'Destino del transporte'], costo: 'Sin costo' },
  { nombre: 'Bonificacion Forestal', icono: '💰', descripcion: 'Subsidio DL 701 para forestacion y manejo', duracion: '20 anos', requisitos: ['Pequeno propietario', 'Plan de manejo', 'Terreno apto'], costo: 'Subsidio hasta 90%' }
];

// Especies nativas de Chile
const ESPECIES = [
  { nombre: 'Araucaria', icono: '🌲', nombreCientifico: 'Araucaria araucana', altura: '30-40 m', region: 'Araucania, Biobio', proteccion: 'Monumento Natural', usos: 'Pinones comestibles, madera' },
  { nombre: 'Alerce', icono: '🌳', nombreCientifico: 'Fitzroya cupressoides', altura: '40-60 m', region: 'Los Rios, Los Lagos', proteccion: 'Monumento Natural', usos: 'Madera durable, tejuelas' },
  { nombre: 'Lenga', icono: '🍂', nombreCientifico: 'Nothofagus pumilio', altura: '20-30 m', region: 'Aysen, Magallanes', proteccion: 'Vulnerable', usos: 'Madera, lena, muebles' },
  { nombre: 'Coigue', icono: '🌿', nombreCientifico: 'Nothofagus dombeyi', altura: '25-40 m', region: 'Araucania al sur', proteccion: 'Sin proteccion especial', usos: 'Construccion, pulpa' },
  { nombre: 'Roble', icono: '🌰', nombreCientifico: 'Nothofagus obliqua', altura: '30-40 m', region: 'OHiggins a Los Rios', proteccion: 'Sin proteccion especial', usos: 'Muebles, barricas' },
  { nombre: 'Quillay', icono: '🧴', nombreCientifico: 'Quillaja saponaria', altura: '15-20 m', region: 'Coquimbo a Biobio', proteccion: 'Vulnerable', usos: 'Saponinas, cosmeticos' },
  { nombre: 'Boldo', icono: '🌿', nombreCientifico: 'Peumus boldus', altura: '6-8 m', region: 'Coquimbo a Los Lagos', proteccion: 'Sin proteccion especial', usos: 'Medicinal, infusiones' },
  { nombre: 'Canelo', icono: '🍃', nombreCientifico: 'Drimys winteri', altura: '15-20 m', region: 'Coquimbo a Magallanes', proteccion: 'Arbol sagrado mapuche', usos: 'Medicinal, ceremonial' }
];

// Pasos para obtener permisos
const PASOS = [
  { paso: 1, titulo: 'Identificar tipo de permiso', descripcion: 'Determina que tipo de intervencion forestal realizaras', icono: '🔍' },
  { paso: 2, titulo: 'Contratar ingeniero forestal', descripcion: 'Profesional habilitado debe elaborar el plan tecnico', icono: '👷' },
  { paso: 3, titulo: 'Elaborar plan de manejo', descripcion: 'Documento tecnico con inventario, cortas y medidas de proteccion', icono: '📋' },
  { paso: 4, titulo: 'Presentar en CONAF', descripcion: 'Ingresar solicitud en oficina regional correspondiente', icono: '🏛️' },
  { paso: 5, titulo: 'Fiscalizacion en terreno', descripcion: 'CONAF verifica la informacion del plan en el predio', icono: '📍' },
  { paso: 6, titulo: 'Obtencion del permiso', descripcion: 'Una vez aprobado, puedes iniciar las faenas forestales', icono: '✅' }
];

// Glosario forestal
const GLOSARIO = [
  { termino: 'Bosque Nativo', definicion: 'Ecosistema forestal natural con especies autoctonas de Chile' },
  { termino: 'Plan de Manejo', definicion: 'Documento tecnico que regula la intervencion sostenible del bosque' },
  { termino: 'DAP', definicion: 'Diametro a la Altura del Pecho, medido a 1.3 m del suelo' },
  { termino: 'Roce', definicion: 'Eliminacion de vegetacion mediante corta o quema controlada' },
  { termino: 'Corta de Cosecha', definicion: 'Extraccion de arboles maduros segun el plan de manejo' },
  { termino: 'Raleo', definicion: 'Corta selectiva para mejorar el crecimiento del bosque remanente' },
  { termino: 'Reforestacion', definicion: 'Plantacion de arboles en terrenos que fueron bosques' },
  { termino: 'Forestacion', definicion: 'Plantacion de arboles en terrenos que no eran bosques' },
  { termino: 'Bosque de Proteccion', definicion: 'Bosques que protegen suelos, aguas o biodiversidad' },
  { termino: 'SNASPE', definicion: 'Sistema Nacional de Areas Silvestres Protegidas del Estado' },
  { termino: 'Ley de Bosque Nativo', definicion: 'Ley 20.283 que regula la recuperacion y manejo del bosque nativo' },
  { termino: 'DL 701', definicion: 'Decreto Ley que fomenta la actividad forestal con bonificaciones' }
];

export default function ForestalPage() {
  const [busqueda, setBusqueda] = useState('');
  const [hectareas, setHectareas] = useState('');
  const [tipoManejo, setTipoManejo] = useState('conservacion');
  const [densidad, setDensidad] = useState('');

  const oficinasFiltradas = OFICINAS.filter(
    (o) =>
      o.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.region.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.ciudad.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calculadora de costo de plan de manejo
  const calcularPlanManejo = () => {
    if (!hectareas) return null;
    const ha = parseFloat(hectareas);
    const dens = densidad ? parseFloat(densidad) : 800; // arboles por hectarea promedio

    // Costos aproximados de elaboracion de plan de manejo
    const costoBase = 150000; // costo fijo base
    const costoPorHa = tipoManejo === 'conservacion' ? 25000 : tipoManejo === 'aprovechamiento' ? 35000 : 20000;
    const costoInventario = (ha * dens * 50) / 100; // inventario forestal
    const costoTotal = costoBase + (ha * costoPorHa) + costoInventario;

    // Bonificacion DL 701 (si aplica)
    const bonificacion = tipoManejo === 'conservacion' ? costoTotal * 0.75 : tipoManejo === 'aprovechamiento' ? 0 : costoTotal * 0.90;

    return {
      hectareas: ha,
      densidad: dens,
      costoBase,
      costoPorHa: ha * costoPorHa,
      costoInventario: Math.round(costoInventario),
      costoTotal: Math.round(costoTotal),
      bonificacion: Math.round(bonificacion),
      costoFinal: Math.round(costoTotal - bonificacion),
      tipo: tipoManejo === 'conservacion' ? 'Conservacion' : tipoManejo === 'aprovechamiento' ? 'Aprovechamiento' : 'Forestacion'
    };
  };

  const resultado = calcularPlanManejo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      {/* Header */}
      <header className="bg-green-800/50 border-b border-green-700/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-5xl">🌲</span>
            <div>
              <h1 className="text-3xl font-bold text-white">Forestal</h1>
              <p className="text-green-300">CONAF - Corporacion Nacional Forestal</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Buscador de Oficinas */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-green-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🔍</span> Buscador de Oficinas CONAF
          </h2>

          <input
            type="text"
            placeholder="Buscar por region, ciudad o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-green-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 text-lg"
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {oficinasFiltradas.map((oficina) => (
              <motion.div
                key={oficina.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 rounded-xl p-4 border border-green-500/20 hover:border-green-400/50 transition-all"
              >
                <h3 className="font-bold text-white">{oficina.nombre}</h3>
                <p className="text-green-300 text-sm">{oficina.ciudad}, {oficina.region}</p>
                <p className="text-gray-400 text-sm mt-1">{oficina.direccion}</p>
                <p className="text-green-400 text-sm">Tel: {oficina.telefono}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {oficina.servicios.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-green-500/20 rounded text-xs text-green-300">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Mostrando {oficinasFiltradas.length} de {OFICINAS.length} oficinas
          </p>
        </motion.div>
      </section>

      {/* Calculadora de Plan de Manejo */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-2xl p-8 border border-emerald-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🧮</span> Calculadora de Plan de Manejo Forestal
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-green-300 mb-2">Superficie (hectareas)</label>
                <input
                  type="number"
                  value={hectareas}
                  onChange={(e) => setHectareas(e.target.value)}
                  placeholder="Ej: 50"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-green-300 mb-2">Tipo de Manejo</label>
                <select
                  value={tipoManejo}
                  onChange={(e) => setTipoManejo(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="conservacion" className="bg-gray-800">Conservacion (Bonif. 75%)</option>
                  <option value="forestacion" className="bg-gray-800">Forestacion (Bonif. 90%)</option>
                  <option value="aprovechamiento" className="bg-gray-800">Aprovechamiento (Sin bonif.)</option>
                </select>
              </div>

              <div>
                <label className="block text-green-300 mb-2">Densidad (arboles/ha) - Opcional</label>
                <input
                  type="number"
                  value={densidad}
                  onChange={(e) => setDensidad(e.target.value)}
                  placeholder="Por defecto: 800"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {resultado && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Estimacion de Costos</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Superficie:</span>
                    <span className="text-white">{resultado.hectareas} ha</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tipo:</span>
                    <span className="text-white">{resultado.tipo}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Costo base:</span>
                    <span className="text-white">${resultado.costoBase.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Costo por hectarea:</span>
                    <span className="text-white">${resultado.costoPorHa.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Inventario forestal:</span>
                    <span className="text-white">${resultado.costoInventario.toLocaleString('es-CL')}</span>
                  </div>

                  <div className="border-t border-green-500/30 pt-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Costo total:</span>
                      <span className="text-white">${resultado.costoTotal.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>Bonificacion DL 701:</span>
                      <span>-${resultado.bonificacion.toLocaleString('es-CL')}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-500/20 rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-300 font-medium">Costo final estimado:</span>
                      <span className="text-2xl font-bold text-white">${resultado.costoFinal.toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  * Estimacion referencial. Consulte con ingeniero forestal para presupuesto real.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Tipos de Permisos */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>📋</span> Tipos de Permisos Forestales
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERMISOS.map((permiso, i) => (
            <motion.div
              key={permiso.nombre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 rounded-xl p-5 border border-green-500/20 hover:border-green-400/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{permiso.icono}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{permiso.nombre}</h3>
                  <p className="text-gray-400 text-sm mt-1">{permiso.descripcion}</p>
                  <p className="text-green-400 text-sm mt-2">Plazo: {permiso.duracion}</p>
                  <p className="text-emerald-400 text-sm">Costo: {permiso.costo}</p>
                  <div className="mt-2">
                    <p className="text-gray-500 text-xs">Requisitos:</p>
                    <ul className="text-gray-400 text-xs list-disc list-inside">
                      {permiso.requisitos.map((r, j) => (
                        <li key={j}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Especies Nativas */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🌳</span> Especies Nativas de Chile
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ESPECIES.map((especie, i) => (
              <motion.div
                key={especie.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{especie.icono}</span>
                  <h3 className="font-bold text-white">{especie.nombre}</h3>
                </div>
                <p className="text-green-300 text-xs italic mb-2">{especie.nombreCientifico}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">Altura: <span className="text-white">{especie.altura}</span></p>
                  <p className="text-gray-300">Region: <span className="text-white">{especie.region}</span></p>
                  <p className="text-gray-300">Proteccion: <span className="text-emerald-400">{especie.proteccion}</span></p>
                  <p className="text-gray-400 text-xs mt-2">Usos: {especie.usos}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos para Obtener Permisos */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>📝</span> Pasos para Obtener Permisos Forestales
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          {PASOS.map((paso, i) => (
            <motion.div
              key={paso.paso}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                {paso.icono}
              </div>
              <div className="text-xs text-green-400 mb-1">Paso {paso.paso}</div>
              <h3 className="font-bold text-white text-sm mb-1">{paso.titulo}</h3>
              <p className="text-gray-400 text-xs">{paso.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glosario */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>📚</span> Glosario Forestal
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLOSARIO.map((item, i) => (
              <motion.div
                key={item.termino}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white/5 rounded-lg p-4 border border-green-500/20"
              >
                <h3 className="font-bold text-green-400 mb-1">{item.termino}</h3>
                <p className="text-gray-300 text-sm">{item.definicion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>🔗</span> Recursos Oficiales
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { nombre: 'CONAF', url: 'https://www.conaf.cl', desc: 'Sitio oficial de la Corporacion Nacional Forestal' },
            { nombre: 'SNASPE', url: 'https://www.conaf.cl/parques-nacionales/', desc: 'Sistema de Areas Silvestres Protegidas' },
            { nombre: 'Ley Bosque Nativo', url: 'https://www.bcn.cl/leychile/navegar?idNorma=274894', desc: 'Ley 20.283 de Bosque Nativo' },
            { nombre: 'INFOR', url: 'https://www.infor.cl', desc: 'Instituto Forestal de Chile' }
          ].map((recurso, i) => (
            <motion.a
              key={recurso.nombre}
              href={recurso.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-green-500/20 transition-all"
            >
              <h3 className="font-bold text-white mb-1">{recurso.nombre}</h3>
              <p className="text-gray-400 text-sm">{recurso.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-700/50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Forestal - Un modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-green-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Protegiendo los bosques de Chile
          </p>
        </div>
      </footer>
    </div>
  );
}
