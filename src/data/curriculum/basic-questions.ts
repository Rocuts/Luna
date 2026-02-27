/**
 * basic-questions.ts
 *
 * Complete structured curriculum for Basic Questions — WH Questions and Yes/No Questions.
 * Target audience: Spanish-speaking adult beginners (CEFR A1).
 *
 * Pedagogical design based on:
 * - Cognitive Load Theory (Sweller): explicit instruction for beginners
 * - Spaced Retrieval Practice: exercises designed for expanding-interval review
 * - Task-Based Language Teaching: real-world contexts (work, travel, social)
 * - Comprehensible Input + Pushed Output: theory then production exercises
 * - Low Affective Filter: encouraging feedback, real-life relevance
 * - L1 Transfer Awareness: addresses Spanish word-order interference
 */

import type { CourseModule } from './types';

export const basicQuestionsCourse: CourseModule = {
    id: 'basic-questions',
    slug: 'basic-questions',
    title: 'Basic Questions — WH Questions and Yes/No Questions',
    title_es: 'Preguntas Básicas — Preguntas con WH y Preguntas de Sí/No',
    level: 'A1',
    description: 'Learn to ask and answer essential questions in English. Master WH questions (what, where, when, who, how) and Yes/No questions with short answers.',
    description_es: 'Aprende a hacer y responder preguntas esenciales en inglés. Domina las preguntas con WH (what, where, when, who, how) y las preguntas de sí/no con respuestas cortas.',
    lessons: [

        // ═════════════════════════════════════════════════════════════════════
        // LESSON 1: WH QUESTIONS
        // ═════════════════════════════════════════════════════════════════════
        {
            id: 'BQ-L1-wh-questions',
            order: 1,
            slug: 'wh-questions',
            title: 'What, Where, When, Who, How — WH Questions',
            title_es: 'What, Where, When, Who, How — Preguntas con WH',
            description: 'Learn to ask open questions using WH words to get specific information.',
            description_es: 'Aprende a hacer preguntas abiertas usando palabras WH para obtener información específica.',
            estimated_minutes: 12,
            theory: {
                explanation_es: `En inglés, las preguntas que piden información específica comienzan con una **palabra WH** (What, Where, When, Who, How). El orden de las palabras es diferente al español:

**Con "to be":**
- **WH word + is/are + sujeto + complemento?**
- Where **is** the hotel? (¿Dónde está el hotel?)
- What **is** your name? (¿Cuál es tu nombre?)

**Con otros verbos (presente simple):**
- **WH word + do/does + sujeto + verbo base + complemento?**
- Where **do** you live? (¿Dónde vives?)
- What **does** she do? (¿Qué hace ella?)

En español, muchas veces simplemente cambias la entonación: "¿Dónde vives?" En inglés, DEBES usar un auxiliar (is/are/do/does) y cambiar el orden de las palabras. Este es uno de los errores más comunes para hispanohablantes.

**Cuándo usar cada palabra WH:**
- **What** = Qué / Cuál → para cosas e información
- **Where** = Dónde → para lugares
- **When** = Cuándo → para tiempo
- **Who** = Quién → para personas
- **How** = Cómo → para manera, estado, o cantidad (How much, How many, How old)`,
                key_points: [
                    'WH words: What, Where, When, Who, How',
                    'With "to be": WH + is/are + subject?',
                    'With other verbs: WH + do/does + subject + base verb?',
                    '"Do" for I/you/we/they — "Does" for he/she/it',
                    '"Who" as subject needs no auxiliary: "Who lives here?"',
                    '"How" combines with other words: How old, How much, How many',
                ],
                key_points_es: [
                    'Palabras WH: What, Where, When, Who, How',
                    'Con "to be": WH + is/are + sujeto?',
                    'Con otros verbos: WH + do/does + sujeto + verbo base?',
                    '"Do" para I/you/we/they — "Does" para he/she/it',
                    '"Who" como sujeto no necesita auxiliar: "Who lives here?"',
                    '"How" se combina con otras palabras: How old, How much, How many',
                ],
                grammar_tables: [
                    {
                        title: 'WH Questions with "To Be"',
                        title_es: 'Preguntas WH con "To Be"',
                        structure: 'WH word + is/are + subject + complement?',
                        rows: [
                            { subject: 'What', verb: 'is', example: 'What is your name?', example_es: '¿Cuál es tu nombre?' },
                            { subject: 'Where', verb: 'is', example: 'Where is the bathroom?', example_es: '¿Dónde está el baño?' },
                            { subject: 'When', verb: 'is', example: 'When is the meeting?', example_es: '¿Cuándo es la reunión?' },
                            { subject: 'Who', verb: 'is', example: 'Who is your teacher?', example_es: '¿Quién es tu profesor?' },
                            { subject: 'How', verb: 'is', example: 'How is the weather?', example_es: '¿Cómo está el clima?' },
                            { subject: 'Where', verb: 'are', example: 'Where are you from?', example_es: '¿De dónde eres?' },
                            { subject: 'How old', verb: 'are', example: 'How old are you?', example_es: '¿Cuántos años tienes?' },
                        ],
                    },
                    {
                        title: 'WH Questions with Present Simple (do/does)',
                        title_es: 'Preguntas WH con Presente Simple (do/does)',
                        structure: 'WH word + do/does + subject + base verb?',
                        rows: [
                            { subject: 'What', verb: 'do', example: 'What do you do?', example_es: '¿A qué te dedicas?' },
                            { subject: 'Where', verb: 'do', example: 'Where do you live?', example_es: '¿Dónde vives?' },
                            { subject: 'When', verb: 'does', example: 'When does the store open?', example_es: '¿Cuándo abre la tienda?' },
                            { subject: 'Who', verb: 'do', example: 'Who do you work with?', example_es: '¿Con quién trabajas?' },
                            { subject: 'How', verb: 'do', example: 'How do you say this in English?', example_es: '¿Cómo se dice esto en inglés?' },
                            { subject: 'What', verb: 'does', example: 'What does she study?', example_es: '¿Qué estudia ella?' },
                            { subject: 'Where', verb: 'does', example: 'Where does he work?', example_es: '¿Dónde trabaja él?' },
                        ],
                    },
                ],
                tips: [
                    '"What do you do?" means "What is your job?" — a very common question.',
                    '"How are you?" is a greeting, not a real question. Answer: "Fine, thanks. And you?"',
                    '"Where are you from?" — use "from" at the end, not at the beginning.',
                    'Don\'t confuse "What" (qué/cuál) with "Which" (cuál de un grupo limitado).',
                ],
                tips_es: [
                    '"What do you do?" significa "¿A qué te dedicas?" — una pregunta muy común.',
                    '"How are you?" es un saludo, no una pregunta real. Responde: "Fine, thanks. And you?"',
                    '"Where are you from?" — usa "from" al final, no al inicio.',
                    'No confundas "What" (qué/cuál en general) con "Which" (cuál de un grupo limitado).',
                ],
                common_mistakes: [
                    { wrong: 'Where you live?', correct: 'Where do you live?', why_es: 'En inglés, las preguntas con verbos normales NECESITAN el auxiliar "do/does". No basta con cambiar la entonación como en español.' },
                    { wrong: 'How you say this?', correct: 'How do you say this?', why_es: 'Falta el auxiliar "do". Siempre: WH + do/does + sujeto + verbo base.' },
                    { wrong: 'What means this word?', correct: 'What does this word mean?', why_es: 'Con "does", el verbo principal va en forma base (mean), no conjugado (means).' },
                    { wrong: 'Where is live your brother?', correct: 'Where does your brother live?', why_es: 'No mezcles "is" con otros verbos. "Live" usa "do/does", no "is".' },
                    { wrong: 'How is your name?', correct: 'What is your name?', why_es: '"How" = cómo (manera). "What" = qué/cuál. Para el nombre se usa "What".' },
                ],
            },
            vocab_banks: [
                {
                    category: 'WH Question Words',
                    category_es: 'Palabras de Pregunta WH',
                    items: [
                        { en: 'What', es: 'Qué / Cuál', example: 'What is your phone number?', example_es: '¿Cuál es tu número de teléfono?' },
                        { en: 'Where', es: 'Dónde', example: 'Where is the nearest pharmacy?', example_es: '¿Dónde está la farmacia más cercana?' },
                        { en: 'When', es: 'Cuándo', example: 'When is your birthday?', example_es: '¿Cuándo es tu cumpleaños?' },
                        { en: 'Who', es: 'Quién', example: 'Who is your best friend?', example_es: '¿Quién es tu mejor amigo?' },
                        { en: 'How', es: 'Cómo', example: 'How is your family?', example_es: '¿Cómo está tu familia?' },
                        { en: 'How old', es: 'Cuántos años', example: 'How old are your children?', example_es: '¿Cuántos años tienen tus hijos?' },
                        { en: 'How much', es: 'Cuánto (precio/cantidad)', example: 'How much is this shirt?', example_es: '¿Cuánto cuesta esta camisa?' },
                        { en: 'How many', es: 'Cuántos/as (cantidad contable)', example: 'How many brothers do you have?', example_es: '¿Cuántos hermanos tienes?' },
                    ],
                },
                {
                    category: 'Common WH Questions for Everyday Life',
                    category_es: 'Preguntas WH Comunes para la Vida Diaria',
                    items: [
                        { en: 'What time is it?', es: '¿Qué hora es?', example: 'Excuse me, what time is it?', example_es: 'Disculpe, ¿qué hora es?' },
                        { en: 'Where are you from?', es: '¿De dónde eres?', example: "I'm from Colombia. Where are you from?", example_es: 'Soy de Colombia. ¿De dónde eres tú?' },
                        { en: 'What do you do?', es: '¿A qué te dedicas?', example: 'Nice to meet you. What do you do?', example_es: 'Mucho gusto. ¿A qué te dedicas?' },
                        { en: 'How do you spell that?', es: '¿Cómo se deletrea eso?', example: "My name is Xiomara. — How do you spell that?", example_es: 'Me llamo Xiomara. — ¿Cómo se deletrea eso?' },
                        { en: 'Where is the bus stop?', es: '¿Dónde está la parada de autobús?', example: 'Excuse me, where is the bus stop?', example_es: 'Disculpe, ¿dónde está la parada de autobús?' },
                        { en: 'When does the flight leave?', es: '¿Cuándo sale el vuelo?', example: 'When does the flight to Miami leave?', example_es: '¿Cuándo sale el vuelo a Miami?' },
                    ],
                },
            ],
            exercises: [
                {
                    id: 'BQ-L1-E01',
                    type: 'fill_blank',
                    instruction: 'Complete the question with the correct WH word.',
                    instruction_es: 'Completa la pregunta con la palabra WH correcta.',
                    question: '___ is your name?',
                    sentence: '___ is your name?',
                    options: ['What', 'Where', 'How', 'When'],
                    correct_answer: 'What',
                    feedback_correct: 'Perfect! "What is your name?" — we use "What" to ask for information.',
                    feedback_correct_es: '"What" se usa para preguntar por información como el nombre.',
                    feedback_incorrect: 'We use "What" for names: "What is your name?" (¿Cuál es tu nombre?).',
                    feedback_incorrect_es: 'Usamos "What" para nombres: "What is your name?" (¿Cuál es tu nombre?).',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L1-E02',
                    type: 'fill_blank',
                    instruction: 'Complete the question with the correct WH word.',
                    instruction_es: 'Completa la pregunta con la palabra WH correcta.',
                    question: '___ do you live?',
                    sentence: '___ do you live?',
                    options: ['Where', 'What', 'Who', 'When'],
                    correct_answer: 'Where',
                    feedback_correct: 'Great! "Where" is for places and locations.',
                    feedback_correct_es: '"Where" se usa para lugares y ubicaciones.',
                    feedback_incorrect: '"Where" = dónde. We ask about places with "Where".',
                    feedback_incorrect_es: '"Where" = dónde. Preguntamos sobre lugares con "Where".',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L1-E03',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct question.',
                    instruction_es: 'Elige la pregunta correcta.',
                    question: 'You want to ask someone about their job. Which question is correct?',
                    options: [
                        'What do you do?',
                        'What you do?',
                        'What are you do?',
                        'What do you do it?',
                    ],
                    correct_answer: 'What do you do?',
                    feedback_correct: 'Perfect! "What do you do?" is the standard way to ask about someone\'s job.',
                    feedback_correct_es: '"What do you do?" es la forma estándar de preguntar sobre el trabajo de alguien.',
                    feedback_incorrect: 'The correct form is "What do you do?" — WH word + do + subject + base verb. No extra words needed.',
                    feedback_incorrect_es: 'La forma correcta es "What do you do?" — palabra WH + do + sujeto + verbo base. Sin palabras extra.',
                    context: 'work',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L1-E04',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct question.',
                    instruction_es: 'Elige la pregunta correcta.',
                    question: 'How do you ask "¿Dónde trabaja él?" in English?',
                    options: [
                        'Where does he work?',
                        'Where he works?',
                        'Where do he work?',
                        'Where is he work?',
                    ],
                    correct_answer: 'Where does he work?',
                    feedback_correct: 'Excellent! "He" uses "does" and the base verb "work" (not "works").',
                    feedback_correct_es: '"He" usa "does" y el verbo base "work" (no "works"). Con "does", el verbo NO lleva -s.',
                    feedback_incorrect: 'For he/she/it, use "does": Where does he work? The verb stays in base form after "does".',
                    feedback_incorrect_es: 'Para he/she/it, usa "does": Where does he work? El verbo queda en forma base después de "does".',
                    context: 'work',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L1-E05',
                    type: 'fill_blank',
                    instruction: 'Complete the question with "do" or "does".',
                    instruction_es: 'Completa la pregunta con "do" o "does".',
                    question: 'When ___ the bus arrive?',
                    sentence: 'When ___ the bus arrive?',
                    options: ['does', 'do', 'is', 'are'],
                    correct_answer: 'does',
                    feedback_correct: 'Right! "The bus" = it (third person singular) → "does".',
                    feedback_correct_es: '"The bus" = it (tercera persona singular) → "does".',
                    feedback_incorrect: '"The bus" is like "it" (singular) → use "does". "Do" is for I/you/we/they.',
                    feedback_incorrect_es: '"The bus" es como "it" (singular) → usa "does". "Do" es para I/you/we/they.',
                    context: 'travel',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L1-E06',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to form a question.',
                    instruction_es: 'Ordena las palabras para formar una pregunta.',
                    question: 'Form a question:',
                    words: ['you', 'Where', 'from', 'are', '?'],
                    correct_answer: ['Where', 'are', 'you', 'from', '?'],
                    feedback_correct: 'Where are you from? WH word + are + subject + complement.',
                    feedback_correct_es: 'Where are you from? Palabra WH + are + sujeto + complemento.',
                    feedback_incorrect: 'The correct order is: "Where are you from?" — WH word first, then the verb, then the subject.',
                    feedback_incorrect_es: 'El orden correcto es: "Where are you from?" — primero la palabra WH, luego el verbo, luego el sujeto.',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L1-E07',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to form a question.',
                    instruction_es: 'Ordena las palabras para formar una pregunta.',
                    question: 'Form a question:',
                    words: ['How', 'you', 'do', 'this', 'say', 'English', 'in', '?'],
                    correct_answer: ['How', 'do', 'you', 'say', 'this', 'in', 'English', '?'],
                    feedback_correct: 'How do you say this in English? A very useful question for learners!',
                    feedback_correct_es: 'How do you say this in English? Una pregunta muy útil para aprender.',
                    feedback_incorrect: 'The order is: How + do + you + say + this + in + English? Remember: WH + auxiliary + subject + verb.',
                    feedback_incorrect_es: 'El orden es: How + do + you + say + this + in + English? Recuerda: WH + auxiliar + sujeto + verbo.',
                    context: 'general',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L1-E08',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: '¿Dónde está el aeropuerto?',
                    correct_answer: 'Where is the airport?',
                    feedback_correct: 'Where is the airport? With "to be", no auxiliary "do" is needed.',
                    feedback_correct_es: 'Con "to be" no se necesita auxiliar "do". Directo: Where + is + sujeto.',
                    feedback_incorrect: 'With "to be": Where + is + the airport? No "do" needed with "to be".',
                    feedback_incorrect_es: 'Con "to be": Where + is + the airport? No se necesita "do" con "to be".',
                    context: 'travel',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L1-E09',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: '¿Cuándo abre el restaurante?',
                    correct_answer: 'When does the restaurant open?',
                    feedback_correct: 'When does the restaurant open? "The restaurant" is like "it" → uses "does".',
                    feedback_correct_es: '"The restaurant" es como "it" → usa "does". El verbo queda en forma base: "open".',
                    feedback_incorrect: 'Use "does" for singular subjects: When does the restaurant open? (verb in base form after "does").',
                    feedback_incorrect_es: 'Usa "does" para sujetos singulares: When does the restaurant open? (verbo en forma base después de "does").',
                    context: 'travel',
                    difficulty: 3,
                },
                {
                    id: 'BQ-L1-E10',
                    type: 'fill_blank',
                    instruction: 'Complete the question with the correct words.',
                    instruction_es: 'Completa la pregunta con las palabras correctas.',
                    question: '___ old ___ your daughter?',
                    sentence: '___ old ___ your daughter?',
                    options: ['How / is', 'What / is', 'How / does', 'When / is'],
                    correct_answer: 'How / is',
                    feedback_correct: 'How old is your daughter? "How old" asks about age, and age uses "to be" in English.',
                    feedback_correct_es: '"How old" pregunta la edad. En inglés la edad usa "to be" (is), no "tener" como en español.',
                    feedback_incorrect: 'Age in English uses "How old" + "to be": How old is your daughter? (not "have" like in Spanish).',
                    feedback_incorrect_es: 'La edad en inglés usa "How old" + "to be": How old is your daughter? (no "have" como en español).',
                    context: 'social',
                    difficulty: 2,
                },
            ],
        },

        // ═════════════════════════════════════════════════════════════════════
        // LESSON 2: YES/NO QUESTIONS & SHORT ANSWERS
        // ═════════════════════════════════════════════════════════════════════
        {
            id: 'BQ-L2-yes-no-questions',
            order: 2,
            slug: 'yes-no-questions',
            title: 'Do you like coffee? — Yes/No Questions & Short Answers',
            title_es: '¿Te gusta el café? — Preguntas de Sí/No y Respuestas Cortas',
            description: 'Learn to ask yes/no questions and give proper short answers in English.',
            description_es: 'Aprende a hacer preguntas de sí/no y dar respuestas cortas correctas en inglés.',
            estimated_minutes: 12,
            theory: {
                explanation_es: `Las preguntas de sí/no son las que se responden con "yes" o "no". En inglés, se forman **invirtiendo el orden** del sujeto y el verbo (o auxiliar):

**Con "to be" — invierte sujeto y verbo:**
- You are tired. → **Are you** tired?
- She is a doctor. → **Is she** a doctor?
- They are from Peru. → **Are they** from Peru?

**Con otros verbos — usa "do/does" al inicio:**
- You like coffee. → **Do you** like coffee?
- He speaks English. → **Does he** speak English?
- They work here. → **Do they** work here?

**Respuestas cortas — NO repitas el verbo principal:**
- Do you like pizza? → **Yes, I do.** / **No, I don't.**
- Does she work here? → **Yes, she does.** / **No, she doesn't.**
- Are you ready? → **Yes, I am.** / **No, I'm not.**
- Is he your brother? → **Yes, he is.** / **No, he isn't.**

En español, a veces respondemos "Sí, me gusta" o "No, no me gusta". En inglés, las respuestas cortas usan el **auxiliar**, no el verbo principal. Decir "Yes, I like" suena incompleto y es incorrecto.`,
                key_points: [
                    'With "to be": Am/Is/Are + subject + complement?',
                    'With other verbs: Do/Does + subject + base verb?',
                    '"Does" for he/she/it — verb stays in BASE form',
                    'Short answers use the auxiliary: Yes, I do. / No, she doesn\'t.',
                    'Never repeat the main verb in a short answer: "Yes, I do" NOT "Yes, I like"',
                    'With "to be" short answers: Yes, I am. / No, he isn\'t.',
                ],
                key_points_es: [
                    'Con "to be": Am/Is/Are + sujeto + complemento?',
                    'Con otros verbos: Do/Does + sujeto + verbo base?',
                    '"Does" para he/she/it — el verbo queda en forma BASE',
                    'Las respuestas cortas usan el auxiliar: Yes, I do. / No, she doesn\'t.',
                    'Nunca repitas el verbo principal: "Yes, I do" NO "Yes, I like"',
                    'Con "to be": Yes, I am. / No, he isn\'t.',
                ],
                grammar_tables: [
                    {
                        title: 'Yes/No Questions with "To Be"',
                        title_es: 'Preguntas de Sí/No con "To Be"',
                        structure: 'Am/Is/Are + subject + complement?',
                        rows: [
                            { subject: 'I', verb: 'Am', example: 'Am I late?', example_es: '¿Llego tarde?' },
                            { subject: 'You', verb: 'Are', example: 'Are you a student?', example_es: '¿Eres estudiante?' },
                            { subject: 'He', verb: 'Is', example: 'Is he your brother?', example_es: '¿Es tu hermano?' },
                            { subject: 'She', verb: 'Is', example: 'Is she from Mexico?', example_es: '¿Es ella de México?' },
                            { subject: 'It', verb: 'Is', example: 'Is it expensive?', example_es: '¿Es caro?' },
                            { subject: 'We', verb: 'Are', example: 'Are we on time?', example_es: '¿Estamos a tiempo?' },
                            { subject: 'They', verb: 'Are', example: 'Are they open on Sundays?', example_es: '¿Están abiertos los domingos?' },
                        ],
                    },
                    {
                        title: 'Yes/No Questions with Do/Does + Short Answers',
                        title_es: 'Preguntas de Sí/No con Do/Does + Respuestas Cortas',
                        structure: 'Do/Does + subject + base verb? → Yes, subject + do/does. / No, subject + don\'t/doesn\'t.',
                        rows: [
                            { subject: 'I', verb: 'Do', example: 'Do I need a visa? — Yes, you do.', example_es: '¿Necesito visa? — Sí.' },
                            { subject: 'You', verb: 'Do', example: 'Do you speak Spanish? — Yes, I do.', example_es: '¿Hablas español? — Sí.' },
                            { subject: 'He', verb: 'Does', example: 'Does he work here? — No, he doesn\'t.', example_es: '¿Trabaja aquí? — No.' },
                            { subject: 'She', verb: 'Does', example: 'Does she like coffee? — Yes, she does.', example_es: '¿Le gusta el café? — Sí.' },
                            { subject: 'It', verb: 'Does', example: 'Does it rain a lot? — Yes, it does.', example_es: '¿Llueve mucho? — Sí.' },
                            { subject: 'We', verb: 'Do', example: 'Do we have time? — No, we don\'t.', example_es: '¿Tenemos tiempo? — No.' },
                            { subject: 'They', verb: 'Do', example: 'Do they live near here? — Yes, they do.', example_es: '¿Viven cerca de aquí? — Sí.' },
                        ],
                    },
                ],
                tips: [
                    '"Do you like...?" is the most common way to ask about preferences. Very useful!',
                    'Short answers sound polite and natural. Just "yes" or "no" alone can sound rude.',
                    'Never say "Yes, I am like" or "No, I don\'t like" as short answers. Use: "Yes, I do" / "No, I don\'t".',
                    'With "to be", DON\'T contract "Yes, I am" → NOT "Yes, I\'m". But "No, I\'m not" is fine.',
                ],
                tips_es: [
                    '"Do you like...?" es la forma más común de preguntar por preferencias. Muy útil.',
                    'Las respuestas cortas suenan educadas y naturales. Solo "yes" o "no" puede sonar brusco.',
                    'Nunca digas "Yes, I am like" o "No, I don\'t like" como respuestas cortas. Usa: "Yes, I do" / "No, I don\'t".',
                    'Con "to be", NO contraigas "Yes, I am" → NO "Yes, I\'m". Pero "No, I\'m not" sí es correcto.',
                ],
                common_mistakes: [
                    { wrong: 'You like coffee?', correct: 'Do you like coffee?', why_es: 'En inglés, las preguntas con verbos normales NECESITAN "do/does" al inicio. No es como en español donde solo cambias la entonación.' },
                    { wrong: 'Does he likes pizza?', correct: 'Does he like pizza?', why_es: 'Después de "does", el verbo va en forma base (like), NUNCA con -s (likes). El "does" ya lleva la marca de tercera persona.' },
                    { wrong: 'Do you are a student?', correct: 'Are you a student?', why_es: '"To be" no usa "do/does". Simplemente invierte: Are you...? Is she...?' },
                    { wrong: 'Yes, I like. / No, I don\'t like.', correct: 'Yes, I do. / No, I don\'t.', why_es: 'Las respuestas cortas en inglés usan SOLO el auxiliar. No repitas el verbo principal.' },
                    { wrong: 'Is she speak English?', correct: 'Does she speak English?', why_es: '"Speak" es un verbo de acción, no "to be". Usa "does" para he/she/it con verbos de acción.' },
                ],
            },
            vocab_banks: [
                {
                    category: 'Common Yes/No Questions for Daily Life',
                    category_es: 'Preguntas Comunes de Sí/No para la Vida Diaria',
                    items: [
                        { en: 'Do you speak English?', es: '¿Hablas inglés?', example: 'Excuse me, do you speak English?', example_es: 'Disculpe, ¿habla inglés?' },
                        { en: 'Do you have children?', es: '¿Tienes hijos?', example: 'Do you have children? — Yes, I do. Two boys.', example_es: '¿Tienes hijos? — Sí. Dos niños.' },
                        { en: 'Do you like your job?', es: '¿Te gusta tu trabajo?', example: 'Do you like your job? — Yes, I do. I love it.', example_es: '¿Te gusta tu trabajo? — Sí, me encanta.' },
                        { en: 'Do you need help?', es: '¿Necesitas ayuda?', example: 'Do you need help with your bags?', example_es: '¿Necesitas ayuda con tus bolsas?' },
                        { en: 'Does it cost a lot?', es: '¿Cuesta mucho?', example: 'Does it cost a lot? — No, it doesn\'t.', example_es: '¿Cuesta mucho? — No.' },
                        { en: 'Is this seat taken?', es: '¿Está ocupado este asiento?', example: 'Excuse me, is this seat taken?', example_es: 'Disculpe, ¿está ocupado este asiento?' },
                        { en: 'Are you ready?', es: '¿Estás listo/a?', example: 'Are you ready to order?', example_es: '¿Estás listo/a para ordenar?' },
                        { en: 'Is there a bathroom nearby?', es: '¿Hay un baño cerca?', example: 'Is there a bathroom nearby? — Yes, there is.', example_es: '¿Hay un baño cerca? — Sí, hay uno.' },
                    ],
                },
                {
                    category: 'Short Answers',
                    category_es: 'Respuestas Cortas',
                    items: [
                        { en: 'Yes, I do. / No, I don\'t.', es: 'Sí. / No.', example: 'Do you like tea? — Yes, I do.', example_es: '¿Te gusta el té? — Sí.' },
                        { en: 'Yes, he does. / No, he doesn\'t.', es: 'Sí. / No.', example: 'Does he work here? — No, he doesn\'t.', example_es: '¿Trabaja aquí? — No.' },
                        { en: 'Yes, I am. / No, I\'m not.', es: 'Sí. / No.', example: 'Are you tired? — Yes, I am.', example_es: '¿Estás cansado/a? — Sí.' },
                        { en: 'Yes, it is. / No, it isn\'t.', es: 'Sí. / No.', example: 'Is it far? — No, it isn\'t.', example_es: '¿Está lejos? — No.' },
                        { en: 'Yes, they do. / No, they don\'t.', es: 'Sí. / No.', example: 'Do they live here? — Yes, they do.', example_es: '¿Viven aquí? — Sí.' },
                        { en: 'Yes, we are. / No, we aren\'t.', es: 'Sí. / No.', example: 'Are we late? — No, we aren\'t.', example_es: '¿Llegamos tarde? — No.' },
                    ],
                },
            ],
            exercises: [
                {
                    id: 'BQ-L2-E01',
                    type: 'fill_blank',
                    instruction: 'Complete the question with "Do" or "Does".',
                    instruction_es: 'Completa la pregunta con "Do" o "Does".',
                    question: '___ you like coffee?',
                    sentence: '___ you like coffee?',
                    options: ['Do', 'Does', 'Are', 'Is'],
                    correct_answer: 'Do',
                    feedback_correct: 'Perfect! "You" always goes with "Do".',
                    feedback_correct_es: '"You" siempre va con "Do".',
                    feedback_incorrect: '"You" uses "Do": Do you like coffee? "Does" is for he/she/it.',
                    feedback_incorrect_es: '"You" usa "Do": Do you like coffee? "Does" es para he/she/it.',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L2-E02',
                    type: 'fill_blank',
                    instruction: 'Complete the question with "Do" or "Does".',
                    instruction_es: 'Completa la pregunta con "Do" o "Does".',
                    question: '___ she speak English?',
                    sentence: '___ she speak English?',
                    options: ['Does', 'Do', 'Is', 'Are'],
                    correct_answer: 'Does',
                    feedback_correct: 'Right! "She" is third person singular → "Does".',
                    feedback_correct_es: '"She" es tercera persona singular → "Does".',
                    feedback_incorrect: 'For he/she/it, always use "Does": Does she speak English?',
                    feedback_incorrect_es: 'Para he/she/it, siempre usa "Does": Does she speak English?',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L2-E03',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct question.',
                    instruction_es: 'Elige la pregunta correcta.',
                    question: 'You want to ask if your friend\'s brother lives in New York. Which is correct?',
                    options: [
                        'Does your brother live in New York?',
                        'Does your brother lives in New York?',
                        'Do your brother live in New York?',
                        'Is your brother live in New York?',
                    ],
                    correct_answer: 'Does your brother live in New York?',
                    feedback_correct: 'Excellent! "Your brother" = he → "Does" + base verb "live" (not "lives").',
                    feedback_correct_es: '"Your brother" = he → "Does" + verbo base "live" (no "lives"). "Does" ya marca la tercera persona.',
                    feedback_incorrect: 'After "does", the verb is always in base form: Does your brother live... (NOT "lives").',
                    feedback_incorrect_es: 'Después de "does", el verbo siempre va en forma base: Does your brother live... (NO "lives").',
                    context: 'social',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L2-E04',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct short answer.',
                    instruction_es: 'Elige la respuesta corta correcta.',
                    question: 'Do you have a car? — ___',
                    options: [
                        'Yes, I do.',
                        'Yes, I have.',
                        'Yes, I do have.',
                        'Yes, I am.',
                    ],
                    correct_answer: 'Yes, I do.',
                    feedback_correct: 'Perfect! Short answers use only the auxiliary: "Yes, I do." Not the main verb.',
                    feedback_correct_es: 'Las respuestas cortas usan solo el auxiliar: "Yes, I do." No el verbo principal.',
                    feedback_incorrect: 'Short answers in English use only the auxiliary: "Yes, I do." Don\'t repeat the main verb.',
                    feedback_incorrect_es: 'Las respuestas cortas en inglés usan solo el auxiliar: "Yes, I do." No repitas el verbo principal.',
                    context: 'daily_life',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L2-E05',
                    type: 'multiple_choice',
                    instruction: 'Choose the correct short answer.',
                    instruction_es: 'Elige la respuesta corta correcta.',
                    question: 'Is she your sister? — No, ___',
                    options: [
                        'she isn\'t.',
                        'she doesn\'t.',
                        'she not.',
                        'she don\'t.',
                    ],
                    correct_answer: 'she isn\'t.',
                    feedback_correct: 'Correct! The question uses "Is" (to be), so the answer uses "isn\'t".',
                    feedback_correct_es: 'La pregunta usa "Is" (to be), así que la respuesta usa "isn\'t".',
                    feedback_incorrect: 'The question asks with "Is" (to be), so the short answer must use the same verb: "No, she isn\'t."',
                    feedback_incorrect_es: 'La pregunta usa "Is" (to be), así que la respuesta corta debe usar el mismo verbo: "No, she isn\'t."',
                    context: 'social',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L2-E06',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to form a question.',
                    instruction_es: 'Ordena las palabras para formar una pregunta.',
                    question: 'Form a question:',
                    words: ['you', 'Do', 'near', 'here', 'live', '?'],
                    correct_answer: ['Do', 'you', 'live', 'near', 'here', '?'],
                    feedback_correct: 'Do you live near here? Auxiliary first, then subject, then verb.',
                    feedback_correct_es: 'Do you live near here? Auxiliar primero, luego sujeto, luego verbo.',
                    feedback_incorrect: 'The order for yes/no questions is: Do + subject + base verb: "Do you live near here?"',
                    feedback_incorrect_es: 'El orden para preguntas de sí/no es: Do + sujeto + verbo base: "Do you live near here?"',
                    context: 'social',
                    difficulty: 1,
                },
                {
                    id: 'BQ-L2-E07',
                    type: 'reorder',
                    instruction: 'Put the words in the correct order to form a question.',
                    instruction_es: 'Ordena las palabras para formar una pregunta.',
                    question: 'Form a question:',
                    words: ['your', 'Does', 'travel', 'husband', 'for', 'work', '?'],
                    correct_answer: ['Does', 'your', 'husband', 'travel', 'for', 'work', '?'],
                    feedback_correct: 'Does your husband travel for work? "Does" + subject + base verb.',
                    feedback_correct_es: 'Does your husband travel for work? "Does" + sujeto + verbo base.',
                    feedback_incorrect: 'The order is: Does + your husband + travel + for work? Auxiliary first, then subject, then verb.',
                    feedback_incorrect_es: 'El orden es: Does + your husband + travel + for work? Auxiliar primero, luego sujeto, luego verbo.',
                    context: 'daily_life',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L2-E08',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: '¿Hablas español?',
                    correct_answer: 'Do you speak Spanish?',
                    feedback_correct: 'Do you speak Spanish? "Do" + subject + base verb for yes/no questions.',
                    feedback_correct_es: '"Do" + sujeto + verbo base para preguntas de sí/no.',
                    feedback_incorrect: 'Use "Do" to form the question: "Do you speak Spanish?" Remember the auxiliary!',
                    feedback_incorrect_es: 'Usa "Do" para formar la pregunta: "Do you speak Spanish?" Recuerda el auxiliar.',
                    context: 'travel',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L2-E09',
                    type: 'translate',
                    instruction: 'Translate to English.',
                    instruction_es: 'Traduce al inglés.',
                    question: '¿Están listos para salir?',
                    correct_answer: 'Are you ready to go?',
                    feedback_correct: 'Are you ready to go? With "to be", just invert: Are + you + adjective.',
                    feedback_correct_es: 'Con "to be", simplemente invierte: Are + you + adjetivo. No se necesita "do".',
                    feedback_incorrect: '"Ready" is an adjective used with "to be": Are you ready to go? (not "Do you ready").',
                    feedback_incorrect_es: '"Ready" es un adjetivo que se usa con "to be": Are you ready to go? (no "Do you ready").',
                    context: 'daily_life',
                    difficulty: 2,
                },
                {
                    id: 'BQ-L2-E10',
                    type: 'fill_blank',
                    instruction: 'Choose the correct short answer.',
                    instruction_es: 'Elige la respuesta corta correcta.',
                    question: 'Does your mother work? — No, ___',
                    sentence: 'Does your mother work? — No, ___',
                    options: ["she doesn't.", "she don't.", "she isn't.", "she not work."],
                    correct_answer: "she doesn't.",
                    feedback_correct: 'Great! The question uses "Does" → the short answer uses "doesn\'t".',
                    feedback_correct_es: 'La pregunta usa "Does" → la respuesta corta usa "doesn\'t".',
                    feedback_incorrect: 'Match the auxiliary: "Does" in the question → "doesn\'t" in the negative answer. "No, she doesn\'t."',
                    feedback_incorrect_es: 'El auxiliar debe coincidir: "Does" en la pregunta → "doesn\'t" en la respuesta negativa. "No, she doesn\'t."',
                    context: 'daily_life',
                    difficulty: 2,
                },
            ],
        },
    ],
};
