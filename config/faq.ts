export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: "tiempo",
    question: "¿Cuánto tiempo toma tener mi web lista?",
    answer:
      "El plan Landing está listo en 5 a 7 días hábiles. La Web Profesional toma entre 10 y 14 días hábiles. Los proyectos a medida varían según la complejidad — te confirmamos un cronograma exacto al iniciar, con hitos claros para que sepas siempre dónde estamos.",
  },
  {
    id: "hosting",
    question: "¿El hosting y el dominio están incluidos?",
    answer:
      "Sí. El primer año de hosting está incluido en todos los planes. Si ya tienes un dominio, lo configuramos sin costo. Si no tienes uno, te ayudamos a comprarlo (cuesta alrededor de S/ 50 al año) y lo dejamos listo para que apunte a tu nueva web.",
  },
  {
    id: "edicion",
    question: "¿Puedo editar los textos y fotos yo mismo?",
    answer:
      "Sí. Te entregamos un breve tutorial en video para que puedas cambiar textos, fotos, precios y promociones sin tocar código. Para cambios más grandes (nuevas secciones, rediseños), los hacemos nosotros sin costo durante el primer mes.",
  },
  {
    id: "iteracion",
    question: "¿Qué pasa si no me gusta el primer mockup?",
    answer:
      "Iteramos. Hacemos hasta 3 rondas de cambios mayores incluidas en el plan, hasta que estés contento con el resultado. Si después del tercer intento no calza, te devolvemos el adelanto sin preguntas — preferimos eso a entregarte algo que no te enamora.",
  },
  {
    id: "ubicacion",
    question: "¿Trabajan con negocios fuera de Lima?",
    answer:
      "Sí, trabajamos 100% remoto. Tenemos clientes en provincia y empezamos a atender consultas internacionales. Toda la coordinación se maneja por WhatsApp y, si hace falta, por videollamada — sin necesidad de reuniones presenciales.",
  },
  {
    id: "pago",
    question: "¿Cómo es la forma de pago?",
    answer:
      "Trabajamos con 50% al inicio y 50% contra entrega. Para proyectos a medida coordinamos hitos de pago según el alcance. Aceptamos transferencia bancaria, Yape, Plin y, para clientes internacionales, transferencia en USD.",
  },
]
