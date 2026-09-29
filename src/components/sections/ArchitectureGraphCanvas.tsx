'use client';

import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from 'd3-force';
import type { Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';
import { useMemo, useState } from 'react';

import { GRAPH_LINKS, GRAPH_NODES, GROUP_META, type GraphGroup } from '@/data/architecture-graph';

const VIEW_WIDTH = 880;
const VIEW_HEIGHT = 540;
/** Padding so node labels never clip against the viewBox edge. */
const VIEW_PAD = 72;
const NODE_RADIUS = 7;

interface SimNode extends SimulationNodeDatum {
  readonly id: string;
  readonly label: string;
  readonly group: GraphGroup;
  readonly detail: string;
}

interface SimLink extends SimulationLinkDatum<SimNode> {}

/**
 * Node positions settled once at module load by a simulation nobody animates.
 *
 * The force model is a layout engine here, not a toy: it runs synchronously,
 * ticks to exhaustion, throws the simulation away and leaves coordinates. The
 * graph therefore renders identically on the server and client, under reduced
 * motion, and with no timers running past first paint.
 */
const SETTLED_NODES: readonly SimNode[] = (() => {
  const nodes: SimNode[] = GRAPH_NODES.map((node) => ({ ...node }));
  const links: SimLink[] = GRAPH_LINKS.map((link) => ({ ...link }));
  const simulation: Simulation<SimNode, SimLink> = forceSimulation<SimNode>(nodes)
    .force('charge', forceManyBody<SimNode>().strength(-300))
    .force(
      'link',
      forceLink<SimNode, SimLink>(links)
        .id((node) => node.id)
        .distance(110),
    )
    .force('collide', forceCollide<SimNode>().radius(32))
    .force('center', forceCenter())
    .stop();

  for (let tick = 0; tick < 300; tick += 1) simulation.tick();
  return nodes;
})();

/** Settled coordinates scaled to fit the viewBox, keyed by node id. */
const LAYOUT: ReadonlyMap<string, { x: number; y: number }> = (() => {
  const xs = SETTLED_NODES.map((node) => node.x ?? 0);
  const ys = SETTLED_NODES.map((node) => node.y ?? 0);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min(
    (VIEW_WIDTH - VIEW_PAD * 2) / Math.max(maxX - minX, 1),
    (VIEW_HEIGHT - VIEW_PAD * 2) / Math.max(maxY - minY, 1),
  );

  const centred = (value: number, min: number, span: number, view: number) =>
    (value - min - span / 2) * scale + view / 2;

  return new Map(
    SETTLED_NODES.map((node) => [
      node.id,
      {
        x: centred(node.x ?? 0, minX, maxX - minX, VIEW_WIDTH),
        y: centred(node.y ?? 0, minY, maxY - minY, VIEW_HEIGHT),
      },
    ]),
  );
})();

const NODES_BY_ID = new Map(GRAPH_NODES.map((node) => [node.id, node]));

const BASE_EDGE_COLOR = 'light-dark(rgb(15 23 42 / 0.18), rgb(250 249 247 / 0.18))';

/**
 * The platform as a graph: entry points, services, streams and stores.
 *
 * Hovering (or tapping) a node isolates its dependencies and prints the node's
 * one-line role in the caption. The figure itself is the accessibility story —
 * a labelled image plus a visually-hidden list of every node's detail — so the
 * pointer interaction is a bonus, never the only route to the information.
 */
export default function ArchitectureGraphCanvas() {
  const [active, setActive] = useState<string | null>(null);

  const edges = useMemo(
    () =>
      GRAPH_LINKS.map((link) => {
        const source = LAYOUT.get(link.source);
        const target = LAYOUT.get(link.target);
        /* Both endpoints are curated in the same module — missing ids are a
           data bug we want to see, not route around. */
        if (!source || !target)
          throw new Error(`Unlinked graph node in ${link.source} → ${link.target}`);
        const connected = active === null || active === link.source || active === link.target;
        return { ...link, source, target, connected };
      }),
    [active],
  );

  const activeNode = active === null ? undefined : NODES_BY_ID.get(active);
  const activeColor = activeNode ? GROUP_META[activeNode.group].color : undefined;

  return (
    <figure className="surface w-full p-4 sm:p-6">
      <div className="hairline flex items-baseline justify-between gap-4 border-b pb-4">
        <span className="eyebrow">Platform topology</span>
        <span className="meta hidden sm:block">
          {GRAPH_NODES.length} systems · {GRAPH_LINKS.length} links
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="mt-2 w-full"
        role="img"
        aria-labelledby="arch-graph-title arch-graph-desc"
      >
        <title id="arch-graph-title">Platform topology</title>
        <desc id="arch-graph-desc">
          How clients, services, event streams and data stores connect across the platforms on this
          resume, laid out by force simulation.
        </desc>

        <g>
          {edges.map((edge) => (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={edge.source.x}
              y1={edge.source.y}
              x2={edge.target.x}
              y2={edge.target.y}
              stroke={edge.connected && activeColor ? activeColor : BASE_EDGE_COLOR}
              strokeWidth={edge.connected && activeColor ? 1.75 : 1}
              className="transition-opacity duration-200"
              style={{ opacity: edge.connected ? 1 : 0.35 }}
            />
          ))}
        </g>

        <g>
          {GRAPH_NODES.map((node) => {
            const point = LAYOUT.get(node.id);
            if (!point) throw new Error(`Graph node ${node.id} has no settled position`);

            const connected =
              active === null || active === node.id || isConnectedTo(node.id, active);
            const meta = GROUP_META[node.group];

            return (
              <g
                key={node.id}
                className="transition-opacity duration-200"
                style={{ opacity: connected ? 1 : 0.3 }}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Transparent, not `none`: `visiblePainted` hit-testing needs paint. */}
                <circle cx={point.x} cy={point.y} r={22} fill="transparent" />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={13}
                  fill="none"
                  stroke={meta.color}
                  strokeWidth={1.5}
                  className="transition-opacity duration-200"
                  style={{ opacity: active === node.id ? 0.55 : 0 }}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={NODE_RADIUS}
                  fill={meta.color}
                  fillOpacity={0.85}
                  stroke={meta.color}
                />
                <text
                  x={point.x}
                  y={point.y + 24}
                  textAnchor="middle"
                  className={[
                    'font-mono text-[11px]',
                    active === node.id
                      ? 'fill-slate-900 dark:fill-white'
                      : 'fill-slate-600 dark:fill-slate-400',
                  ].join(' ')}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <p className="meta mt-3 flex min-h-5 items-center gap-2">
        {activeNode ? (
          <>
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: activeColor }}
            />
            <span className="text-slate-700 dark:text-slate-300">{activeNode.label}</span>
            <span aria-hidden="true">·</span>
            <span>{activeNode.detail}</span>
          </>
        ) : (
          'Hover or tap a node to trace its connections.'
        )}
      </p>

      <ul aria-hidden="true" className="hairline mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t pt-3">
        {Object.entries(GROUP_META).map(([group, meta]) => (
          <li key={group} className="meta flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-2 rounded-full"
              style={{ backgroundColor: meta.color }}
            />
            {meta.label}
          </li>
        ))}
      </ul>

      {/* Every node's detail, reachable without a pointer at all. */}
      <ul className="sr-only">
        {GRAPH_NODES.map((node) => (
          <li key={node.id}>
            {node.label} — {node.detail}
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** True when the given node is either endpoint of the active node's edges. */
function isConnectedTo(nodeId: string, activeId: string): boolean {
  return GRAPH_LINKS.some(
    (link) =>
      (link.source === activeId && link.target === nodeId) ||
      (link.target === activeId && link.source === nodeId),
  );
}
