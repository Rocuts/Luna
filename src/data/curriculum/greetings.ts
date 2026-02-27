/**
 * greetings.ts
 *
 * Complete structured curriculum for Greetings and Introductions.
 * Target audience: Spanish-speaking adult beginners (CEFR A1).
 *
 * Pedagogical design based on:
 * - Cognitive Load Theory (Sweller): explicit instruction for beginners
 * - Spaced Retrieval Practice: exercises designed for expanding-interval review
 * - Task-Based Language Teaching: real-world contexts (work, social, daily_life)
 * - Comprehensible Input + Pushed Output: theory then production exercises
 * - Low Affective Filter: encouraging feedback, real-life relevance
 *
 * Culturally adapted for Latin American Spanish speakers, addressing
 * common L1 interference patterns (literal translations from Spanish).
 */

import type { CourseModule } from './types';

export const greetingsCourse: CourseModule = {
    id: 'greetings-introductions',
    slug: 'greetings',
    title: 'Greetings and Introductions',
    title_es: 'Saludos y Presentaciones',
    level: 'A1',
    description: 'Learn how to greet people, introduce yourself, and make small talk in English. From casual "Hi!" to formal "Good morning" — master the first words you need in any conversation.',
    description_es: 'Aprende a saludar, presentarte y hacer conversación básica en inglés. Desde un casual "Hi!" hasta un formal "Good morning" — domina las primeras palabras que necesitas en cualquier conversación.',
    lessons: [

        // ═════════════════════════════════════════════════════════════════════
        // LESSON 1: INFORMAL GREETINGS & INTRODUCTIONS
        // ═════════════════════════════════════════════════════════════════════
        {
            id: 'GR-L1-informal',
            order: 1,
            slug: 'informal-greetings',
            title: 'Hello! Nice to meet you — Informal Greetings',
            title_es: '¡Hola! Mucho gusto — Saludos Informales',
            description: 'Learn casual greetings, how to introduce yourself, and how to ask someone their name.',
            description_es: 'Aprende saludos casuales, cómo presentarte y cómo preguntar el nombre de alguien.',
            estimated_minutes: 12,
            theory: {
                explanation_es: `En inglés, los saludos informales son muy comunes en la vida diaria. Los usamos con amigos, compañeros de trabajo, vecinos y personas de nuestra edad.

Los saludos más comunes son:
- **Hi** / **Hey** — equivalentes a "Hola"
- **What's up?** — equivalente a "¿Qué onda?" / "¿Qué tal?" (muy casual)
- **How's it going?** — "¿Cómo te va?"

Para presentarte, usas:
- **I'm** + nombre → "I'm Carlos" (la forma más natural y común)
- **My name is** + nombre → "My name is Carlos" (un poco más formal)

Para preguntar el nombre de alguien:
- **What's your name?** — "¿Cómo te llamas?" / "¿Cuál es tu nombre?"
- **And you?** — "¿Y tú?" (para devolver la pregunta)

Después de presentarte, la respuesta típica es:
- **Nice to meet you!** — "¡Mucho gusto!" / "¡Encantado/a!"
- **Nice to meet you too!** — "¡Igualmente!"

**Importante:** En español decimos "¿Cómo te llamas?" (literalmente "How do you call yourself?"), pero en inglés la pregunta correcta es **"What's your name?"** — nunca "How you call?"`,
                key_points: [
                    'Hi / Hey / Hello — common informal greetings',
                    "What's up? / How's it going? — casual questions (don't always need a detailed answer)",
                    "I'm + name — the most natural way to introduce yourself",
                    "What's your name? — how to ask someone's name",
                    'Nice to meet you! — said after learning someone\'s name',
                ],
                key_points_es: [
                    'Hi / Hey / Hello — saludos informales comunes',
                    "What's up? / How's it going? — preguntas casuales (no siempre necesitan respuesta detallada)",
                    "I'm + nombre — la forma más natural de presentarte",
                    "What's your name? — cómo preguntar el nombre de alguien",
                    'Nice to meet you! — se dice después de saber el nombre de alguien',
                ],
                grammar_tables: [
                    {
                        title: 'Common Informal Greeting Patterns',
                        title_es: 'Patrones Comunes de Saludos Informales',
                        structure: 'Greeting + Response',
                        rows: [
                            { subject: 'Speaker A', verb: 'says', example: 'Hi! / Hey! / Hello!', example_es: '¡Hola!' },
                            { subject: 'Speaker B', verb: 'responds', example: 'Hi! / Hey! / Hello!', example_es: '¡Hola!' },
                            { subject: 'Speaker A', verb: 'asks', example: "What's your name?", example_es: '¿Cómo te llamas?' },
                            { subject: 'Speaker B', verb: 'responds', example: "I'm María. And you?", example_es: 'Soy María. ¿Y tú?' },
                            { subject: 'Speaker A', verb: 'responds', example: "I'm David. Nice to meet you!", example_es: 'Soy David. ¡Mucho gusto!' },
                            { subject: 'Speaker B', verb: 'responds', example: 'Nice to meet you too!', example_es: '¡Igualmente!' },
                        ],
                    },
                    {
                        title: 'Introducing Yourself',
                        title_es: 'Cómo Presentarte',
                        structure: "I'm / My name is + name",
                        rows: [
                            { subject: 'Casual', verb: "I'm", example: "Hi, I'm Carlos.", example_es: 'Hola, soy Carlos.' },
                            { subject: 'Neutral', verb: 'My name is', example: 'My name is Carlos.', example_es: 'Mi nombre es Carlos.' },
                            { subject: 'Asking', verb: "What's", example: "What's your name?", example_es: '¿Cómo te llamas?' },
                            { subject: 'Returning', verb: 'And you?', example: "I'm Carlos. And you?", example_es: 'Soy Carlos. ¿Y tú?' },
                        ],
                    },
                ],
                tips: [
                    '"What\'s up?" doesn\'t always need a real answer. You can just say "Hey!" or "Not much" back.',
                    '"Hey" is slightly more casual than "Hi". Both are perfectly fine with friends and colleagues.',
                    'After someone says "Nice to meet you", always respond with "Nice to meet you too!" — don\'t just say "Thanks".',
                    '"I\'m" is much more natural than "I am" when introducing yourself: "Hi, I\'m Ana" not "Hi, I am Ana".',
                ],
                tips_es: [
                    '"What\'s up?" no siempre necesita una respuesta real. Puedes solo decir "Hey!" o "Not much".',
                    '"Hey" es un poco más casual que "Hi". Ambos son perfectamente correctos con amigos y colegas.',
                    'Después de que alguien dice "Nice to meet you", siempre responde "Nice to meet you too!" — no solo digas "Thanks".',
                    '"I\'m" es mucho más natural que "I am" al presentarte: "Hi, I\'m Ana" no "Hi, I am Ana".',
                ],
                common_mistakes: [
                    { wrong: 'How you call?', correct: "What's your name?", why_es: 'En español decimos "¿Cómo te llamas?" pero en inglés la pregunta es "What\'s your name?" — nunca traducir literalmente.' },
                    { wrong: 'I call myself Carlos.', correct: "I'm Carlos. / My name is Carlos.", why_es: '"Me llamo Carlos" se traduce como "I\'m Carlos" o "My name is Carlos", no "I call myself Carlos".' },
                    { wrong: 'Pleased to meet you. — Pleased to meet you.', correct: 'Nice to meet you. — Nice to meet you too!', why_es: 'La segunda persona debe agregar "too" (también). Sin "too" suena incompleto.' },
                    { wrong: 'I am call María.', correct: "My name is María. / I'm María.", why_es: 'No se mezcla "to be" con "call". Usa "My name is" o "I\'m".' },
                ],
            },
            vocab_banks: [
                {
                    category: 'Informal Greetings',
                    category_es: 'Saludos Informales',
                    items: [
                        { en: 'Hi', es: 'Hola', example: 'Hi, how are you?', example_es: 'Hola, ¿cómo estás?' },
                        { en: 'Hey', es: 'Hola (muy casual)', example: 'Hey! Long time no see!', example_es: '¡Hola! ¡Cuánto tiempo sin verte!' },
                        { en: 'Hello', es: 'Hola', example: 'Hello, everyone!', example_es: '¡Hola a todos!' },
                        { en: "What's up?", es: '¿Qué onda? / ¿Qué tal?', example: "Hey, what's up?", example_es: 'Oye, ¿qué onda?' },
                        { en: "How's it going?", es: '¿Cómo te va?', example: "Hi! How's it going?", example_es: '¡Hola! ¿Cómo te va?' },
                        { en: 'Not much', es: 'Nada nuevo / Sin novedad', example: "What's up? — Not much, just working.", example_es: '¿Qué tal? — Nada nuevo, trabajando.' },
                    ],
                },
                {
                    category: 'Introduction Phrases',
                    category_es: 'Frases para Presentarse',
                    items: [
                        { en: "I'm...", es: 'Soy... / Me llamo...', example: "Hi, I'm Roberto.", example_es: 'Hola, soy Roberto.' },
                        { en: 'My name is...', es: 'Mi nombre es...', example: 'My name is Ana López.', example_es: 'Mi nombre es Ana López.' },
                        { en: "What's your name?", es: '¿Cómo te llamas?', example: "Hi! What's your name?", example_es: '¡Hola! ¿Cómo te llamas?' },
                        { en: 'And you?', es: '¿Y tú?', example: "I'm Pedro. And you?", example_es: 'Soy Pedro. ¿Y tú?' },
                        { en: 'Nice to meet you!', es: '¡Mucho gusto! / ¡Encantado/a!', example: "I'm Sara. Nice to meet you!", example_es: 'Soy Sara. ¡Mucho gusto!' },
                        { en: 'Nice to meet you too!', es: '¡Igualmente!', example: 'Nice to meet you too, Sara!', example_es: '¡Igualmente, Sara!' },
                    ],
                },
            ],
            exercises: [
                {
                    id: 'GR-L1-E01',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct way to ask someone their name in English.',
                    instruction_es: 'Elige la forma correcta de preguntar el nombre de alguien en inglés.',
                    question: 'You meet a new classmate. How do you ask their name?',
                    options: [
                        "What's your name?",
                        'How you call?',
                        'How is your name?',
                        'What you name?',
                    ],
                    correct_answer: "What's your name?",
                    feedback_correct: 'Perfect! "What\'s your name?" is the correct way to ask.',
                    feedback_correct_es: '"What\'s your name?" es la forma correcta. No traducir "¿Cómo te llamas?" literalmente.',
                    feedback_incorrect: 'In English, we say "What\'s your name?" — not a literal translation from Spanish.',
                    feedback_incorrect_es: 'En inglés decimos "What\'s your name?" — no una traducción literal del español "¿Cómo te llamas?".',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'GR-L1-E02',
                    type: 'fill_blank',
                    instruction: 'Complete the introduction with the correct word.',
                    instruction_es: 'Completa la presentación con la palabra correcta.',
                    question: 'Hi! ___ Ana. Nice to meet you!',
                    sentence: 'Hi! ___ Ana. Nice to meet you!',
                    options: ["I'm", 'I call', 'Me is', 'My is'],
                    correct_answer: "I'm",
                    feedback_correct: 'Great! "I\'m" is the most natural way to introduce yourself.',
                    feedback_correct_es: '"I\'m" es la forma más natural de presentarte. "Hi, I\'m Ana."',
                    feedback_incorrect: 'To introduce yourself, use "I\'m" + your name. "Hi, I\'m Ana."',
                    feedback_incorrect_es: 'Para presentarte, usa "I\'m" + tu nombre. "Hi, I\'m Ana."',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'GR-L1-E03',
                    type: 'fill_blank',
                    instruction: 'Complete the conversation with the correct phrase.',
                    instruction_es: 'Completa la conversación con la frase correcta.',
                    question: 'A: Nice to meet you! — B: Nice to meet you ___!',
                    sentence: 'Nice to meet you ___!',
                    options: ['too', 'also', 'same', 'equal'],
                    correct_answer: 'too',
                    feedback_correct: 'Correct! "Nice to meet you too!" — "too" means "también" here.',
                    feedback_correct_es: '"Nice to meet you too!" — "too" significa "también" aquí. Es la respuesta natural.',
                    feedback_incorrect: 'The correct response is "Nice to meet you too!" — "too" means "también".',
                    feedback_incorrect_es: 'La respuesta correcta es "Nice to meet you too!" — "too" significa "también".',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'GR-L1-E04',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: 'Hola, soy Carlos. ¿Cómo te llamas?',
                    correct_answer: "Hi, I'm Carlos. What's your name?",
                    feedback_correct: 'Excellent! Natural and correct introduction.',
                    feedback_correct_es: 'Excelente. Presentación natural y correcta.',
                    feedback_incorrect: 'Remember: "Soy" = "I\'m" and "¿Cómo te llamas?" = "What\'s your name?" — Hi, I\'m Carlos. What\'s your name?',
                    feedback_incorrect_es: 'Recuerda: "Soy" = "I\'m" y "¿Cómo te llamas?" = "What\'s your name?" — Hi, I\'m Carlos. What\'s your name?',
                    context: 'social',
                    difficulty: 2,
                },
                {
                    id: 'GR-L1-E05',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to make a sentence.',
                    instruction_es: 'Ordena las palabras para formar una oración.',
                    question: 'Form a greeting:',
                    words: ['your', 'is', 'What', 'name', '?'],
                    correct_answer: ['What', 'is', 'your', 'name', '?'],
                    feedback_correct: 'What is your name? — Perfect word order!',
                    feedback_correct_es: 'What is your name? — Orden perfecto de las palabras.',
                    feedback_incorrect: 'The correct order is: What + is + your + name + ? → "What is your name?"',
                    feedback_incorrect_es: 'El orden correcto es: What + is + your + name + ? → "What is your name?"',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'GR-L1-E06',
                    type: 'multiple_choice',
                    instruction: 'Choose the best response.',
                    instruction_es: 'Elige la mejor respuesta.',
                    question: 'Your new neighbor says: "Hi! I\'m David. Nice to meet you!" What do you say?',
                    options: [
                        "Hi David! I'm María. Nice to meet you too!",
                        'Hello David. Thanks.',
                        'Hi David. I call myself María.',
                        "Good. I'm am María.",
                    ],
                    correct_answer: "Hi David! I'm María. Nice to meet you too!",
                    feedback_correct: 'Perfect! You greeted back, introduced yourself, and said "Nice to meet you too!"',
                    feedback_correct_es: 'Perfecto. Saludaste de vuelta, te presentaste y dijiste "Nice to meet you too!"',
                    feedback_incorrect: 'The natural response is: greet back + introduce yourself + "Nice to meet you too!"',
                    feedback_incorrect_es: 'La respuesta natural es: saludar de vuelta + presentarte + "Nice to meet you too!"',
                    context: 'daily_life',
                    difficulty: 2,
                },
                {
                    id: 'GR-L1-E07',
                    type: 'fill_blank',
                    instruction: 'Complete the casual greeting.',
                    instruction_es: 'Completa el saludo casual.',
                    question: 'A: Hey! ___? — B: Not much, just studying.',
                    sentence: 'Hey! ___?',
                    options: ["What's up", 'How you call', 'What name', 'Who you are'],
                    correct_answer: "What's up",
                    feedback_correct: 'Right! "What\'s up?" is a very casual greeting. "Not much" is a common reply.',
                    feedback_correct_es: '"What\'s up?" es un saludo muy casual. "Not much" es una respuesta común.',
                    feedback_incorrect: '"What\'s up?" is a casual way to say hi. Common answers: "Not much", "Nothing much", or "Hey!".',
                    feedback_incorrect_es: '"What\'s up?" es una forma casual de saludar. Respuestas comunes: "Not much", "Nothing much", o "Hey!".',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'GR-L1-E08',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: '¡Mucho gusto! Mi nombre es Lucía.',
                    correct_answer: 'Nice to meet you! My name is Lucía.',
                    feedback_correct: 'Well done! "Mucho gusto" = "Nice to meet you" in English.',
                    feedback_correct_es: '¡Bien hecho! "Mucho gusto" = "Nice to meet you" en inglés.',
                    feedback_incorrect: '"Mucho gusto" = "Nice to meet you" and "Mi nombre es" = "My name is". → Nice to meet you! My name is Lucía.',
                    feedback_incorrect_es: '"Mucho gusto" = "Nice to meet you" y "Mi nombre es" = "My name is". → Nice to meet you! My name is Lucía.',
                    context: 'social',
                    difficulty: 2,
                },
                {
                    id: 'GR-L1-E09',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to introduce yourself.',
                    instruction_es: 'Ordena las palabras para presentarte.',
                    question: 'Form a sentence:',
                    words: ['meet', 'Nice', 'you', 'to', '!'],
                    correct_answer: ['Nice', 'to', 'meet', 'you', '!'],
                    feedback_correct: 'Nice to meet you! — The classic introduction phrase.',
                    feedback_correct_es: 'Nice to meet you! — La frase clásica de presentación.',
                    feedback_incorrect: 'The correct order is: Nice + to + meet + you + ! → "Nice to meet you!"',
                    feedback_incorrect_es: 'El orden correcto es: Nice + to + meet + you + ! → "Nice to meet you!"',
                    context: 'work',
                    difficulty: 1,
                },
                {
                    id: 'GR-L1-E10',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct introduction for a classroom scenario.',
                    instruction_es: 'Elige la presentación correcta para un escenario en clase.',
                    question: 'It\'s your first day in an English class. The teacher says "Tell us your name." What do you say?',
                    options: [
                        "Hi everyone! I'm Jorge. Nice to meet you all!",
                        'I call Jorge. Pleasure.',
                        "My name it's Jorge.",
                        'I have the name Jorge.',
                    ],
                    correct_answer: "Hi everyone! I'm Jorge. Nice to meet you all!",
                    feedback_correct: 'Excellent! Friendly, natural, and correct. Great first impression!',
                    feedback_correct_es: 'Excelente. Amigable, natural y correcto. ¡Gran primera impresión!',
                    feedback_incorrect: 'The most natural way: "Hi everyone! I\'m Jorge. Nice to meet you all!" — simple and friendly.',
                    feedback_incorrect_es: 'La forma más natural: "Hi everyone! I\'m Jorge. Nice to meet you all!" — simple y amigable.',
                    context: 'daily_life',
                    difficulty: 2,
                },
            ],
        },

        // ═════════════════════════════════════════════════════════════════════
        // LESSON 2: FORMAL GREETINGS & SMALL TALK
        // ═════════════════════════════════════════════════════════════════════
        {
            id: 'GR-L2-formal',
            order: 2,
            slug: 'formal-greetings',
            title: 'Good morning, how are you? — Formal Greetings & Small Talk',
            title_es: 'Buenos días, ¿cómo está? — Saludos Formales y Conversación Básica',
            description: 'Learn formal greetings, how to respond to "How are you?", and basic small talk for professional and polite situations.',
            description_es: 'Aprende saludos formales, cómo responder a "How are you?", y conversación básica para situaciones profesionales y educadas.',
            estimated_minutes: 12,
            theory: {
                explanation_es: `En situaciones formales o profesionales, usamos saludos diferentes. Los más comunes dependen de la hora del día:

- **Good morning** — "Buenos días" (hasta ~12:00 PM)
- **Good afternoon** — "Buenas tardes" (de ~12:00 PM a ~6:00 PM)
- **Good evening** — "Buenas noches" al llegar (de ~6:00 PM en adelante)

**Importante:** "Good night" NO es un saludo. "Good night" = "Buenas noches" al DESPEDIRSE, no al saludar.

La pregunta más común en inglés es **"How are you?"** Tiene muchas variantes:
- **How are you?** — formal/neutral
- **How are you doing?** — neutral/casual
- **How's it going?** — casual

Las respuestas más comunes son:
- **I'm fine, thank you.** / **I'm good, thanks.** — estándar
- **I'm doing well, thank you.** — formal
- **Pretty good!** / **Not bad!** — casual

**Error muy común de hispanohablantes:** Responder "I have fine" o "I am very good" (exagerado). Lo natural es **"I'm fine, thanks"** o **"I'm good, thanks. And you?"**

Después de responder, es educado devolver la pregunta: **"And you?"** o **"How about you?"**

El "small talk" (conversación ligera) es MUY importante en la cultura anglosajona. Temas seguros:
- El clima: "Nice weather today!"
- El fin de semana: "Any plans for the weekend?"
- Cómo va el trabajo: "How's work going?"`,
                key_points: [
                    'Good morning (until ~12 PM) / Good afternoon (~12-6 PM) / Good evening (after ~6 PM)',
                    'Good night = goodbye at night (NOT a greeting!)',
                    'How are you? → I\'m fine, thanks. And you?',
                    'I\'m good / I\'m doing well / Pretty good / Not bad — all valid responses',
                    'Always return the question: "And you?" / "How about you?"',
                    'Small talk topics: weather, weekend plans, work',
                ],
                key_points_es: [
                    'Good morning (hasta ~12 PM) / Good afternoon (~12-6 PM) / Good evening (después de ~6 PM)',
                    'Good night = despedida nocturna (NO es saludo)',
                    'How are you? → I\'m fine, thanks. And you?',
                    'I\'m good / I\'m doing well / Pretty good / Not bad — todas son respuestas válidas',
                    'Siempre devuelve la pregunta: "And you?" / "How about you?"',
                    'Temas de small talk: clima, planes del fin de semana, trabajo',
                ],
                grammar_tables: [
                    {
                        title: 'Formal Greetings by Time of Day',
                        title_es: 'Saludos Formales según la Hora del Día',
                        structure: 'Good + morning/afternoon/evening',
                        rows: [
                            { subject: 'Morning', verb: 'Good morning', example: 'Good morning, Mr. García. How are you?', example_es: 'Buenos días, Sr. García. ¿Cómo está?' },
                            { subject: 'Afternoon', verb: 'Good afternoon', example: 'Good afternoon, everyone. Welcome to the meeting.', example_es: 'Buenas tardes a todos. Bienvenidos a la reunión.' },
                            { subject: 'Evening', verb: 'Good evening', example: 'Good evening. My name is Dr. Ramírez.', example_es: 'Buenas noches. Mi nombre es Dr. Ramírez.' },
                            { subject: 'Goodbye (night)', verb: 'Good night', example: 'Good night! See you tomorrow.', example_es: '¡Buenas noches! Nos vemos mañana.' },
                        ],
                    },
                    {
                        title: 'Responding to "How are you?"',
                        title_es: 'Cómo Responder a "How are you?"',
                        structure: "I'm + adjective + thanks/thank you",
                        rows: [
                            { subject: 'Formal', verb: "I'm doing well", example: "I'm doing well, thank you. And you?", example_es: 'Estoy bien, gracias. ¿Y usted?' },
                            { subject: 'Neutral', verb: "I'm fine", example: "I'm fine, thanks. How about you?", example_es: 'Estoy bien, gracias. ¿Y tú?' },
                            { subject: 'Casual', verb: "I'm good", example: "I'm good, thanks!", example_es: 'Bien, ¡gracias!' },
                            { subject: 'Casual', verb: 'Pretty good', example: 'Pretty good! And you?', example_es: '¡Bastante bien! ¿Y tú?' },
                            { subject: 'Casual', verb: 'Not bad', example: "Not bad! How's it going?", example_es: '¡No está mal! ¿Cómo te va?' },
                        ],
                    },
                ],
                tips: [
                    '"How are you?" in English is often just a greeting, not a real question. A short answer is enough: "I\'m fine, thanks!"',
                    'Don\'t say "Good night" when you arrive somewhere. Use "Good evening". "Good night" is only for saying goodbye.',
                    'In job interviews, use formal greetings: "Good morning. My name is... It\'s a pleasure to meet you."',
                    'Small talk is important! Americans and British people often chat about the weather before getting to business.',
                ],
                tips_es: [
                    '"How are you?" en inglés es muchas veces solo un saludo, no una pregunta real. Una respuesta corta es suficiente: "I\'m fine, thanks!"',
                    'No digas "Good night" cuando llegas a un lugar. Usa "Good evening". "Good night" es solo para despedirte.',
                    'En entrevistas de trabajo, usa saludos formales: "Good morning. My name is... It\'s a pleasure to meet you."',
                    'El small talk es importante. Los anglosajones suelen hablar del clima antes de ir al tema de fondo.',
                ],
                common_mistakes: [
                    { wrong: 'I have fine.', correct: "I'm fine.", why_es: 'En español decimos "estoy bien" (verbo estar). En inglés también se usa "to be": "I\'m fine" — nunca "I have fine".' },
                    { wrong: 'Good night, welcome to the meeting.', correct: 'Good evening, welcome to the meeting.', why_es: '"Good night" es solo para despedirse. Al llegar por la noche, usa "Good evening".' },
                    { wrong: 'How are you? — Yes, I am fine.', correct: 'How are you? — I\'m fine, thanks. And you?', why_es: 'No se responde con "Yes". Solo di "I\'m fine, thanks" y devuelve la pregunta.' },
                    { wrong: 'I am very good, and very happy, and the weather is nice...', correct: "I'm good, thanks! And you?", why_es: '"How are you?" muchas veces es solo un saludo. Responde brevemente y devuelve la pregunta.' },
                ],
            },
            vocab_banks: [
                {
                    category: 'Formal Greetings',
                    category_es: 'Saludos Formales',
                    items: [
                        { en: 'Good morning', es: 'Buenos días', example: 'Good morning! How are you today?', example_es: '¡Buenos días! ¿Cómo está hoy?' },
                        { en: 'Good afternoon', es: 'Buenas tardes', example: 'Good afternoon, Ms. López.', example_es: 'Buenas tardes, Sra. López.' },
                        { en: 'Good evening', es: 'Buenas noches (al llegar)', example: 'Good evening, everyone.', example_es: 'Buenas noches a todos.' },
                        { en: 'Good night', es: 'Buenas noches (al despedirse)', example: 'Good night! See you tomorrow.', example_es: '¡Buenas noches! Nos vemos mañana.' },
                        { en: "It's a pleasure to meet you", es: 'Es un placer conocerle', example: "Good morning. It's a pleasure to meet you, Mr. Smith.", example_es: 'Buenos días. Es un placer conocerle, Sr. Smith.' },
                        { en: 'How do you do?', es: '¿Cómo está usted? (muy formal)', example: 'How do you do? I\'m the new director.', example_es: '¿Cómo está usted? Soy el nuevo director.' },
                    ],
                },
                {
                    category: 'Common Responses to "How are you?"',
                    category_es: 'Respuestas Comunes a "How are you?"',
                    items: [
                        { en: "I'm fine, thanks.", es: 'Estoy bien, gracias.', example: "How are you? — I'm fine, thanks. And you?", example_es: '¿Cómo estás? — Estoy bien, gracias. ¿Y tú?' },
                        { en: "I'm doing well.", es: 'Me va bien.', example: "I'm doing well, thank you for asking.", example_es: 'Me va bien, gracias por preguntar.' },
                        { en: "I'm good, thanks.", es: 'Bien, gracias.', example: "How's it going? — I'm good, thanks!", example_es: '¿Cómo te va? — ¡Bien, gracias!' },
                        { en: 'Pretty good!', es: '¡Bastante bien!', example: "How are you doing? — Pretty good! How about you?", example_es: '¿Cómo te va? — ¡Bastante bien! ¿Y a ti?' },
                        { en: 'Not bad!', es: '¡No está mal!', example: "How's it going? — Not bad, not bad.", example_es: '¿Cómo va? — No está mal, no está mal.' },
                        { en: 'And you? / How about you?', es: '¿Y tú? / ¿Y usted?', example: "I'm great, thanks. How about you?", example_es: 'Estoy genial, gracias. ¿Y tú?' },
                    ],
                },
                {
                    category: 'Small Talk Phrases',
                    category_es: 'Frases de Conversación Ligera',
                    items: [
                        { en: 'Nice weather today!', es: '¡Buen clima hoy!', example: "Good morning! Nice weather today, isn't it?", example_es: '¡Buenos días! Buen clima hoy, ¿no?' },
                        { en: 'Any plans for the weekend?', es: '¿Algún plan para el fin de semana?', example: "Hey, any plans for the weekend?", example_es: 'Oye, ¿algún plan para el fin de semana?' },
                        { en: "How's work going?", es: '¿Cómo va el trabajo?', example: "Hi! How's work going?", example_es: '¡Hola! ¿Cómo va el trabajo?' },
                        { en: 'Have a nice day!', es: '¡Que tengas buen día!', example: "See you later! Have a nice day!", example_es: '¡Nos vemos! ¡Que tengas buen día!' },
                        { en: 'See you tomorrow!', es: '¡Nos vemos mañana!', example: 'Good night! See you tomorrow!', example_es: '¡Buenas noches! ¡Nos vemos mañana!' },
                        { en: 'Take care!', es: '¡Cuídate!', example: "Bye! Take care!", example_es: '¡Adiós! ¡Cuídate!' },
                    ],
                },
            ],
            exercises: [
                {
                    id: 'GR-L2-E01',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct greeting for the situation.',
                    instruction_es: 'Elige el saludo correcto para la situación.',
                    question: 'It\'s 9:00 AM and you arrive at the office. Your boss is in the hallway. What do you say?',
                    options: [
                        'Good morning!',
                        'Good night!',
                        'Good evening!',
                        "What's up, boss!",
                    ],
                    correct_answer: 'Good morning!',
                    feedback_correct: 'Perfect! "Good morning" is used until about noon — ideal for a professional setting.',
                    feedback_correct_es: '"Good morning" se usa hasta aproximadamente el mediodía — ideal para un entorno profesional.',
                    feedback_incorrect: 'At 9:00 AM, the correct formal greeting is "Good morning!" — used until about noon.',
                    feedback_incorrect_es: 'A las 9:00 AM, el saludo formal correcto es "Good morning!" — se usa hasta aproximadamente el mediodía.',
                    context: 'work',
                    difficulty: 1,
                },
                {
                    id: 'GR-L2-E02',
                    type: 'fill_blank',
                    instruction: 'Complete the response to "How are you?"',
                    instruction_es: 'Completa la respuesta a "How are you?"',
                    question: 'How are you? — ___, thanks. And you?',
                    sentence: '___, thanks. And you?',
                    options: ["I'm fine", 'I have fine', 'I am have good', 'Yes fine'],
                    correct_answer: "I'm fine",
                    feedback_correct: 'Great! "I\'m fine, thanks. And you?" — the classic natural response.',
                    feedback_correct_es: '"I\'m fine, thanks. And you?" — la respuesta clásica y natural.',
                    feedback_incorrect: 'The correct response is "I\'m fine, thanks." We use "to be" (I\'m), not "to have".',
                    feedback_incorrect_es: 'La respuesta correcta es "I\'m fine, thanks." Usamos "to be" (I\'m), no "to have".',
                    context: 'general',
                    difficulty: 1,
                },
                {
                    id: 'GR-L2-E03',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct greeting.',
                    instruction_es: 'Elige el saludo correcto.',
                    question: 'You arrive at a dinner party at 8:00 PM. The host opens the door. What do you say?',
                    options: [
                        'Good evening! Thank you for inviting me.',
                        'Good night! Thank you for inviting me.',
                        'Good afternoon! Thank you for inviting me.',
                        'Good morning! Thank you for inviting me.',
                    ],
                    correct_answer: 'Good evening! Thank you for inviting me.',
                    feedback_correct: 'Correct! "Good evening" is the greeting for nighttime arrivals. "Good night" is only for goodbyes.',
                    feedback_correct_es: '"Good evening" es el saludo al llegar de noche. "Good night" es solo para despedirse.',
                    feedback_incorrect: 'At 8:00 PM, use "Good evening" when arriving. Remember: "Good night" is only for saying goodbye!',
                    feedback_incorrect_es: 'A las 8:00 PM, usa "Good evening" al llegar. Recuerda: "Good night" es solo para despedirte.',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'GR-L2-E04',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: 'Buenos días. Estoy bien, gracias. ¿Y usted?',
                    correct_answer: "Good morning. I'm fine, thank you. And you?",
                    feedback_correct: 'Perfect formal response! Natural and polite.',
                    feedback_correct_es: 'Respuesta formal perfecta. Natural y educada.',
                    feedback_incorrect: '"Buenos días" = "Good morning", "Estoy bien" = "I\'m fine", "gracias" = "thank you", "¿Y usted?" = "And you?"',
                    feedback_incorrect_es: '"Buenos días" = "Good morning", "Estoy bien" = "I\'m fine", "gracias" = "thank you", "¿Y usted?" = "And you?"',
                    context: 'work',
                    difficulty: 2,
                },
                {
                    id: 'GR-L2-E05',
                    type: 'fill_blank',
                    instruction: 'Choose the correct phrase to complete the job interview greeting.',
                    instruction_es: 'Elige la frase correcta para completar el saludo de entrevista de trabajo.',
                    question: 'Good morning. My name is Luis Pérez. ___ to meet you.',
                    sentence: 'Good morning. My name is Luis Pérez. ___ to meet you.',
                    options: ["It's a pleasure", "I have pleasure", 'I am pleasure', 'Pleasure I have'],
                    correct_answer: "It's a pleasure",
                    feedback_correct: 'Excellent! "It\'s a pleasure to meet you" — perfect for formal introductions and job interviews.',
                    feedback_correct_es: '"It\'s a pleasure to meet you" — perfecto para presentaciones formales y entrevistas de trabajo.',
                    feedback_incorrect: 'In formal situations, say "It\'s a pleasure to meet you." The structure is: It\'s + a pleasure + to meet you.',
                    feedback_incorrect_es: 'En situaciones formales, di "It\'s a pleasure to meet you." La estructura es: It\'s + a pleasure + to meet you.',
                    context: 'work',
                    difficulty: 2,
                },
                {
                    id: 'GR-L2-E06',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to form a formal greeting.',
                    instruction_es: 'Ordena las palabras para formar un saludo formal.',
                    question: 'Form a sentence:',
                    words: ['are', 'morning', 'How', 'you', 'Good', '?'],
                    correct_answer: ['Good', 'morning', 'How', 'are', 'you', '?'],
                    feedback_correct: 'Good morning. How are you? — A polite and professional greeting.',
                    feedback_correct_es: 'Good morning. How are you? — Un saludo educado y profesional.',
                    feedback_incorrect: 'The correct order is: Good morning. How are you? — greeting first, then the question.',
                    feedback_incorrect_es: 'El orden correcto es: Good morning. How are you? — primero el saludo, después la pregunta.',
                    context: 'work',
                    difficulty: 1,
                },
                {
                    id: 'GR-L2-E07',
                    type: 'multiple_choice',
                    instruction: 'Choose the best response for this situation.',
                    instruction_es: 'Elige la mejor respuesta para esta situación.',
                    question: 'A coworker asks: "How are you doing today?" What is the most natural response?',
                    options: [
                        "I'm doing well, thanks! How about you?",
                        'Yes, I am doing.',
                        'I have very good, and you?',
                        'I do fine thank.',
                    ],
                    correct_answer: "I'm doing well, thanks! How about you?",
                    feedback_correct: 'Natural and friendly! You answered and returned the question with "How about you?"',
                    feedback_correct_es: 'Natural y amigable. Respondiste y devolviste la pregunta con "How about you?"',
                    feedback_incorrect: 'The natural response is "I\'m doing well, thanks! How about you?" — answer briefly and return the question.',
                    feedback_incorrect_es: 'La respuesta natural es "I\'m doing well, thanks! How about you?" — responde brevemente y devuelve la pregunta.',
                    context: 'work',
                    difficulty: 1,
                },
                {
                    id: 'GR-L2-E08',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: 'Buenas tardes. Es un placer conocerle. Mi nombre es Andrea.',
                    correct_answer: "Good afternoon. It's a pleasure to meet you. My name is Andrea.",
                    feedback_correct: 'Perfect formal introduction! Clear, polite, and professional.',
                    feedback_correct_es: 'Presentación formal perfecta. Clara, educada y profesional.',
                    feedback_incorrect: '"Buenas tardes" = "Good afternoon", "Es un placer conocerle" = "It\'s a pleasure to meet you", "Mi nombre es" = "My name is".',
                    feedback_incorrect_es: '"Buenas tardes" = "Good afternoon", "Es un placer conocerle" = "It\'s a pleasure to meet you", "Mi nombre es" = "My name is".',
                    context: 'work',
                    difficulty: 2,
                },
                {
                    id: 'GR-L2-E09',
                    type: 'fill_blank',
                    instruction: 'Complete the small talk conversation.',
                    instruction_es: 'Completa la conversación ligera.',
                    question: 'Nice weather today, ___?',
                    sentence: 'Nice weather today, ___?',
                    options: ["isn't it", "doesn't it", 'no is', 'not it'],
                    correct_answer: "isn't it",
                    feedback_correct: 'Right! "Nice weather today, isn\'t it?" is a classic small talk opener.',
                    feedback_correct_es: '"Nice weather today, isn\'t it?" es un clásico para iniciar conversación ligera.',
                    feedback_incorrect: 'The correct tag question is "isn\'t it?" — "Nice weather today, isn\'t it?"',
                    feedback_incorrect_es: 'La pregunta de confirmación correcta es "isn\'t it?" — "Nice weather today, isn\'t it?"',
                    context: 'social',
                    difficulty: 3,
                },
                {
                    id: 'GR-L2-E10',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to respond to "How are you?"',
                    instruction_es: 'Ordena las palabras para responder a "How are you?"',
                    question: 'Form a response:',
                    words: ['thanks', 'well', 'doing', "I'm", ',', '.'],
                    correct_answer: ["I'm", 'doing', 'well', ',', 'thanks', '.'],
                    feedback_correct: "I'm doing well, thanks. — A polite and complete response!",
                    feedback_correct_es: "I'm doing well, thanks. — Una respuesta educada y completa.",
                    feedback_incorrect: 'The correct order is: I\'m + doing + well + , + thanks + . → "I\'m doing well, thanks."',
                    feedback_incorrect_es: 'El orden correcto es: I\'m + doing + well + , + thanks + . → "I\'m doing well, thanks."',
                    context: 'general',
                    difficulty: 2,
                },
            ],
        },
    ],
};
