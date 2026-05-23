# ViSignAR

Ứng dụng mobile chuyển đổi **giọng nói tiếng Việt → ngôn ngữ ký hiệu Việt Nam (VSL) trong không gian AR**.

Người dùng nói vào microphone → OpenAI Whisper nhận dạng → tra từ điển VSL → AR scene (camera passthrough + clip ký hiệu overlay) phát clip ký hiệu chồng lên khung hình thực qua camera.

> Dự án INT3121-1 — UET 2026

---

## Stack

| Tầng | Công nghệ |
|---|---|
| Mobile shell | Expo SDK 54 + React Native 0.81 (TypeScript), bare workflow sau `expo prebuild` |
| Điều hướng | expo-router v6 |
| Ghi âm | expo-av |
| STT | OpenAI Whisper (`whisper-1`, `language: vi`) |
| AR rendering | `expo-camera` `CameraView` (camera passthrough background) + `expo-av` `Video` (sign clip overlay) |
| Sign clips | Pre-rendered VSL reference videos (mp4, 1200ms, 30fps) phát qua `expo-av` `Video` |
| Từ điển | JSON tĩnh, deterministic lookup |
| Build | Expo Application Services (EAS) |

---

## Cấu trúc thư mục

```
ViSignAR/
├── app/
│   ├── _layout.tsx           # Root layout, SafeAreaProvider, header
│   ├── index.tsx             # HomeScreen
│   ├── speech-to-sign.tsx    # Màn hình chính — toàn bộ pipeline
│   └── settings.tsx          # Cài đặt & Giới thiệu
├── src/
│   ├── constants/
│   │   ├── theme.ts             # Palette #000000 / #FFFFFF / #013392
│   │   └── signAssets.ts        # Map signId → require('../../assets/signs/<id>.mp4')
│   ├── store/
│   │   └── settings.ts          # Shared store: delayMs + consentGiven
│   ├── hooks/
│   │   └── useSettings.ts       # React hook subscribe store
│   ├── components/
│   │   ├── StatusBadge.tsx      # 6 trạng thái: idle/listening/processing/playing/unknown/error
│   │   ├── TranscriptView.tsx
│   │   ├── ARSignScene.tsx      # CameraView (back camera) + Video overlay (sign clip)
│   │   ├── ARSignContainer.tsx  # Container + playSequence(signIds, delayMs)
│   │   └── UnityView.tsx        # Stub cũ — không dùng trong build chính
│   └── services/
│       ├── normalize.ts         # lowercase + trim + collapse spaces, giữ dấu tiếng Việt
│       ├── lookup.ts            # Phrase-first longest-match dictionary lookup
│       ├── stt.ts               # OpenAI Whisper + SttError + auto-stop + hallucination filter + stub xoay vòng
│       ├── playback.ts          # Queue worker, inter-sign delay
│       └── logger.ts            # 8 event types (REQ-OBS-001)
├── assets/
│   ├── dictionary/
│   │   └── v1.json              # 23 entries bắt buộc, versioned
│   └── signs/                   # 23 video clip ký hiệu (.mp4, 1200ms, 30fps)
├── android/                     # Native folder sinh bởi `expo prebuild` — committed (bare workflow)
├── .env.example
└── app.json
```

---

## Cài đặt

**Yêu cầu Android build:** JDK **17** (Expo SDK 54 / Gradle 8 không chạy với Java 8). Đặt `JAVA_HOME` trỏ tới JDK 17, hoặc chỉnh `org.gradle.java.home` trong `android/gradle.properties`.

```bash
cd ViSignAR
npm install
```

Cấu hình API key (xem bên dưới):

```bash
cp .env.example .env
# Điền EXPO_PUBLIC_OPENAI_KEY vào .env
```

---

## Chạy

Có thể chạy từ thư mục gốc repo (`npm run android` chuyển tiếp sang `ViSignAR/`) hoặc từ `ViSignAR/`.

```bash
# Android
npm run android

# iOS (macOS)
npm run ios

# Expo dev server
npm start
```

**Chưa có API key?** STT tự xoay vòng qua 10 stub phrases khác nhau (gồm cả từ OOV để test) — pipeline lookup và playback vẫn chạy đầy đủ.

---

## Cấu hình OpenAI API Key

1. Tạo key tại [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Tạo file `.env` trong thư mục `ViSignAR/`:

```env
EXPO_PUBLIC_OPENAI_KEY=sk-proj-...
```

> ⚠️ File `.env` đã có trong `.gitignore`. Không commit key lên repository.

---

## Build production (EAS)

```bash
npm install -g eas-cli
npx eas login

npx eas build --platform android --profile preview
npx eas build --platform ios --profile preview
```

---

## Kiểm tra

```bash
npx tsc --noEmit                      # TypeScript — 0 lỗi
npx expo-doctor                       # Expo health — 17/17 checks
npx expo export --platform android    # Bundle test
```

---

## Trạng thái SRS

| Req | Nội dung | Trạng thái |
|---|---|---|
| REQ-INT-001 | Palette 3 màu (`#000/#FFF/#013392`) | ✅ |
| REQ-INT-002 | 3 màn hình | ✅ |
| REQ-INT-003 | 6 status badge | ✅ |
| REQ-INT-004 | Mic chỉ bật khi active session | ✅ |
| REQ-INT-006 | OpenAI Whisper + timeout 15s + retry + hallucination filter | ✅ |
| REQ-INT-007 | AR bridge `playSequence()` (camera + overlay) | ✅ |
| REQ-FUNC-001 | Chỉ nhận speech input | ✅ |
| REQ-FUNC-003 | Normalize deterministic | ✅ |
| REQ-FUNC-004 | Phrase-first longest-match lookup | ✅ |
| REQ-FUNC-005 | OOV không phát animation | ✅ |
| REQ-FUNC-006 | Queue không overlap | ✅ |
| REQ-FUNC-007 | Inter-sign delay 1000ms (configurable) | ✅ |
| REQ-FUNC-008 | Reset sạch toàn bộ state | ✅ |
| REQ-FUNC-009 | AR sign clips 4 pha (video VSL tham chiếu) | 🔲 Role B: thu thập 23 clip |
| REQ-SEC-001 | Chỉ xin quyền microphone | ✅ |
| REQ-COMP-001 | Consent notice + gate Start | ✅ |
| REQ-ML-004 | Coverage notice tiếng Việt | ✅ |
| REQ-OBS-001 | 8 log event types | ✅ |

---

## Tiến độ

| Giai đoạn | Nội dung | Trạng thái |
|---|---|---|
| 1 | UI Shell + Core Pipeline (normalize, lookup, logger, playback) | ✅ Hoàn thành |
| 2 | Settings store, consent gate, delay wiring, UnityView stub có feedback | ✅ Hoàn thành |
| 3 | STT production-ready: `SttError` types, auto-stop 30s, min duration, stub xoay vòng, hallucination filter (`no_speech_prob`), đã test với key thật | ✅ Hoàn thành |
| 4 | AR integration: `expo prebuild` + `expo-camera` + `expo-av` Video overlay + 23 video clip + bridge | ✅ Pipeline + AR scene xong — chờ B fill 23 video clip |
| 5 | Demo prep: 5× end-to-end, EAS build APK release | 🔲 Chưa làm |

---

## Bước tiếp theo

Phân công 3 vai trò:

- **A — Tech Lead:** ✅ Pipeline + AR scene + integration xong trên branch `feat/ar-base`. Còn lại: review PR của B, demo dry-run, video demo backup.
- **B — Content Engineer:** Thu thập 23 video VSL từ tudienngonngukyhieu.com → cắt 1200ms bằng ffmpeg → fill `src/constants/signAssets.ts`. Ưu tiên 8 sign priority=10 trước.
- **C — Build & Test:** Build EAS APK release, test 5× E2E flow speech-to-sign trên Android device/emulator.
