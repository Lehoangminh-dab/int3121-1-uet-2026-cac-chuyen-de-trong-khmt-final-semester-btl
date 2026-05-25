Báo cáo Nghiên cứu Chuyên sâu và Kế hoạch Thực chứng Công nghệ Hỗ trợ Giao tiếp Thời gian thực cho Người Khiếm thính tại Việt Nam
Kế hoạch Nghiên cứu Chuyên sâu phục vụ Thiết lập Cơ sở Lý thuyết Luận văn
Để thiết lập một nền tảng thực chứng vững chắc cho Phần mở đầu và Chương 1 của luận văn tốt nghiệp, một kế hoạch nghiên cứu chuyên sâu được xây dựng nhằm thu thập, xác minh và hệ thống hóa các nguồn dữ liệu kỹ thuật và dịch tễ học. Mục tiêu của kế hoạch này là cung cấp các số liệu "ground truth" (sự thật khách quan) để chứng minh tính cấp thiết của đề tài, đồng thời bảo vệ các quyết định lựa chọn kiến trúc phần mềm cho hệ thống hỗ trợ giao tiếp thời gian thực dành cho người khiếm thính tại Việt Nam.

+---------------------------------------------------------------------------------------+
| SƠ ĐỒ TIẾN TRÌNH THU THẬP VÀ XỬ LÝ DỮ LIỆU |
+---------------------------------------------------------------------------------------+
| |
| --> Thu thập số liệu GSO/WHO & Đánh giá rào cản y tế |
| |
| --> So sánh sai số WER của PhoWhisper trên các tập dữ liệu Việt |
| |
| [Lọc nhiễu Ảo giác] --> Tích hợp bộ tiền lọc Silero VAD & Cấu hình giải mã tự hồi quy |
| |
| --> So sánh hiệu năng, dung lượng & pin giữa Unity và ViroReact |
| |
| --> Xây dựng quy trình đóng gói Unsigned IPA cho iOS |
| |
+---------------------------------------------------------------------------------------+

Quy trình thu thập và tổng hợp dữ liệu được chia thành năm trục nghiên cứu chính:
Trục 1: Số liệu Dịch tễ học và Rào cản Xã hội tại Việt Nam: Tập trung thu thập số liệu thống kê chính thức từ Tổng cục Thống kê và Tổ chức Y tế Thế giới (WHO) về tỷ lệ người khuyết tật nghe nói, phân bố theo độ tuổi, tỷ lệ trẻ em khiếm thính bẩm sinh và các rào cản giao tiếp thực tế trong môi trường dịch vụ công y tế.
Trục 2: Hiệu năng Nhận dạng Giọng nói Tiếng Việt chuyên sâu: Trích xuất dữ liệu thực nghiệm về Tỷ lệ lỗi từ (Word Error Rate - WER) của các mô hình nhận dạng giọng nói tự động (ASR) tối ưu hóa riêng cho tiếng Việt, phân tích sự đánh đổi giữa kích thước tham số và độ chính xác trong môi trường thực địa.
Trục 3: Cơ chế Kiểm soát Nhiễu và Ảo giác Hệ thống: Nghiên cứu nguyên nhân kiến trúc dẫn đến lỗi tạo từ giả (hallucination) của mô hình Transformer trong các khoảng lặng và kiểm chứng hiệu quả của các giải pháp tiền xử lý hoặc cấu hình tham số giải mã.
Trục 4: Đánh giá Hiệu năng Đồ họa Đa nền tảng trên Thiết bị Di động: Thu thập dữ liệu đo đạc thực tế về mức tiêu hao tài nguyên (dung lượng lưu trữ, RAM, pin) và khả năng hỗ trợ các tính năng tiếp cận hệ thống (accessibility) khi nhúng các công cụ đồ họa 3D.
Trục 5: Tự động hóa Quy trình Biên dịch và Triển khai Chi phí Thấp: Nghiên cứu các giải pháp tự động hóa tích hợp liên tục (CI/CD) và biên dịch cục bộ để đóng gói ứng dụng thử nghiệm cho nền tảng iOS mà không phụ thuộc vào tài khoản nhà phát triển trả phí của Apple.
Thực trạng Dịch tễ và Rào cản Tiếp cận Y tế của Người Khiếm thính tại Việt Nam
Việc xây dựng một giải pháp công nghệ trợ giúp cho cộng đồng người khiếm thính tại Việt Nam đòi hỏi một đánh giá định lượng sâu sắc về quy mô dịch tễ học và cấu trúc rào cản xã hội mà họ đang đối mặt. Theo ước tính của Tổ chức Y tế Thế giới (WHO), khoảng 5% dân số toàn cầu, tương đương với 360 triệu người, đang phải sống chung với tình trạng giảm thính lực gây khuyết tật.1 Trong bối cảnh địa lý y tế, Việt Nam nằm trong khu vực có tỷ lệ suy giảm thính lực được xếp vào nhóm cao trên bản đồ thế giới.1
Báo cáo Điều tra Quốc gia về Người khuyết tật do Tổng cục Thống kê phối hợp thực hiện năm 2016 cho thấy, cả nước có khoảng 2,5 triệu người bị khuyết tật nghe nói.1 Sự gia tăng của nhóm đối tượng này diễn ra liên tục qua các năm, với khoảng 1.200 đến 1.400 trẻ khiếm thính mới sinh ra mỗi năm.1 Sự suy giảm thính lực cũng thể hiện xu hướng phân bố rõ rệt theo độ tuổi, đặc biệt tăng mạnh ở nhóm người cao tuổi: tỷ lệ giảm thính lực ở độ tuổi từ 65 đến 75 chiếm khoảng 30% đến 40%, và vọt lên mức 40% đến 50% đối với những người trên 75 tuổi.1
Mặc dù quy mô dân số khiếm thính rất lớn, hạ tầng hỗ trợ giao tiếp và tiếp cận dịch vụ thiết yếu tại Việt Nam vẫn đang trong tình trạng thiếu hụt trầm trọng. Trong lĩnh vực y tế công cộng, các khảo sát thực địa chỉ ra một con số đáng quan ngại: chỉ có vỏn vẹn 7% người khiếm thính nghe nói được tiếp cận đầy đủ các dịch vụ y tế thiết yếu.1 93% số người còn lại gặp khó khăn nghiêm trọng hoặc bị cô lập thông tin khi khám chữa bệnh do các nguyên nhân hệ thống 1:
Sự thiếu hụt nhân lực phiên dịch chuyên nghiệp: Số lượng phiên dịch viên ngôn ngữ ký hiệu (VSL) tại các cơ sở y tế gần như bằng không, khiến người bệnh không thể tự mô tả triệu chứng hoặc hiểu chỉ dẫn của bác sĩ.1
Hạ tầng kỹ thuật hỗ trợ tiếp cận bị bỏ hoang: Nhiều cơ sở khám chữa bệnh chưa được trang bị bảng điện tử hiển thị số thứ tự, hoặc các hệ thống này đã bị hỏng hóc, không vận hành, buộc người khiếm thính phải phụ thuộc vào hệ thống gọi loa âm thanh vốn hoàn toàn vô dụng đối với họ.1
Những dữ liệu này khẳng định một mối quan hệ nhân quả rõ rệt: sự thiếu hụt hạ tầng hỗ trợ vật lý trực tiếp tại các bệnh viện Việt Nam chính là tác nhân đẩy người khiếm thính vào thế cô lập y tế. Do đó, việc nghiên cứu một giải pháp phần mềm di động có khả năng tự động chuyển đổi lời nói của nhân viên y tế thành văn bản và hiển thị trực quan thông qua công nghệ Thực tế tăng cường (AR) là một giải pháp công nghệ cấp thiết để lấp đầy khoảng trống hạ tầng này.
Đánh giá Hiệu năng Nhận dạng Giọng nói Tiếng Việt chuyên sâu (Vietnamese ASR)
Trái tim của hệ thống hỗ trợ giao tiếp là một bộ nhận diện giọng nói tự động (ASR) có khả năng xử lý các đặc tính âm học phức tạp của tiếng Việt. Tiếng Việt là một ngôn ngữ đơn âm tiết, có thanh điệu phức tạp (6 thanh) và tồn tại sự khác biệt rất lớn về âm sắc, từ vựng giữa ba miền Bắc, Trung, Nam.3
Để đánh giá độ chính xác của các mô hình ASR, chỉ số tiêu chuẩn được áp dụng là Tỷ lệ lỗi từ ( - Word Error Rate), được tính toán dựa trên khoảng cách biên tập Levenshtein ở cấp độ từ:

Trong đó, đại diện cho số từ bị thay thế (substitutions), là số từ bị xóa (deletions), là số từ bị chèn thêm (insertions), và là tổng số từ trong chuỗi văn bản gốc.3
Nghiên cứu phát triển PhoWhisper – một hệ thống nhận dạng giọng nói chuyên biệt cho tiếng Việt phát triển bởi VinAI Research – đã cung cấp một nguồn dữ liệu thực chứng quan trọng.5 PhoWhisper kế thừa kiến trúc Transformer chuỗi-sang-chuỗi (sequence-to-sequence) đa nhiệm của OpenAI Whisper nhưng được tinh chỉnh trên một tập dữ liệu tiếng Việt quy mô lớn lên tới 844 giờ.5 Cấu trúc tập dữ liệu huấn luyện này bao gồm 5:
CMV-Vi (14,3 giờ huấn luyện): Phần tiếng Việt thuộc tập dữ liệu Common Voice 14 của Mozilla, ghi lại giọng đọc của cộng đồng trên môi trường mạng.6
VIVOS (13,94 giờ huấn luyện): Tập dữ liệu đọc chuẩn hóa được thu âm trong môi trường phòng thu chuyên nghiệp, có độ sạch âm học rất cao.3
VLSP 2020 Task-1 (240,91 giờ huấn luyện): Tập dữ liệu thuộc cuộc thi xử lý ngôn ngữ tự nhiên tiếng Việt, phản ánh các điều kiện âm thanh thực tế.6
Dữ liệu tư nhân phân hóa sâu (585,90 giờ huấn luyện): Tập dữ liệu cực kỳ quan trọng ghi âm từ hơn 26.000 người phát ngôn trải dài khắp 63 tỉnh thành tại Việt Nam, mang lại sự hiểu biết sâu sắc về các phương ngữ miền Bắc, miền Trung, và miền Nam.5
Tiền xử lý tăng cường âm học: Để mô hình có thể hoạt động ổn định trong môi trường bệnh viện hoặc ngoài đường phố, các nhà nghiên cứu đã sử dụng thư viện Audiomentations kết hợp với bộ dữ liệu âm thanh môi trường của Piczak (2015) để chèn nhiễu nhân tạo vào dữ liệu huấn luyện.5
Quá trình tinh chỉnh được thực hiện trên cụm máy chủ gồm 8 GPU NVIDIA A100 (dung lượng bộ nhớ 40GB mỗi card), cấu hình kích thước lô (batch size) cố định ở mức 4 trên mỗi thiết bị, kết hợp với kỹ thuật tích lũy gradient (gradient accumulation) 2 bước, tạo ra một kích thước lô tổng thể là 64.5 Tốc độ học (learning rate) cực đại được điều chỉnh tương ứng với quy mô tham số mô hình, dao động từ cho phiên bản nhỏ nhất đến cho phiên bản lớn nhất, trải qua tổng cộng 48.000 bước cập nhật trọng số (tương đương khoảng 5 kỷ nguyên huấn luyện).5
Dữ liệu kiểm thử thực nghiệm của 5 biến thể PhoWhisper so với các mô hình Wav2Vec2.0 tiền nhiệm (được huấn luyện trên 13.000 giờ video YouTube tiếng Việt chưa gán nhãn và tinh chỉnh trên hơn 240 giờ dữ liệu VLSP 2020) được tổng hợp chi tiết trong bảng dưới đây 6:

Phiên bản Mô hình
Số lượng Tham số
CMV-Vi (WER)
VIVOS (WER)
VLSP Task-1 (WER)
VLSP Task-2 (WER)
PhoWhisper-tiny 6
39 Triệu 6
19,05 6
10,41 6
20,74 6
49.85 6
PhoWhisper-base 6
74 Triệu 6
16,19 6
8,46 6
19,70 6
43.01 6
PhoWhisper-small 6
244 Triệu 6
11,08 6
6.33 6
15,93 6
32,96 6
PhoWhisper-medium 6
769 Triệu 6
8,27 6
4,97 6
14,12 6
26,85 6
PhoWhisper-large 6
1,55 Tỷ 6
8,14 6
4,67 6
13,75 6
26,68 6

Kết quả phân tích số liệu thực nghiệm chỉ ra một quy luật đánh đổi công nghệ rõ rệt: mặc dù PhoWhisper-large thiết lập một đỉnh cao công nghệ mới (SOTA) về độ chính xác tại Việt Nam với chỉ số WER cực thấp ( trên tập VIVOS) 6, kích thước tham số khổng lồ (1,55 tỷ) khiến nó không thể chạy trực tiếp trên các phần cứng di động phổ thông do giới hạn bộ nhớ RAM và năng lượng.6
Đối với các ứng dụng di động hỗ trợ giao tiếp thời gian thực, PhoWhisper-small (244 triệu tham số) đại diện cho một "điểm ngọt" (sweet spot) về mặt kiến trúc phần mềm.6 Mô hình này duy trì độ chính xác ở mức xuất sắc với WER đạt trên tập dữ liệu Common Voice đầy thách thức và trên tập đọc chuẩn hóa VIVOS 6, trong khi yêu cầu tài nguyên tính toán hoàn toàn nằm trong khả năng xử lý cục bộ hoặc truyền tải biên (edge computing) của các điện thoại thông minh hiện nay.
Giải pháp Kỹ thuật Kiểm soát Ảo giác của Mô hình ASR trong Khoảng lặng
Một rào cản kỹ thuật nghiêm trọng khi đưa mô hình Whisper vào vận hành thực tế trong các không gian công cộng hoặc phòng khám bệnh là lỗi ảo giác âm học (acoustic hallucination).8 Bản chất của Whisper là một mô hình ngôn ngữ tự hồi quy (autoregressive language model) được huấn luyện trên khối lượng dữ liệu khổng lồ chứa cả tạp âm và văn bản gán nhãn yếu.8 Khi gặp các phân đoạn không chứa tiếng người (khoảng lặng dài, tiếng ồn thiết bị y tế, tiếng còi xe), bộ giải mã của Whisper thay vì giữ im lặng thì lại cố gắng dự đoán chuỗi từ tiếp theo có xác suất xuất hiện cao nhất trong phân phối huấn luyện.8
Hiện tượng này tạo ra các chuỗi văn bản hoàn toàn sai lệch.8 Chuỗi từ "Cảm ơn bạn đã xem" (hoặc "Thank you for watching") là một ví dụ điển hình của ảo giác khoảng lặng, do cụm từ này xuất hiện với tần suất cực lớn ở phần kết thúc video trên YouTube trong tập dữ liệu huấn luyện của Whisper.8 Nghiên cứu từ bài báo khoa học "Careless Whisper" chỉ ra rằng khoảng số văn bản dịch thuật của Whisper chứa các lỗi ảo giác không tồn tại trong âm thanh gốc.8 Đáng lo ngại hơn, có tới trong số các phân đoạn ảo giác này chứa các cụm từ bạo lực, xúc phạm hoặc nhạy cảm.8 Trong bối cảnh dịch vụ y tế, việc mô hình tự động tạo ra những từ ngữ sai lệch hoặc mang tính tiêu cực có thể dẫn tới những hậu quả nghiêm trọng về mặt chẩn đoán hoặc phá vỡ hoàn toàn lòng tin của người bệnh khiếm thính vào công cụ hỗ trợ.8
Các kỹ sư công nghệ đã nghiên cứu và phát triển nhiều phương pháp tối ưu hóa để loại bỏ triệt để hiện tượng ảo giác này. Một giải pháp đột phá từ nghiên cứu Calm-Whisper (Interspeech 2025) đã phân tích sâu kiến trúc bên trong của bộ giải mã Whisper-large-v3.9 Bằng cách áp dụng mặt nạ (mask) lên từng đầu chú ý tự động (attention head), các nhà nghiên cứu phát hiện ra rằng chỉ có đúng 3 trong tổng số 20 đầu chú ý của mô hình chịu trách nhiệm cho hơn lượng ảo giác phát sinh trên tập dữ liệu tiếng ồn UrbanSound.9 Bằng cách tinh chỉnh (calm-down fine-tuning) riêng biệt 3 đầu chú ý này bằng 105 giờ dữ liệu không chứa tiếng người (thu thập từ AudioSet, DEMAND, và Musan) phối hợp với nhãn trống, Calm-Whisper đã triệt tiêu được hơn lỗi ảo giác khoảng lặng mà gần như không làm suy giảm độ chính xác nhận dạng ( biến động WER).9
Đối với việc triển khai thực tế trên thiết bị di động khi chưa thể can thiệp sâu vào trọng số các đầu chú ý của mô hình gốc, các giải pháp kỹ thuật kết hợp ở cấp độ hệ thống được tổng hợp và so sánh trong bảng dưới đây:

Phương pháp Giảm thiểu
Nguyên lý Hoạt động
Ưu điểm Kỹ thuật
Hạn chế & Chi phí Vận hành
Tiền lọc Silero VAD 8
Chạy một mô hình Phát hiện Hoạt động Giọng nói (VAD) siêu nhẹ trước khi gọi Whisper; chặn hoàn toàn các khung âm thanh có xác suất chứa tiếng người .8
Loại bỏ triệt để việc Whisper xử lý các phân đoạn im lặng hoặc chỉ có tiếng ồn môi trường.8
Tăng thêm một bước xử lý tính toán nhỏ trên CPU di động.
Vô hiệu hóa Nhắc ngữ cảnh (condition_on_previous_text=False) 8
Cấm không cho mô hình sử dụng kết quả giải mã của phân đoạn trước làm gợi ý ngữ cảnh (prompt) cho phân đoạn hiện tại.8
Ngăn chặn hiện tượng lặp từ dây chuyền, nơi một từ ảo giác đơn lẻ bị khuếch đại thành chuỗi lặp vô tận.8
Làm giảm khả năng liên kết ngữ cảnh tự nhiên giữa các câu thoại dài liên tục.
Bộ lọc Từ vựng Khớp cứng (Blocklist) 8
Duy trì một tệp tin cấu hình chứa các cụm từ ảo giác điển hình của hệ thống để lọc bỏ trực tiếp bằng giải thuật so khớp chuỗi.8
Đơn giản, dễ cài đặt, không tốn tài nguyên xử lý của chip đồ họa.8
Không thể ngăn chặn các ảo giác mới lạ hoặc các từ ngữ biến thể nằm ngoài danh sách.
Giải mã Tham lam (beam_size=1) 8
Buộc bộ giải mã chỉ chọn duy nhất một mã thông báo (token) có xác suất cao nhất ở mỗi bước giải mã.8
Đẩy mô hình vào trạng thái kết thúc giải mã nhanh chóng khi gặp khoảng lặng thay vì tìm kiếm từ giả.8
Làm giảm nhẹ độ chính xác tổng thể đối với các đoạn hội thoại có âm điệu phức tạp hoặc tiếng địa phương.
Tích hợp GPT-4o-Transcribe 10
Chuyển đổi từ API Whisper-1 truyền thống sang sử dụng API giải mã giọng nói tích hợp của mô hình GPT-4o.10
Khả năng tự động lọc bỏ tiếng ồn và khoảng lặng cực kỳ thông minh nhờ kiến trúc đa phương thức.10
Đòi hỏi kết nối Internet liên tục; giới hạn thời lượng tệp tin gửi lên tối đa là 1400 giây và không hỗ trợ trả về mốc thời gian (timestamps) của từng phân đoạn từ.10

Việc tích hợp bộ lọc Silero VAD làm cổng chặn đầu vào (pre-gate), kết hợp đặt tham số cấu hình condition_on_previous_text=False, tạo nên một giải pháp bảo vệ hai lớp vững chắc cho hệ thống hỗ trợ khiếm thính.8 Sự kết hợp này đảm bảo văn bản hiển thị cho người dùng không bị nhiễu loạn bởi các thông điệp rác sinh ra từ tiếng ồn môi trường bệnh viện hoặc đường phố Việt Nam.1
Phân tích So sánh Kiến trúc Đồ họa Di động: Unity as a Library đối đầu ViroReact
Giao diện người dùng của một ứng dụng hỗ trợ người khiếm thính cần hiển thị các chỉ dẫn ba chiều (3D) trực quan, các mô phỏng ký hiệu ngôn ngữ hoặc văn bản nổi lơ lửng trong không gian thông qua công nghệ Thực tế tăng cường (AR). Để giải quyết bài toán hiển thị này, các nhà phát triển thường đứng trước sự lựa chọn giữa hai hướng tiếp cận công nghệ: sử dụng một công cụ phát triển game hoàn chỉnh như Unity nhúng vào ứng dụng thông qua tính năng Unity dưới dạng thư viện (Unity as a Library - UaaL) 12 hoặc sử dụng một thư viện kết xuất đồ họa gọn nhẹ, khai thác trực tiếp API gốc của hệ điều hành như ViroReact.14
Kiến trúc nhúng đồ họa của Unity (UaaL) hoạt động bằng cách cô lập toàn bộ runtime của công cụ và các tài nguyên đi kèm vào các gói thư viện động 12:
Trên nền tảng Android, mã nguồn được biên dịch thành một mô-đun Gradle riêng biệt mang tên unityLibrary, chạy song song và được khởi tạo bởi mô-đun ứng dụng chính (launcher).13
Trên nền tảng iOS, Unity xuất ra một mục tiêu khung liên kết động (dynamic framework target) mang tên UnityFramework.framework, cho phép ứng dụng native kiểm soát chu kỳ sống, nạp và giải phóng bộ nhớ của Unity thông qua các API Objective-C.13
Mặc dù mang lại khả năng hiển thị 3D cực kỳ mạnh mẽ, kiến trúc UaaL áp đặt một gánh nặng tài nguyên rất lớn lên thiết bị di động.18 Một dự án Unity trống hoàn toàn, khi biên dịch cho Android với cấu hình mặc định, sẽ tạo ra tệp tin cài đặt APK có dung lượng lên tới 17 MB.19 Bằng các biện pháp tối ưu hóa tối đa bao gồm chuyển đổi trình biên dịch từ Mono sang IL2CPP, áp dụng chuẩn nén LZ4HC, hạ cấp thư viện API xuống .NET Standard 2.0, thiết lập cấu hình biên dịch C++ ở chế độ Master, kích hoạt tính năng High Managed Stripping để loại bỏ các đoạn mã công cụ thừa, và loại bỏ hoàn toàn các gói mặc định (Unity Default Packages), dung lượng tệp tin tối thiểu vẫn chạm mức 6 MB.19 Khi nhúng vào ứng dụng native thực tế, tệp tin cài đặt của khách hàng thường bị phình to lên gấp 4 lần, gây ra sự e ngại lớn cho người dùng khi tải về từ các kho ứng dụng.20
Hơn thế nữa, cơ chế quản lý bộ nhớ của Unity dựa trên việc tải các AssetBundle vào RAM.21 Mỗi AssetBundle khi nạp sẽ chiếm dụng các vùng nhớ cố định cho bộ đệm tải (loading cache), cấu trúc định nghĩa kiểu dữ liệu (TypeTrees), bảng mục lục nội dung (table of contents) và bảng phụ thuộc tài nguyên (preload table).21 Các cấu trúc này không thể chia sẻ giữa các gói tài nguyên và tồn tại trong RAM suốt vòng đời của AssetBundle, dễ dẫn tới hiện tượng phân mảnh bộ nhớ và tràn RAM trên các thiết bị cấu hình thấp.21
Về mặt năng lượng, Unity vận hành một vòng lặp kết xuất (render loop) liên tục ở tốc độ khung hình tối đa, bắt buộc GPU phải vẽ lại toàn bộ màn hình ngay cả khi không có bất kỳ chuyển động nào xảy ra trong phân cảnh.18 Điều này dẫn tới hiện tượng quá nhiệt và sụt pin cực kỳ nhanh chóng trên thiết bị di động.18
Quan trọng nhất, đối với một ứng dụng hướng tới đối tượng người khiếm thính, Unity hoàn toàn không tương thích với các công nghệ hỗ trợ tiếp cận (accessibility) mặc định của hệ điều hành di động.18 Công cụ này không hỗ trợ chế độ tương phản cao, không thể tự động điều chỉnh kích thước văn bản giao diện theo cấu hình hệ thống, không hỗ trợ các trình đọc màn hình (screen readers) cho người có thị lực kém, và không thể tích hợp các trình quản lý mật khẩu hay cơ chế nhập văn bản trực tiếp.18 Khi người dùng chạm vào một ô nhập liệu trong môi trường Unity, hệ thống buộc phải mở ra một cửa sổ pop-up phụ độc lập để nhận ký tự, gây đứt gãy trải nghiệm người dùng nghiêm trọng.18
Ngược lại, ViroReact đại diện cho một triết lý thiết kế hoàn toàn khác biệt dành cho hệ sinh thái React Native và Expo.15 ViroReact không nhúng một công cụ đồ họa độc lập, mà nó đóng vai trò là một cầu nối khai thác trực tiếp các bộ công cụ AR gốc được tích hợp sẵn trong nhân hệ điều hành: ARKit của Apple trên iOS và ARCore của Google trên Android.15 ViroReact chuyển đổi các thẻ khai báo dạng JSX hoặc TSX thân thuộc của nhà phát triển thành các lệnh vẽ đồ họa native (native draw calls) chạy trực tiếp trên phần cứng của thiết bị với tốc độ tối đa.15 Phần lõi kết xuất của nó trên Android (được biết đến với tên gọi ViroCore) được xây dựng chủ yếu bằng ngôn ngữ C++ hiệu năng cao (~68.4% mã nguồn) và liên kết chặt chẽ với phần cứng.24
Nhờ kiến trúc tận dụng hạ tầng hệ thống có sẵn, ViroReact mang lại những ưu thế vượt trội cho một ứng dụng tiện ích xã hội 15:
Tích hợp hoàn hảo các tính năng tiếp cận: Do các thành phần giao diện của ViroReact được ánh xạ thành các khung nhìn native (native views), ứng dụng hoàn toàn thừa hưởng các cài đặt hệ thống của người dùng như chế độ giao diện tối (dark mode), bộ lọc tương phản cao, và khả năng phóng to chữ tự động.15
Tiêu thụ năng lượng tối ưu: Công cụ kết xuất chỉ thực hiện các lệnh vẽ khi có sự thay đổi thực sự trong phân cảnh 3D, giúp giảm thiểu đáng kể chu kỳ hoạt động của GPU, từ đó tiết kiệm pin và giữ cho thiết bị luôn mát mẻ trong suốt thời gian dài giao tiếp.15
Bảo toàn dung lượng lưu trữ: Ứng dụng không phải gánh thêm hàng chục megabyte mã nguồn của một engine game, giúp tệp tin cài đặt cực kỳ gọn nhẹ, dễ dàng tiếp cận bởi mọi cấu hình máy.15
Bảng so sánh chi tiết dưới đây làm rõ sự khác biệt mang tính chiến lược giữa hai công nghệ hiển thị 15:

Tiêu chí Đánh giá
Giải pháp Nhúng Unity (UaaL)
Giải pháp Tích hợp ViroReact
Dung lượng Tệp cài đặt
Rất nặng ( sau tối ưu hóa kịch khung; thực tế thường phình to ứng dụng thêm 4 lần).19
Rất nhẹ; không chứa mã nguồn engine cồng kềnh nhờ tận dụng thư viện hệ thống.15
Mức độ Chiếm dụng RAM
Lớn; đòi hỏi duy trì bộ nhớ đệm cho AssetBundle, cấu trúc TypeTrees và bộ dọn rác (GC) của Unity.21
Thấp; chỉ tiêu hao bộ nhớ cho các tài nguyên mô hình 3D thực tế được nạp vào GPU.15
Mức độ Tiêu hao Pin
Rất cao; GPU liên tục hoạt động do render loop hoạt động không ngừng nghỉ ở tốc độ khung hình tối đa.18
Thấp; tối ưu hóa chu kỳ vẽ đồ họa dựa trên các sự kiện thay đổi thực tế của phân cảnh.15
Hỗ trợ Tiếp cận (Accessibility)
Không hỗ trợ; không tương thích với công cụ đọc màn hình, chế độ phóng to chữ hay tương phản cao của hệ điều hành.18
Hỗ trợ tuyệt đối; thừa hưởng toàn bộ các tính năng trợ năng mặc định của nền tảng di động.15
Nhập liệu Văn bản
Bất tiện; bắt buộc sử dụng cửa sổ nhập liệu phụ (pop-up) thay vì cho phép gõ trực tiếp trong phân cảnh.18
Mượt mà; tương tác trực tiếp với bàn phím native của hệ điều hành ngay tại vùng giao diện hiển thị.15
Độ phức tạp Phát triển
Rất cao; đòi hỏi kiến thức chuyên sâu về Gradle, cấu trúc Xcode đa mục tiêu và quản lý chu kỳ sống phức tạp.13
Thấp; phát triển bằng mã nguồn khai báo React Native / TypeScript thống nhất một ngôn ngữ duy nhất.14
Bản quyền & Giấy phép
Sở hữu trí tuệ đóng; chịu ràng buộc bởi các điều khoản thương mại và phí bản quyền của Unity Technologies.18
Mã nguồn mở hoàn toàn; phân phối tự do dưới giấy phép MIT, dễ dàng tùy biến sâu.16

Đối với một đề tài luận văn hướng tới việc tạo ra một công cụ hỗ trợ người khuyết tật có tính ứng dụng thực tiễn cao, hoạt động bền bỉ trong môi trường y tế công cộng đầy biến động, ViroReact là sự lựa chọn tối ưu về mặt kiến trúc phần mềm, vượt trội hoàn toàn so với Unity về khả năng tiếp cận, tính hiệu quả tài nguyên và độ mượt mà khi tương tác.15
Quy trình Tự động hóa Biên dịch Cục bộ và Triển khai Thử nghiệm Unsigned trên iOS
Trong quá trình thực hiện đề tài nghiên cứu, việc thử nghiệm thực địa trên các thiết bị di động thực tế là bắt buộc để thu thập dữ liệu phản hồi từ người khiếm thính. Tuy nhiên, chính sách kiểm soát bảo mật nghiêm ngặt của Apple yêu cầu mọi ứng dụng muốn cài đặt lên thiết bị iPhone vật lý phải được ký số bằng chứng thư của nhà phát triển, đi kèm mức phí thường niên là $99 USD.29 Apple có áp dụng chương trình miễn phí thường niên (fee waivers) này, nhưng chỉ giới hạn cho các tổ chức phi lợi nhuận chính thức, các trường đại học được công nhận hoặc cơ quan chính phủ, đồng thời cấm tuyệt đối việc phát hành ứng dụng có thu phí hay tích hợp mua sắm.29 Đối với các nghiên cứu sinh hoặc nhóm phát triển độc lập, rào cản tài chính này có thể làm chậm tiến độ thử nghiệm thực tế.31
Để giải quyết nút thắt này, quy trình biên dịch cục bộ ứng dụng iOS không ký số (unsigned target compilation) được thiết lập. Ứng dụng sau khi biên dịch thành tệp tin cài đặt .ipa chưa ký số sẽ được nạp trực tiếp vào điện thoại thử nghiệm thông qua các công cụ hỗ trợ cài đặt ngoài (sideloading) như Sideloadly hoặc AltStore bằng tài khoản Apple cá nhân miễn phí.32 Quy trình này giúp nhà nghiên cứu triển khai thử nghiệm trên thiết bị thực tế một cách nhanh chóng mà không tốn bất kỳ chi phí nào.33
Để tự động hóa quy trình phức tạp này, một kịch bản dòng lệnh được xây dựng dựa trên công cụ tự động hóa nhiệm vụ just và trình biên dịch dòng lệnh xcodebuild của Apple.34 Quy trình tự động hóa này bao gồm bốn bước thực thi tuần tự được mô tả chi tiết dưới đây:
Bước 1: Làm sạch sâu Hệ thống (Deep Clean)
Tất cả các tiến trình Xcode đang chạy ngầm sẽ bị cưỡng chế tắt để giải phóng tệp tin khóa. Toàn bộ các thư mục chứa dữ liệu biên dịch tạm thời, bộ nhớ đệm CocoaPods, tệp khóa liên kết và thư mục dữ liệu dẫn xuất (DerivedData) của dự án sẽ bị xóa bỏ hoàn toàn nhằm loại bỏ triệt để các xung đột bộ nhớ đệm từ các lần biên dịch trước 34:

Bash
#!/usr/bin/env bash
set -e
echo "🧹 Đang tiến hành dọn dẹp sâu hệ thống..."

# Cưỡng chế tắt ứng dụng Xcode nếu đang vận hành

killall Xcode 2>/dev/null || true
sleep 2

# Xóa bỏ hoàn toàn các thư mục build tạm thời và bộ nhớ đệm

rm -rf build/
rm -rf ios/build/
rm -rf ios/Pods
rm -rf ios/Podfile.lock
rm -rf ~/Library/Developer/Xcode/DerivedData/PushUP\*

echo "✅ Hoàn tất quá trình dọn dẹp hệ thống."

Bước 2: Khai báo Môi trường và Biên dịch Không ký số (Unsigned Build)
Trước khi gọi trình biên dịch, kịch bản tiến hành kiểm tra và nạp các biến môi trường của Node.js để đảm bảo bộ đóng gói mã nguồn của React Native (Metro Packager) được liên kết chính xác.34 Lệnh xcodebuild sau đó được gọi với tham số vô hiệu hóa việc yêu cầu chứng thư ký số 34:

Bash
#!/usr/bin/env bash
set -euo pipefail
echo "🔨 Khởi động tiến trình biên dịch mã nguồn..."

# Nạp cấu hình đường dẫn Node.js cho Xcode

if [ -f ios/.xcode.env.local ]; then
source ios/.xcode.env.local
elif [ -f ios/.xcode.env ]; then
source ios/.xcode.env
fi
export NODE_BINARY

# Thực thi biên dịch dòng lệnh không yêu cầu ký số

xcodebuild build \
 -workspace ios/PushUP.xcworkspace \
 -scheme PushUP \
 -configuration Release \
 -sdk iphoneos \
 -destination 'generic/platform=iOS' \
 -allowProvisioningUpdates \
 CODE_SIGN_STYLE=Automatic \
 CODE_SIGNING_ALLOWED=NO \
 ONLY_ACTIVE_ARCH=NO

Bước 3: Đóng gói Lưu trữ Xcode (Archive Process)
Sau khi quá trình biên dịch kiểm tra hoàn tất không phát sinh lỗi cú pháp, hệ thống tiến hành tạo tệp tin lưu trữ phân phối .xcarchive.34 Trong bước này, cờ cấu hình CODE_SIGNING_ALLOWED=NO tiếp tục được áp dụng để ngăn Xcode cố gắng tìm kiếm tài khoản nhà phát triển trả phí trên máy chủ Apple 34:

Bash
#!/usr/bin/env bash
set -euo pipefail
echo "📦 Đang khởi tạo tệp tin lưu trữ hệ thống (.xcarchive)..."

if [ -f ios/.xcode.env.local ]; then
source ios/.xcode.env.local
elif [ -f ios/.xcode.env ]; then
source ios/.xcode.env
fi
export NODE_BINARY

# Đóng gói toàn bộ tài nguyên ứng dụng vào tệp xcarchive

xcodebuild archive \
 -workspace ios/PushUP.xcworkspace \
 -scheme PushUP \
 -configuration Release \
 -sdk iphoneos \
 -destination 'generic/platform=iOS' \
 -archivePath build/PushUP.xcarchive \
 -allowProvisioningUpdates \
 CODE_SIGNING_ALLOWED=NO \
 CODE_SIGN_STYLE=Automatic \
 ONLY_ACTIVE_ARCH=NO

Bước 4: Trích xuất và Tạo tệp cài đặt Unsigned IPA
Do Apple không hỗ trợ xuất trực tiếp tệp cài đặt .ipa từ một lưu trữ không được ký số thông qua công cụ Organizer thông thường, hệ thống thực hiện một giải pháp đóng gói thủ công.34
Bản chất của một tệp cài đặt .ipa trên iOS thực tế là một tệp nén định dạng ZIP chứa một cấu trúc thư mục tiêu chuẩn bắt buộc mang tên Payload, bên trong chứa thư mục ứng dụng dạng .app.34 Kịch bản dòng lệnh dưới đây tự động trích xuất tệp .app đã được biên dịch từ gói .xcarchive, di chuyển nó vào thư mục cấu trúc tiêu chuẩn và nén lại thành tệp cài đặt .ipa hoàn chỉnh 34:

Bash
#!/usr/bin/env bash
set -euo pipefail
echo "📱 Đang đóng gói tệp tin cài đặt IPA không ký số..."

# Xác minh sự tồn tại của tệp lưu trữ nguồn

if [! -d build/PushUP.xcarchive ]; then
echo "❌ Lỗi: Không tìm thấy thư mục lưu trữ tại build/PushUP.xcarchive"
exit 1
fi

# Tìm kiếm thư mục ứng dụng.app đã được biên dịch bên trong gói xcarchive

APP_PATH=$(find build/PushUP.xcarchive/Products/Applications -name "\*.app" -maxdepth 1 | head -n 1)
if; then
echo "❌ Lỗi: Không thể tìm thấy tệp tin thực thi.app trong gói lưu trữ"
exit 1
fi

APP_NAME=$(basename "$APP_PATH")
IPA_NAME="${APP_NAME%.app}.ipa"
echo "Đã tìm thấy thư mục thực thi: $APP_NAME"

# Tạo dựng cấu trúc thư mục Payload tiêu chuẩn của hệ điều hành iOS

rm -rf build/ipa/Payload
mkdir -p build/ipa/Payload

# Sao chép tệp tin thực thi.app vào thư mục Payload

cp -r "$APP_PATH" build/ipa/Payload/

# Tiến hành nén ZIP thư mục Payload để tạo tệp.ipa

cd build/ipa
rm -f "$IPA_NAME"
zip -r "$IPA_NAME" Payload > /dev/null
rm -rf Payload

echo "✅ Thành công: Tệp cài đặt Unsigned IPA đã được khởi tạo tại: build/ipa/$IPA_NAME"

Đối với các nhà phát triển sử dụng bộ công cụ Expo, quy trình biên dịch cục bộ này có thể được đơn giản hóa bằng cách cấu hình tệp tin eas.json.36 Bằng việc khai báo thuộc tính "withoutCredentials": true và thiết lập thuộc tính "distribution": "internal", lệnh eas build --platform ios --local sẽ tự động thực hiện các bước biên dịch dòng lệnh tương đương để xuất ra một tệp tin cài đặt .ipa không ký số trực tiếp trên máy tính macOS cục bộ.36
Giải pháp tự động hóa này tháo gỡ hoàn toàn các rào cản tài chính và thủ tục hành chính phức tạp của Apple trong giai đoạn nghiên cứu ban đầu.30 Nó cho phép các nhà nghiên cứu nhanh chóng cài đặt ứng dụng thử nghiệm lên thiết bị của những tình nguyện viên khiếm thính Việt Nam để thực hiện các đánh giá định tính và tối ưu hóa giải thuật trước khi tiến hành các thủ tục phát hành chính thức lên App Store.1
Kết luận và Khuyến nghị Thiết kế Hệ thống cho Luận văn
Thông qua quá trình nghiên cứu và tổng hợp các nguồn dữ liệu thực chứng chuyên sâu, một thiết kế hệ thống tối ưu cho ứng dụng hỗ trợ giao tiếp thời gian thực dành cho người khiếm thính tại Việt Nam được đề xuất nhằm phục vụ trực tiếp cho nội dung thực nghiệm của luận văn:

+---------------------------------------------------------------------------------------------------+
| KIẾN TRÚC HỆ THỐNG ĐỀ XUẤT |
+---------------------------------------------------------------------------------------------------+
| |
| +----------------------+ |
| | Âm thanh Đầu vào | |
| +----------+-----------+ |
| | |
| v |
| +----------+-----------+ |
| | Silero VAD (Cổng lọc)| |
| +----------+-----------+ |
| | |
| Giọng nói? | Không |
| +----------------+---------------+ |
| | | |
| Có | v |
| v +--------+--------+ |
| +---------+---------+ | Hủy xử lý | |
| | PhoWhisper-Small | | (Tránh nhiễu) | |
| | (244M Tham số) | +-----------------+ |
| +---------+---------+ |
| | |
| v |
| +---------+---------+ |
| | Văn bản Tiếng Việt| |
| | Chuẩn hóa | |
| +---------+---------+ |
| | |
| v |
| +---------+---------+ |
| | Giao diện | |
| | ViroReact (Native)| |
| +-------------------+ |
| |
+---------------------------------------------------------------------------------------------------+

Về mô hình nhận dạng giọng nói (ASR Core): Luận văn nên bảo vệ việc sử dụng mô hình PhoWhisper-small (244 triệu tham số) thay vì các biến thể quá lớn hoặc quá nhỏ.6 Với WER đạt trên tập dữ liệu Common Voice tiếng Việt thực tế và kích thước tham số vừa phải, mô hình này đảm bảo tốc độ phản hồi nhanh (độ trễ thấp) và độ chính xác vượt trội khi xử lý giọng nói đa vùng miền của các bác sĩ, dược sĩ hoặc người đối thoại trong môi trường y tế Việt Nam.1
Về cơ chế kiểm soát lỗi ảo giác khoảng lặng: Hệ thống bắt buộc phải tích hợp thư viện Silero VAD làm bộ tiền lọc âm thanh trước khi đưa vào mô hình giải mã ASR.8 Đồng thời, cấu hình giải mã phải thiết lập tham số condition_on_previous_text=False để triệt tiêu hoàn toàn hiện tượng lặp từ và tạo văn bản ảo giác ngoài ý muốn trong môi trường bệnh viện ồn ào.8
Về nền tảng hiển thị giao diện 3D/AR: Luận văn cần loại bỏ phương án sử dụng Unity (UaaL) do những hạn chế nghiêm trọng về dung lượng, sụt pin nhanh và đặc biệt là không tương thích với các chế độ trợ năng dành cho người khuyết tật.18 Thay vào đó, việc phát triển giao diện trên nền tảng ViroReact (kết hợp React Native) là lựa chọn tối ưu, đảm bảo ứng dụng nhẹ hơn, tiết kiệm pin hơn và tương thích hoàn toàn với các công cụ hỗ trợ người khuyết tật có sẵn trên hệ điều hành iOS và Android.15
Về quy trình thử nghiệm thực địa: Thiết lập và duy trì quy trình tự động hóa đóng gói Unsigned IPA cục bộ.34 Quy trình này giúp nhóm nghiên cứu có thể phân phối tệp tin cài đặt trực tiếp tới điện thoại iPhone của các tình nguyện viên khiếm thính thông qua Sideloadly hoặc AltStore mà không gặp rào cản chi phí, từ đó đẩy nhanh tiến độ thu thập phản hồi thực tế và hoàn thiện luận văn một cách thực chứng nhất.32
Works cited
Việt Nam có khoảng 2,5 triệu người khuyết tật nghe nói - Hoạt động ..., accessed May 25, 2026, https://adminmoh.moh.gov.vn/vi_VN/web/guest/hoat-dong-cua-lanh-dao-bo/-/asset_publisher/k206Q9qkZOqn/content/viet-nam-co-khoang-2-5-trieu-nguoi-khuyet-tat-nghe-noi
Việt Nam có khoảng 2,5 triệu người khuyết tật nghe nói, accessed May 25, 2026, https://suckhoedoisong.vn/viet-nam-co-khoang-25-trieu-nguoi-khuyet-tat-nghe-noi-169241225235424759.htm
Vietnamese Automatic Speech Recognition: A Revisit - arXiv, accessed May 25, 2026, https://arxiv.org/html/2603.14779v1
Vietnamese Automatic Speech Recognition: A Revisit - arXiv, accessed May 25, 2026, https://arxiv.org/pdf/2603.14779
[Literature Review] PhoWhisper: Automatic Speech Recognition for Vietnamese - Moonlight, accessed May 25, 2026, https://www.themoonlight.io/en/review/phowhisper-automatic-speech-recognition-for-vietnamese
PHOWHISPER: AUTOMATIC SPEECH ... - OpenReview, accessed May 25, 2026, https://openreview.net/pdf?id=x3c3MkJfpG
PhoWhisper: Advancements in Vietnamese ASR - ICLR 2024 Tiny Paper - Studocu Vietnam, accessed May 25, 2026, https://www.studocu.vn/vn/document/university-of-science-vnuhcm/mang-may-tinh/phowhisper-advancements-in-vietnamese-asr-iclr-2024-tiny-paper/142661027
We collected 135 phrases Whisper hallucinates during silence — here's what it says when nobody's talking and how we stopped it : r/LocalLLaMA - Reddit, accessed May 25, 2026, https://www.reddit.com/r/LocalLLaMA/comments/1rlqfd7/we_collected_135_phrases_whisper_hallucinates/
Reduce Whisper Hallucination On Non-Speech By Calming Crazy Heads Down - arXiv, accessed May 25, 2026, https://arxiv.org/html/2505.12969v1
How I Completely Eliminated Whisper-1 Hallucinations by Switching to gpt-4o-transcribe, accessed May 25, 2026, https://zenn.dev/daishiro/articles/whisper-hallucination-gpt4o-transcribe?locale=en
Reduce Whisper Hallucination On Non-Speech By Calming Crazy Heads Down - arXiv, accessed May 25, 2026, https://arxiv.org/abs/2505.12969
Unity as a Library. For native mobile apps written in Objective C & Java | AR for Android & iOS, accessed May 25, 2026, https://unity.com/features/unity-as-a-library
Using Unity as a library in native iOS/Android apps - Page 4, accessed May 25, 2026, https://discussions.unity.com/t/using-unity-as-a-library-in-native-ios-android-apps/744882?page=4
@reactvision/react-viro - npm, accessed May 25, 2026, https://www.npmjs.com/package/@reactvision/react-viro
ViroReact - Open-Source AR & VR for React Native and Expo - ReactVision, accessed May 25, 2026, https://reactvision.xyz/viro-react/
Overview - ReactVision - ViroReact, accessed May 25, 2026, https://viro-community.readme.io/docs/overview
Integrating Unity Games into React Native for Android, accessed May 25, 2026, https://reactnativeexpert.com/blog/unity-integration-in-react-native/
Unity for entire business app or just part of it? - News & General Discussion, accessed May 25, 2026, https://discussions.unity.com/t/unity-for-entire-business-app-or-just-part-of-it/907365
Optimizing Unity's Build Size for Mobile Games | BusyBytes Blog, accessed May 25, 2026, https://busybytes.de/blog/optimize-build-size-mobile-games-unity/
Size problem when using Unity as library in a Native Android App, accessed May 25, 2026, https://discussions.unity.com/t/size-problem-when-using-unity-as-library-in-a-native-android-app/863690
AssetBundle memory overhead | Addressables | 2.0.8 - Unity - Manual, accessed May 25, 2026, https://docs.unity3d.com/Packages/com.unity.addressables@2.0/manual/memory-assetbundles.html
Estimate an AssetBundle size in RAM - Game Development Stack Exchange, accessed May 25, 2026, https://gamedev.stackexchange.com/questions/173326/estimate-an-assetbundle-size-in-ram
Intro to VR in React Native with ViroReact - Topcoder, accessed May 25, 2026, https://www.topcoder.com/thrive/articles/intro-to-vr-in-react-native-with-viroreact
ReactVision/virocore - A cross-platform AR/VR renderer - GitHub, accessed May 25, 2026, https://github.com/ReactVision/virocore
Getting Started with ARCore development using Java and ViroCore - Viro Media, accessed May 25, 2026, https://blog.viromedia.com/getting-started-with-arcore-development-using-java-and-virocore-ebbb36aa6ca3
(PDF) Photogrammetric techniques and algorithms optimization for the development of interactive Augmented Reality systems - ResearchGate, accessed May 25, 2026, https://www.researchgate.net/publication/396333101_Photogrammetric_techniques_and_algorithms_optimization_for_the_development_of_interactive_Augmented_Reality_systems
Cloud-based cross-platform collaborative augmented reality in flutter - Frontiers, accessed May 25, 2026, https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2022.1021932/full
GitHub - viromedia/viro: ViroReact: AR and VR using React Native, accessed May 25, 2026, https://github.com/viromedia/viro
Apple Developer Program Fee Waiver - Membership - Account - Help, accessed May 25, 2026, https://developer.apple.com/help/account/membership/fee-waivers/
Apple Developer Program, accessed May 25, 2026, https://developer.apple.com/programs/
Is EAS build possible without developer account and without Xcode and Android Studio?, accessed May 25, 2026, https://stackoverflow.com/questions/78495027/is-eas-build-possible-without-developer-account-and-without-xcode-and-android-st
Build unsigned iOS ipa to install via Sideloadly! - DEV Community, accessed May 25, 2026, https://dev.to/oivoodoo/build-unsigned-ios-ipa-to-install-via-sideloadly-236f
Export to iOS without Owning a Mac!! Tutorial : r/godot - Reddit, accessed May 25, 2026, https://www.reddit.com/r/godot/comments/1g08tpu/export_to_ios_without_owning_a_mac_tutorial/
Build unsigned iOS ipa to install via Sideloadly! | by Alexandr Korsak ..., accessed May 25, 2026, https://oivoodoo.medium.com/build-unsigned-ios-ipa-to-install-via-sideloadly-930e00ac9b26
First Release Pipeline - Codemagic Docs, accessed May 25, 2026, https://docs.codemagic.io/yaml-quick-start/first-signed-build/
accessed May 25, 2026, https://docs.expo.dev/llms-eas.txt
tkhq/passkeyapp: Minimal React Native app featuring native passkeys and integration with Turnkey - GitHub, accessed May 25, 2026, https://github.com/tkhq/passkeyapp
