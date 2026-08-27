const GAS_URL = "https://script.google.com/macros/s/AKfycbx5g4LX9dchD2RUsEHga1xVgXPn3LidoWh1OJ7TbxpIin0UrfgkgZZRTK3SRS86zcJJ/exec";
let currentLang = 'th';

const i18n = {
    'th': {
        mainTitle: 'แบบฟอร์มแจ้งความประสงค์ตรวจสุขภาพสำหรับองค์กร', downloadTemp: 'ดาวน์โหลด Template รายชื่อผู้ตรวจสุขภาพ (Excel)',
        orgInfo: 'ข้อมูลองค์กร', orgName: 'ชื่อองค์กร', authName: 'ชื่อผู้มีอำนาจลงนาม', position: 'ตำแหน่ง', email: 'อีเมล', phone: 'เบอร์โทรศัพท์',
        taxInfo: 'เอกสารประกอบการเปิดเครดิต', taxId: 'เลขประจำตัวผู้เสียภาษี', addressNo: 'เลขที่/อาคาร/ชั้น', street: 'ถนน', soi: 'ซอย', zipcode: 'รหัสไปรษณีย์', subdistrict: 'แขวง/ตำบล', district: 'เขต/อำเภอ', province: 'จังหวัด',
        fileReg: 'สำเนาใบจดทะเบียนการค้า (เฉพาะบริษัทใหม่)', fileVat: 'สำเนาใบ ภ.พ.20 (เฉพาะบริษัทใหม่)', 
        payTitle: 'รูปแบบการชำระเงิน', payBank: 'โอนเงินผ่านธนาคาร (ล่วงหน้า 7 วัน)', payCash: 'ชำระเงินสด (วันเข้ารับบริการ)', payCredit: 'วางบิลบริษัท - เครดิต 30 วัน (เฉพาะยอดขั้นต่ำ 50,000 บาท)',
        billInfoTitle: 'ข้อมูลสำหรับวางบิล', billAddress: 'ที่อยู่บริษัท', sameAddress: 'ใช้ที่อยู่เดียวกับบริษัท', billContact: 'ชื่อผู้ติดต่อ', billPhone: 'เบอร์โทร', billDateStr: 'ระบุวันวางบิล',
        srvTitle: 'ประเภทบริการ', srvAnnual: 'ตรวจสุขภาพประจำปี', srvPreEmp: 'ตรวจสุขภาพก่อนเข้าทำงาน', srvWorkPermit: 'ตรวจสุขภาพ Work Permit', srvPap: 'คัดกรองมะเร็งปากมดลูก', srvFlu: 'ฉีดวัคซีนไข้หวัดใหญ่', srvOther: 'อื่นๆ โปรดระบุ',
        dateTitle: 'กำหนดการเข้ารับบริการ', dateStart: 'ตั้งแต่วันที่', dateEnd: 'ถึงวันที่', dateCount: 'จำนวนผู้เข้ารับบริการ (คน)', dateRemark: '*กรุณาเลือกวันเข้ารับบริการล่วงหน้าอย่างน้อย 10 วันทำการ',
        emTitle: 'ผู้ประสานงานกรณีเร่งด่วน', emName: 'ชื่อ-นามสกุล', emPosition: 'ตำแหน่ง', emMobile: 'โทรศัพท์มือถือ', emOffice: 'โทรศัพท์สำนักงาน',
        resTitle: 'วิธีการยืนยันสิทธิ์เข้ารับบริการ', resVerify: 'วิธีการยืนยันสิทธิ์:', resIdCard: 'ใช้บัตรประชาชน (บริษัท/HR ต้องส่งรายชื่อผู้เข้ารับบริการล่วงหน้าอย่างน้อย 10 วันทำการ ก่อนวันตรวจ)', resReferral: 'ใช้ใบส่งตัวจากบริษัท (กรณีตรวจสุขภาพก่อนเข้าทำงาน)', resDeliPerson: 'การจัดส่งผลตรวจรายบุคคล:', resDeliEmp: 'จัดส่งให้พนักงานโดยตรง', resDeliHR: 'จัดส่งให้บริษัท/ผู้ประสานงาน HR', resDeliSelf: 'รับผลด้วยตนเองที่โรงพยาบาล', resDeliReport: 'การจัดส่งรายงานผลภาพรวมของบริษัท:', resRepNone: 'ไม่ต้องการ', resRepSummary: 'ต้องการรายงานสรุปผลในภาพรวม 1 ฉบับ', resRepCopy: 'ต้องการสำเนาผลตรวจของพนักงานแต่ละรายบุคคล',
        sumTitle: 'เลือูปแบบการสรุปผล', fmt1Title: 'รูปแบบที่ 1', fmt1Desc: 'สรุปรวมตามสัญชาติ', fmt2Title: 'รูปแบบที่ 2', fmt2Desc: 'สรุปรวมภาษาไทย', fmt3Title: 'รูปแบบที่ 3', fmt3Desc: 'สรุปรวมภาษาอังกฤษ', sumRecTitle: 'ข้อมูลผู้รับผลรายงาน', sumName: 'ชื่อผู้รับผลรายงานตรวจสุขภาพ', sumPhone: 'เบอร์โทร', sumAddress: 'ที่อยู่', sumNote: '(หมายเหตุ: กรุณาเลือกความประสงค์เพียง 1 รายการ ทั้งนี้ หากประสงค์รับทั้งรายงานสรุปผลในภาพรวมและผลการตรวจสุขภาพรายบุคคล ภายหลังจากตอบรับแล้ว อาจมีค่าใช้จ่ายเพิ่มเติมตามเงื่อนไขที่กำหนด)',
        attachTitle: 'เอกสารแนบเพิ่มเติม', attachEmp: 'ไฟล์รายชื่อพนักงานที่ตรวจ (Excel)', attachQuote: 'ใบเสนอราคาพร้อมประทับตราบริษัท', attachReferral: 'ตัวอย่างใบส่งตัวของบริษัท (เฉพาะตรวจสุขภาพก่อนเข้าทำงาน)',
        btnPreview: 'ตรวจสอบข้อมูล (Preview)', pdpaTitle: 'บริษัทรับทราบและตกลงยินยอมให้เผยแพร่ข้อมูลส่วนบุคคลในการลงทะเบียนครั้งนี้', btnAccept: 'ยอมรับ',
        swalAlertInfo: 'คำแนะนำก่อนเริ่ม', swalAlertDesc: 'เพื่อให้การส่งข้อมูลการตรวจสุขภาพเป็นไปอย่างครบถ้วน<br><b>กรุณาเตรียมข้อมูลและเอกสารที่เกี่ยวข้องให้เรียบร้อย</b><br>ก่อนเริ่มกรอกแบบฟอร์ม', swalBtnAck: 'รับทราบและเริ่มกรอกข้อมูล', swalPreviewTitle: 'บันทึกรับทราบและยินยอม (Preview)', swalBtnConfirm: 'ยืนยันการส่งข้อมูล', swalBtnEdit: 'แก้ไขข้อมูล', swalSending: 'กำลังส่งข้อมูล...', swalSuccess: 'ส่งข้อมูลเรียบร้อยแล้ว', swalSuccessDesc: 'เจ้าหน้าที่จะตรวจสอบข้อมูลและติดต่อกลับภายใน 2 วันทำการ', swalError: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่', popupHRTitle: 'ระบุข้อมูลผู้รับผล (HR)', popupHRName: 'ชื่อ-นามสกุล', popupHRPhone: 'เบอร์โทรศัพท์', dateErrTitle: 'วันที่ไม่ถูกต้อง', dateErrMsg: 'กรุณาระบุวันที่เริ่มต้นล่วงหน้าอย่างน้อย 10 วันนับจากวันนี้', dateEndErrMsg: 'วันที่สิ้นสุดต้องไม่น้อยกว่าวันที่เริ่มต้น',
        pdpaHeader: 'บริษัทรับทราบข้อมูลและขอแสดงเจตนายินยอม ดังต่อไปนี้', pdpaP1: 'บริษัทยินยอมให้โรงพยาบาลกรุงเทพคริสเตียน ในฐานะผู้ควบคุมข้อมูลส่วนบุคคลดำเนินการเก็บรวบรวม ใช้ หรือเปิดเผย ข้อมูลส่วนบุคคล <b>เพื่อวัตถุประสงค์ต่าง ๆ ดังนี้</b>', pdpaP2: '<b>1.เพื่อวัตถุประสงค์ในการตรวจรักษาโรคและให้บริการทางการแพทย์</b>', pdpaP3: '<b>2.เพื่อเชื่อมโยงฐานข้อมูลอิเล็กทรอนิกส์ด้านเวชระเบียน</b>', pdpaP4: '<b>3.เพื่อใช้สิทธิเรียกค่าสินไหมทดแทนจากบริษัทประกันภัย</b>', pdpaP5: '<b>4.เพื่อนำเสนอข้อมูลข่าวสารของโรงพยาบาล ฯ</b>', pdpaP6: 'ทั้งนี้ บริษัทได้อ่านนโยบายคุ้มครองข้อมูลส่วนบุคคลโดยสแกน QR Code แล้ว', pdpaP7: 'บริษัททราบว่าสามารถถอนความยินยอมนี้เสียเมื่อใดก็ได้'
    },
    'en': {
        mainTitle: 'Corporate Health Checkup Request Form', downloadTemp: 'Download Attendee List Template (Excel)',
        orgInfo: 'Organization Info', orgName: 'Company Name', authName: 'Authorized Signatory', position: 'Position', email: 'Email', phone: 'Phone Number',
        taxInfo: 'Credit Opening Documents', taxId: 'Tax ID', addressNo: 'Building/Floor/Room', street: 'Street', soi: 'Alley', zipcode: 'Zip Code', subdistrict: 'Sub-district', district: 'District', province: 'Province',
        fileReg: 'Copy of Commercial Registration (New Company Only)', fileVat: 'Copy of VAT 20 (New Company Only)', 
        payTitle: 'Payment Method', payBank: 'Bank Transfer (7 days in advance)', payCash: 'Cash (On service day)', payCredit: 'Corporate Billing - 30 days credit (Min. 50,000 THB)',
        billInfoTitle: 'Billing Information', billAddress: 'Company Address', sameAddress: 'Use same address as company', billContact: 'Contact Person', billPhone: 'Phone', billDateStr: 'Billing Date',
        srvTitle: 'Service Type', srvAnnual: 'Annual Health Checkup', srvPreEmp: 'Pre-employment Checkup', srvWorkPermit: 'Work Permit Checkup', srvPap: 'Cervical Cancer Screening', srvFlu: 'Influenza Vaccine', srvOther: 'Other, please specify',
        dateTitle: 'Service Schedule', dateStart: 'Start Date', dateEnd: 'End Date', dateCount: 'Number of Attendees', dateRemark: '*Please select a service date at least 10 working days in advance.',
        emTitle: 'Emergency Contact', emName: 'Full Name', emPosition: 'Position', emMobile: 'Mobile Phone', emOffice: 'Office Phone',
        resTitle: 'Service Verification Method', resVerify: 'Verification Method:', resIdCard: 'ID Card (Company/HR must submit attendee list at least 10 working days prior)', resReferral: 'Company Referral Letter (For Pre-employment Checkup)', resDeliPerson: 'Individual Result Delivery:', resDeliEmp: 'Deliver to employee directly', resDeliHR: 'Deliver to Company/HR', resDeliSelf: 'Self-pickup at hospital', resDeliReport: 'Corporate Summary Report:', resRepNone: 'Not required', resRepSummary: 'Require 1 Summary Report', resRepCopy: 'Require copies of individual results',
        sumTitle: 'Select Summary Format', fmt1Title: 'Format 1', fmt1Desc: 'Summary by Nationality', fmt2Title: 'Format 2', fmt2Desc: 'Summary in Thai', fmt3Title: 'Format 3', fmt3Desc: 'Summary in English', sumRecTitle: 'Receiver Information', sumName: 'Receiver Name', sumPhone: 'Phone Number', sumAddress: 'Address', sumNote: '(Note: Please select only 1 option. Requesting both summary and individual reports after confirmation may incur additional charges based on conditions.)',
        attachTitle: 'Additional Attachments', attachEmp: 'Attendee List (Excel)', attachQuote: 'Quotation with Company Seal', attachReferral: 'Sample of Company Referral Letter (Pre-employment only)',
        btnPreview: 'Preview Data', pdpaTitle: 'The company acknowledges and consents to the disclosure of personal data for this registration.', btnAccept: 'Accept',
        swalAlertInfo: 'Instructions Before Starting', swalAlertDesc: 'To ensure complete submission,<br><b>please prepare all relevant documents</b><br>before filling out the form.', swalBtnAck: 'Acknowledge & Start', swalPreviewTitle: 'Acknowledge and Consent (Preview)', swalBtnConfirm: 'Confirm & Submit', swalBtnEdit: 'Edit Data', swalSending: 'Submitting...', swalSuccess: 'Submission Successful', swalSuccessDesc: 'Our staff will contact you within 2 working days.', swalError: 'Failed to submit data. Please try again.', popupHRTitle: 'HR Contact Information', popupHRName: 'Full Name', popupHRPhone: 'Phone Number', dateErrTitle: 'Invalid Date', dateErrMsg: 'Please select a start date at least 10 days from today.', dateEndErrMsg: 'End date cannot be earlier than start date.',
        pdpaHeader: 'PDPA Consent', pdpaP1: 'The company consents to Bangkok Christian Hospital collecting and processing personal data for the following purposes:', pdpaP2: '<b>1. For medical treatment and services.</b>', pdpaP3: '<b>2. For electronic medical record linkages.</b>', pdpaP4: '<b>3. For insurance claims.</b>', pdpaP5: '<b>4. For hospital news and promotions.</b>', pdpaP6: 'The company has read the Data Protection Policy via QR Code.', pdpaP7: 'The company acknowledges that this consent can be withdrawn at any time.'
    },
    'ko': {
        mainTitle: '기업 건강검진 신청서', downloadTemp: '참석자 명단 템플릿 다운로드 (Excel)',
        orgInfo: '조직 정보', orgName: '회사 이름', authName: '공인 서명자', position: '직위', email: '이메일', phone: '전화번호',
        taxInfo: '신용 개설 서류', taxId: '세금 ID', addressNo: '건물/층/호', street: '거리', soi: '골목', zipcode: '우편번호', subdistrict: '읍/면/동', district: '구/군', province: '시/도',
        fileReg: '사업자 등록증 사본 (신규 기업만)', fileVat: 'VAT 20 사본 (신규 기업만)', 
        payTitle: '결제 방식', payBank: '계좌 이체 (7일 전)', payCash: '현금 결제 (검진 당일)', payCredit: '기업 청구 - 30일 신용 (최소 50,000 바트)',
        billInfoTitle: '청구 정보', billAddress: '회사 주소', sameAddress: '회사 주소와 동일', billContact: '담당자', billPhone: '전화번호', billDateStr: '청구일',
        srvTitle: '서비스 유형', srvAnnual: '연간 건강검진', srvPreEmp: '채용 전 건강검진', srvWorkPermit: '취업 허가증 건강검진', srvPap: '자궁경부암 검진', srvFlu: '독감 백신', srvOther: '기타 (직접 입력)',
        dateTitle: '서비스 일정', dateStart: '시작일', dateEnd: '종료일', dateCount: '참석자 수', dateRemark: '* 최소 10영업일 이전 날짜를 선택해 주세요.',
        emTitle: '비상 연락처', emName: '성명', emPosition: '직위', emMobile: '휴대전화', emOffice: '사무실 전화',
        resTitle: '서비스 확인 방법', resVerify: '신원 확인 방법:', resIdCard: '신분증 (HR은 10영업일 전까지 명단 제출)', resReferral: '회사 추천서 (채용 전 검진)', resDeliPerson: '개인 결과 배송:', resDeliEmp: '직원에게 직접 배송', resDeliHR: '회사/HR 담당자에게 배송', resDeliSelf: '병원 직접 수령', resDeliReport: '기업 종합 보고서:', resRepNone: '필요 없음', resRepSummary: '종합 보고서 1부 필요', resRepCopy: '개별 결과 사본 필요',
        sumTitle: '요약 형식 선택', fmt1Title: '형식 1', fmt1Desc: '국적별 요약', fmt2Title: '형식 2', fmt2Desc: '태국어 요약', fmt3Title: '형식 3', fmt3Desc: '영어 요약', sumRecTitle: '수신자 정보', sumName: '수신자 이름', sumPhone: '전화번호', sumAddress: '주소', sumNote: '(참고: 1개의 옵션만 선택해주세요. 확인 후 두 가지 모두 요청시 추가 비용이 발생할 수 있습니다.)',
        attachTitle: '추가 첨부 파일', attachEmp: '참석자 명단 (Excel)', attachQuote: '회사 직인이 찍힌 견적서', attachReferral: '회사 추천서 샘플 (채용 전 검진)',
        btnPreview: '데이터 미리보기', pdpaTitle: '본 회사는 이 등록을 위해 개인 데이터 공개를 확인하고 동의합니다.', btnAccept: '동의',
        swalAlertInfo: '시작 전 안내사항', swalAlertDesc: '원활한 신청을 위해<br><b>관련 서류를 미리 준비해 주시기 바랍니다.</b>', swalBtnAck: '확인 및 시작', swalPreviewTitle: '확인 및 동의 (미리보기)', swalBtnConfirm: '제출 확인', swalBtnEdit: '데이터 수정', swalSending: '제출 중...', swalSuccess: '제출 성공', swalSuccessDesc: '2영업일 이내에 연락드리겠습니다.', swalError: '제출 실패. 다시 시도해주세요.', popupHRTitle: 'HR 담당자 정보', popupHRName: '성명', popupHRPhone: '전화번호', dateErrTitle: '잘못된 날짜', dateErrMsg: '최소 10일 이후의 날짜를 선택해주세요.', dateEndErrMsg: '종료일은 시작일보다 빠를 수 없습니다.',
        pdpaHeader: '개인정보 처리 방침 동의', pdpaP1: '회사는 방콕 크리스천 병원이 다음 목적을 위해 개인 데이터를 수집하고 처리하는 데 동의합니다.', pdpaP2: '<b>1. 의료 및 서비스 목적.</b>', pdpaP3: '<b>2. 전자의무기록 연계 목적.</b>', pdpaP4: '<b>3. 보험 청구 목적.</b>', pdpaP5: '<b>4. 병원 소식 및 프로모션 안내.</b>', pdpaP6: '회사는 QR 코드를 통해 개인정보 보호 정책을 읽었습니다.', pdpaP7: '회사는 이 동의를 언제든지 철회할 수 있음을 인지합니다.'
    },
    'ja': {
        mainTitle: '企業向け健康診断申込書', downloadTemp: '受診者リストテンプレート (Excel)',
        orgInfo: '組織情報', orgName: '会社名', authName: '代表者名', position: '役職', email: 'メール', phone: '電話番号',
        taxInfo: 'クレジット開設書類', taxId: '納税者番号', addressNo: 'ビル/階/室', street: '通り', soi: '路地', zipcode: '郵便番号', subdistrict: '町/村', district: '区/郡', province: '都道府県',
        fileReg: '商業登記簿の写し (新規企業のみ)', fileVat: 'VAT 20の写し (新規企業のみ)', 
        payTitle: 'お支払い方法', payBank: '銀行振込（7日前まで）', payCash: '現金支払い（受診当日）', payCredit: '企業請求 - 30日クレジット（最低50,000バーツ）',
        billInfoTitle: '請求情報', billAddress: '会社住所', sameAddress: '会社の住所と同じ', billContact: '担当者', billPhone: '電話番号', billDateStr: '請求日',
        srvTitle: 'サービスの種類', srvAnnual: '定期健康診断', srvPreEmp: '入社前健康診断', srvWorkPermit: 'ワークパーミット用健康診断', srvPap: '子宮頸がん検診', srvFlu: 'インフルエンザ予防接種', srvOther: 'その他 (直接入力)',
        dateTitle: '受診日程', dateStart: '開始日', dateEnd: '終了日', dateCount: '受診者数', dateRemark: '* 10営業日以上先の日付を選択してください。',
        emTitle: '緊急連絡先', emName: '氏名', emPosition: '役職', emMobile: '携帯電話', emOffice: '会社の電話',
        resTitle: '本人確認方法', resVerify: '確認方法:', resIdCard: '身分証明書 (HRは10営業日前までに名簿を提出)', resReferral: '紹介状 (入社前検診)', resDeliPerson: '個人結果の送付:', resDeliEmp: '従業員へ直接送付', resDeliHR: '会社/HR担当者へ送付', resDeliSelf: '病院で直接受け取り', resDeliReport: '企業向け全体レポート:', resRepNone: '不要', resRepSummary: '全体サマリーレポート1部', resRepCopy: '個人の結果のコピー',
        sumTitle: 'サマリー形式の選択', fmt1Title: '形式 1', fmt1Desc: '国籍別サマリー', fmt2Title: '形式 2', fmt2Desc: 'タイ語サマリー', fmt3Title: '形式 3', fmt3Desc: '英語サマリー', sumRecTitle: '受取人情報', sumName: '受取人名', sumPhone: '電話番号', sumAddress: '住所', sumNote: '(注: 1つのオプションのみ選択してください。確認後に両方をリクエストした場合、追加料金が発生する場合があります。)',
        attachTitle: '追加の添付ファイル', attachEmp: '受診者リスト (Excel)', attachQuote: '社印付き見積書', attachReferral: '紹介状のサンプル（入社前検診）',
        btnPreview: 'プレビュー', pdpaTitle: '当社は、この登録のための個人データの開示を認め、同意します。', btnAccept: '同意する',
        swalAlertInfo: '開始前の案内', swalAlertDesc: '申し込みをスムーズに行うため、<br><b>関連書類を事前にご準備ください。</b>', swalBtnAck: '確認して開始', swalPreviewTitle: '確認と同意 (プレビュー)', swalBtnConfirm: '送信を確認', swalBtnEdit: '情報を編集', swalSending: '送信中...', swalSuccess: '送信完了', swalSuccessDesc: '2営業日以内にご連絡いたします。', swalError: '送信に失敗しました。再試行してください。', popupHRTitle: 'HR担当者情報', popupHRName: '氏名', popupHRPhone: '電話番号', dateErrTitle: '無効な日付', dateErrMsg: '10日以上先の日付を選択してください。', dateEndErrMsg: '終了日は開始日より前に設定できません。',
        pdpaHeader: '個人情報保護方針への同意', pdpaP1: '会社は、バンコククリスチャン病院が以下の目的で個人データを収集および処理することに同意します。', pdpaP2: '<b>1. 医療およびサービスのため。</b>', pdpaP3: '<b>2. 電子カルテ連携のため。</b>', pdpaP4: '<b>3. 保険請求のため。</b>', pdpaP5: '<b>4. 病院のニュースやプロモーションのため。</b>', pdpaP6: '会社はQRコードを通じてプライバシーポリシーを読みました。', pdpaP7: '会社は、この同意をいつでも撤回できることを了承します。'
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if(i18n[lang][key]) {
            if(el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) el.value = i18n[lang][key];
            else el.innerHTML = i18n[lang][key];
        }
    });

    Swal.fire({
        title: i18n[currentLang].swalAlertInfo,
        html: i18n[currentLang].swalAlertDesc,
        icon: 'info',
        confirmButtonText: i18n[currentLang].swalBtnAck,
        confirmButtonColor: '#0d6efd'
    });
}

function getMinDateString(daysToAdd) {
    let d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    let year = d.getFullYear();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function getCompanyAddressStr() {
    let addr = document.querySelector('[name="addressNo"]').value || '';
    let street = document.querySelector('[name="street"]').value || '';
    let soi = document.querySelector('[name="soi"]').value || '';
    let sub = document.querySelector('[name="subdistrict"]').value || '';
    let dist = document.querySelector('[name="district"]').value || '';
    let prov = document.querySelector('[name="province"]').value || '';
    let zip = document.querySelector('[name="zipcode"]').value || '';
    return `${addr} ${soi ? 'ซ.'+soi : ''} ${street ? 'ถ.'+street : ''} ${sub} ${dist} ${prov} ${zip}`.trim().replace(/\s+/g, ' ');
}

window.onload = function() {
    Swal.fire({ title: i18n[currentLang].swalAlertInfo, html: i18n[currentLang].swalAlertDesc, icon: 'info', confirmButtonText: i18n[currentLang].swalBtnAck, confirmButtonColor: '#0d6efd' });
    
    let minDateStr = getMinDateString(10);
    document.getElementById("startDate").setAttribute("min", minDateStr);
    document.getElementById("endDate").setAttribute("min", minDateStr);

    $.Thailand({ database: 'https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/database/db.json', $district: $('#subdistrict'), $amphoe: $('#district'), $province: $('#province'), $zipcode: $('#zipcode') });
};

// --- ดัก Event การกรอกวันที่ ---
document.getElementById('startDate').addEventListener('change', function() {
    if (this.value) {
        document.getElementById('endDate').setAttribute('min', this.value);
        let endDateVal = document.getElementById('endDate').value;
        if (endDateVal && endDateVal < this.value) {
            document.getElementById('endDate').value = this.value;
        }
    }
});
document.getElementById('endDate').addEventListener('change', function() {
    let startDateVal = document.getElementById('startDate').value;
    if (startDateVal && this.value && this.value < startDateVal) {
        this.value = startDateVal; 
    }
});

// --- จัดการซ่อน/แสดงหน้าต่าง และ Checkbox ---
document.querySelectorAll('.payment-radio').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('billingDetailsDiv').style.display = (this.value === 'วางบิลบริษัท') ? 'block' : 'none';
    });
});
document.getElementById('chkSameAddressBill').addEventListener('change', function() {
    document.getElementById('billAddress').value = this.checked ? getCompanyAddressStr() : '';
});

document.getElementById('checkOther').addEventListener('change', function() { document.getElementById('inputOther').disabled = !this.checked; });

// ผลตรวจรายบุคคล
document.getElementById('radioHR').addEventListener('change', function() {
    if(this.checked) {
        Swal.fire({
            title: i18n[currentLang].popupHRTitle,
            html: `<input id="swal-hr-name" class="swal2-input" placeholder="${i18n[currentLang].popupHRName}"><input id="swal-hr-phone" class="swal2-input" placeholder="${i18n[currentLang].popupHRPhone}">`,
            focusConfirm: false,
            preConfirm: () => {
                let name = document.getElementById('swal-hr-name').value;
                let phone = document.getElementById('swal-hr-phone').value;
                document.getElementById('hrDetail').value = name + " / " + phone;
            }
        });
    }
});
document.getElementById('del3').addEventListener('change', function() { document.getElementById('inputDeliOther').disabled = !this.checked; });
document.querySelectorAll('input[name="deliveryPersonal"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if(this.id !== 'del3') { document.getElementById('inputDeliOther').disabled = true; document.getElementById('inputDeliOther').value = ''; }
    });
});

// ซ่อนแสดงส่วนสรุปผล
document.querySelectorAll('.report-radio').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('summaryDetailsDiv').style.display = (this.value === 'ต้องการรายงานสรุปผลในภาพรวม') ? 'block' : 'none';
    });
});

// การ์ดรูปแบบ
document.querySelectorAll('input[name="fmtRadio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.querySelectorAll('.format-card').forEach(card => card.classList.remove('selected'));
        if(this.checked) {
            this.parentElement.classList.add('selected');
            document.getElementById('summaryFormatVal').value = this.value;
        }
    });
});

document.getElementById('chkSameAddressSum').addEventListener('change', function() {
    document.getElementById('sumAddress').value = this.checked ? getCompanyAddressStr() : '';
});

// PDPA 
document.getElementById('pdpaCheck').addEventListener('click', function(e) {
    e.preventDefault(); 
    $('#pdpaModal').modal('show');
});
document.getElementById('btnAcceptPdpa').addEventListener('click', function() {
    document.getElementById('pdpaCheck').checked = true;
});


// Preview & Submit
document.getElementById('btnPreview').addEventListener('click', async function() {
    let form = document.getElementById('healthForm');
    
    // ตรวจสอบว่าช่องที่ต้องกรอกครบไหม
    if(!form.checkValidity()) { form.reportValidity(); return; }
    
    let startDateInput = document.getElementById("startDate").value;
    let minDateStr = document.getElementById("startDate").getAttribute("min");
    if (startDateInput < minDateStr) {
        Swal.fire({ icon: 'warning', title: i18n[currentLang].dateErrTitle, text: i18n[currentLang].dateErrMsg, confirmButtonColor: '#0d6efd' });
        return; 
    }

    let formData = new FormData(form);
    let previewHtml = `<div style="text-align:left; font-size:14px; max-height: 300px; overflow-y:auto;">`;
    formData.forEach((val, key) => { 
        if(val && !key.startsWith('fmtRadio') && key !== 'deliveryPersonalOther') previewHtml += `<b>${key}:</b> ${val}<br>`; 
    });
    previewHtml += `</div>`;

    Swal.fire({
        title: i18n[currentLang].swalPreviewTitle, html: previewHtml, icon: 'warning',
        showCancelButton: true, confirmButtonText: i18n[currentLang].swalBtnConfirm, cancelButtonText: i18n[currentLang].swalBtnEdit
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: i18n[currentLang].swalSending, allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            
            let payload = Object.fromEntries(formData.entries());
            payload.lang = currentLang;
            
            let services = [];
            document.querySelectorAll('input[name="service"]:checked').forEach(el => {
                if(el.id === "checkOther") services.push("อื่นๆ: " + document.getElementById("inputOther").value);
                else services.push(el.value);
            });
            payload.services = services.join(', ');
            payload.pdpaAgree = document.getElementById('pdpaCheck').checked;

            payload.fileReg = await getBase64(document.getElementById('fileReg'));
            payload.fileVat = await getBase64(document.getElementById('fileVat'));
            payload.fileEmp = await getBase64(document.getElementById('fileEmp'));
            payload.fileQuote = await getBase64(document.getElementById('fileQuote'));
            payload.fileReferral = await getBase64(document.getElementById('fileReferral'));

            fetch(GAS_URL, {
                method: 'POST', body: JSON.stringify(payload)
            }).then(res => res.json()).then(data => {
                if (data.status === 'success') {
                    Swal.fire({ title: i18n[currentLang].swalSuccess, html: `<b>Request ID: ${data.requestId}</b><br>${i18n[currentLang].swalSuccessDesc}`, icon: 'success' }).then(() => location.reload());
                } else { Swal.fire('พบข้อผิดพลาดฝั่งเซิร์ฟเวอร์', data.message, 'error'); }
            }).catch(err => { Swal.fire('Error', i18n[currentLang].swalError, 'error'); });
        }
    });
});

function getBase64(fileInput) {
    return new Promise((resolve) => {
        if (!fileInput.files || fileInput.files.length === 0) { resolve(null); return; }
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ name: file.name, mimeType: file.type, data: reader.result.split(',')[1] });
    });
}
