const benefits = [
  {
    title: "1h de clase = 1h de reparación",
    description: "El valor siempre se mide en tu tiempo.",
  },
  {
    title: "Sin dinero, solo horas",
    description: "Un sistema justo, directo y transparente.",
  },
  {
    title: "Tu barrio, conectado",
    description: "Conoce a tus vecinos y colabora de forma real.",
  },
]

export default function BenefitsList() {
  return (
    <ul className="space-y-3 mb-8">
      {benefits.map((benefit) => (
        <li key={benefit.title} className="flex items-start gap-3">
          <span className="text-teal font-bold mt-0.5">✓</span>
          <div>
            <p className="font-body font-medium text-ink text-sm">{benefit.title}</p>
            <p className="font-body font-light text-ink/60 text-sm">{benefit.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}