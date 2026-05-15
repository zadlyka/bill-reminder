// src/features/bills/components/BillCard/swipeConstants.ts
//
// 🆕 FILE BARU
// Semua magic number untuk swipe system diekstrak ke sini.
// Import dari BillCardSwipe, SwipeActionLeft, SwipeActionRight.
//

// ─── Trigger thresholds ───────────────────────────────────────────────────────

/** Jarak px minimum agar swipe action ter-trigger */
export const ACTION_TRIGGER = 120;

/** Velocity px/s minimum untuk fast-flick trigger (tanpa harus mencapai jarak) */
export const VELOCITY_TRIGGER = 900;

/** Jarak px swipe minimum sebelum velocity dihitung (cegah micro-flick) */
export const VELOCITY_MIN_DISTANCE = 20;

// ─── Translation limits ───────────────────────────────────────────────────────

/** Batas maksimum card bisa bergerak (resistance curve) */
export const MAX_TRANSLATE = 180;

/** Input range untuk resistance curve */
export const RESISTANCE_INPUT = [-300, -150, 0, 150, 300] as const;

/** Output range untuk resistance curve */
export const RESISTANCE_OUTPUT = [-180, -110, 0, 110, 180] as const;

// ─── Gesture config ───────────────────────────────────────────────────────────

/** Threshold horizontal sebelum gesture aktif (cegah konflik tap) */
export const ACTIVE_OFFSET_X = [-20, 20] as const;

/** Threshold vertikal — jika melebihi ini, gesture diserahkan ke ScrollView */
export const FAIL_OFFSET_Y = [-10, 10] as const;

// ─── Spring config ────────────────────────────────────────────────────────────

export const SPRING_SNAP = {
  damping: 18,
  stiffness: 220,
  mass: 0.7,
} as const;

export const SPRING_CANCEL = {
  damping: 20,
  stiffness: 300,
  mass: 0.8,
} as const;

// ─── Animation durations ──────────────────────────────────────────────────────

/** Durasi animasi delete (collapse card) */
export const DELETE_DURATION = 200;

/** Durasi animasi paid (scale + fade) */
export const PAID_DURATION = 250;

/** Durasi swipe hint onboarding */
export const HINT_DURATION = 250;

/** Jarak px untuk swipe hint preview */
export const HINT_DISTANCE = 40;

/** Delay antar step hint animation (ms) */
export const HINT_STEP_DELAY = 350;

// ─── Action reveal ────────────────────────────────────────────────────────────

/** translateX di mana action background mulai muncul */
export const REVEAL_START = 0;

/** translateX di mana action background fully visible */
export const REVEAL_FULL = 60;

/** translateX di mana icon scale = 1.0 */
export const ICON_SCALE_FULL = 80;

// ─── Card depth ───────────────────────────────────────────────────────────────

export const DEPTH_SCALE_MIN = 0.97;
export const DEPTH_SHADOW_OPACITY_MIN = 0.1;
export const DEPTH_SHADOW_OPACITY_MAX = 0.25;
export const DEPTH_SHADOW_RADIUS_MIN = 6;
export const DEPTH_SHADOW_RADIUS_MAX = 14;
export const DEPTH_TRANSLATE_RANGE = 140;
export const DEPTH_SHADOW_RANGE = 120;

// ─── Card UI ──────────────────────────────────────────────────────────────────

export const CARD_RADIUS = 20;
export const ICON_CONTAINER_RADIUS = 14;
