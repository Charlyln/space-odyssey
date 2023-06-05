import RessourcesStack from './RessourcesStack';

export default function PageHeaderCosts({ costs, element }) {
  const costItems = costs.filter((cost) => cost.craft === element.name);
  costItems.sort((a, b) => new Date(b.value) - new Date(a.value));

  return <RessourcesStack size={'52px'} ressources={costItems} disabledCard={true} onClick={() => {}} square footer />;
}
