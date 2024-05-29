
    document.addEventListener('DOMContentLoaded', function () {
        const polygonWrapper = document.getElementById('polygon-wrapper');
        const imgPlygon = document.getElementById('img_plygon');
        const footer = document.querySelector('footer');

        // Kiểm tra khi cuộn
        window.addEventListener('scroll', function () {
            const footerRect = footer.getBoundingClientRect();
            const polygonWrapperRect = polygonWrapper.getBoundingClientRect();
            if (footerRect.top <= window.innerHeight && polygonWrapperRect.top >= 0) {
                imgPlygon.style.display = 'block'; // Hiển thị hình ảnh khi cuộn đến footer
            } else {
                imgPlygon.style.display = 'none'; // Ẩn hình ảnh khi không ở footer
            }
        });

        // Sự kiện nhấp vào hình ảnh
        imgPlygon.addEventListener('click', function () {
            scrollToTopSlowly();
        });

        function scrollToTopSlowly() {
            const scrollStep = -window.scrollY / (450/ 15);
            const scrollInterval = setInterval(function () {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        }
    });

