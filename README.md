# Vexunori

**Private by design. Connected by choice.**

Vexunori is a private messenger with built-in tools for working together.
Chat with friends, family or a team, keep your own notes and files locked away, and stay in control of what leaves your phone.

👉 **Try it in your browser:** https://william-lindberg.github.io/vexunori/app/
👉 **Get the Android app:** [Download the APK](https://github.com/William-Lindberg/vexunori/releases/latest) (not on Google Play)
👉 **Website:** https://william-lindberg.github.io/vexunori/

---

## What you can do with it

- **Chat privately.** One-to-one and group chats, encrypted on your device before they are sent. Replies, reactions, editing, deleting, photos and files, and messages that disappear after a set time.
- **No phone number, no account.** Your identity is a key created on your own device. You add people by sharing an invite link or QR code.
- **Work together in groups.** Every group has a shared space for tasks, to-do lists, polls, notes, events and links, right next to the chat.
- **Keep things private in the Vault.** An encrypted place on your device for notes, links, photos and documents. Sort them into Spaces such as *Personal*, *Research* and *Sensitive*.
- **Check before you share.** SendGuard shows hidden information in a file (like the GPS location in a photo) and can remove it. Links are checked before they open.
- **See what happened.** The Privacy Center shows your privacy settings in plain words and keeps a private log on your device of what you shared or exported.
- **Use Morse code.** Translate text and Morse, tap out messages, and play them as sound, light or vibration.
- **Stay in touch without internet.** Hand over messages by QR code or as a file (for example over Bluetooth with Android's share menu), or through a relay on your local Wi-Fi.
- **Lock it fast.** A passphrase lock, auto-lock, and an Emergency Freeze button.

No ads, no trackers, no AI features.

## How private is it?

- Messages are end-to-end encrypted using the open Nostr NIP-17 standard. The relays that carry them cannot read them or see who sent them.
- Relays can still see *who receives* a message, when, and how big it is, plus your IP address. Using Tor (experimental, Android with Orbot) hides your IP address.
- Your data on the phone is encrypted. With a strong passphrase, it stays unreadable while the app is locked.
- There is no forward secrecy yet, and Vexunori has **not** had an independent security audit.

Read the [security page](https://william-lindberg.github.io/vexunori/security.html) for the full details.

## How it compares

✅ available · 🧪 experimental · ◐ partly · ❌ not available

| Feature | **Vexunori** | Signal | SimpleX Chat | Briar |
|---|:---:|:---:|:---:|:---:|
| End-to-end encrypted messaging | ✅ | ✅ | ✅ | ✅ |
| Group messaging | ✅ | ✅ | ✅ | ◐ |
| Voice and video calls | 🧪 1:1 only | ✅ | ✅ | ❌ |
| Disappearing messages | ✅ | ✅ | ✅ | ◐ 1:1 only |
| Tor connectivity | 🧪 Android | ❌ | ✅ | ✅ |
| Offline messaging over Bluetooth | ◐ via file sharing | ❌ | ❌ | ✅ |
| Local Wi-Fi communication | 🧪 local relay | ❌ | ❌ | ✅ |
| Morse code tools (text, sound, light, vibration) | ✅ | ❌ | ❌ | ❌ |
| Encrypted Vault | ✅ | ❌ | ◐ | ◐ |
| Private notes and saved links | ✅ | ◐ | ◐ | ◐ |
| File metadata check before sharing | ✅ | ◐ photos | ❌ | ❌ |
| Link check before opening | ✅ | ❌ | ❌ | ❌ |
| Privacy log of shares and exports | ✅ | ❌ | ❌ | ❌ |
| Spaces (Personal, Research, Sensitive) | ✅ | ❌ | ❌ | ❌ |
| Privacy Bridge and Passports | ✅ | ❌ | ❌ | ❌ |
| Group tasks and to-do lists | ✅ | ❌ | ❌ | ❌ |
| Shared notes, polls and events | ✅ | ◐ polls | ❌ | ◐ |
| Privacy Center with health check | ✅ | ❌ | ❌ | ❌ |
| Works in a web browser | ✅ | ❌ | ❌ | ❌ |
| Android app | ✅ APK | ✅ | ✅ | ✅ |
| Open source | ❌ | ✅ | ✅ | ✅ |
| Run your own server | ◐ any Nostr relay | ❌ | ✅ | ◐ |
| No AI features | ✅ | ✅ | ✅ | ✅ |

Other apps change over time. This table reflects our understanding in October 2026; check each project's own site for the latest.

## Good to know before you start

- **Version 0.1.0.** The Android app has been built and checked, but not yet tested on many real phones.
- **Notifications** only arrive while Vexunori is running. There is no push service.
- **Calls, Tor and local Wi-Fi** are experimental. Calls are off by default because they show your IP address to the other person.
- **Add people with an invite link.** Contacts added by key only may not receive your messages.
- **Back up.** If you lose your phone and your passphrase without a backup, your identity and messages cannot be recovered.

## Licence

Vexunori is **free to use, but not open source**. The source code is not published. See [LICENSE](LICENSE).
The open-source libraries Vexunori uses are listed on the [Licence page](https://william-lindberg.github.io/vexunori/source.html).
