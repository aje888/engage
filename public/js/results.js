function getResults() {
        var x = document.getElementById("apprenticeTechResults");
        x.style.display = "block";
}


function getResults2() {
    if($_POST["aLevels"].checked) {
        if($_POST["technology"].checked) {
        var x = document.getElementById("apprenticeTechResults");
        x.style.display = "block";
        }
        if($_POST["business"].checked) {
        var y = document.getElementById("apprenticeBusinessResults");
        y.style.display = "block";
        }
        else {
            var qual = "<?php echo $qualification ?>";
            document.write(qual);
        }
    }
    else {
            var qual1 = "<?php echo $qualification ?>";
            document.write(qual1);
    }
}