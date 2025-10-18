// utils/verification.js (ESM)
// Generates a cryptographically strong 6-digit numeric code as a string
// Range: 000000 - 999999 (zero-padded)
import crypto from 'crypto';

export function generateVerificationCode() {
	// Generate 4 random bytes and map to 0..999999 uniformly
	// Using modulo bias is acceptable here because 2^32 is divisible enough for this range,
	// but we'll do rejection sampling to be precise and avoid bias.
	const MAX = 1_000_000; // 6 digits
	const LIMIT = Math.floor(0xffffffff / MAX) * MAX; // highest multiple of MAX below 2^32

	let rnd;
	do {
		const buf = crypto.randomBytes(4); // 32-bit unsigned
		rnd = buf.readUInt32BE(0);
	} while (rnd >= LIMIT);

	const code = (rnd % MAX).toString().padStart(6, '0');
	return code;
}

export default generateVerificationCode;
