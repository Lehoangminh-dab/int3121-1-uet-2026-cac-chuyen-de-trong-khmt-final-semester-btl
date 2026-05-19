# ViSignAR

Ứng dụng mobile chuyển đổi **giọng nói tiếng Việt → ngôn ngữ ký hiệu Việt Nam (VSL) trong không gian AR**.

Người dùng nói vào microphone → OpenAI Whisper nhận dạng → tra từ điển VSL → AR scene (ViroReact / ARKit / ARCore) phát clip ký hiệu được anchor trước mặt người dùng.

> Dự án INT3121-1 — UET 2026

---

## Stack

| Tầng | Công nghệ |
|---|---|
| Mobile shell | Expo SDK 54 + React Native 0.81 (TypeScript), bare workflow sau `expo prebuild` |
| Điều hướng | expo-router v6 |
| Ghi âm | expo-av |
| STT | OpenAI Whisper (`whisper-1`, `language: vi`) |
| AR rendering | ViroReact (`@reactvision/react-viro` 2.55) — ARKit (iOS) / ARCore (Android), Fabric (New Architecture) |
| Sign clips | Pre-rendered VSL reference videos (mp4, 1200ms, 30fps) phát qua `ViroVideo` |
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
│   │   ├── ARSignScene.tsx      # ViroARScene + ViroVideo anchored -1.2m trước camera
│   │   ├── ARSignContainer.tsx  # ViroARSceneNavigator + playSequence(signIds, delayMs)
│   │   └── UnityView.tsx        # Stub cũ (2D fallback, có thể bật qua Settings)
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
| REQ-INT-007 | AR bridge `playSequence()` (ViroReact) | 🟡 Skeleton xong, chờ B/C |
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
| 4 | AR integration: `expo prebuild` + ViroReact + 23 video clip + bridge thật | 🟡 A1+A2 xong (Tech Lead) — chờ B (video) + C (ViroVideo + pipeline) |
| 5 | Demo prep: 5× end-to-end, Android (ARCore device thật), EAS build | 🔲 Chưa làm |

---

## Bước tiếp theo

> Phase 4 đã đổi hướng sang **ViroReact AR** thay vì Unity — xem revision v1.3 trong `SRS_ViSignAR.md` để rõ lý do (resource constraint + timeline 7 ngày + nhóm chưa có kinh nghiệm 3D rigging).

Phân công 3 vai trò (chi tiết: `~/.claude/plans/h-y-c-v-t-m-virtual-noodle.md`):

- **A — Tech Lead:** ✅ A1+A2 (prebuild + ViroReact + skeleton) — commit `9d5b347` trên branch `feat/ar-base`. Còn lại: review PR của B/C, video demo backup.
- **B — Content Engineer:** Thu thập 23 video VSL từ tudienngonngukyhieu.com → cắt 1200ms bằng ffmpeg → fill `src/constants/signAssets.ts`. Ưu tiên 8 sign priority=10 trước.
- **C — Integration Engineer:** Thay `ViroBox` trong `ARSignScene.tsx` bằng `ViroVideo`, nối `onFinish` vào `resolveCurrentClip`, cập nhật `playback.ts` + `app/speech-to-sign.tsx`, build EAS APK, test 5× E2E trên ARCore device thật.
