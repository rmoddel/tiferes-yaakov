type EmailEnvConfig = {
  apiUrl: string;
  apiSecret: string;
  from: string;
  to: string;
  missingKeys: string[];
};

type TurnstileEnvConfig = {
  siteKey: string;
  isConfigured: boolean;
};

export function getEmailEnvConfig(): EmailEnvConfig {
  const apiUrl = import.meta.env.VITE_EMAIL_API_URL?.trim() ?? "";
  const apiSecret = import.meta.env.VITE_EMAIL_API_SECRET?.trim() ?? "";
  const from = import.meta.env.VITE_EMAIL_FROM?.trim() ?? "";
  const to = import.meta.env.VITE_EMAIL_TO?.trim() ?? "";

  const required = [
    { key: "VITE_EMAIL_API_URL", value: apiUrl },
    { key: "VITE_EMAIL_API_SECRET", value: apiSecret },
    { key: "VITE_EMAIL_FROM", value: from },
    { key: "VITE_EMAIL_TO", value: to },
  ];

  return {
    apiUrl,
    apiSecret,
    from,
    to,
    missingKeys: required.filter((item) => !item.value).map((item) => item.key),
  };
}

export function getTurnstileEnvConfig(): TurnstileEnvConfig {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";

  return {
    siteKey,
    isConfigured: Boolean(siteKey),
  };
}
