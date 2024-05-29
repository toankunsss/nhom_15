//Đoạn mã lắng nghe sự kiện khi tài liệu đã sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
   //Khởi tạo biến và gán sự kiện cho các trường nhập liệu
    const signUpButton = document.querySelector('.click_sing_up');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('passwordInput');
    const overlay = document.querySelector('.overlay');
    const nameInput = document.getElementById('nameInput');

    // Convert name input field to uppercase on blur
    if (nameInput) {
        nameInput.addEventListener('blur', function () {
            this.value = this.value.toUpperCase();
        });
    }
    
    // Ensure phone number is 10 digits
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.addEventListener('blur', function () {
        this.value = this.value.slice(0, 10);
    });
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
// Xử lý sự kiện khi nhấn nút Đăng ký Kiểm tra thông tin: Khi nhấn nút Đăng ký, đoạn mã sẽ kiểm tra xem tất cả các trường thông tin đã được điền đầy đủ và hộp kiểm đã được chọn hay chưa. Nếu không, sẽ hiển thị cảnh báo.
// Kiểm tra mật khẩu: Sử dụng biểu thức chính quy để kiểm tra mật khẩu phải chứa ít nhất 8 ký tự, bao gồm cả số và chữ cái viết hoa.
// Kiểm tra tài khoản tồn tại: Gọi hàm accountExists để kiểm tra xem tài khoản hoặc số điện thoại đã tồn tại chưa.
// Lưu tài khoản mới: Gọi hàm saveAccount để lưu thông tin tài khoản mới vào localStorage.
// Hiển thị thông báo thành công: Gọi hàm showSuccessPopup để hiển thị thông báo đăng ký thành công.
    if (signUpButton) {
        signUpButton.addEventListener('click', function () {
            const nameInput = document.getElementById('nameInput').value;
            const passwordInput = document.getElementById('passwordInput').value;
            const phoneInput = document.getElementById('phoneInput').value;
            const emailInput = document.getElementById('emailInput').value;
            const checkbox = document.querySelector('.checkbox1');

            if (nameInput === '' || passwordInput === '' || phoneInput === '' || emailInput === '' || !checkbox.checked) {
                alert('Vui lòng điền đầy đủ thông tin và chấp nhận điều khoản.');
                return;
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(passwordInput)) {
                alert('Mật khẩu phải chứa ít nhất 8 ký tự bao gồm số và chữ cái viết hoa.');
                return;
            }

            // Check if account exists
            if (accountExists(emailInput, phoneInput)) {
                alert('Tài khoản hoặc số điện thoại đã tồn tại. Vui lòng sử dụng thông tin khác.');
                return;
            }

            // Save new account to localStorage
            saveAccount(nameInput, emailInput, phoneInput, passwordInput);

            // Show success popup
            showSuccessPopup();
        });
    }

    // Hàm kiểm tra tài khoản tồn tại
    // Hàm này kiểm tra xem có tài khoản nào trong localStorage trùng với email hoặc số điện thoại được nhập hay không. Nếu có, trả về true, ngược lại trả về false.
    function accountExists(email, phone) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const account = JSON.parse(localStorage.getItem(key));
            if (account && (account.email === email || account.phone === phone)) {
                return true;
            }
        }
        return false;
    }

    //Hàm lưu tài khoản mới
    // Hàm này lưu thông tin tài khoản mới (bao gồm tên, email, số điện thoại, và mật khẩu) vào localStorage dưới dạng một đối tượng JSON.
    function saveAccount(name, email, phone, password) {
        const account = { name, email, phone, password };
        localStorage.setItem(email, JSON.stringify(account));
    }

    // Hàm hiển thị thông báo thành công
    function showSuccessPopup() {
        // Kiểm tra xem SuccessPopup đã tồn tại chưa
        let successPopup = document.querySelector('.success-popup');
        
        if (!successPopup) {
            // Nếu nó không tồn tại, hãy tạo và gắn nó vào phần thân
            successPopup = document.createElement('div');
            successPopup.classList.add('success-popup');
            document.body.appendChild(successPopup);
        }

        // Cập nhật nội dung của SuccessPopup
        successPopup.innerHTML = `
            <img src="./assets/picture/login/frane.png" alt="Success">
            <h3>Đăng ký thành công</h3>
            <p>Cám ơn bạn đã đăng ký tài khoản của Cocoon</p>
            <button id="confirmButton" type="button">VỀ TRANG CHỦ</button>
        `;

        /// Hiển thị thành côngCửa sổ bật lên và lớp phủ
        successPopup.style.display = 'block';
        overlay.style.display = 'block';

        // Thêm sự kiện click vào nút xác nhận để chuyển hướng về trang chủ
        const confirmButton = successPopup.querySelector('#confirmButton');
        confirmButton.addEventListener('click', function() {
            successPopup.style.display = 'none';
            overlay.style.display = 'none';
            window.location.href = "login.html";
        });
//         //Tạo thông báo: Kiểm tra xem phần tử thông báo thành công đã tồn tại hay chưa. Nếu chưa, tạo và thêm nó vào tài liệu.
// Hiển thị thông báo: Cập nhật nội dung của thông báo và hiển thị nó cùng với lớp phủ (overlay).
// Xử lý sự kiện khi nhấn nút xác nhận: Khi người dùng nhấn nút "VỀ TRANG CHỦ", thông báo sẽ bị ẩn đi và chuyển hướng người dùng đến trang đăng nhập.
    }
});

