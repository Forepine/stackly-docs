import React from 'react';
import Link from '@docusaurus/Link';
import * as Icons from 'lucide-react';

type Card = { title: string; to: string; description: string; icon?: keyof typeof Icons };

/** Linked cards with a line icon (lucide name, e.g. "Link2") */
export default function CardGrid({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 }) {
  return (
    <div className={`card-grid card-grid--${columns}`}>
      {cards.map((c) => {
        const Icon = (c.icon && (Icons[c.icon] as React.ComponentType<{ size?: number; strokeWidth?: number }>)) || Icons.FileText;
        return (
          <Link key={c.to} to={c.to} className="guide-card">
            <span className="guide-card__icon" aria-hidden="true"><Icon size={16} strokeWidth={1.8} /></span>
            <span className="guide-card__body">
              <span className="guide-card__title">{c.title}</span>
              <span className="guide-card__desc">{c.description}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
