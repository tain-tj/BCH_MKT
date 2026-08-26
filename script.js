const GAS_URL = "https://script.google.com/macros/s/AKfycbx5g4LX9dchD2RUsEHga1xVgXPn3LidoWh1OJ7TbxpIin0UrfgkgZZRTK3SRS86zcJJ/exec";
let currentLang = 'th'; // ค่าเริ่มต้น

// Dictionary สำหรับแปลภาษาทั้งหมด
const i18n = {
    'th': {
        mainTitle: 'แบบฟอร์มแจ้งความประสงค์ตรวจสุขภาพสำหรับองค์กร',
        downloadTemp: 'ดาวน์โหลด Template รายชื่อผู้ตรวจสุขภาพ (Excel)',
        orgInfo: 'ข้อมูลองค์กร', orgName: 'ชื่อองค์กร', authName: 'ชื่อผู้มีอำนาจลงนาม', position: 'ตำแหน่ง', email: 'อีเมล', phone: 'เบอร์โทรศัพท์',
        taxInfo: 'เอกสารประกอบการเปิดเครดิต', taxId: 'เลขประจำตัวผู้เสียภาษี', addressNo: 'เลขที่/อาคาร/ชั้น', street: 'ถนน', soi: 'ซอย', zipcode: 'รหัสไปรษณีย์', subdistrict: 'แขวง/ตำบล', district: 'เขต/อำเภอ', province: 'จังหวัด',
        fileReg: 'สำเนาใบจดทะเบียนการค้า (ไม่บังคับ)', fileVat: 'สำเนาใบ ภ.พ.20 (ไม่บังคับ)', 
        payTitle: 'รูปแบบการชำระเงิน', payBank: 'โอนเงินผ่านธนาคาร (ล่วงหน้า 7 วัน)', payCash: 'ชำระเงินสด (วันเข้ารับบริการ)', payCredit: 'วางบิลบริษัท - เครดิต 30 วัน (เฉพาะยอดขั้นต่ำ 50,000 บาท)',
        srvTitle: 'ประเภทบริการ', srvAnnual: 'ตรวจสุขภาพประจำปี', srvPreEmp: 'ตรวจสุขภาพก่อนเข้าทำงาน', srvWorkPermit: 'เพื่อ Work Permit', srvPap: 'คัดกรองมะเร็งปากมดลูก', srvMammo: 'คัดกรองมะเร็งเต้านม', srvFlu: 'ฉีดวัคซีนไข้หวัดใหญ่', srvOther: 'อื่นๆ:',
        dateTitle: 'กำหนดการเข้ารับบริการ', dateStart: 'ตั้งแต่วันที่', dateEnd: 'ถึงวันที่', dateCount: 'จำนวนผู้เข้ารับบริการ (คน)', dateRemark: '* เลือกวันที่ล่วงหน้าได้อย่างน้อย 10 วันทำการ',
        emTitle: 'ผู้ประสานงานกรณีเร่งด่วน', emName: 'ชื่อ-นามสกุล', emPosition: 'ตำแหน่ง', emMobile: 'โทรศัพท์มือถือ', emOffice: 'โทรศัพท์สำนักงาน',
        resTitle: 'การจัดการผลตรวจ', resVerify: 'วิธีการยืนยันสิทธิ์:', resIdCard: 'ใช้บัตรประชาชน', resReferral: 'ใช้ใบส่งตัวจากบริษัท', resDeliPerson: 'การจัดส่งผลตรวจรายบุคคล:', resDeliEmp: 'จัดส่งให้พนักงานโดยตรง', resDeliHR: 'จัดส่งให้บริษัท/ผู้ประสานงาน HR', resDeliSelf: 'รับผลด้วยตนเองที่โรงพยาบาล', resDeliReport: 'การจัดส่งรายงานผลภาพรวมของบริษัท:', resRepNone: 'ไม่ต้องการ', resRepSummary: 'ต้องการรายงานสรุปผลในภาพรวม 1 ฉบับ', resRepCopy: 'ต้องการสำเนาผลตรวจของพนักงานแต่ละรายบุคคล',
        attachTitle: 'เอกสารแนบเพิ่มเติม', attachEmp: 'ไฟล์รายชื่อพนักงานที่ตรวจ (Excel)', attachQuote: 'ใบเสนอราคาพร้อมประทับตราบริษัท', attachReferral: 'ตัวอย่างใบส่งตัวของบริษัท (ถ้ามี)',
        btnPreview: 'ตรวจสอบข้อมูล (Preview)',
        swalAlertInfo: 'คำแนะนำก่อนเริ่ม', swalAlertDesc: 'เพื่อให้การส่งข้อมูลการตรวจสุขภาพเป็นไปอย่างครบถ้วน<br><b>กรุณาเตรียมข้อมูลและเอกสารที่เกี่ยวข้องให้เรียบร้อย</b><br>ก่อนเริ่มกรอกแบบฟอร์ม', swalBtnAck: 'รับทราบและเริ่มกรอกข้อมูล',
        swalPreviewTitle: 'บันทึกรับทราบและยินยอม (Preview)', swalBtnConfirm: 'ยืนยันการส่งข้อมูล', swalBtnEdit: 'แก้ไขข้อมูล',
        swalSending: 'กำลังส่งข้อมูล...', swalSuccess: 'ส่งข้อมูลเรียบร้อยแล้ว', swalSuccessDesc: 'เจ้าหน้าที่จะตรวจสอบข้อมูลและติดต่อกลับภายใน 2 วันทำการ', swalError: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่',
        popupHRTitle: 'ระบุข้อมูลผู้รับผล (HR)', popupHRName: 'ชื่อ-นามสกุล', popupHRPhone: 'เบอร์โทรศัพท์',
        popupFmtTitle: 'เลือกรูปแบบการสรุปผล', popupFmt1: 'รูปแบบที่ 1 – สรุปรวมตามสัญชาติ', popupFmt2: 'รูปแบบที่ 2 – สรุปรวมภาษาไทย', popupFmt3: 'รูปแบบที่ 3 – สรุปรวมภาษาอังกฤษ', popupFmtErr: 'กรุณาเลือกรูปแบบ!'
    },
    'en': {
        mainTitle: 'Corporate Health Checkup Request Form',
        downloadTemp: 'Download Attendee List Template (Excel)',
        orgInfo: 'Organization Info', orgName: 'Company Name', authName: 'Authorized Signatory', position: 'Position', email: 'Email', phone: 'Phone Number',
        taxInfo: 'Credit Opening Documents', taxId: 'Tax ID', addressNo: 'Building/Floor/Room', street: 'Street', soi: 'Alley', zipcode: 'Zip Code', subdistrict: 'Sub-district', district: 'District', province: 'Province',
        fileReg: 'Copy of Commercial Registration (Optional)', fileVat: 'Copy of VAT Registration (Optional)', 
        payTitle: 'Payment Method', payBank: 'Bank Transfer (7 days in advance)', payCash: 'Cash (On service day)', payCredit: 'Corporate Billing - 30 days credit (Min. 50,000 THB)',
        srvTitle: 'Service Type', srvAnnual: 'Annual Health Checkup', srvPreEmp: 'Pre-employment Checkup', srvWorkPermit: 'Work Permit Checkup', srvPap: 'Cervical Cancer Screening', srvMammo: 'Breast Cancer Screening', srvFlu: 'Influenza Vaccine', srvOther: 'Other:',
        dateTitle: 'Service Schedule', dateStart: 'Start Date', dateEnd: 'End Date', dateCount: 'Number of Attendees', dateRemark: '* Please select a date at least 10 working days in advance.',
        emTitle: 'Emergency Contact', emName: 'Full Name', emPosition: 'Position', emMobile: 'Mobile Phone', emOffice: 'Office Phone',
        resTitle: 'Result Management', resVerify: 'Verification Method:', resIdCard: 'ID Card', resReferral: 'Company Referral Letter', resDeliPerson: 'Individual Result Delivery:', resDeliEmp: 'Deliver to employee directly', resDeliHR: 'Deliver to Company/HR', resDeliSelf: 'Self-pickup at hospital', resDeliReport: 'Corporate Summary Report:', resRepNone: 'Not required', resRepSummary: 'Require 1 Summary Report', resRepCopy: 'Require copies of individual results',
        attachTitle: 'Additional Attachments', attachEmp: 'Attendee List (Excel)', attachQuote: 'Quotation with Company Seal', attachReferral: 'Sample of Company Referral Letter (If any)',
        btnPreview: 'Preview Data',
        swalAlertInfo: 'Instructions Before Starting', swalAlertDesc: 'To ensure complete submission,<br><b>please prepare all relevant documents</b><br>before filling out the form.', swalBtnAck: 'Acknowledge & Start',
        swalPreviewTitle: 'Acknowledge and Consent (Preview)', swalBtnConfirm: 'Confirm & Submit', swalBtnEdit: 'Edit Data',
        swalSending: 'Submitting...', swalSuccess: 'Submission Successful', swalSuccessDesc: 'Our staff will review and contact you within 2 working days.', swalError: 'Failed to submit data. Please try again.',
        popupHRTitle: 'HR Contact Information', popupHRName: 'Full Name', popupHRPhone: 'Phone Number',
        popupFmtTitle: 'Select Summary Format', popupFmt1: 'Format 1 - By Nationality', popupFmt2: 'Format 2 - Thai Language', popupFmt3: 'Format 3 - English Language', popupFmtErr: 'Please select a format!'
    },
    'ko': {
        mainTitle: '기업 건강검진 신청서',
        downloadTemp: '참석자 명단 템플릿 다운로드 (Excel)',
        orgInfo: '조직 정보', orgName: '회사 이름', authName: '공인 서명자', position: '직위', email: '이메일', phone: '전화번호',
        taxInfo: '신용 개설 서류', taxId: '세금 ID', addressNo: '건물/층/호', street: '거리', soi: '골목', zipcode: '우편번호', subdistrict: '읍/면/동', district: '구/군', province: '시/도',
        fileReg: '사업자 등록증 사본 (선택)', fileVat: 'VAT 등록증 사본 (선택)', 
        payTitle: '결제 방식', payBank: '계좌 이체 (7일 전)', payCash: '현금 결제 (검진 당일)', payCredit: '기업 청구 - 30일 신용 (최소 50,000 바트)',
        srvTitle: '서비스 유형', srvAnnual: '연간 건강검진', srvPreEmp: '채용 전 건강검진', srvWorkPermit: '취업 허가증 건강검진', srvPap: '자궁경부암 검진', srvMammo: '유방암 검진', srvFlu: '독감 백신', srvOther: '기타:',
        dateTitle: '서비스 일정', dateStart: '시작일', dateEnd: '종료일', dateCount: '참석자 수', dateRemark: '* 최소 10영업일 이전 날짜를 선택해 주세요.',
        emTitle: '비상 연락처', emName: '성명', emPosition: '직위', emMobile: '휴대전화', emOffice: '사무실 전화',
        resTitle: '결과 관리', resVerify: '신원 확인 방법:', resIdCard: '신분증', resReferral: '회사 추천서', resDeliPerson: '개인 결과 배송:', resDeliEmp: '직원에게 직접 배송', resDeliHR: '회사/HR 담당자에게 배송', resDeliSelf: '병원 직접 수령', resDeliReport: '기업 종합 보고서:', resRepNone: '필요 없음', resRepSummary: '종합 보고서 1부 필요', resRepCopy: '개별 결과 사본 필요',
        attachTitle: '추가 첨부 파일', attachEmp: '참석자 명단 (Excel)', attachQuote: '회사 직인이 찍힌 견적서', attachReferral: '회사 추천서 샘플 (있는 경우)',
        btnPreview: '데이터 미리보기',
        swalAlertInfo: '시작 전 안내사항', swalAlertDesc: '원활한 건강검진 신청을 위해<br><b>관련 서류를 미리 준비해 주시기 바랍니다.</b>', swalBtnAck: '확인 및 시작',
        swalPreviewTitle: '확인 및 동의 (미리보기)', swalBtnConfirm: '제출 확인', swalBtnEdit: '데이터 수정',
        swalSending: '제출 중...', swalSuccess: '제출 성공', swalSuccessDesc: '담당자가 검토 후 2영업일 이내에 연락드리겠습니다.', swalError: '데이터 제출 실패. 다시 시도해주세요.',
        popupHRTitle: 'HR 담당자 정보', popupHRName: '성명', popupHRPhone: '전화번호',
        popupFmtTitle: '요약 형식 선택', popupFmt1: '형식 1 - 국적별 요약', popupFmt2: '형식 2 - 태국어 요약', popupFmt3: '형식 3 - 영어 요약', popupFmtErr: '형식을 선택해주세요!'
    },
    'ja': {
        mainTitle: '企業向け健康診断申込書',
        downloadTemp: '受診者リストテンプレートのダウンロード (Excel)',
        orgInfo: '組織情報', orgName: '会社名', authName: '代表者名', position: '役職', email: 'メール', phone: '電話番号',
        taxInfo: 'クレジット開設書類', taxId: '納税者番号', addressNo: 'ビル/階/室', street: '通り', soi: '路地', zipcode: '郵便番号', subdistrict: '町/村', district: '区/郡', province: '都道府県',
        fileReg: '商業登記簿の写し (任意)', fileVat: 'VAT登録証の写し (任意)', 
        payTitle: 'お支払い方法', payBank: '銀行振込（7日前まで）', payCash: '現金支払い（受診当日）', payCredit: '企業請求 - 30日クレジット（最低50,000バーツ）',
        srvTitle: 'サービスの種類', srvAnnual: '定期健康診断', srvPreEmp: '入社前健康診断', srvWorkPermit: 'ワークパーミット用健康診断', srvPap: '子宮頸がん検診', srvMammo: '乳がん検診', srvFlu: 'インフルエンザ予防接種', srvOther: 'その他:',
        dateTitle: '受診日程', dateStart: '開始日', dateEnd: '終了日', dateCount: '受診者数', dateRemark: '* 10営業日以上先の日付を選択してください。',
        emTitle: '緊急連絡先', emName: '氏名', emPosition: '役職', emMobile: '携帯電話', emOffice: '会社の電話',
        resTitle: '結果の管理', resVerify: '本人確認方法:', resIdCard: '身分証明書 (IDカード)', resReferral: '紹介状 (Referral Letter)', resDeliPerson: '個人結果の送付:', resDeliEmp: '従業員へ直接送付', resDeliHR: '会社/HR担当者へ送付', resDeliSelf: '病院で直接受け取り', resDeliReport: '企業向け全体レポート:', resRepNone: '不要', resRepSummary: '全体サマリーレポート1部を希望', resRepCopy: '個人の結果のコピーを希望',
        attachTitle: '追加の添付ファイル', attachEmp: '受診者リスト (Excel)', attachQuote: '社印付き見積書', attachReferral: '紹介状のサンプル（ある場合）',
        btnPreview: 'プレビュー',
        swalAlertInfo: '開始前の案内', swalAlertDesc: '健康診断の申し込みをスムーズに行うため、<br><b>関連書類を事前にご準備ください。</b>', swalBtnAck: '確認して開始',
        swalPreviewTitle: '確認と同意 (プレビュー)', swalBtnConfirm: '送信を確認', swalBtnEdit: '情報を編集',
        swalSending: '送信中...', swalSuccess: '送信完了', swalSuccessDesc: '担当者が確認の上、2営業日以内にご連絡いたします。', swalError: '送信に失敗しました。再試行してください。',
        popupHRTitle: 'HR担当者情報', popupHRName: '氏名', popupHRPhone: '電話番号',
        popupFmtTitle: 'サマリー形式の選択', popupFmt1: '形式 1 - 国籍別サマリー', popupFmt2: '形式 2 - タイ語サマリー', popupFmt3: '形式 3 - 英語サマリー', popupFmtErr: '形式を選択してください！'
    }
};

// ฟังก์ชันเปลี่ยนภาษา
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if(i18n[lang][key]) {
            if(el.tagName === 'INPUT' && el.type === 'button') el.value = i18n[lang][key];
            else el.innerHTML = i18n[lang][key];
        }
    });
}

window.onload = function() {
    Swal.fire({
        title: i18n[currentLang].swalAlertInfo,
        html: i18n[currentLang].swalAlertDesc,
        icon: 'info',
        confirmButtonText: i18n[currentLang].swalBtnAck,
        confirmButtonColor: '#0d6efd'
    });

    let today = new Date();
    today.setDate(today.getDate() + 10);
    let minDateStr = today.toISOString().split('T')[0];
    document.getElementById("startDate").setAttribute("min", minDateStr);
    document.getElementById("endDate").setAttribute("min", minDateStr);

    $.Thailand({
        database: 'https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/database/db.json',
        $district: $('#subdistrict'), $amphoe: $('#district'), $province: $('#province'), $zipcode: $('#zipcode')
    });
};

// Checkbox อื่นๆ
document.getElementById('checkOther').addEventListener('change', function() {
    document.getElementById('inputOther').disabled = !this.checked;
});

// Popup ระบุชื่อ HR
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

// Popup รูปแบบสรุปผล
document.getElementById('radioSummary').addEventListener('change', function() {
    if(this.checked) {
        let inputOptions = {};
        inputOptions[i18n[currentLang].popupFmt1] = i18n[currentLang].popupFmt1;
        inputOptions[i18n[currentLang].popupFmt2] = i18n[currentLang].popupFmt2;
        inputOptions[i18n[currentLang].popupFmt3] = i18n[currentLang].popupFmt3;

        Swal.fire({
            title: i18n[currentLang].popupFmtTitle,
            input: 'radio',
            inputOptions: inputOptions,
            inputValidator: (value) => { if (!value) return i18n[currentLang].popupFmtErr }
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('summaryFormat').value = result.value;
            }
        });
    }
});

document.getElementById('btnPreview').addEventListener('click', async function() {
    let form = document.getElementById('healthForm');
    if(!form.checkValidity()) { form.reportValidity(); return; }

    let formData = new FormData(form);
    let previewHtml = `<div style="text-align:left; font-size:14px; max-height: 300px; overflow-y:auto;">`;
    formData.forEach((val, key) => { if(val) previewHtml += `<b>${key}:</b> ${val}<br>`; });
    previewHtml += `</div>`;

    Swal.fire({
        title: i18n[currentLang].swalPreviewTitle,
        html: previewHtml,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: i18n[currentLang].swalBtnConfirm,
        cancelButtonText: i18n[currentLang].swalBtnEdit
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: i18n[currentLang].swalSending, allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            
            let payload = Object.fromEntries(formData.entries());
            payload.lang = currentLang;
            
            // รวบรวม Checkbox Service
            let services = [];
            document.querySelectorAll('input[name="service"]:checked').forEach(el => {
                if(el.id === "checkOther") services.push("อื่นๆ: " + document.getElementById("inputOther").value);
                else services.push(el.value);
            });
            payload.services = services.join(', ');

            // แปลงไฟล์เป็น Base64
            payload.fileReg = await getBase64(document.getElementById('fileReg'));
            payload.fileVat = await getBase64(document.getElementById('fileVat'));
            payload.fileEmp = await getBase64(document.getElementById('fileEmp'));
            payload.fileQuote = await getBase64(document.getElementById('fileQuote'));
            payload.fileReferral = await getBase64(document.getElementById('fileReferral'));

            fetch(GAS_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            }).then(res => res.json()).then(data => {
                Swal.fire({
                    title: i18n[currentLang].swalSuccess,
                    html: `<b>Request ID: ${data.requestId}</b><br>${i18n[currentLang].swalSuccessDesc}`,
                    icon: 'success'
                }).then(() => location.reload());
            }).catch(err => {
                Swal.fire('Error', i18n[currentLang].swalError, 'error');
            });
        }
    });
});

// ฟังก์ชันสำหรับอ่านไฟล์เป็น Base64
function getBase64(fileInput) {
    return new Promise((resolve) => {
        if (!fileInput.files || fileInput.files.length === 0) { resolve(null); return; }
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ name: file.name, mimeType: file.type, data: reader.result.split(',')[1] });
    });
}
