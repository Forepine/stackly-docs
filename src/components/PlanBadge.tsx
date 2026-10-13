import React from 'react';

/** Which plan a feature needs: <PlanBadge plan="Starter" /> → "Starter plan and above" */
export default function PlanBadge({ plan, children }: { plan: string; children?: React.ReactNode }) {
  return <span className="plan-badge" title={`Available on the ${plan} plan and above`}>{children ?? `${plan}+`}</span>;
}
