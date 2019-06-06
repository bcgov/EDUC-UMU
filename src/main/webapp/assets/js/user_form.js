$(document).ready(function(){
    document.getElementById('super').onclick = function(){
        toggleBox(this, 'super_district');
    };

    document.getElementById('principle').onclick = function(){
        toggleBox(this, 'school_id');
    };

    function toggleBox(box, text){
        var disp = document.getElementById(text);
        if(box.checked){
            disp.style.display = 'block';
        }
        else{
            disp.style.display= 'none';
        }
    }
});