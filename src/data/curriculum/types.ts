/**
 * types.ts
 *
 * Type definitions for the structured curriculum content.
 * Designed for easy serialization to/from a database.
 */

// ─── Exercise Types ──────────────────────────────────────────────────────────

export type ExerciseType =
    | 'multiple_choice'
    | 'fill_blank'
    | 'matching'
    | 'true_false'
    | 'reorder'
    | 'translate';

export type ContextTag = 'work' | 'travel' | 'social' | 'daily_life' | 'general';

export interface ExerciseOption {
    label: string;
    value: string;
}

export interface Exercise {
    id: string;
    type: ExerciseType;
    instruction: string;
    instruction_es: string;
    question: string;
    /** For fill_blank: the sentence with ___ placeholder */
    sentence?: string;
    /** For multiple_choice / fill_blank options */
    options?: string[];
    /** For matching: pairs to connect */
    pairs?: { left: string; right: string }[];
    /** For reorder: shuffled words */
    words?: string[];
    /** The correct answer (string for single, string[] for reorder/matching) */
    correct_answer: string | string[];
    feedback_correct: string;
    feedback_correct_es: string;
    feedback_incorrect: string;
    feedback_incorrect_es: string;
    context: ContextTag;
    difficulty: 1 | 2 | 3;
}

// ─── Grammar Tables ──────────────────────────────────────────────────────────

export interface GrammarRow {
    subject: string;
    verb: string;
    contraction?: string;
    example: string;
    example_es: string;
}

export interface GrammarTable {
    title: string;
    title_es: string;
    structure: string;
    rows: GrammarRow[];
}

// ─── Vocabulary Bank ─────────────────────────────────────────────────────────

export interface VocabItem {
    en: string;
    es: string;
    example: string;
    example_es: string;
}

export interface VocabBank {
    category: string;
    category_es: string;
    items: VocabItem[];
}

// ─── Lesson Structure ────────────────────────────────────────────────────────

export interface Lesson {
    id: string;
    order: number;
    slug: string;
    title: string;
    title_es: string;
    description: string;
    description_es: string;
    /** Estimated minutes to complete */
    estimated_minutes: number;
    theory: {
        explanation_es: string;
        key_points: string[];
        key_points_es: string[];
        grammar_tables: GrammarTable[];
        tips: string[];
        tips_es: string[];
        common_mistakes?: { wrong: string; correct: string; why_es: string }[];
    };
    vocab_banks?: VocabBank[];
    exercises: Exercise[];
}

// ─── Course Module ───────────────────────────────────────────────────────────

export interface CourseModule {
    id: string;
    slug: string;
    title: string;
    title_es: string;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    description: string;
    description_es: string;
    lessons: Lesson[];
}
