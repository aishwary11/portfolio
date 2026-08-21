import type { IconComponent } from '@/types/resume';

interface TagProps {
  readonly label: string;
  readonly icon?: IconComponent | null;
  /** Brand colour for the glyph, or for the fallback dot when there is none. */
  readonly color?: string;
}

/**
 * Mono chip for a technology name.
 *
 * Brand colour is applied to the glyph only, never to the label — coloured text
 * at 11px fails contrast at most brand values, and the glyph already carries the
 * recognition.
 */
export function Tag({ label, icon: Icon, color }: TagProps) {
  return (
    <li className="tag">
      <Glyph icon={Icon} color={color} />
      {label}
    </li>
  );
}

/** Brand glyph when the icon is known, a coloured dot when only the brand is. */
function Glyph({ icon: Icon, color }: Pick<TagProps, 'icon' | 'color'>) {
  if (Icon) {
    return <Icon aria-hidden="true" size={11} style={color ? { color } : undefined} />;
  }

  if (color) {
    return (
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    );
  }

  return null;
}
