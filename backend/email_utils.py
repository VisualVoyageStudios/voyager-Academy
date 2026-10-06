import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_LOGIN = os.getenv("SMTP_LOGIN")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", SMTP_LOGIN)
SMTP_FROM_NAME = os.getenv("SMTP_FROM_NAME", "Voyager Academy")


def send_email(to_email: str, subject: str, html_body: str) -> bool:
    if not all([SMTP_HOST, SMTP_LOGIN, SMTP_PASSWORD, SMTP_FROM_EMAIL]):
        print(f"[email] SMTP not configured — would have sent '{subject}' to {to_email}")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{SMTP_FROM_NAME} <{SMTP_FROM_EMAIL}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_LOGIN, SMTP_PASSWORD)
            server.sendmail(SMTP_FROM_EMAIL, [to_email], msg.as_string())
        return True
    except Exception as e:
        print(f"[email] Failed to send to {to_email}: {e}")
        return False


def send_password_reset_email(to_email: str, reset_url: str):
    html = f"""
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
      <h2 style="color:#111114;">Reset your Voyager Academy password</h2>
      <p style="color:#6b6b72;">Click the button below to choose a new password. This link expires in 1 hour.</p>
      <a href="{reset_url}" style="display:inline-block;background:#c8102e;color:#fff;padding:12px 24px;
         border-radius:8px;text-decoration:none;font-weight:bold;margin:16px 0;">Reset Password</a>
      <p style="color:#9a9aa0;font-size:0.85rem;">If you didn't request this, you can safely ignore this email.</p>
    </div>
    """
    send_email(to_email, "Reset your Voyager Academy password", html)