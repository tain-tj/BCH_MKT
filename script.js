// เปลี่ยน URL นี้เป็น Web App URL ของ Google Apps Script ที่ Deploy แล้ว
const GAS_URL = "https://script.google.com/macros/s/AKfycbx5g4LX9dchD2RUsEHga1xVgXPn3LidoWh1OJ7TbxpIin0UrfgkgZZRTK3SRS86zcJJ/exec";

window.onload = function() {
    Swal.fire({
        title: 'คำแนะนำก่อนเริ่ม',
        html: 'เพื่อให้การส่งข้อมูลการตรวจสุขภาพเป็นไปอย่างครบถ้วน<br><b>กรุณาเตรียมข้อมูลและเอกสารที่เกี่ยวข้องให้เรียบร้อย</b><br>ก่อนเริ่มกรอกแบบฟอร์ม',
        icon: 'info',
        confirmButtonText: 'รับทราบและเริ่มกรอกข้อมูล',
        confirmButtonColor: '#0d6efd'
    });

    // ล็อกปฏิทินล่วงหน้า 10 วัน
    let today = new Date();
    today.setDate(today.getDate() + 10);
    let minDateStr = today.toISOString().split('T')[0];
    document.getElementById("startDate").setAttribute("min", minDateStr);
    document.getElementById("endDate").setAttribute("min", minDateStr);

    // ระบบที่อยู่อัตโนมัติ (jquery.Thailand.js)
    $.Thailand({
        database: 'https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/database/db.json',
        $district: $('#subdistrict'),
        $amphoe: $('#district'),
        $province: $('#province'),
        $zipcode: $('#zipcode')
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
            title: 'ระบุข้อมูลผู้รับผล (HR)',
            html: '<input id="swal-hr-name" class="swal2-input" placeholder="ชื่อ-นามสกุล"><input id="swal-hr-phone" class="swal2-input" placeholder="เบอร์โทรศัพท์">',
            focusConfirm: false,
            preConfirm: () => {
                let name = document.getElementById('swal-hr-name').value;
                let phone = document.getElementById('swal-hr-phone').value;
                document.getElementById('hrDetail').value = name + " โทร: " + phone;
            }
        });
    }
});

// Popup รูปแบบสรุปผล
document.getElementById('radioSummary').addEventListener('change', function() {
    if(this.checked) {
        Swal.fire({
            title: 'เลือกรูปแบบการสรุปผล',
            input: 'radio',
            inputOptions: {
                'รูปแบบที่ 1': 'สรุปรวมตามสัญชาติ',
                'รูปแบบที่ 2': 'สรุปรวมภาษาไทย',
                'รูปแบบที่ 3': 'สรุปรวมภาษาอังกฤษ'
            },
            inputValidator: (value) => { if (!value) return 'กรุณาเลือกรูปแบบ!' }
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('summaryFormat').value = result.value;
            }
        });
    }
});

// Preview & Submit
document.getElementById('btnPreview').addEventListener('click', async function() {
    let form = document.getElementById('healthForm');
    if(!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    let formData = new FormData(form);
    let previewHtml = `<div style="text-align:left; font-size:14px; max-height: 300px; overflow-y:auto;">`;
    formData.forEach((val, key) => {
        if(val) previewHtml += `<b>${key}:</b> ${val}<br>`;
    });
    previewHtml += `</div>`;

    Swal.fire({
        title: 'บันทึกรับทราบและยินยอม (Preview)',
        html: previewHtml,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยันการส่งข้อมูล',
        cancelButtonText: 'แก้ไขข้อมูล'
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'กำลังส่งข้อมูล...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            
            // อ่านไฟล์เป็น Base64
            let payload = Object.fromEntries(formData.entries());
            
            // รวบรวม Checkbox Service
            let services = [];
            document.querySelectorAll('input[name="service"]:checked').forEach(el => {
                if(el.id === "checkOther") services.push("อื่นๆ: " + document.getElementById("inputOther").value);
                else services.push(el.value);
            });
            payload.services = services.join(', ');

            payload.fileReg = await getBase64(document.getElementById('fileReg'));
            payload.fileVat = await getBase64(document.getElementById('fileVat'));
            payload.fileEmp = await getBase64(document.getElementById('fileEmp'));
            payload.fileQuote = await getBase64(document.getElementById('fileQuote'));
            payload.fileReferral = await getBase64(document.getElementById('fileReferral'));

            // ส่งข้อมูลเข้า GAS
            fetch(GAS_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            }).then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: 'ส่งข้อมูลเรียบร้อยแล้ว',
                    html: `<b>เลขที่คำขอ: ${data.requestId}</b><br>เจ้าหน้าที่จะตรวจสอบข้อมูลและติดต่อกลับภายใน 2 วันทำการ<br>หากมีข้อสงสัย กรุณาติดต่อ 02-625-9000 ต่อ 70410`,
                    icon: 'success'
                }).then(() => location.reload());
            }).catch(err => {
                Swal.fire('ข้อผิดพลาด', 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่', 'error');
            });
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

// ระบบแปลภาษาเบื้องต้น
const i18n = {
    'th': { orgInfo: '<i class="fa-solid fa-building"></i> ข้อมูลองค์กร', orgName: 'ชื่อองค์กร', authName: 'ชื่อผู้มีอำนาจลงนาม', position: 'ตำแหน่ง' },
    'en': { orgInfo: '<i class="fa-solid fa-building"></i> Organization Info', orgName: 'Organization Name', authName: 'Authorized Signatory', position: 'Position' },
    'ko': { orgInfo: '<i class="fa-solid fa-building"></i> 조직 정보', orgName: '조직 이름', authName: '공인 서명자', position: '직위' },
    'ja': { orgInfo: '<i class="fa-solid fa-building"></i> 組織情報', orgName: '組織名', authName: '承認された署名者', position: '役職' }
};
function changeLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if(i18n[lang][key]) el.innerHTML = i18n[lang][key];
    });
}
