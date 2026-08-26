// เปลี่ยน URL นี้เป็น Web App URL ของ Google Apps Script ที่ Deploy แล้ว
const GAS_URL = "https://script.google.com/macros/s/AKfycbx5g4LX9dchD2RUsEHga1xVgXPn3LidoWh1OJ7TbxpIin0UrfgkgZZRTK3SRS86zcJJ/exec";

let currentLang = 'th'; // ค่าเริ่มต้น

// Dictionary สำหรับแปลภาษาทั้งหมด
const i18n = {
    'th': {
        mainTitle: 'แบบฟอร์มแจ้งความประสงค์ตรวจสุขภาพสำหรับองค์กร',
        downloadTemp: 'ดาวน์โหลด Template รายชื่อผู้ตรวจสุขภาพ (Excel)',
        orgInfo: 'ข้อมูลองค์กร', orgName: 'ชื่อองค์กร', authName: 'ชื่อผู้มีอำนาจลงนาม', position: 'ตำแหน่ง', email: 'อีเมล', phone: 'เบอร์โทรศัพท์',
        taxInfo: 'เอกสารประกอบการเปิดเครดิต', taxId: 'เลขประจำตัวผู้เสียภาษี', addressNo: 'เลขที่/อาคาร/ชั้น', street: 'ถนน', soi: 'ซอย', zipcode: 'รหัสไปรษณีย์', subdistrict: 'แขวง/ตำบล', district: 'เขต/อำเภอ', province: 'จังหวัด',
        fileReg: 'สำเนาใบจดทะเบียนการค้า (ไม่บังคับ)', fileVat: 'สำเนาใบ ภ.พ.20 (ไม่บังคับ)', btnPreview: 'ตรวจสอบข้อมูล (Preview)',
        swalAlertInfo: 'คำแนะนำก่อนเริ่ม',
        swalAlertDesc: 'เพื่อให้การส่งข้อมูลการตรวจสุขภาพเป็นไปอย่างครบถ้วน<br><b>กรุณาเตรียมข้อมูลและเอกสารที่เกี่ยวข้องให้เรียบร้อย</b><br>ก่อนเริ่มกรอกแบบฟอร์ม',
        swalBtnAck: 'รับทราบและเริ่มกรอกข้อมูล',
        swalPreviewTitle: 'บันทึกรับทราบและยินยอม (Preview)',
        swalBtnConfirm: 'ยืนยันการส่งข้อมูล',
        swalBtnEdit: 'แก้ไขข้อมูล',
        swalSending: 'กำลังส่งข้อมูล...',
        swalSuccess: 'ส่งข้อมูลเรียบร้อยแล้ว',
        swalError: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่'
    },
    'en': {
        mainTitle: 'Corporate Health Checkup Request Form',
        downloadTemp: 'Download Attendee List Template (Excel)',
        orgInfo: 'Organization Info', orgName: 'Company Name', authName: 'Authorized Signatory', position: 'Position', email: 'Email', phone: 'Phone Number',
        taxInfo: 'Credit Opening Documents', taxId: 'Tax ID', addressNo: 'Building/Floor/Room', street: 'Street', soi: 'Alley', zipcode: 'Zip Code', subdistrict: 'Sub-district', district: 'District', province: 'Province',
        fileReg: 'Copy of Commercial Registration (Optional)', fileVat: 'Copy of VAT Registration ภ.พ.20 (Optional)', btnPreview: 'Preview Data',
        swalAlertInfo: 'Instructions Before Starting',
        swalAlertDesc: 'To ensure complete health checkup data submission,<br><b>please prepare all relevant documents</b><br>before filling out the form.',
        swalBtnAck: 'Acknowledge & Start',
        swalPreviewTitle: 'Acknowledge and Consent (Preview)',
        swalBtnConfirm: 'Confirm & Submit',
        swalBtnEdit: 'Edit Data',
        swalSending: 'Submitting...',
        swalSuccess: 'Submission Successful',
        swalError: 'Failed to submit data. Please try again.'
    },
    'ko': {
        mainTitle: '기업 건강검진 신청서',
        downloadTemp: '참석자 명단 템플릿 다운로드 (Excel)',
        orgInfo: '조직 정보', orgName: '회사 이름', authName: '공인 서명자', position: '직위', email: '이메일', phone: '전화번호',
        taxInfo: '신용 개설 서류', taxId: '세금 ID', addressNo: '건물/층', street: '거리', soi: '골목', zipcode: '우편번호', subdistrict: '읍/면/동', district: '구/군', province: '시/도',
        fileReg: '사업자 등록증 사본 (선택)', fileVat: 'VAT 등록증 사본 (선택)', btnPreview: '데이터 미리보기',
        swalAlertInfo: '시작 전 안내사항',
        swalAlertDesc: '원활한 건강검진 신청을 위해<br><b>관련 서류를 미리 준비해 주시기 바랍니다.</b>',
        swalBtnAck: '확인 및 시작',
        swalPreviewTitle: '확인 및 동의 (미리보기)',
        swalBtnConfirm: '제출 확인',
        swalBtnEdit: '데이터 수정',
        swalSending: '제출 중...',
        swalSuccess: '제출 성공',
        swalError: '데이터 제출 실패. 다시 시도해주세요.'
    },
    'ja': {
        mainTitle: '企業向け健康診断申込書',
        downloadTemp: '受診者リストテンプレートのダウンロード (Excel)',
        orgInfo: '組織情報', orgName: '会社名', authName: '代表者名', position: '役職', email: 'メール', phone: '電話番号',
        taxInfo: 'クレジット開設書類', taxId: '納税者番号', addressNo: 'ビル/階/室', street: '通り', soi: '路地', zipcode: '郵便番号', subdistrict: '町/村', district: '区/郡', province: '都道府県',
        fileReg: '商業登記簿の写し (任意)', fileVat: 'VAT登録証の写し (任意)', btnPreview: 'プレビュー',
        swalAlertInfo: '開始前の案内',
        swalAlertDesc: '健康診断の申し込みをスムーズに行うため、<br><b>関連書類を事前にご準備ください。</b>',
        swalBtnAck: '確認して開始',
        swalPreviewTitle: '確認と同意 (プレビュー)',
        swalBtnConfirm: '送信を確認',
        swalBtnEdit: '情報を編集',
        swalSending: '送信中...',
        swalSuccess: '送信完了',
        swalError: '送信に失敗しました。再試行してください。'
    }
};

// ฟังก์ชันเปลี่ยนภาษา
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if(i18n[lang][key]) el.innerHTML = i18n[lang][key];
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
            payload.lang = currentLang; // ส่งภาษาที่เลือกไปยัง GAS เพื่อให้อีเมลใช้ภาษานี้
            
            // ... (โค้ดรวบรวมไฟล์ Base64 เหมือนเดิม) ...

            fetch(GAS_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            }).then(res => res.json()).then(data => {
                Swal.fire({
                    title: i18n[currentLang].swalSuccess,
                    html: `<b>Request ID: ${data.requestId}</b><br>เจ้าหน้าที่จะตรวจสอบข้อมูลและติดต่อกลับ...`,
                    icon: 'success'
                }).then(() => location.reload());
            }).catch(err => {
                Swal.fire('Error', i18n[currentLang].swalError, 'error');
            });
        }
    });
});
// (โค้ด function getBase64() เหมือนเดิม)
⚙️ 4. Google Apps Script (ปรับปรุงเรื่อง Email หลายภาษา)
อัปเดตโค้ดฝั่งหลังบ้านให้ดึง data.lang มาใช้กำหนดภาษาของอีเมลที่ส่งไปยืนยัน

JavaScript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const folder = DriveApp.getFolderById(FOLDER_ID);
    let lastRow = sheet.getLastRow();
    let requestId = "HBC-2026-" + ("00000" + (lastRow)).slice(-5);
    
    // ตั้งค่าภาษาสำหรับอีเมล
    const mailText = {
      'th': { sub: "ยืนยันการรับเรื่องแจ้งความประสงค์ตรวจสุขภาพ - ", body: `เรียน ${data.authName},<br><br>ทางเราได้รับข้อมูลของท่านเรียบร้อยแล้ว (เลขที่คำขอ: ${requestId}) เจ้าหน้าที่จะติดต่อกลับภายใน 2 วันทำการ<br>พบไฟล์สรุปข้อมูลแนบมาพร้อมอีเมลนี้` },
      'en': { sub: "Health Checkup Request Confirmation - ", body: `Dear ${data.authName},<br><br>We have received your request (Req ID: ${requestId}). Our staff will contact you within 2 working days.<br>A summary PDF is attached.` },
      'ko': { sub: "건강검진 신청 확인 - ", body: `${data.authName} 님께,<br><br>요청이 접수되었습니다 (요청 ID: ${requestId}). 2 영업일 이내에 담당자가 연락드릴 예정입니다.<br>요약 PDF 파일이 첨부되어 있습니다.` },
      'ja': { sub: "健康診断申込の確認 - ", body: `${data.authName} 様,<br><br>お申し込みを受け付けました (リクエストID: ${requestId})。2営業日以内に担当者よりご連絡いたします。<br>サマリーのPDFが添付されています。` }
    };
    let lang = data.lang || 'th'; // ถ้าไม่มีให้ใช้ TH
    let emailSubject = mailText[lang].sub + requestId;
    let emailBody = mailText[lang].body;

    // ... (ส่วนการสร้าง PDF, แนบไฟล์, เซฟลง Sheet และส่ง Telegram เหมือนเดิม) ...
    
    MailApp.sendEmail({
      to: data.email,
      subject: emailSubject,
      htmlBody: emailBody,
      attachments: [pdfBlob] // แนบ PDF ตัวเดิมที่สคริปต์สร้างไว้
    });

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', requestId: requestId }))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
