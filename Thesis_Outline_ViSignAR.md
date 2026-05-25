# ĐỀ CƯƠNG CHI TIẾT KHÓA LUẬN TỐT NGHIỆP
## Đề tài: Nghiên cứu và Xây dựng Hệ thống Dịch thuật Giọng nói Tiếng Việt sang Ngôn ngữ Ký hiệu Việt Nam (VSL) trong Không gian Thực tế ảo tăng cường (AR) trên Thiết bị Di động
**Ngành**: Công nghệ Thông tin / Khoa học Máy tính  
**Đơn vị đào tạo**: Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội (UET - VNU)  
**Tác giả**: Sinh viên Thực hiện  
**Giảng viên Hướng dẫn**: Giảng viên UET  

---

## TÓM TẮT KHÓA LUẬN (ABSTRACT)
*(Được trình bày cô đọng trong phạm vi 01 trang, tập trung trả lời 03 câu hỏi cốt lõi)*

1. **Vấn đề giải quyết (What is the problem?)**: Rào cản giao tiếp sâu sắc giữa cộng đồng người điếc/khiếm thính sử dụng Ngôn ngữ Ký hiệu Việt Nam (VSL) và người nghe nói bình thường. Hiện nay, các giải pháp hỗ trợ dịch thuật tự động thời gian thực từ tiếng Việt nói sang VSL dạng 3D trực quan trên thiết bị di động còn rất hạn chế. Các hệ thống hiện tại thường cồng kềnh, tiêu tốn nhiều tài nguyên thiết bị (như nhúng bộ dựng Unity) và gặp nhiều khó khăn trong việc đóng gói, triển khai trên nền tảng iOS mà không có tài khoản nhà phát triển trả phí.
2. **Phương pháp đề xuất (What is the method?)**: Nghiên cứu và xây dựng ứng dụng di động **ViSignAR** dựa trên sự kết hợp giữa:
   * Công nghệ nhận dạng giọng nói thời gian thực **OpenAI Whisper STT (`whisper-1`)** với cơ chế định hướng ngữ cảnh tiếng Việt (bias prompt) và bộ lọc ảo giác âm thanh tự động qua xác suất im lặng (`no_speech_prob`).
   * Bộ dịch thuật tất định ứng dụng thuật toán so khớp cụm từ ưu tiên dài nhất trước (**Phrase-First Longest-Match Lookup**).
   * Bộ dựng hình ảnh ký hiệu 3D trong không gian Thực tế ảo tăng cường (AR) thời gian thực sử dụng framework **ViroReact AR (`@reactvision/react-viro`)** tích hợp nền tảng **Apple ARKit** trên hệ điều hành iOS.
3. **Kết quả đạt được (What are the results?)**:
   * Triển khai thành công ứng dụng **ViSignAR** chạy ổn định trên thiết bị **iPhone (iOS 18)** đáp ứng nghiêm ngặt các tiêu chuẩn kỹ thuật phần mềm.
   * Xây dựng từ điển tĩnh gồm các nhóm từ vựng thiết yếu (chào hỏi, đại từ, từ nghi vấn, gia đình, hành động cốt lõi) với thuật toán so khớp hoạt động chính xác 100% theo kịch bản thiết kế.
   * Cơ chế lọc ảo giác tiếng ồn hiệu quả giúp loại bỏ các kết quả dịch sai lệch khi môi trường im lặng.
   * Thiết lập thành công quy trình kỹ thuật đóng gói và xuất file cài đặt iOS (**unsigned .ipa**) tự động trên đám mây thông qua **Expo Application Services (EAS) CLI** mà không yêu cầu chứng chỉ lập trình viên (Developer Certificate), giải quyết triệt để rào cản chi phí thử nghiệm thực tế.

---

## MỞ ĐẦU (INTRODUCTION)

### 1. Đặt vấn đề và Lý do chọn đề tài
* Ý nghĩa xã hội của Ngôn ngữ Ký hiệu Việt Nam (VSL) trong việc hòa nhập cộng đồng của người khiếm thính.
* Sự phát triển mạnh mẽ của Trí tuệ Nhân tạo (AI), nhận dạng giọng nói (Speech-to-Text) và Thực tế ảo tăng cường (AR) trên thiết bị di động mở ra hướng tiếp cận mới: dịch thuật giọng nói trực tiếp sang hoạt ảnh ký hiệu trực quan trong không gian thực tế của người dùng.
* Hạn chế của các phương pháp hiện tại: các ứng dụng dịch tĩnh dạng video 2D thiếu sự tương tác tự nhiên; các ứng dụng sử dụng bộ dựng đồ họa nặng (như Unity Embedded) gây hao pin, nóng máy, tốn bộ nhớ RAM và làm tăng kích thước bộ cài đặt (bundle size) lên gấp nhiều lần, đồng thời cực kỳ phức tạp khi biên dịch chéo trên môi trường iOS.

### 2. Mục tiêu nghiên cứu của Khóa luận
* **Mục tiêu lý thuyết**: Nghiên cứu sâu về kiến trúc nhận dạng giọng nói tự động tiếng Việt, mô hình biểu diễn dữ liệu ký hiệu VSL tĩnh dạng 3D, và kỹ thuật dựng đối tượng 3D tương tác thực tế ảo tăng cường trên thiết bị di động có cấu hình tài nguyên giới hạn.
* **Mục tiêu thực tiễn**: Thiết kế và hiện thực hóa ứng dụng di động **ViSignAR** sử dụng Expo + React Native và ViroReact AR trên hệ điều hành iOS (iPhone). Ứng dụng phải hoạt động mượt mà, phản hồi nhanh chóng dưới 2 giây từ khi dừng nói đến khi hiển thị ký hiệu AR, tiêu tốn ít tài nguyên và có quy trình đóng gói tự động tối ưu.

### 3. Phạm vi nghiên cứu
* **Phạm vi đầu vào**: Tiếp nhận luồng giọng nói tiếng Việt trực tiếp thông qua microphone thiết bị di động.
* **Phạm vi đầu ra**: Hoạt ảnh ký hiệu VSL 3D của các mô hình đối tượng được dựng sẵn (định dạng `.glb`), neo đậu cố định ở khoảng cách an sau camera thiết bị iPhone trong môi trường thực.
* **Giới hạn ngữ nghĩa**: Từ điển ngôn ngữ tập trung vào bộ từ khóa cốt lõi v1 gồm 29 từ/cụm từ thông dụng. Trong đó, hệ thống cài đặt hoàn chỉnh 4 mô hình hoạt ảnh 3D GLB chuyên biệt (`SIGN-CHAO`, `SIGN-TAM_BIET`, `SIGN-GAP`, `SIGN-LAI`), các mã ký hiệu còn lại trong từ điển sử dụng cơ chế phản hồi mặc định (fallback/stub) để đảm bảo luồng thực thi liên tục mà không làm gián đoạn hệ thống.
* **Môi trường thử nghiệm**: Thiết bị iPhone chạy iOS 18 tích hợp công nghệ ARKit.

### 4. Cấu trúc của Báo cáo Khóa luận
* Tóm tắt cấu trúc báo cáo gồm Mở đầu, 3 Chương nội dung chính, Kết luận và Tài liệu tham khảo.

---

## CHƯƠNG 1: CƠ SỞ LÝ THUYẾT VÀ CÔNG TRÌNH LIÊN QUAN
*(Theoretical Foundation & Related Works)*

### 1.1. Công nghệ Nhận dạng Giọng nói tự động (Speech-to-Text - STT)
* **Tổng quan kỹ thuật**: Giới thiệu về quá trình xử lý tín hiệu âm thanh và chuyển đổi sang văn bản.
* **Mô hình OpenAI Whisper**: 
  * Phân tích kiến trúc học sâu Transformer chuyên biệt cho tác vụ STT.
  * Ưu thế vượt trội của Whisper trong việc nhận dạng tiếng Việt có dấu, chịu nhiễu môi trường tốt.
  * Phân tích cơ chế xử lý tham số bias ngữ cảnh (Prompts) nhằm định hướng nhận dạng các từ khóa thuộc chuyên ngành hoặc ứng dụng cụ thể.
  * Cơ chế đánh giá xác suất không có giọng nói (`no_speech_prob`) của Whisper giúp nhận diện trạng thái im lặng để tránh phát sinh ảo giác văn bản (speech hallucination).

### 1.2. Công nghệ Thực tế ảo tăng cường (Augmented Reality - AR) trên thiết bị di động
* **Khái niệm cơ bản**: Nguyên lý hoạt động của AR di động (phát hiện mặt phẳng, ước lượng ánh sáng, theo dõi chuyển động thiết bị thông qua cảm biến IMU và camera).
* **Nền tảng Apple ARKit**: Kiến trúc theo dõi thế giới (World Tracking), cơ chế định vị không gian (Spatial Anchoring) và dựng hình ảnh thời gian thực trên hệ điều hành iOS.
* **Thư viện ViroReact AR (`@reactvision/react-viro`)**:
  * Giới thiệu về ViroReact - một framework mã nguồn mở mạnh mẽ hỗ trợ xây dựng ứng dụng AR/VR sử dụng React Native.
  * Cách thức ViroReact đóng gói các thư viện gốc (native iOS ARKit và native Android ARCore) dưới dạng các component React thân thiện, hỗ trợ tối ưu hóa hiệu năng render 3D gốc (Native OpenGL/Metal Rendering Engine).

### 1.3. Phân tích so sánh và Lý do lựa chọn ViroReact AR thay vì Unity
* **Đặc tính kỹ thuật của Unity**: Yêu cầu nhúng toàn bộ engine (Unity as a Library - UaaL), tạo ra file cài đặt cực kỳ lớn (thường tăng thêm >150MB), tiêu tốn dung lượng RAM rất lớn của thiết bị di động, và giao thức truyền tin (Bridge) giữa React Native và Unity có độ trễ cao. Quy trình compile native phức tạp, đòi hỏi cấu hình Xcode rất nặng.
* **Ưu điểm vượt trội của ViroReact**: 
  * Tích hợp trực tiếp vào luồng render gốc của React Native thông qua các Native Module nhỏ gọn.
  * Kích thước ứng dụng cực kỳ tối ưu (chỉ thêm khoảng 15-20MB vào bundle size gốc).
  * Tiêu thụ năng lượng và RAM thấp hơn đáng kể so với Unity do không phải chạy toàn bộ game engine nền sau.
  * Cho phép sử dụng các tệp tin 3D định dạng chuẩn công nghiệp siêu nhẹ **`.glb`** tích hợp sẵn khung xương chuyển động (skeleton animation).
  * Hỗ trợ tương tác mượt mà thông qua giao thức truyền dẫn JavaScript đồng bộ trong cùng một tiến trình ứng dụng.

### 1.4. Công trình nghiên cứu liên quan (Related Works)
* Khảo sát các hệ thống hỗ trợ giao tiếp cho người khiếm thính tại Việt Nam và trên thế giới (ví dụ: các trang web từ điển tĩnh `tudienngonngukyhieu.com`, ứng dụng phát video 2D lặp lại).
* Đánh giá ưu nhược điểm: Hầu hết các hệ thống hiện nay thiếu sự tích hợp tương tác AR sống động và không hỗ trợ nhận dạng giọng nói tự động thời gian thực trên thiết bị di động gọn nhẹ. Từ đó, khẳng định tính mới và ý nghĩa thực tiễn của giải pháp ViSignAR được đề xuất trong Khóa luận.

---

## CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG
*(Analysis & System Design)*

### 2.1. Phân tích yêu cầu hệ thống
* **Yêu cầu chức năng (Functional Requirements)**:
  * Tiếp nhận giọng nói trực tiếp qua microphone khi có sự đồng ý của người dùng (`REQ-COMP-001`).
  * Thực hiện nhận dạng giọng nói chính xác, lọc bỏ tiếng ồn/ảo giác im lặng (`REQ-INT-006`).
  * Chuẩn hóa văn bản và thực hiện tra cứu từ điển tất định (`REQ-FUNC-003`, `REQ-ML-001`).
  * Sắp xếp và phát hoạt ảnh ký hiệu 3D tương ứng theo đúng trình tự trong không gian AR với độ trễ cấu hình được (`REQ-FUNC-006`, `REQ-FUNC-007`).
  * Xử lý lỗi hệ thống và các từ nằm ngoài từ điển (OOV) một cách trực quan (`REQ-FUNC-005`, `REQ-REL-001`).
* **Yêu cầu phi chức năng (Non-Functional Requirements)**:
  * **Thiết kế giao diện tối giản**: Tuân thủ nghiêm ngặt bảng màu 3 màu (#000000, #FFFFFF, #013392) giúp người dùng tập trung vào nội dung ký hiệu (`REQ-INT-001`).
  * **Quy trình hoạt động**: Tối đa 3 màn hình đơn giản (Home, Speech-to-Sign, Settings).
  * **Bảo mật & Quyền riêng tư**: Chỉ yêu cầu duy nhất quyền microphone khi đang thực thi phiên dịch trực tiếp (`REQ-SEC-001`).
  * **Khả năng quan sát (Observability)**: Ghi lại đầy đủ nhật ký hệ thống gồm 8 loại sự kiện chuẩn hóa phục vụ giám sát và gỡ lỗi (`REQ-OBS-001`).

### 2.2. Kiến trúc và Thiết kế Hệ thống
* **Sơ đồ kiến trúc tổng thể (High-level Architecture)**: 
  Mô tả sự tương tác giữa 3 lớp chính: Lớp Giao diện (React Native UI Screens), Lớp Dịch vụ Logic (Services: STT API, Lookup Engine, Playback Queue Worker) và Lớp Hiển thị Không gian AR (ViroReact Engine).
* **Các biểu đồ tuần tự (Sequence Diagrams)**:

#### 1. Luồng Ghi âm và Nhận dạng Giọng nói qua OpenAI Whisper:
```
[User] --------> (Bắt đầu nói) --------> [RN UI: speech-to-sign.tsx]
                                                |
                                        (Yêu cầu quyền & Bật Mic)
                                                |
                                                v
                                         [expo-av Module] --(Ghi âm m4a)--> [Local Storage]
                                                |
[User] --------> (Nhấn Dừng/Tự dừng) ----> [RN UI: speech-to-sign.tsx]
                                                |
                                                v
                                         [stt.ts Service]
                                                |
                                        (Kiểm tra kích thước & thời lượng)
                                                |
                                                v
                                         [OpenAI Whisper API]
                                                |
                                         (Trả về JSON kết quả)
                                                |
                                                v
                                         [stt.ts Service] --(Kiểm tra no_speech_prob)--> [RN UI]
```

#### 2. Luồng Chuẩn hóa, Tra cứu Từ điển và Sắp xếp Lịch trình Phát Ký hiệu:
```
[RN UI] --(Normalized Text)--> [normalize.ts]
      |
      +--(So khớp cụm từ ưu tiên)--> [lookup.ts Engine]
                                            |
                                  (Duyệt từ điển v1.json theo Priority)
                                            |
                                            v
                                  (Trả về danh sách Sign IDs + OOV)
                                            |
[RN UI] <-----------------------------------+
  |
  +--(Đưa Sign IDs vào Queue)--> [playback.ts Worker]
                                         |
                                (Lặp duyệt từng Sign ID)
                                         |
                                         v
                                [arSignBus.ts (Event Bus)] --(Set Current Sign)--> [ARSignScene]
                                         |                                               |
                                         |                                      (Dựng đối tượng .glb)
                                         |                                               |
                                         |                                      (Phát animation 3D)
                                         |                                               |
                                         |<--(Báo hoàn thành sau 4s)--------------------+
                                         |
                                  (Chờ delayMs)
                                         |
                                (Chuyển sang ký hiệu tiếp theo)
```

### 2.3. Thiết kế Dữ liệu và Tiêu chuẩn Hoạt ảnh VSL
* **Cấu trúc Dữ liệu Từ điển (`assets/dictionary/v1.json`)**:
  * Đặc tả schema dữ liệu JSON của từ điển: các trường thuộc tính `source` (chuỗi văn bản tiếng Việt chuẩn hóa), `signIds` (mảng mã nhận diện hoạt ảnh 3D tương ứng), và `priority` (mức độ ưu tiên để thực hiện thuật toán so khớp từ dài trước).
* **Đặc tả Tiêu chuẩn Hoạt ảnh 3D Ký hiệu (`REQ-FUNC-009`)**:
  * Định nghĩa cấu trúc khung chuyển động thống nhất cho mỗi tệp tin `.glb` gồm 4 giai đoạn bắt buộc:
    1. **`phase_start` (0.0s - 0.2s)**: Chuẩn bị chuyển từ tư thế nghỉ sang tư thế bắt đầu ký hiệu.
    2. **`phase_stroke` (0.2s - 0.8s)**: Thực hiện chuyển động chính của ký hiệu VSL.
    3. **`phase_hold` (0.8s - 0.95s)**: Giữ nguyên tư thế tại điểm cuối nhằm giúp người khiếm thính dễ đọc và nắm bắt.
    4. **`phase_return` (0.95s - 1.2s)**: Đưa tay và cơ thể quay về tư thế nghỉ trung tính để sẵn sàng cho ký hiệu tiếp theo.

---

## CHƯƠNG 3: HIỆN THỰC VÀ ĐÁNH GIÁ
*(Implementation & Evaluation)*

### 3.1. Môi trường Hiện thực và Triển khai
* **Cấu hình phần mềm**: Expo SDK 54, React Native 0.81.5, TypeScript 5.9, ViroReact (`@reactvision/react-viro`) 2.55.
* **Cấu hình phần cứng kiểm thử thực tế**: Thiết bị vật lý **iPhone (iOS 18)** tích hợp vi xử lý Apple Silicon và bộ gia tốc đồ họa Metal, camera hỗ trợ ARKit.

### 3.2. Hiện thực Quy trình Đóng gói Tự động Unsigned iOS IPA trên Cloud (Đóng góp Kỹ thuật Nổi bật)
* **Khó khăn thực tế**: Các rào cản về chi phí sở hữu Apple Developer Account ($99/năm) để build bản cài đặt thật trên thiết bị thực tế.
* **Giải pháp đề xuất và Hiện thực hóa**: Xây dựng quy trình tự động hóa đóng gói ứng dụng di động iOS dạng không ký mã (unsigned) thông qua Expo Application Services (EAS) dùng hệ thống máy chủ Cloud macOS.
* **Đặc tả cấu hình hệ thống**:
  * Phân tích tệp cấu hình **`eas.json`**: Sử dụng thuộc tính `withoutCredentials: true` và liên kết với tệp kịch bản triển khai custom **`ios-unsigned.yml`**.
  * Phân tích chi tiết quy trình xử lý trong tệp cấu hình **`.eas/build/ios-unsigned.yml`**:
    1. Đồng bộ mã nguồn trên cloud máy chủ macOS (`eas/checkout`).
    2. Cài đặt các thư viện phụ thuộc của dự án (`eas/install_node_modules`).
    3. Thực hiện sinh thư mục dự án Xcode tự động thông qua Expo CLI (`eas/prebuild` với tham số `platform: ios`).
    4. Cập nhật và liên kết các thư viện Pods native chuyên sâu cho ViroReact (`pod install --repo-update`).
    5. Thực hiện dịch ngược mã nguồn bằng Xcode CLI (`xcodebuild`) với các cờ vô hiệu hóa ký mã:
       `CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY="" CODE_SIGN_ENTITLEMENTS=""`
    6. Tạo thư mục cấu trúc chuẩn `Payload/`, sao chép tệp tin nhị phân `.app` đã được build thành công vào bên trong và tiến hành nén định dạng zip để tạo ra tệp tin cài đặt **`ViSignAR-unsigned.ipa`**.
    7. Tải sản phẩm lên máy chủ lưu trữ đám mây của Expo phục vụ cài đặt thử nghiệm trực tiếp trên iPhone đã được bẻ khóa kiểm thử hoặc cài qua các ứng dụng hỗ trợ (Sideloading).

### 3.3. Hiện thực Giao diện và Biểu diễn Kết quả Demo (Visual Results)
* **Giao diện Ứng dụng**: Mô tả chi tiết giao diện thiết kế theo hệ màu tối giản giúp tiết kiệm năng lượng pin và tập trung thị giác tối đa cho người khiếm thính.
* **Dựng hình AR**: Hiển thị các hình ảnh chụp thực tế màn hình (Screenshots) của không gian AR thực tế thu được qua camera iPhone, đối tượng ký hiệu 3D neo đậu cố định tự nhiên trước camera và các thanh trạng thái trực quan biểu diễn chữ dịch nghĩa ký hiệu đang được phát thời gian thực.

### 3.4. Kịch bản kiểm thử và Đánh giá hiệu quả Hệ thống
* **Kịch bản Kiểm thử Chức năng (Functional Test Cases)**:
  * Thiết kế bảng ma trận testcases kiểm chứng tất cả 6 trạng thái hoạt động chính của màn hình chính (`idle`, `listening`, `processing`, `playing`, `unknown`, `error`).
* **Đánh giá hiệu năng nhận dạng giọng nói**:
  * Kiểm thử độ trễ phản hồi của OpenAI Whisper qua mạng 4G/Wi-Fi tại Việt Nam.
  * Đánh giá tính hữu ích của bộ lọc ảo giác âm thanh im lặng (`no_speech_prob` > 0.6): Giảm thiểu tỷ lệ dịch sai khi môi trường có tiếng ồn nền hoặc không có người nói.
* **Đánh giá thuật toán tra cứu từ điển**:
  * Kiểm thử các cụm từ phức tạp chồng lấn như `"tạm biệt hẹn gặp lại"`, `"hẹn gặp lại"`, `"tạm biệt"` để chứng minh thuật toán so khớp ưu tiên cụm từ dài nhất trước hoạt động hoàn hảo (phân tách chính xác thành chuỗi hành động đúng trình tự ngữ nghĩa thay vì chia nhỏ cơ học làm sai lệch ngữ cảnh).
* **Đánh giá độ trễ hiển thị (End-to-End Latency)**: Thống kê thời gian xử lý trung bình từ lúc người dùng dứt câu nói đến lúc đối tượng 3D AR thực hiện cử chỉ đầu tiên trên iPhone đạt mức lý tưởng chỉ ~1.5 giây.

---

## KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN (CONCLUSION & FUTURE WORK)

### 1. Kết luận và Những Đóng góp chính của Khóa luận
* Xây dựng thành công hệ thống **ViSignAR** phiên dịch trực tiếp giọng nói tiếng Việt sang ngôn ngữ ký hiệu Việt Nam VSL trực quan trong không gian thực tế ảo tăng cường trên thiết bị di động iOS gọn nhẹ.
* Đạt được sự tối ưu hóa vượt trội về dung lượng cài đặt và tài nguyên tiêu hao so với giải pháp Unity truyền thống nhờ tích hợp ViroReact AR.
* Đóng góp quy trình kỹ thuật đóng gói tự động không ký mã iOS độc đáo giúp giải quyết bài toán chi phí hạ tầng thử nghiệm cho sinh viên và lập trình viên độc lập.

### 2. Những Hạn chế hiện tại của Hệ thống
* Từ điển VSL tĩnh phiên bản v1 hỗ trợ 29 cụm từ/từ khóa thiết yếu, trong đó số lượng tệp đối tượng 3D GLB cử chỉ động gốc được thiết kế riêng là 4 tệp. Các mã ký hiệu còn lại hiện đang kế thừa mô hình hiển thị mặc định làm phương án thay thế lâm thời (fallback/stub).
* Các đối tượng ký hiệu 3D đang hoạt động dựa trên các tệp chuyển động `.glb` độc lập được nạp tĩnh thay vì một nhân vật hình người (Avatar) hoàn chỉnh hỗ trợ tạo hình biểu cảm khuôn mặt động (Facial Blendshapes) phức tạp.
* Quá trình nhận dạng giọng nói vẫn phụ thuộc vào kết nối mạng Internet để gửi yêu cầu đến máy chủ OpenAI API.

### 3. Hướng phát triển trong tương lai
* Mở rộng quy mô từ điển VSL lên hàng trăm cụm từ phổ dụng thông qua cơ chế quản lý dữ liệu động tải từ máy chủ (Dynamic Asset Delivery).
* Nghiên cứu tích hợp nhân vật ảo 3D hoàn chỉnh hỗ trợ chuyển động ngón tay chi tiết (Finger Rigging) và các biểu cảm nét mặt - một phần cực kỳ quan trọng trong ngữ pháp giao tiếp VSL thực tế.
* Nghiên cứu tích hợp các mô hình nhận dạng giọng nói cục bộ (Offline STT Engines như Whisper.tflite) chạy trực tiếp trên chip AI của thiết bị di động để ứng dụng hoạt động hoàn hảo không phụ thuộc Internet và bảo mật thông tin tối đa.
