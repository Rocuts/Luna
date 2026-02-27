/**
 * curriculumTools.ts
 *
 * Funciones puras de búsqueda en el currículo para usar como tools
 * de la OpenAI Realtime API. Luna llama estas funciones durante la
 * conversación de voz para acceder a ejercicios, vocabulario y
 * tablas gramaticales del currículo estructurado.
 *
 * Todas las funciones devuelven datos serializables a JSON.
 * No requieren API calls ni base de datos — buscan en los módulos
 * importados estáticamente.
 */

import type {
    CourseModule,
    Exercise,
    VocabItem,
    GrammarTable,
} from '../data/curriculum/types';

// ── Importar todos los cursos disponibles ────────────────────────────────────

import {
    verbToBeCourse,
    greetingsCourse,
    dailyRoutinesCourse,
    basicQuestionsCourse,
} from '../data/curriculum';

// Registro central de todos los cursos — añadir nuevos módulos aquí
const ALL_COURSES: CourseModule[] = [
    verbToBeCourse,
    greetingsCourse,
    dailyRoutinesCourse,
    basicQuestionsCourse,
];

// ── Índices para búsqueda rápida ─────────────────────────────────────────────

// Mapa de exercise_id → Exercise para validación rápida de respuestas
const exerciseIndex = new Map<string, Exercise>();

for (const course of ALL_COURSES) {
    for (const lesson of course.lessons) {
        for (const exercise of lesson.exercises) {
            exerciseIndex.set(exercise.id, exercise);
        }
    }
}

// ── Funciones públicas (tools) ───────────────────────────────────────────────

/**
 * Busca un ejercicio del currículo por tema y dificultad.
 * Luna usa esto para presentar ejercicios reales en vez de inventarlos.
 */
export function getExercise(
    topic?: string,
    difficulty?: number,
    level?: string,
): {
    exercise: Omit<Exercise, 'correct_answer'> | null;
    course_title: string;
    lesson_title: string;
} {
    const matchingCourses = ALL_COURSES.filter((c) => {
        if (level && c.level !== level.toUpperCase()) return false;
        if (topic) {
            const t = topic.toLowerCase();
            return (
                c.slug.includes(t) ||
                c.title.toLowerCase().includes(t) ||
                c.id.toLowerCase().includes(t)
            );
        }
        return true;
    });

    if (matchingCourses.length === 0) {
        return { exercise: null, course_title: '', lesson_title: '' };
    }

    // Buscar ejercicios que coincidan con la dificultad
    for (const course of matchingCourses) {
        for (const lesson of course.lessons) {
            const exercises = difficulty
                ? lesson.exercises.filter((e) => e.difficulty === difficulty)
                : lesson.exercises;

            if (exercises.length > 0) {
                // Seleccionar uno aleatorio para variedad
                const exercise = exercises[Math.floor(Math.random() * exercises.length)];
                // No enviar la respuesta correcta a Luna — ella debe usar check_answer
                const { correct_answer: _, ...exerciseWithoutAnswer } = exercise;
                return {
                    exercise: exerciseWithoutAnswer,
                    course_title: course.title,
                    lesson_title: lesson.title,
                };
            }
        }
    }

    return { exercise: null, course_title: '', lesson_title: '' };
}

/**
 * Valida la respuesta del usuario contra la respuesta correcta del currículo.
 * Devuelve feedback estructurado bilingüe.
 */
export function checkAnswer(
    exerciseId: string,
    userAnswer: string,
): {
    found: boolean;
    correct: boolean;
    feedback: string;
    feedback_es: string;
    correct_answer?: string | string[];
} {
    const exercise = exerciseIndex.get(exerciseId);
    if (!exercise) {
        return {
            found: false,
            correct: false,
            feedback: 'Exercise not found.',
            feedback_es: 'Ejercicio no encontrado.',
        };
    }

    const normalize = (s: string) => s.toLowerCase().trim().replace(/[.,!?;:'"]/g, '');
    const userNorm = normalize(userAnswer);

    let correct: boolean;
    if (Array.isArray(exercise.correct_answer)) {
        // Para reorder/matching, comparar arrays
        correct = exercise.correct_answer
            .map(normalize)
            .every((a, i) => {
                const userParts = userNorm.split(/\s+/);
                return userParts[i] === a;
            });
    } else {
        correct = normalize(exercise.correct_answer) === userNorm;
    }

    return {
        found: true,
        correct,
        feedback: correct ? exercise.feedback_correct : exercise.feedback_incorrect,
        feedback_es: correct ? exercise.feedback_correct_es : exercise.feedback_incorrect_es,
        correct_answer: correct ? undefined : exercise.correct_answer,
    };
}

/**
 * Obtiene un banco de vocabulario por categoría.
 */
export function getVocabulary(
    category?: string,
    level?: string,
): { items: VocabItem[]; category: string; category_es: string } | null {
    const courses = level
        ? ALL_COURSES.filter((c) => c.level === level.toUpperCase())
        : ALL_COURSES;

    for (const course of courses) {
        for (const lesson of course.lessons) {
            if (!lesson.vocab_banks) continue;
            for (const bank of lesson.vocab_banks) {
                if (!category) return bank;
                const cat = category.toLowerCase();
                if (
                    bank.category.toLowerCase().includes(cat) ||
                    bank.category_es.toLowerCase().includes(cat)
                ) {
                    return bank;
                }
            }
        }
    }

    return null;
}

/**
 * Obtiene una tabla gramatical por concepto.
 */
export function getGrammarTable(
    concept?: string,
): GrammarTable | null {
    for (const course of ALL_COURSES) {
        for (const lesson of course.lessons) {
            for (const table of lesson.theory.grammar_tables) {
                if (!concept) return table;
                const c = concept.toLowerCase();
                if (
                    table.title.toLowerCase().includes(c) ||
                    table.title_es.toLowerCase().includes(c) ||
                    table.structure.toLowerCase().includes(c)
                ) {
                    return table;
                }
            }
        }
    }

    return null;
}

/**
 * Lista todos los temas disponibles en el currículo para un nivel dado.
 */
export function listAvailableTopics(
    level?: string,
): { topic: string; description: string; level: string }[] {
    const courses = level
        ? ALL_COURSES.filter((c) => c.level === level.toUpperCase())
        : ALL_COURSES;

    return courses.map((c) => ({
        topic: c.slug,
        description: c.title,
        level: c.level,
    }));
}

/**
 * Registra nuevos cursos en el índice. Llamar después de importar
 * cursos adicionales para que las funciones de búsqueda los encuentren.
 */
export function registerCourse(course: CourseModule): void {
    ALL_COURSES.push(course);
    for (const lesson of course.lessons) {
        for (const exercise of lesson.exercises) {
            exerciseIndex.set(exercise.id, exercise);
        }
    }
}
