document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('user-icon');
    const profilePopup = document.getElementById('profilePopup');
    const closePopup = document.getElementById('closePopup');
    
    // Toggle popup when user icon is clicked
    userIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        profilePopup.style.display = profilePopup.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close popup when close button is clicked
    closePopup.addEventListener('click', function() {
        profilePopup.style.display = 'none';
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!profilePopup.contains(e.target) && e.target !== userIcon) {
            profilePopup.style.display = 'none';
        }
    });
});
const side=document.getElementById('side-bar')
let count=0
function menu(){
    count++
    if (count%2==1){
        side.style.display='flex'
    }
    else{
        side.style.display="none"
    }
}
