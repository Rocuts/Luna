/**
 * daily-routines.ts
 *
 * Complete structured curriculum for Daily Routines and Present Simple.
 * Target audience: Spanish-speaking adult beginners (CEFR A1).
 *
 * Pedagogical design based on:
 * - Cognitive Load Theory (Sweller): explicit instruction for beginners
 * - Spaced Retrieval Practice: exercises designed for expanding-interval review
 * - Task-Based Language Teaching: real-world contexts (work, daily_life)
 * - Comprehensible Input + Pushed Output: theory then production exercises
 * - Low Affective Filter: encouraging feedback, real-life relevance
 * - L1 Transfer Awareness: addresses common Spanish→English interference
 */

import type { CourseModule } from './types';

export const dailyRoutinesCourse: CourseModule = {
    id: 'daily-routines-present',
    slug: 'daily-routines',
    title: 'Daily Routines — Present Simple',
    title_es: 'Rutinas Diarias — Presente Simple',
    level: 'A1',
    description: 'Learn to talk about your daily habits and routines using the Present Simple. Describe what you do every day, ask others about their routines, and use negatives and questions naturally.',
    description_es: 'Aprende a hablar de tus hábitos y rutinas diarias usando el Presente Simple. Describe lo que haces cada día, pregunta a otros sobre sus rutinas y usa negativos y preguntas de forma natural.',
    lessons: [

        // ═════════════════════════════════════════════════════════════════════
        // LESSON 1: PRESENT SIMPLE FOR ROUTINES (AFFIRMATIVE)
        // ═════════════════════════════════════════════════════════════════════
        {
            id: 'DR-L1-routines',
            order: 1,
            slug: 'routines-affirmative',
            title: 'I wake up at 7 — Present Simple for Routines',
            title_es: 'Me despierto a las 7 — Presente Simple para Rutinas',
            description: 'Learn to describe your daily routine using the Present Simple tense.',
            description_es: 'Aprende a describir tu rutina diaria usando el tiempo Presente Simple.',
            estimated_minutes: 12,
            theory: {
                explanation_es: `En inglés, usamos el **Present Simple** para hablar de acciones habituales, rutinas y cosas que se repiten regularmente:

- **I wake up** at 7. (Me despierto a las 7.)
- **She works** from 9 to 5. (Ella trabaja de 9 a 5.)

La forma es sencilla: se usa el **verbo base** (infinitivo sin "to"). Pero con **he, she, it** (tercera persona singular), debes agregar **-s** o **-es**:

- I **eat** → He **eats**
- You **go** → She **goes**
- We **work** → It **works**

Reglas para la tercera persona (-s/-es):
- La mayoría de verbos: agrega **-s** → work**s**, eat**s**, sleep**s**
- Verbos que terminan en -s, -sh, -ch, -x, -o: agrega **-es** → go**es**, brush**es**, watch**es**
- Verbos que terminan en consonante + y: cambia y → **-ies** → study → stud**ies**, carry → carr**ies**

Expresiones de tiempo comunes:
- **at** + hora: at 7, at noon, at midnight
- **in the** + parte del día: in the morning, in the afternoon, in the evening
- **at night** (excepción: no se dice "in the night")
- **every** + periodo: every day, every morning, every weekend`,
                key_points: [
                    'Present Simple = habitual actions and routines',
                    'Base form for I, you, we, they: "I wake up"',
                    'Add -s for he, she, it: "She wakes up"',
                    'Add -es after -s, -sh, -ch, -x, -o: "He goes", "She brushes"',
                    'Consonant + y → -ies: "She studies"',
                    'Time expressions: at 7, in the morning, every day',
                ],
                key_points_es: [
                    'Present Simple = acciones habituales y rutinas',
                    'Forma base para I, you, we, they: "I wake up"',
                    'Agrega -s para he, she, it: "She wakes up"',
                    'Agrega -es después de -s, -sh, -ch, -x, -o: "He goes", "She brushes"',
                    'Consonante + y → -ies: "She studies"',
                    'Expresiones de tiempo: at 7, in the morning, every day',
                ],
                grammar_tables: [
                    {
                        title: 'Present Simple — Affirmative with Routine Verbs',
                        title_es: 'Presente Simple — Afirmativo con Verbos de Rutina',
                        structure: 'Subject + verb (base / base + s) + complement',
                        rows: [
                            { subject: 'I', verb: 'wake up', example: 'I wake up at 6:30 every day.', example_es: 'Me despierto a las 6:30 todos los días.' },
                            { subject: 'You', verb: 'eat', example: 'You eat breakfast at home.', example_es: 'Desayunas en casa.' },
                            { subject: 'He', verb: 'goes', example: 'He goes to work by bus.', example_es: 'Él va al trabajo en autobús.' },
                            { subject: 'She', verb: 'works', example: 'She works from 9 to 5.', example_es: 'Ella trabaja de 9 a 5.' },
                            { subject: 'It', verb: 'starts', example: 'The class starts at 8 in the morning.', example_es: 'La clase empieza a las 8 de la mañana.' },
                            { subject: 'We', verb: 'sleep', example: 'We sleep eight hours every night.', example_es: 'Dormimos ocho horas cada noche.' },
                            { subject: 'They', verb: 'work', example: 'They work in an office downtown.', example_es: 'Trabajan en una oficina en el centro.' },
                        ],
                    },
                ],
                tips: [
                    'The -s in third person is like the "s" in Spanish plural — easy to forget but very important: "She eats" not "She eat".',
                    '"Go" becomes "goes" (not "gos") — this is an exception you just need to memorize.',
                    'Use "at" for clock times (at 7, at noon) and "in the" for parts of the day (in the morning). But say "at night" — not "in the night".',
                    'Phrasal verbs like "wake up" and "get up" are very common. The -s goes on the main verb: "She wakes up", not "She wake ups".',
                ],
                tips_es: [
                    'La -s en tercera persona es como la "s" del plural en español — es fácil olvidarla pero es muy importante: "She eats", no "She eat".',
                    '"Go" se convierte en "goes" (no "gos") — es una excepción que hay que memorizar.',
                    'Usa "at" para horas exactas (at 7, at noon) e "in the" para partes del día (in the morning). Pero se dice "at night", no "in the night".',
                    'Los phrasal verbs como "wake up" y "get up" son muy comunes. La -s va en el verbo principal: "She wakes up", no "She wake ups".',
                ],
                common_mistakes: [
                    { wrong: 'He wake up at 7.', correct: 'He wakes up at 7.', why_es: 'Con he/she/it siempre agrega -s al verbo: "wakes", no "wake".' },
                    { wrong: 'She gos to work.', correct: 'She goes to work.', why_es: '"Go" termina en -o, así que se agrega -es: "goes".' },
                    { wrong: 'I go to work in the 8.', correct: 'I go to work at 8.', why_es: 'Las horas exactas usan "at", no "in the". "At 8", "at noon".' },
                    { wrong: 'He brushs his teeth.', correct: 'He brushes his teeth.', why_es: '"Brush" termina en -sh, así que se agrega -es: "brushes".' },
                ],
            },
            vocab_banks: [
                {
                    category: 'Morning Routine',
                    category_es: 'Rutina de la Mañana',
                    items: [
                        { en: 'wake up', es: 'despertarse', example: 'I wake up at 6:30 every morning.', example_es: 'Me despierto a las 6:30 cada mañana.' },
                        { en: 'get up', es: 'levantarse', example: 'She gets up right away.', example_es: 'Ella se levanta de inmediato.' },
                        { en: 'take a shower', es: 'ducharse / bañarse', example: 'I take a shower before breakfast.', example_es: 'Me ducho antes del desayuno.' },
                        { en: 'brush my teeth', es: 'cepillarse los dientes', example: 'He brushes his teeth twice a day.', example_es: 'Se cepilla los dientes dos veces al día.' },
                        { en: 'get dressed', es: 'vestirse', example: 'I get dressed for work.', example_es: 'Me visto para el trabajo.' },
                        { en: 'have breakfast', es: 'desayunar', example: 'We have breakfast at 7.', example_es: 'Desayunamos a las 7.' },
                        { en: 'make coffee', es: 'hacer café / preparar café', example: 'She makes coffee every morning.', example_es: 'Ella prepara café todas las mañanas.' },
                    ],
                },
                {
                    category: 'Work & Commute',
                    category_es: 'Trabajo y Transporte',
                    items: [
                        { en: 'go to work', es: 'ir al trabajo', example: 'I go to work at 8.', example_es: 'Voy al trabajo a las 8.' },
                        { en: 'commute', es: 'trasladarse al trabajo / viajar al trabajo', example: 'He commutes by metro every day.', example_es: 'Él viaja al trabajo en metro todos los días.' },
                        { en: 'start work', es: 'empezar a trabajar', example: 'She starts work at 9.', example_es: 'Empieza a trabajar a las 9.' },
                        { en: 'have lunch', es: 'almorzar', example: 'We have lunch at 1 in the afternoon.', example_es: 'Almorzamos a la 1 de la tarde.' },
                        { en: 'finish work', es: 'terminar de trabajar', example: 'I finish work at 5.', example_es: 'Termino de trabajar a las 5.' },
                    ],
                },
                {
                    category: 'Evening Routine',
                    category_es: 'Rutina de la Noche',
                    items: [
                        { en: 'get home', es: 'llegar a casa', example: 'I get home at 6:30.', example_es: 'Llego a casa a las 6:30.' },
                        { en: 'cook dinner', es: 'cocinar la cena', example: 'She cooks dinner every night.', example_es: 'Ella cocina la cena todas las noches.' },
                        { en: 'have dinner', es: 'cenar', example: 'We have dinner at 8.', example_es: 'Cenamos a las 8.' },
                        { en: 'watch TV', es: 'ver televisión', example: 'They watch TV after dinner.', example_es: 'Ven televisión después de cenar.' },
                        { en: 'go to bed', es: 'irse a la cama / acostarse', example: 'I go to bed at 10.', example_es: 'Me acuesto a las 10.' },
                        { en: 'sleep', es: 'dormir', example: 'He sleeps 7 hours every night.', example_es: 'Duerme 7 horas cada noche.' },
                    ],
                },
            ],
            exercises: [
                {
                    id: 'DR-L1-E01',
                    type: 'fill_blank',
                    instruction: 'Complete the sentence with the correct form of the verb.',
                    instruction_es: 'Completa la oración con la forma correcta del verbo.',
                    question: 'She ___ (wake up) at 6 every morning.',
                    sentence: 'She ___ at 6 every morning.',
                    options: ['wakes up', 'wake up', 'wake ups', 'waking up'],
                    correct_answer: 'wakes up',
                    feedback_correct: 'Perfect! "She wakes up" — add -s to the main verb for he/she/it.',
                    feedback_correct_es: '"She wakes up" — agrega -s al verbo principal para he/she/it.',
                    feedback_incorrect: 'With he/she/it, add -s to the verb: "She wakes up". The -s goes on "wake", not on "up".',
                    feedback_incorrect_es: 'Con he/she/it, agrega -s al verbo: "She wakes up". La -s va en "wake", no en "up".',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L1-E02',
                    type: 'fill_blank',
                    instruction: 'Complete the sentence with the correct form of the verb.',
                    instruction_es: 'Completa la oración con la forma correcta del verbo.',
                    question: 'He ___ (go) to work by metro.',
                    sentence: 'He ___ to work by metro.',
                    options: ['goes', 'go', 'gos', 'going'],
                    correct_answer: 'goes',
                    feedback_correct: 'Excellent! "Go" ends in -o, so it becomes "goes" with he/she/it.',
                    feedback_correct_es: '"Go" termina en -o, así que se convierte en "goes" con he/she/it.',
                    feedback_incorrect: '"Go" is special — it ends in -o, so you add -es: "goes" (not "gos").',
                    feedback_incorrect_es: '"Go" es especial — termina en -o, así que se agrega -es: "goes" (no "gos").',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L1-E03',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct sentence.',
                    instruction_es: 'Elige la oración correcta.',
                    question: 'How do you say "Él se cepilla los dientes dos veces al día" in English?',
                    options: [
                        'He brushes his teeth twice a day.',
                        'He brush his teeth twice a day.',
                        'He brushs his teeth twice a day.',
                        'He is brush his teeth twice a day.',
                    ],
                    correct_answer: 'He brushes his teeth twice a day.',
                    feedback_correct: 'That\'s right! "Brush" ends in -sh, so it becomes "brushes" with he/she/it.',
                    feedback_correct_es: '"Brush" termina en -sh, así que se convierte en "brushes" con he/she/it.',
                    feedback_incorrect: '"Brush" ends in -sh, so you add -es: "brushes". Not -s alone.',
                    feedback_incorrect_es: '"Brush" termina en -sh, así que se agrega -es: "brushes". No solo -s.',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L1-E04',
                    type: 'fill_blank',
                    instruction: 'Choose the correct time expression.',
                    instruction_es: 'Elige la expresión de tiempo correcta.',
                    question: 'I start work ___ 9.',
                    sentence: 'I start work ___ 9.',
                    options: ['at', 'in', 'in the', 'on'],
                    correct_answer: 'at',
                    feedback_correct: 'Perfect! Use "at" with specific clock times: at 9, at noon, at midnight.',
                    feedback_correct_es: 'Usa "at" con horas exactas: at 9, at noon, at midnight.',
                    feedback_incorrect: 'For clock times, always use "at": "at 9", "at noon", "at 3 o\'clock".',
                    feedback_incorrect_es: 'Para horas exactas, siempre usa "at": "at 9", "at noon", "at 3 o\'clock".',
                    context: 'work',
                    difficulty: 1,
                },
                {
                    id: 'DR-L1-E05',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to make a sentence.',
                    instruction_es: 'Ordena las palabras para formar una oración.',
                    question: 'Form a sentence:',
                    words: ['breakfast', 'have', 'We', 'morning', 'the', 'in'],
                    correct_answer: ['We', 'have', 'breakfast', 'in', 'the', 'morning'],
                    feedback_correct: 'We have breakfast in the morning. Great word order!',
                    feedback_correct_es: 'We have breakfast in the morning. Excelente orden.',
                    feedback_incorrect: 'English order: Subject + verb + object + time. "We have breakfast in the morning."',
                    feedback_incorrect_es: 'Orden en inglés: Sujeto + verbo + objeto + tiempo. "We have breakfast in the morning."',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L1-E06',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: 'Ella cocina la cena todas las noches.',
                    correct_answer: 'She cooks dinner every night.',
                    feedback_correct: 'She cooks dinner every night. Remember: she + verb-s.',
                    feedback_correct_es: 'She cooks dinner every night. Recuerda: she + verbo con -s.',
                    feedback_incorrect: 'She + cooks (with -s!) + dinner + every night. Don\'t forget the -s for she!',
                    feedback_incorrect_es: 'She + cooks (con -s) + dinner + every night. No olvides la -s para she.',
                    context: 'daily_life',
                    difficulty: 2,
                },
                {
                    id: 'DR-L1-E07',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct time expression to complete the sentence.',
                    instruction_es: 'Elige la expresión de tiempo correcta para completar la oración.',
                    question: 'I watch TV ___.',
                    options: [
                        'at night',
                        'in the night',
                        'on the night',
                        'in night',
                    ],
                    correct_answer: 'at night',
                    feedback_correct: 'That\'s right! "At night" is the correct expression — it\'s an exception to the "in the" pattern.',
                    feedback_correct_es: '"At night" es la expresión correcta — es una excepción al patrón "in the".',
                    feedback_incorrect: 'We say "in the morning", "in the afternoon", "in the evening" BUT "at night" — it\'s an exception!',
                    feedback_incorrect_es: 'Decimos "in the morning", "in the afternoon", "in the evening" PERO "at night" — es una excepción.',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L1-E08',
                    type: 'matching',
                    instruction: 'Match each subject with the correct verb form.',
                    instruction_es: 'Conecta cada sujeto con la forma verbal correcta.',
                    question: 'Match the pairs:',
                    pairs: [
                        { left: 'I', right: 'eat breakfast at 7' },
                        { left: 'She', right: 'eats breakfast at 7' },
                        { left: 'They', right: 'go to work by bus' },
                        { left: 'He', right: 'goes to work by bus' },
                    ],
                    correct_answer: ['I-eat breakfast at 7', 'She-eats breakfast at 7', 'They-go to work by bus', 'He-goes to work by bus'],
                    feedback_correct: 'All correct! I/you/we/they use the base form; he/she/it adds -s or -es.',
                    feedback_correct_es: 'Excelente. I/you/we/they usan la forma base; he/she/it agrega -s o -es.',
                    feedback_incorrect: 'Remember: I/you/we/they → base form. He/she/it → verb + -s or -es.',
                    feedback_incorrect_es: 'Recuerda: I/you/we/they → forma base. He/she/it → verbo + -s o -es.',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L1-E09',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: 'Voy al trabajo a las 8 de la mañana.',
                    correct_answer: 'I go to work at 8 in the morning.',
                    feedback_correct: 'I go to work at 8 in the morning. Perfect use of "at" for the time!',
                    feedback_correct_es: 'I go to work at 8 in the morning. Perfecto uso de "at" para la hora.',
                    feedback_incorrect: 'I + go to work + at 8 + in the morning. Use "at" for the hour and "in the" for the part of day.',
                    feedback_incorrect_es: 'I + go to work + at 8 + in the morning. Usa "at" para la hora e "in the" para la parte del día.',
                    context: 'work',
                    difficulty: 2,
                },
                {
                    id: 'DR-L1-E10',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to make a sentence.',
                    instruction_es: 'Ordena las palabras para formar una oración.',
                    question: 'Form a sentence:',
                    words: ['at', 'She', 'a', 'shower', '6', 'takes'],
                    correct_answer: ['She', 'takes', 'a', 'shower', 'at', '6'],
                    feedback_correct: 'She takes a shower at 6. Perfect word order and correct third-person -s!',
                    feedback_correct_es: 'She takes a shower at 6. Orden perfecto y -s correcta en tercera persona.',
                    feedback_incorrect: 'English order: Subject + verb + object + time. "She takes a shower at 6." Remember: She takes (with -s).',
                    feedback_incorrect_es: 'Orden en inglés: Sujeto + verbo + objeto + tiempo. "She takes a shower at 6." Recuerda: She takes (con -s).',
                    context: 'daily_life',
                    difficulty: 2,
                },
            ],
        },

        // ═════════════════════════════════════════════════════════════════════
        // LESSON 2: NEGATIVES AND QUESTIONS
        // ═════════════════════════════════════════════════════════════════════
        {
            id: 'DR-L2-negatives-questions',
            order: 2,
            slug: 'negatives-questions',
            title: "I don't work on weekends — Negatives and Questions",
            title_es: 'No trabajo los fines de semana — Negativos y Preguntas',
            description: 'Learn to make negative sentences and ask questions about daily routines.',
            description_es: 'Aprende a hacer oraciones negativas y preguntas sobre rutinas diarias.',
            estimated_minutes: 14,
            theory: {
                explanation_es: `Para hacer oraciones **negativas** en Present Simple, necesitas el auxiliar **"do"** (o **"does"** para he/she/it) + **"not"** + el **verbo en forma base** (sin -s):

- I **don't** work on Saturdays. (No trabajo los sábados.)
- She **doesn't** wake up early. (Ella no se despierta temprano.)

Importante: Cuando usas "does" (tercera persona), el verbo principal vuelve a su **forma base** — la -s ya está en "does":
- She work**s**. → She **doesn't work**. (NO "doesn't works")

Para hacer **preguntas**, coloca "do" o "does" al inicio:
- **Do** you work on weekends? (¿Trabajas los fines de semana?)
- **Does** she wake up early? (¿Ella se despierta temprano?)

Respuestas cortas:
- Yes, I **do**. / No, I **don't**.
- Yes, she **does**. / No, she **doesn't**.

Igual que con los negativos, el verbo principal en preguntas va en **forma base**:
- **Does** he **go** to the gym? (NO "Does he goes")`,
                key_points: [
                    'Negative: Subject + don\'t/doesn\'t + base verb',
                    'I/you/we/they + don\'t + verb: "I don\'t eat meat"',
                    'He/she/it + doesn\'t + verb: "She doesn\'t work here"',
                    'The main verb is ALWAYS base form after don\'t/doesn\'t — no -s!',
                    'Questions: Do/Does + subject + base verb?',
                    'Short answers: Yes, I do. / No, she doesn\'t.',
                ],
                key_points_es: [
                    'Negativo: Sujeto + don\'t/doesn\'t + verbo base',
                    'I/you/we/they + don\'t + verbo: "I don\'t eat meat"',
                    'He/she/it + doesn\'t + verbo: "She doesn\'t work here"',
                    'El verbo principal SIEMPRE va en forma base después de don\'t/doesn\'t — sin -s',
                    'Preguntas: Do/Does + sujeto + verbo base?',
                    'Respuestas cortas: Yes, I do. / No, she doesn\'t.',
                ],
                grammar_tables: [
                    {
                        title: 'Present Simple — Negative',
                        title_es: 'Presente Simple — Negativo',
                        structure: 'Subject + don\'t/doesn\'t + base verb + complement',
                        rows: [
                            { subject: 'I', verb: "don't + base", example: "I don't work on Saturdays.", example_es: 'No trabajo los sábados.' },
                            { subject: 'You', verb: "don't + base", example: "You don't need to hurry.", example_es: 'No necesitas apurarte.' },
                            { subject: 'He', verb: "doesn't + base", example: "He doesn't eat breakfast.", example_es: 'Él no desayuna.' },
                            { subject: 'She', verb: "doesn't + base", example: "She doesn't drive to work.", example_es: 'Ella no maneja al trabajo.' },
                            { subject: 'It', verb: "doesn't + base", example: "The store doesn't open on Sundays.", example_es: 'La tienda no abre los domingos.' },
                            { subject: 'We', verb: "don't + base", example: "We don't cook on Fridays.", example_es: 'No cocinamos los viernes.' },
                            { subject: 'They', verb: "don't + base", example: "They don't live near the office.", example_es: 'No viven cerca de la oficina.' },
                        ],
                    },
                    {
                        title: 'Present Simple — Questions & Short Answers',
                        title_es: 'Presente Simple — Preguntas y Respuestas Cortas',
                        structure: 'Do/Does + subject + base verb + complement?',
                        rows: [
                            { subject: 'Do I', verb: 'base verb', example: 'Do I need an umbrella? — Yes, you do.', example_es: '¿Necesito un paraguas? — Sí.' },
                            { subject: 'Do you', verb: 'base verb', example: 'Do you take the bus? — Yes, I do. / No, I don\'t.', example_es: '¿Tomas el autobús? — Sí. / No.' },
                            { subject: 'Does he', verb: 'base verb', example: 'Does he work from home? — Yes, he does. / No, he doesn\'t.', example_es: '¿Trabaja desde casa? — Sí. / No.' },
                            { subject: 'Does she', verb: 'base verb', example: 'Does she cook every day? — Yes, she does. / No, she doesn\'t.', example_es: '¿Cocina todos los días? — Sí. / No.' },
                            { subject: 'Does it', verb: 'base verb', example: 'Does the class start at 9? — Yes, it does.', example_es: '¿La clase empieza a las 9? — Sí.' },
                            { subject: 'Do we', verb: 'base verb', example: 'Do we have a meeting today? — No, we don\'t.', example_es: '¿Tenemos reunión hoy? — No.' },
                            { subject: 'Do they', verb: 'base verb', example: 'Do they go to the gym? — Yes, they do.', example_es: '¿Van al gimnasio? — Sí.' },
                        ],
                    },
                ],
                tips: [
                    '"Don\'t" and "doesn\'t" already carry the tense, so the main verb stays in base form: "She doesn\'t eat" (NOT "She doesn\'t eats").',
                    'Think of "does" as stealing the -s from the verb: "She eats" → "Does she eat?" The -s moved to "does".',
                    'In Spanish, you just say "no" before the verb. In English, you need the auxiliary: "I don\'t like" (NOT "I no like").',
                    'Short answers use the auxiliary only: "Do you work here? Yes, I do." (NOT "Yes, I work.").',
                ],
                tips_es: [
                    '"Don\'t" y "doesn\'t" ya llevan el tiempo verbal, así que el verbo principal se queda en forma base: "She doesn\'t eat" (NO "She doesn\'t eats").',
                    'Piensa que "does" le roba la -s al verbo: "She eats" → "Does she eat?" La -s se movió a "does".',
                    'En español se dice "no" antes del verbo. En inglés, necesitas el auxiliar: "I don\'t like" (NO "I no like").',
                    'Las respuestas cortas usan solo el auxiliar: "Do you work here? Yes, I do." (NO "Yes, I work.").',
                ],
                common_mistakes: [
                    { wrong: 'Does he works on Sundays?', correct: 'Does he work on Sundays?', why_es: 'Después de "does", el verbo va en forma base sin -s. "Does" ya lleva la -s.' },
                    { wrong: 'I no like fast food.', correct: "I don't like fast food.", why_es: 'En inglés no se usa "no" solo antes del verbo. Necesitas el auxiliar "don\'t".' },
                    { wrong: "She doesn't goes to the gym.", correct: "She doesn't go to the gym.", why_es: 'Después de "doesn\'t", el verbo SIEMPRE va en forma base: "go", no "goes".' },
                    { wrong: 'Do she wake up early?', correct: 'Does she wake up early?', why_es: 'Con he/she/it, la pregunta usa "does", no "do".' },
                ],
            },
            vocab_banks: [
                {
                    category: 'Weekend & Leisure Activities',
                    category_es: 'Actividades de Fin de Semana y Tiempo Libre',
                    items: [
                        { en: 'go to the gym', es: 'ir al gimnasio', example: 'I go to the gym on Saturdays.', example_es: 'Voy al gimnasio los sábados.' },
                        { en: 'visit family', es: 'visitar a la familia', example: 'We visit family on Sundays.', example_es: 'Visitamos a la familia los domingos.' },
                        { en: 'go shopping', es: 'ir de compras', example: 'She goes shopping on Saturday afternoons.', example_es: 'Ella va de compras los sábados por la tarde.' },
                        { en: 'sleep in', es: 'dormir hasta tarde', example: "I sleep in on weekends.", example_es: 'Duermo hasta tarde los fines de semana.' },
                        { en: 'clean the house', es: 'limpiar la casa', example: 'We clean the house every Saturday.', example_es: 'Limpiamos la casa todos los sábados.' },
                        { en: 'do the laundry', es: 'lavar la ropa', example: 'She does the laundry on Sundays.', example_es: 'Lava la ropa los domingos.' },
                        { en: 'cook for the week', es: 'cocinar para la semana', example: 'I cook for the week on Sunday afternoons.', example_es: 'Cocino para la semana los domingos por la tarde.' },
                        { en: 'go for a walk', es: 'salir a caminar', example: 'They go for a walk in the park.', example_es: 'Salen a caminar en el parque.' },
                        { en: 'play soccer', es: 'jugar futbol', example: 'He plays soccer with his friends.', example_es: 'Juega futbol con sus amigos.' },
                        { en: 'watch movies', es: 'ver películas', example: "We watch movies on Friday nights.", example_es: 'Vemos películas los viernes por la noche.' },
                    ],
                },
                {
                    category: 'Frequency Expressions',
                    category_es: 'Expresiones de Frecuencia',
                    items: [
                        { en: 'every day', es: 'todos los días / cada día', example: 'I exercise every day.', example_es: 'Hago ejercicio todos los días.' },
                        { en: 'every morning', es: 'todas las mañanas', example: 'He runs every morning.', example_es: 'Corre todas las mañanas.' },
                        { en: 'on weekends', es: 'los fines de semana', example: "I don't work on weekends.", example_es: 'No trabajo los fines de semana.' },
                        { en: 'on Mondays', es: 'los lunes', example: 'She has English class on Mondays.', example_es: 'Tiene clase de inglés los lunes.' },
                        { en: 'twice a week', es: 'dos veces a la semana', example: 'I go to the gym twice a week.', example_es: 'Voy al gimnasio dos veces a la semana.' },
                        { en: 'once a month', es: 'una vez al mes', example: 'We visit my parents once a month.', example_es: 'Visitamos a mis padres una vez al mes.' },
                    ],
                },
            ],
            exercises: [
                {
                    id: 'DR-L2-E01',
                    type: 'fill_blank',
                    instruction: 'Complete the negative sentence.',
                    instruction_es: 'Completa la oración negativa.',
                    question: 'I ___ (not/work) on weekends.',
                    sentence: 'I ___ on weekends.',
                    options: ["don't work", "doesn't work", "not work", "no work"],
                    correct_answer: "don't work",
                    feedback_correct: 'Perfect! I + don\'t + base verb: "I don\'t work".',
                    feedback_correct_es: 'I + don\'t + verbo base: "I don\'t work".',
                    feedback_incorrect: 'For I/you/we/they, use "don\'t" + base verb: "I don\'t work".',
                    feedback_incorrect_es: 'Para I/you/we/they, usa "don\'t" + verbo base: "I don\'t work".',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L2-E02',
                    type: 'fill_blank',
                    instruction: 'Complete the negative sentence.',
                    instruction_es: 'Completa la oración negativa.',
                    question: 'She ___ (not/eat) meat.',
                    sentence: 'She ___ meat.',
                    options: ["doesn't eat", "don't eat", "doesn't eats", "not eats"],
                    correct_answer: "doesn't eat",
                    feedback_correct: 'Great! She + doesn\'t + base verb (no -s on "eat").',
                    feedback_correct_es: 'She + doesn\'t + verbo base (sin -s en "eat").',
                    feedback_incorrect: 'For he/she/it, use "doesn\'t" + base verb. The -s is already in "doesn\'t", so the verb stays as "eat".',
                    feedback_incorrect_es: 'Para he/she/it, usa "doesn\'t" + verbo base. La -s ya está en "doesn\'t", así que el verbo queda como "eat".',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L2-E03',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct question.',
                    instruction_es: 'Elige la pregunta correcta.',
                    question: 'How do you ask "¿Ella se despierta temprano?"',
                    options: [
                        'Does she wake up early?',
                        'Does she wakes up early?',
                        'Do she wake up early?',
                        'Is she wake up early?',
                    ],
                    correct_answer: 'Does she wake up early?',
                    feedback_correct: 'Perfect! Does + she + base verb: "Does she wake up early?"',
                    feedback_correct_es: 'Does + she + verbo base: "Does she wake up early?"',
                    feedback_incorrect: 'For he/she/it questions: Does + subject + base verb (no -s). "Does she wake up early?"',
                    feedback_incorrect_es: 'Para preguntas con he/she/it: Does + sujeto + verbo base (sin -s). "Does she wake up early?"',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'DR-L2-E04',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct short answer.',
                    instruction_es: 'Elige la respuesta corta correcta.',
                    question: 'Do you go to the gym on weekends? — Yes, ___.',
                    options: [
                        'I do',
                        'I go',
                        'I am',
                        "I don't",
                    ],
                    correct_answer: 'I do',
                    feedback_correct: 'That\'s right! Short answers use the auxiliary: "Yes, I do."',
                    feedback_correct_es: 'Las respuestas cortas usan el auxiliar: "Yes, I do."',
                    feedback_incorrect: 'Short answers use only the auxiliary: "Yes, I do." (NOT "Yes, I go" or "Yes, I am").',
                    feedback_incorrect_es: 'Las respuestas cortas usan solo el auxiliar: "Yes, I do." (NO "Yes, I go" ni "Yes, I am").',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'DR-L2-E05',
                    type: 'reorder',
                    instruction: 'Put the words in order to make a negative sentence.',
                    instruction_es: 'Ordena las palabras para formar una oración negativa.',
                    question: 'Form a sentence:',
                    words: ['cook', "doesn't", 'He', 'weekdays', 'on'],
                    correct_answer: ['He', "doesn't", 'cook', 'on', 'weekdays'],
                    feedback_correct: "He doesn't cook on weekdays. Great word order!",
                    feedback_correct_es: "He doesn't cook on weekdays. Excelente orden.",
                    feedback_incorrect: 'Order: Subject + doesn\'t + base verb + complement. "He doesn\'t cook on weekdays."',
                    feedback_incorrect_es: 'Orden: Sujeto + doesn\'t + verbo base + complemento. "He doesn\'t cook on weekdays."',
                    context: 'daily_life',
                    difficulty: 2,
                },
                {
                    id: 'DR-L2-E06',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: '¿Trabajas los sábados?',
                    correct_answer: 'Do you work on Saturdays?',
                    feedback_correct: 'Do you work on Saturdays? Perfect question formation!',
                    feedback_correct_es: 'Do you work on Saturdays? Formación perfecta de pregunta.',
                    feedback_incorrect: 'Questions with you: Do + you + base verb? "Do you work on Saturdays?"',
                    feedback_incorrect_es: 'Preguntas con you: Do + you + verbo base? "Do you work on Saturdays?"',
                    context: 'work',
                    difficulty: 2,
                },
                {
                    id: 'DR-L2-E07',
                    type: 'true_false',
                    instruction: 'Is this sentence correct?',
                    instruction_es: 'Esta oración, ¿es correcta?',
                    question: '"Does he works on Sundays?"',
                    correct_answer: 'false',
                    feedback_correct: 'Right! It should be "Does he work on Sundays?" — no -s on the verb after "does".',
                    feedback_correct_es: 'Correcto. Debe ser "Does he work on Sundays?" — sin -s en el verbo después de "does".',
                    feedback_incorrect: 'This is INCORRECT. After "does", the verb must be in base form: "Does he work" (NOT "Does he works").',
                    feedback_incorrect_es: 'Es INCORRECTA. Después de "does", el verbo va en forma base: "Does he work" (NO "Does he works").',
                    context: 'general',
                    difficulty: 1,
                },
                {
                    id: 'DR-L2-E08',
                    type: 'fill_blank',
                    instruction: 'Complete the question with Do or Does.',
                    instruction_es: 'Completa la pregunta con Do o Does.',
                    question: '___ they visit their family on Sundays?',
                    sentence: '___ they visit their family on Sundays?',
                    options: ['Do', 'Does', "Don't", "Doesn't"],
                    correct_answer: 'Do',
                    feedback_correct: 'Correct! "They" uses "Do": "Do they visit their family on Sundays?"',
                    feedback_correct_es: '"They" usa "Do": "Do they visit their family on Sundays?"',
                    feedback_incorrect: '"They" is plural — use "Do" (not "Does"). "Does" is only for he/she/it.',
                    feedback_incorrect_es: '"They" es plural — usa "Do" (no "Does"). "Does" es solo para he/she/it.',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'DR-L2-E09',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: 'Él no se levanta temprano los domingos.',
                    correct_answer: "He doesn't get up early on Sundays.",
                    feedback_correct: "He doesn't get up early on Sundays. Excellent use of doesn't + base verb!",
                    feedback_correct_es: "He doesn't get up early on Sundays. Excelente uso de doesn't + verbo base.",
                    feedback_incorrect: 'He + doesn\'t + get up (base form!) + early + on Sundays. Remember: doesn\'t already has the -s.',
                    feedback_incorrect_es: 'He + doesn\'t + get up (forma base) + early + on Sundays. Recuerda: doesn\'t ya tiene la -s.',
                    context: 'daily_life',
                    difficulty: 2,
                },
                {
                    id: 'DR-L2-E10',
                    type: 'reorder',
                    instruction: 'Put the words in order to make a question.',
                    instruction_es: 'Ordena las palabras para formar una pregunta.',
                    question: 'Form a question:',
                    words: ['your', 'Does', 'early', 'start', 'class', '?'],
                    correct_answer: ['Does', 'your', 'class', 'start', 'early', '?'],
                    feedback_correct: 'Does your class start early? Perfect question structure!',
                    feedback_correct_es: 'Does your class start early? Estructura perfecta de pregunta.',
                    feedback_incorrect: 'Question order: Does + subject + base verb + complement + ? "Does your class start early?"',
                    feedback_incorrect_es: 'Orden de pregunta: Does + sujeto + verbo base + complemento + ? "Does your class start early?"',
                    context: 'general',
                    difficulty: 2,
                },
            ],
        },
    ],
};
