// Ensure global navigator exists before jest-expo mutates it.
if (typeof navigator === 'undefined') {
  (global as any).navigator = {};
}
