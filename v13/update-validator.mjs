/* IFSI Quiz V13 — experimental manifest validation, no production activation. */
export function validateManifest(m, {channel = "test", appVersionCode = 13, bankVersion = 38} = {}) {
  if (!m || typeof m !== "object" || Array.isArray(m)) throw Error("Manifeste invalide");
  if (m.schema_version !== 2) throw Error("Schéma non pris en charge");
  if (m.channel !== channel) throw Error("Canal incompatible");
  const a = m.app, b = m.question_bank;
  if (!a || !b || !Number.isSafeInteger(a.version_code) || a.version_code < 1 ||
      !Number.isSafeInteger(b.version) || b.version < 1 ||
      !Number.isSafeInteger(b.minimum_app_version_code) || b.minimum_app_version_code < 1)
    throw Error("Versions invalides");
  const appUpdate = a.version_code > appVersionCode;
  const bankUpdate = b.version > bankVersion && b.minimum_app_version_code <= appVersionCode;
  if (bankUpdate) {
    if (!Number.isSafeInteger(b.question_count) || b.question_count < 1 ||
        typeof b.file !== "string" || !/^https:\/\//.test(b.file) ||
        !/^[a-f0-9]{64}$/i.test(b.sha256 || "") ||
        !b.signature || typeof b.signature !== "string")
      throw Error("Métadonnées de banque incomplètes");
  }
  if (appUpdate && (typeof a.release_url !== "string" ||
      !/^https:\/\//.test(a.release_url) || !/^[a-f0-9]{64}$/i.test(a.sha256 || "") ||
      typeof a.signature !== "string" || !a.signature))
    throw Error("Métadonnées APK incomplètes");
  return {appUpdate, bankUpdate, bankBlockedByApp: b.version > bankVersion &&
    b.minimum_app_version_code > appVersionCode};
}
export async function verifySha256(bytes, expectedHex) {
  if (!/^[a-f0-9]{64}$/i.test(expectedHex || "")) throw Error("Empreinte invalide");
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2,"0")).join("");
  return hex === expectedHex.toLowerCase();
}
export function validateQuestionBank(bank, expectedCount) {
  if (!bank || !Array.isArray(bank.questions) ||
      !Number.isSafeInteger(expectedCount) || bank.questions.length !== expectedCount)
    throw Error("Nombre de questions incohérent");
  const ids = new Set();
  for (const q of bank.questions) {
    if (!q || typeof q.id !== "string" || !q.id.trim() || ids.has(q.id) ||
        typeof q.q !== "string" || !q.q.trim() ||
        !Array.isArray(q.a) || q.a.length !== 4 ||
        q.a.some(x => typeof x !== "string" || !x.trim()) ||
        !Number.isInteger(q.ok) || q.ok < 0 || q.ok > 3)
      throw Error("Question invalide ou dupliquée");
    ids.add(q.id);
  }
  return true;
}
/* Before activation, verify a detached signature over a canonical signed payload
   with a pinned public key, and perform atomic write + rollback in native Android.
   This module intentionally does NOT implement or claim those steps. */
