export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation?: string;
}

export interface MultipleChoiceQuestion {
  id: number;
  correctAnswers: string[];
  userAnswers: string[];
  explanation?: string;
}
// Data for passage matching questions
export const passageMatchingQuestions: Question[] = [
  {
    id: 1,
    text: "A mention of the horseshoe crab's potential value in medical science",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "A",
    userAnswer: "C",
    explanation:
      "Description of horseshoe crab reproduction 🤔. Step 2: Find paraphrased keywords in the question: female horseshoe crabs communicate → horseshoe crab reproduction, crab eggs by digging holes → reproduction",
  },
  {
    id: 2,
    text: "An explanation of the function of the horseshoe crab's tail",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "B",
    userAnswer: "B",
    explanation: "Explantion",
  },
  {
    id: 3,
    text: "A reference to the horseshoe crab's feeding habits",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "D",
    userAnswer: "D",
    explanation: "Explantion",
  },
  {
    id: 4,
    text: "A description of horseshoe crab reproduction",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "A",
    userAnswer: "D",
    explanation: "Explantion",
  },
  {
    id: 5,
    text: "Information about the horseshoe crab's evolutionary history",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "E",
    userAnswer: null,
    explanation: "Explantion",
  },
];

// Data for multiple choice questions
export const multipleChoiceQuestions: MultipleChoiceQuestion[] = [
  {
    id: 6,
    correctAnswers: ["A", "D"],
    userAnswers: ["A", "E"],
    explanation:
      "Step 1: Understand the question requirement: According to the author, which TWO features are true about horseshoe crabs? Step 2: Find paraphrased keywords in the question: possess the rare ability to regrow lost limbs → able to replace their missing legs, copper-containing protein → different mineral composition",
  },
  {
    id: 7,
    correctAnswers: ["A", "D"],
    userAnswers: ["A", "E"],
    explanation: "Explaination 7",
  },
];

// Data for multiple choice questions 8-9
export const multipleChoiceQuestions89: MultipleChoiceQuestion[] = [
  {
    id: 8,
    correctAnswers: ["A", "D"],
    userAnswers: ["A", "D"],
    explanation:
      "Step 1: Understand the question requirement: In which TWO ways is horseshoe crab blood different from that of most other animals? Step 2: Find the keywords: different mineral composition (A) and colour changes from blue to red (D) are both mentioned in the passage about the special composition of horseshoe crab blood.",
  },
  {
    id: 9,
    correctAnswers: ["A", "D"],
    userAnswers: ["A", "D"],
    explanation:
      "Explanation is similar to question 8 - both questions require choosing TWO letters to describe the differences in horseshoe crab blood.",
  },
];

export const multipleChoiceOptions = [
  { letter: "A", text: "It has a different mineral composition." },
  { letter: "B", text: "It lacks a bacteria-fighting protein." },
  { letter: "C", text: "Harmless fungi regularly grow in the blood." },
  {
    letter: "D",
    text: "Its colour changes from blue to red as it circulates.",
  },
  { letter: "E", text: "The blood cell carries oxygen its surface." },
];

// Options for questions 8-9
export const multipleChoiceOptions89 = [
  { letter: "A", text: "It has a different mineral composition." },
  { letter: "B", text: "It lacks a bacteria-fighting protein." },
  { letter: "C", text: "Harmless fungi regularly grow in the blood." },
  {
    letter: "D",
    text: "Its colour changes from blue to red as it circulates.",
  },
  { letter: "E", text: "The blood cell carries oxygen its surface." },
];

// Data for gap fill questions
export const gapFillQuestions = [
  {
    id: 10,
    correctAnswer: "decline",
    userAnswer: "decline",
    explanation:
      "Find the keyword in the passage about the decline of the horseshoe crab population. Step 2: widespread decline → decline in population",
  },
  {
    id: 11,
    correctAnswer: "egg",
    userAnswer: "eggs",
    explanation:
      "Pay attention to the singular/plural form of the noun. In this context, the singular form 'egg' should be used.",
  },
  {
    id: 12,
    correctAnswer: "biodiversity",
    userAnswer: "biodiversity",
    explanation: "Explaination",
  },
  {
    id: 13,
    correctAnswer: "bait",
    userAnswer: "bait",
    explanation: "Explaination",
  },
];

export const sectionContent = [
  {
    leading: "A.",
    content: `One of the world's oldest animal species, the horseshoe crab, is found along the east coast of the United States and Mexico. Fossil records indicate this creature dates back 450 million years, and it has changed very little over time. This is because its anatomy has been so successful. In fact, the horseshoe crab is more closely related to spiders, scorpions and ticks than it is to true crabs and other crustaceans.`,
  },
  {
    leading: "B.",
    content: `The soft body of the horseshoe crab is protected by a large oval shell with jagged, point spines. The two-part body consists of a head and an abdominal region. The head region contains a brain, heart, mouth, four eyes and six pairs of legs. What is significant is that horseshoe crabs possess the rare ability to regrow lost limbs. They also use crawling as their primary means of movement, and commonly bury themselves under the surface of the sand. However, in the water, they will occasionally turn onto their backs and swim upside-down. The mouth of the horseshoe crab is located between the twelve legs. They can only eat when crawling, as the motion allows them to open and close their mouths. Their diet consists mainly of worms and clams.`,
  },
  {
    leading: "",
    content: `The abdominal region contains mules for movement and is for breathing. A long spine forming a tail, called a telson, is located behind the abdominal region. Although this part of the body looks intimidating, it is not dangerous, poisonous or used to sting. Horseshoe crabs use it to flip over if they happen to be pushed on their backs, but this is only possible under the sea. Every year, about 10 percent of the horseshoe crab breeding population dies while on the beach, when rough surf flips the creatures onto their backs, a position from which they often cannot right themselves.`,
  },
  {
    leading: "C.",
    content: `Another distinctive feature of horseshoe crabs is that they do not have hemoglobin (a protein that contains the mineral iron), which gives blood its red color. Hemoglobin is the basis of oxygen transport in the blood of mammals, reptiles and birds. Rather, the blood of horseshoe crabs has a copper-containing protein called hemocyanin. Hemocyanin is dark blue when it is transporting oxygen and colorless when it is not. The oxygen is also transported in a fluid on the exterior of the cell, in contrast to most animals, where oxygen molecules are transported inside red blood bacteria and fungi. In fact, there enzymes are used by astronauts in the International Space Station to test surfaces for unwanted bacteria and fungi. Another application is a protein from horseshoe crab blood that is under investigation as an antibiotic.`,
  },
  {
    leading: "D.",
    content: `The horseshoe crab faces the greatest dangers in early life. Between April and June, adult horseshoe crabs travel from deep ocean waters to converge on beaches. Crawling out of the sea and onto the beach is especially common at high tides during full and new moons. The males arrive first and await the females for breeding. Female horseshoe crabs communicate by releasing a scent to signal to the males.`,
  },
  {
    leading: "",
    content: `Then female horseshoe crabs crate nests by digging holes in the sand and laying between 60,000 and 120,000 eggs at a time before covering them with sand for protection. Most eggs do not survive the hatching period before being eaten, as the eggs are a food source for numerous birds, reptiles and fish.`,
  },
  {
    leading: "E.",
    content: `If the egg does survive, the young horseshoe crab will hatch after five weeks. Referred to as larvae, they look like miniature versions of adult horseshoe crabs. When first entering the sea, they exhibit a 'swimming frenzy' similar to that of newborn sea turtles, swimming vigorously and continuously for hours. During the larval stage, which can last a year or more, newly hatched horseshoe crabs travel into the ocean water and settle on the sandy bottom in shallow waters. As they develop, they move into deeper waters.`,
  },
  {
    leading: "",
    content: `After the larval stage, horseshoe crabs move into the juvenile period. The juvenile horseshoe crabs will slowly grow over a period of about ten years. The growing process requires shedding small exterior shells, known as exoskeletons, in exchange for larger shells. Horseshoe crabs can shed up to 17 exoskeletons during development and their entire life span can be over twenty years. Mature females can reach 45-50 centimeters from head to tail, while the males grow to approximately 35-40 centimeters.`,
  },
  {
    leading: "F.",
    content: `Despite their long history, horseshoe crabs face increased threats in modern times. For this reason, scientists have been studying the populations of horseshoe crabs, but more investigation is needed, particularly on the coast of Florida. A widespread decline in their abundance in the last 20 years may be especially severe in the Indian River Lagoon system in Florida. While the horseshoe crab is not currently listed as threatened, there is rising concern about the fact that it is increasingly absent from the Indian River Lagoon system, where it has historically been common. Loss of the horseshoe crab would negatively impact species that feed on the animal and its eggs and would decrease the biodiversity of the lagoon. Moreover, this development might indicate serious ecological disturbance in the region. In the northeast, the use of horseshoe crabs as bait to catch fish over the past ten years is, in part, responsible for a rapidly declining population of this unique species, and it is suspected that this is also a problem in Florida. However, the extent of this has not been well documented.`,
  },
];
