document.addEventListener('DOMContentLoaded', function () {
    const side = document.getElementById('side-bar');
    const body = document.querySelector('.abc');
    const navbar = document.querySelector('.navbar');
    const userIcon = document.getElementById('user-icon');
    const profilePopup = document.getElementById('profilePopup');
    const closePopup = document.getElementById('closePopup');

    let count = 0;

    // Sidebar toggle with scroll lock
    window.menu = function () {
        count++;
        if (count % 2 === 1) {
            side.classList.add('show-sidebar');
            side.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Lock scroll
        } else {
            side.classList.remove('show-sidebar');
            side.style.display = 'none';
            document.body.style.overflow = 'auto'; // Unlock scroll
        }
    };

    // Optional: Add overlay click close (if you use a dark overlay)
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            count = 0;
            side.classList.remove('show-sidebar');
            side.style.display = 'none';
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Dark mode toggle
    document.getElementById('b').addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        navbar.classList.toggle('dark-mode');
    });

    // Profile popup toggle
    userIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        profilePopup.style.display = (profilePopup.style.display === 'block') ? 'none' : 'block';
    });

    // Close profile popup
    closePopup.addEventListener('click', function () {
        profilePopup.style.display = 'none';
    });

    // Close popup when clicking outside
    document.addEventListener('click', function (e) {
        if (!profilePopup.contains(e.target) && e.target !== userIcon) {
            profilePopup.style.display = 'none';
        }
    });
});
