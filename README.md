# Vexunori

**Private by design. Connected by choice.**

Vexunori is a private messenger with built-in tools for working together.
Chat with friends, family or a team, keep your own notes and files locked away, and stay in control of what leaves your phone.

👉 **Try it in your browser:** https://william-lindberg.github.io/vexunori/app/
👉 **Get the Android app:** [Download the APK](https://github.com/William-Lindberg/vexunori/releases/latest) (not on Google Play)
👉 **Website:** https://william-lindberg.github.io/vexunori/

> ⚠️ **Vexunori is experimental.** It is new, has not had an independent security audit, and the Android app has not yet been tested on many real phones. You will probably run into bugs.
> **Please report them:** [open an issue](https://github.com/William-Lindberg/vexunori/issues/new) and say what you did, what happened, your phone or browser, and the Vexunori version (Settings → About). Never include your secret key, passphrase or private messages in a report.
> Don't rely on Vexunori alone for anything where your safety depends on it.

---

## What you can do with it

- **Chat privately.** One-to-one and group chats, encrypted on your device before they are sent. Replies, reactions, editing, deleting, photos, files and stickers, messages that disappear after a set time, view-once photos, and messages you schedule for later.
- **No phone number, no account.** Your identity is a key created on your own device. You add people with an invite link or QR code, and invite them to groups with a group link.
- **Work together in groups.** Every group has a shared space for tasks, to-do lists, polls, events, links and notes you can edit together.
- **Keep things private in the Vault.** An encrypted place on your device for notes, links, photos and documents, sorted into Spaces such as *Personal*, *Research* and *Sensitive*.
- **Check before you share.** SendGuard shows hidden information in a file (like the GPS location in a photo) and can remove it. Links are checked before they open.
- **Browse privately (Android).** A built-in Private Browser that goes through Tor, with protection against tracking by device fingerprint.
- **Hide it if you need to.** A hidden second profile behind its own PIN, a disguised app icon (for example a calculator), shake-to-lock and an Emergency Freeze button.
- **Use Morse code.** Translate, tap out and play Morse as sound, light or vibration — including **Secret Morse** (a new code for every message that only you and your contact can decode) and WW2-style one-time-pad encryption.
- **Stay in touch without internet.** Hand over messages by QR code or as a file, or through a relay on your local Wi-Fi.

No ads and no trackers.

## How your messages travel

1. You write a message. **Your phone encrypts it** for the person (or each group member) before it leaves the device.
2. The encrypted message is sent to a few **relays**. Relays are simple, free servers run by different people and communities around the world (Vexunori uses nos.lol, relay.primal.net, offchain.pub and nostr.mom by default, and you can add your own). They store and pass on messages; they cannot read them.
3. **The recipient's app fetches it** from those relays and decrypts it on their phone. If they are offline, the relays keep it until they come back.
4. Your app shows honest status: *sent to relays* (a relay accepted it), *delivered* (their device confirmed it), *read* (only if they turned read receipts on).

There is no central Vexunori server. If one relay is down or blocks you, your messages go through the others. Without internet you can pass messages phone-to-phone with a QR code or a file.

## How your messages are secured

- **End-to-end encryption.** Messages use the open, published Nostr standard NIP-17 (NIP-44 encryption with "gift wrapping"). Only the people in the chat can read them — not the relays, not your internet provider, not us.
- **Sender hidden from relays.** Each message is wrapped in an extra envelope signed with a throw-away key, so relays can't see who sent it, and its timestamp is randomised.
- **Every message is checked.** Your app verifies the signatures, so nobody can forge a message from one of your contacts.
- **Verify your contacts.** Compare safety numbers (or scan each other's QR code) to be sure you're talking to the right person.
- **Encrypted on your phone too.** Everything Vexunori stores on your device is encrypted with a key protected by your passphrase or PIN, using Argon2id so guessing it is slow and expensive.
- **Hide your IP address (Android).** Turn on built-in Tor and your connection to the relays goes through Tor.

**What it does not protect:**
- Relays can see *which key* receives a message, when, and its size, plus your IP address unless you use Tor.
- No forward secrecy yet: if someone steals your secret key, old messages still stored on relays could be decrypted.
- A message is only as safe as the phones at both ends.
- No independent security audit has been done.

Full details: [security page](https://william-lindberg.github.io/vexunori/security.html).

## How it compares

✅ available · 🧪 experimental (built, not yet proven on real phones) · ◐ partly · ❌ not available

| Feature | **Vexunori** | Signal | SimpleX Chat | Briar |
|---|:---:|:---:|:---:|:---:|
| End-to-end encrypted messaging | ✅ | ✅ | ✅ | ✅ |
| Group messaging | ✅ | ✅ | ✅ | ◐ |
| Group invite links and QR codes | ✅ | ✅ | ✅ | ❌ |
| Disappearing messages | ✅ | ✅ | ✅ | ◐ 1:1 only |
| View-once photos | 🧪 | ✅ | ❌ | ❌ |
| Scheduled messages and reminders | ◐ while app runs | ❌ | ❌ | ❌ |
| Voice and video calls | 🧪 1:1 only | ✅ | ✅ | ❌ |
| Tor connectivity | 🧪 built in (Android) | ❌ | ✅ | ✅ |
| Built-in private browser over Tor (anti-fingerprinting) | 🧪 Android | ❌ | ❌ | ❌ |
| Hidden second profile | ✅ | ❌ | ✅ | ❌ |
| Disguised app icon | 🧪 Android | ❌ | ❌ | ❌ |
| Offline messaging over Bluetooth | ◐ via file sharing | ❌ | ❌ | ✅ |
| Local Wi-Fi communication | 🧪 local relay | ❌ | ❌ | ✅ |
| Move to a new device with history | 🧪 | ✅ | ✅ | ❌ |
| Morse code tools (text, sound, light, vibration) | ✅ | ❌ | ❌ | ❌ |
| Secret Morse (new code every message, only you two can decode) | ✅ 1:1 chats | ❌ | ❌ | ❌ |
| Tap-to-reveal, secret phrase and burn-after-reading for Secret Morse | ✅ | ❌ | ❌ | ❌ |
| 24-word recovery phrase | ✅ | ❌ | ❌ | ❌ |
| Fingerprint unlock | 🧪 Android | ✅ | ✅ | ❌ |
| One-time-pad Morse encryption | ✅ | ❌ | ❌ | ❌ |
| VPN check in the app | 🧪 Android | ❌ | ❌ | ❌ |
| Encrypted Vault | ✅ | ❌ | ◐ | ◐ |
| File metadata check before sharing | ✅ | ◐ photos | ❌ | ❌ |
| Link check before opening | ✅ | ❌ | ❌ | ❌ |
| Privacy log of shares and exports | ✅ | ❌ | ❌ | ❌ |
| Spaces (Personal, Research, Sensitive) | ✅ | ❌ | ❌ | ❌ |
| Privacy Bridge and Passports | ✅ | ❌ | ❌ | ❌ |
| Group tasks and to-do lists | ✅ | ❌ | ❌ | ❌ |
| Notes you edit together | ✅ | ❌ | ❌ | ❌ |
| Polls and events | ✅ | ◐ polls | ❌ | ◐ |
| Privacy Center with health check | ✅ | ❌ | ❌ | ❌ |
| Works in a web browser | ✅ | ❌ | ❌ | ❌ |
| Android app | ✅ APK | ✅ | ✅ | ✅ |
| Run your own server | ◐ any Nostr relay | ❌ | ✅ | ◐ |

Other apps change over time. This table reflects our understanding in October 2026; check each project's own site for the latest.

## Good to know before you start

- **Version 1.3.0, experimental.** Built and tested with automated tests and in browsers, but the Android app has not yet been tested on many real phones. Features marked 🧪 are the least proven.
- **Notifications** only arrive while Vexunori is running. There is no push service.
- **The Private Browser is not Tor Browser.** It blocks many fingerprinting tricks, but the browser engine, fonts and TLS fingerprint can still identify it. For the strongest protection use the official Tor Browser.
- **Some relays refuse Tor connections.** If a relay shows an error while Tor is on, your messages still go through the relays that work.
- **Calls are off by default** because they show your IP address to the other person.
- **Invite links are still best.** Contacts added by key only are now reached through their published relay list, but the first message can take a little longer.
- **Back up.** If you lose your phone and your passphrase without a backup, your identity and messages cannot be recovered.

## Report a problem

Found a bug or something confusing? [Open an issue](https://github.com/William-Lindberg/vexunori/issues/new). Please include:
- what you did and what happened (screenshots help — but blur anything private),
- your phone model and Android version, or your browser,
- the Vexunori version (Settings → About).

Never post your secret key (nsec), passphrase, PIN, recovery shares or private messages.

## Licence

Vexunori is **free to use, but not open source**. The source code is not published. See [LICENSE](LICENSE).
The open-source libraries Vexunori uses are listed on the [Licence page](https://william-lindberg.github.io/vexunori/source.html).
