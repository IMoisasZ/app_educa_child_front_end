export const listKinship = [
  {
    id: 1,
    description: "Pai",
    gender: "Masculino",
    icon: "human-male",
  },
  { id: 2, description: "Mãe", gender: "Feminino", icon: "human-female" },
  { id: 3, description: "Avô", gender: "Masculino", icon: "face-man" },
  {
    id: 4,
    description: "Avó",
    gender: "Feminino",
    icon: "face-woman",
  },
  {
    id: 5,
    description: "Tio",
    gender: "Masculino",
    icon: "human",
  },
  {
    id: 6,
    description: "Tia",
    gender: "Feminino",
    icon: "human-female-dance",
  },
]

export const listDefaultEvents = [
  {
    id: 1,
    description: "Aniversário",
    icon: "cake-variant",
  },
  {
    id: 2,
    description: "Pascoa",
    icon: "egg-easter",
  },
  {
    id: 3,
    description: "Natal",
    icon: "hexagram-outline",
  },
  {
    id: 4,
    description: "Passeio",
    icon: "human-scooter",
  },
  {
    id: 5,
    description: "Dia das crianças",
    icon: "baby-face",
  },
  {
    id: 6,
    description: "Outros",
    icon: "help",
  },
].sort((a, b) => a.description > b.description)

export const genderList = [
  {
    icon: "face-man",
    gender: "Menino",
  },
  {
    icon: "face-woman",
    gender: "Menina",
  },
]
