document.getElementById('phone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.substring(0, 10);
        
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue =   value;
        }
        e.target.value = formattedValue;
    })