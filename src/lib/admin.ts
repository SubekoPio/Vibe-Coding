import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const ADMIN_PATH = path.join(process.cwd(), "src/data/admin.json");

export interface AdminData {
  passwordHash: string;
  resetToken: string | null;
  resetTokenExpires: string | null;
}

const DEFAULT_ADMIN: AdminData = {
  passwordHash: "",
  resetToken: null,
  resetTokenExpires: null,
};

async function readAdmin(): Promise<AdminData> {
  try {
    const raw = await fs.readFile(ADMIN_PATH, "utf-8");
    return { ...DEFAULT_ADMIN, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_ADMIN };
  }
}

async function writeAdmin(data: AdminData): Promise<void> {
  await fs.mkdir(path.dirname(ADMIN_PATH), { recursive: true });
  await fs.writeFile(ADMIN_PATH, JSON.stringify(data, null, 2), "utf-8");
}

async function ensurePasswordHash(): Promise<string> {
  const admin = await readAdmin();
  if (admin.passwordHash) return admin.passwordHash;

  const plain = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(plain, 12);
  await writeAdmin({ ...admin, passwordHash });
  return passwordHash;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = await ensurePasswordHash();
  return bcrypt.compare(password, hash);
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  if (newPassword.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }

  const valid = await verifyAdminPassword(currentPassword);
  if (!valid) return { ok: false, error: "Current password is incorrect" };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  const admin = await readAdmin();
  await writeAdmin({
    ...admin,
    passwordHash,
    resetToken: null,
    resetTokenExpires: null,
  });
  return { ok: true };
}

export async function createPasswordResetToken(): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const admin = await readAdmin();
  await writeAdmin({
    ...admin,
    resetToken: token,
    resetTokenExpires: expires,
  });
  return token;
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  if (newPassword.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }

  const admin = await readAdmin();
  if (!admin.resetToken || admin.resetToken !== token) {
    return { ok: false, error: "Invalid or expired reset link" };
  }
  if (!admin.resetTokenExpires || new Date(admin.resetTokenExpires) < new Date()) {
    return { ok: false, error: "Reset link has expired" };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await writeAdmin({
    passwordHash,
    resetToken: null,
    resetTokenExpires: null,
  });
  return { ok: true };
}

export function buildResetUrl(token: string, origin: string): string {
  return `${origin}/admin/reset-password?token=${token}`;
}
