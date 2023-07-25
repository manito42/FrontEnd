export function setTokenCookie(token: string) {
  const expires = new Date(Date.now() + 864e5).toUTCString(); // 1 day
  const domain = new URL(process.env.NEXT_PUBLIC_DEV_URL as string).hostname;
  console.log(domain);
  document.cookie = `Authentication=${encodeURIComponent(
    token
  )}; expires=${expires}; path=/; SameSite=Lax`;
}
