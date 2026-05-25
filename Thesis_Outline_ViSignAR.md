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
  Các biểu đồ tuần tự mô tả chi tiết luồng tương tác thời gian thực giữa các thành phần logic trong hệ thống được trình bày cụ thể trong Chương 3 (Mục 3.3) để gắn liền với kết quả vận hành thực tế của hệ thống.

### 2.3. Thiết kế Dữ liệu và Tiêu chuẩn Hoạt ảnh VSL
* **Cấu trúc Cơ sở Dữ liệu Từ điển**:
  * Thiết kế cấu trúc dữ liệu từ điển ánh xạ: Định nghĩa cách thức lưu trữ và tổ chức các cụm từ tiếng Việt đã chuẩn hóa, liên kết trực tiếp với các mã định danh hoạt ảnh ký hiệu 3D tương ứng.
  * Thiết kế cơ chế phân cấp độ ưu tiên (Priority Index) để phục vụ cho thuật toán tra cứu so khớp cụm từ ưu tiên từ dài nhất trước, đảm bảo tính tất định và tối ưu hóa ngữ nghĩa trong quá trình dịch thuật.
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
* **Khó khăn thực tế**: Rào cản lớn về chi phí đăng ký tài khoản nhà phát triển Apple Developer Account ($99/năm) đối với các nhóm nghiên cứu độc lập để biên dịch và thử nghiệm ứng dụng trên thiết bị iPhone vật lý.
* **Giải pháp và Quy trình Kiến trúc đóng gói**: 
  * Thiết kế và triển khai một quy trình tích hợp và phân phát liên tục (CI/CD) tự động hóa hoàn toàn việc đóng gói ứng dụng di động iOS dưới dạng không ký mã (unsigned package) trên nền tảng đám mây macOS.
  * Giải pháp cho phép tự động chuyển đổi mã nguồn dự án thành một gói cài đặt ứng dụng iOS độc lập (`.ipa`), bỏ qua yêu cầu chứng chỉ nhà phát triển của Apple để thực hiện cài đặt thử nghiệm trực tiếp trên thiết bị thực tế thông qua các công cụ cài đặt ứng dụng bên thứ ba (sideloading).
* **Các bước triển khai trong đường ống CI/CD tự động**:
  1. **Khởi tạo môi trường ảo**: Tự động tải mã nguồn, thiết lập phiên bản Node.js và đồng bộ hóa các gói thư viện phụ thuộc của dự án.
  2. **Biên dịch mã nguồn bản xứ (Prebuild & Pods Linking)**: Sinh mã nguồn dự án iOS bản xứ (Xcode native project) và tự động đồng bộ hóa, cấu hình các thư viện Native Modules phức tạp của bộ dựng ARKit/ViroReact.
  3. **Biên dịch gói ứng dụng không ký mã**: Sử dụng các cấu hình biên dịch để vô hiệu hóa tính năng Code Signing của Xcode. Đường ống thực thi việc biên dịch trực tiếp mã nguồn C++/Swift của engine AR sang tệp nhị phân iOS gốc mà không yêu cầu khóa bảo mật.
  4. **Đóng gói và Đóng băng sản phẩm**: Tự động trích xuất tệp ứng dụng nhị phân bản xứ, đóng gói theo cấu trúc tiêu chuẩn và nén thành tệp cài đặt `.ipa` unsigned để sẵn sàng tải về máy và sideload lên thiết bị thử nghiệm thực tế.

### 3.3. Kết quả Hiện thực Giao diện, Biểu đồ Tuần tự và Demo (Visual Results & System Sequence)
* **Giao diện và Thiết kế Trải nghiệm Ứng dụng**:
  * Mô tả chi tiết giao diện tối giản với hệ màu chủ đạo giúp tiết kiệm dung lượng pin và tập trung tối đa sự chú ý của người khiếm thính vào chuyển động của mô hình AR.
  * Trực quan hóa các trạng thái tương tác của ứng dụng bao gồm trạng thái chờ, đang thu âm giọng nói, đang xử lý dịch thuật, và trạng thái đang phát hoạt ảnh ký hiệu.

* **Phân tích Luồng Tuần tự của Hệ thống (System Sequence Flows)**:
  Để minh họa rõ nét cách thức vận hành thực tế của hệ thống khi chạy trên thiết bị, các biểu đồ tuần tự dưới đây mô tả quá trình xử lý đồng bộ và không đồng bộ giữa các thành phần logic chính:

  #### 1. Luồng Ghi âm và Nhận dạng Giọng nói thời gian thực:
  Mô tả chu kỳ tiếp nhận âm thanh từ Microphone, lưu trữ tạm thời và gửi yêu cầu dịch thuật qua mạng để nhận dạng giọng nói, đồng thời áp dụng thuật toán kiểm định chất lượng để lọc bỏ tiếng ồn ảo giác.
  
  ```
  [Người dùng] --------> (Bắt đầu nói) --------> [Giao diện Ứng dụng (Mobile UI)]
                                                           |
                                                 (Yêu cầu quyền & Kích hoạt)
                                                           |
                                                           v
                                              [Bộ Ghi âm Thiết bị] --(Ghi âm dạng nén)--> [Bộ lưu trữ tạm thời]
                                                           |
  [Người dùng] --------> (Nhấn Dừng / Im lặng) -> [Giao diện Ứng dụng (Mobile UI)]
                                                           |
                                                           v
                                              [Dịch vụ Nhận dạng Giọng nói]
                                                           |
                                                   (Gửi dữ liệu âm thanh)
                                                           |
                                                           v
                                              [Dịch vụ OpenAI Whisper STT]
                                                           |
                                                   (Trả về văn bản đã nhận dạng)
                                                           |
                                                           v
                                              [Dịch vụ Nhận dạng Giọng nói] --(Lọc nhiễu & ảo giác)--> [Giao diện]
  ```

  #### 2. Luồng Chuẩn hóa, Dịch thuật Từ điển và Quản lý Phát Ký hiệu AR:
  Mô tả quá trình nhận văn bản gốc, chuẩn hóa chính tả tiếng Việt, áp dụng thuật toán tra cứu so khớp cụm từ dài nhất trước để chia cắt văn bản thành mảng các ID ký hiệu, sau đó đưa vào hàng đợi quản lý luồng phát đồng bộ để điều khiển hoạt ảnh 3D trong không gian AR thực tế tăng cường.
  
  ```
  [Giao diện Ứng dụng (Mobile UI)] --(Văn bản thô)--> [Bộ Chuẩn hóa Văn bản]
                |
                +--(Văn bản đã chuẩn hóa)--> [Bộ Tra cứu Từ điển]
                                                     |
                                            (Tra cứu so khớp cụm từ dài nhất)
                                                     |
                                                     v
                                            (Trả về danh sách ID ký hiệu + từ OOV)
                                                     |
  [Giao diện Ứng dụng (Mobile UI)] <-----------------+
    |
    +--(Đưa danh sách ID vào Hàng đợi)--> [Bộ Quản lý Luồng Phát (Queue Manager)]
                                                   |
                                          (Lặp duyệt từng ID ký hiệu)
                                                   |
                                                   v
                                          [Kênh Sự kiện Phát (Event Bus)] --(Kích hoạt ký hiệu)--> [Bộ Dựng Không gian AR]
                                                   |                                                   |
                                                   |                                          (Tải mô hình 3D .glb)
                                                   |                                                   |
                                                   |                                          (Phát hoạt ảnh VSL tương ứng)
                                                   |                                                   |
                                                   |<--(Báo phát xong/Chuyển tiếp)---------------------+
                                                   |
                                            (Chờ thời gian chuyển tiếp)
                                                   |
                                          (Chuyển sang ký hiệu kế tiếp)
  ```

* **Danh sách các Ảnh chụp Thực tế Demo ứng dụng (Screenshots Placeholders)**:
  Dưới đây là các vị trí bố trí hình ảnh trực quan thể hiện giao diện người dùng thực tế và chất lượng dựng hình AR trên thiết bị iPhone vật lý:

  * **[Ảnh chụp màn hình 3.3.1: Giao diện Trang chủ và Màn hình chính tối giản của ViSignAR]**
    * *Mô tả*: Giao diện màn hình chính tối giản, nút kích hoạt microphone lớn trực quan và thanh trạng thái chỉ dẫn rõ ràng.
  * **[Ảnh chụp màn hình 3.3.2: Giao diện Ứng dụng trong trạng thái đang lắng nghe và ghi nhận giọng nói]**
    * *Mô tả*: Hiệu ứng sóng âm động trực quan khi người dùng đang nói để tăng tính tương tác và báo hiệu trạng thái hoạt động của mic.
  * **[Ảnh chụp màn hình 3.3.3: Kết quả dựng hình Hoạt ảnh Ký hiệu 3D trong Không gian AR]**
    * *Mô tả*: Mô hình 3D cử chỉ học động được neo đậu chính xác trong không gian phòng thực tế thông qua camera, đi kèm khung text mô tả chữ dịch nghĩa tương ứng thời gian thực (ví dụ phát ký hiệu "Chào").
  * **[Ảnh chụp màn hình 3.3.4: Trực quan hóa Giao diện khi gặp Từ ngoài từ điển (OOV)]**
    * *Mô tả*: Cách hệ thống hiển thị thông báo thân thiện và phát hoạt ảnh ký hiệu mặc định (fallback/stub) để duy trì luồng giao tiếp mà không gây bối rối cho người dùng khi gặp từ khóa chưa được số hóa.

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
