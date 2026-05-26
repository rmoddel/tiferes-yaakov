import { getEmailEnvConfig } from "./env";

type SendMessageInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  optIn: "yes" | "no";
};

export async function sendMessage({ name, email, phone, message, optIn }: SendMessageInput) {
  const { apiUrl, apiSecret, from, to, missingKeys } = getEmailEnvConfig();

  if (missingKeys.length > 0) {
    return {
      ok: false,
      error: import.meta.env.DEV
        ? `Email service is not configured. Missing: ${missingKeys.join(", ")}. Check .env.local and restart Vite.`
        : "Email service is not configured. Please contact the administrator.",
    };
  }

  try {
    const subject = `Congregation Tiferes Yaakov. From ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "(Not provided)"}`,
      `Text message opt-in: ${optIn === "yes" ? "Yes" : "No"}`,
      "",
      "Message:",
      message || "(No message provided)",
    ].join("\n");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiSecret}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: errorData.message || errorData.error || "Failed to send message. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
