import $ from 'jquery';
import firstSlideImage from '../images/slideshow/image1.jpg';
import secondSlideImage from '../images/slideshow/image2.jpg';
import thirdSlideImage from '../images/slideshow/image3.jpg';
import fourthSlideImage from '../images/slideshow/image4.jpg';
import fifthSlideImage from '../images/slideshow/image5.png';

function appendSlider() {
    $('#slideshowArea')
        .append($(
            '<div class="slideshow-container">\n' +
            '\n' +
            '    <div class="mySlides fade">\n' +
            '        <div class="numbertext">1 / 5</div>\n' +
            `        <img src=${firstSlideImage} alt="IMG 1 NOT FOUND" style="width:100%; height: auto">\n` +
            '    </div>\n' +
            '\n' +
            '    <div class="mySlides fade">\n' +
            '        <div class="numbertext">2 / 5</div>\n' +
            `        <img src=${secondSlideImage} alt="IMG 2 NOT FOUND" style="width:100%; height: auto">\n` +
            '    </div>\n' +
            '\n' +
            '    <div class="mySlides fade">\n' +
            '        <div class="numbertext">3 / 5</div>\n' +
            `        <img src=${thirdSlideImage} alt="IMG 3 NOT FOUND" style="width:100%; height: auto">\n` +
            '    </div>\n' +
            '\n' +
            '    <div class="mySlides fade">\n' +
            '        <div class="numbertext">4 / 5</div>\n' +
            `        <img src=${fourthSlideImage} alt="IMG 4 NOT FOUND" style="width:100%; height: auto">\n` +
            '    </div>\n' +
            '\n' +
            '    <div class="mySlides fade">\n' +
            '        <div class="numbertext">5 / 5</div>\n' +
            `        <img src=${fifthSlideImage} alt="IMG 5 NOT FOUND" style="width:100%; height: auto">\n` +
            '    </div>\n' +
            '\n' +
            '</div>\n' +
            '<br>\n' +
            '\n' +
            '    <div style="text-align:center">\n' +
            '        <span class="dot"></span>\n' +
            '        <span class="dot"></span>\n' +
            '        <span class="dot"></span>\n' +
            '        <span class="dot"></span>\n' +
            '        <span class="dot"></span>\n' +
            '    </div>\n' +
            '\n' +
            '    <script>\n' +
            '        // Automatic Slideshow - change image every 3 seconds\n' +
            '        var slideIndex = 0;\n' +
            '        showSlides();\n' +
            '        function showSlides() {\n' +
            '        var i;\n' +
            '        var slides = document.getElementsByClassName("mySlides");\n' +
            '        var dots = document.getElementsByClassName("dot");\n' +
            '        for (i = 0; i < slides.length; i++) {\n' +
            '        slides[i].style.display = "none";\n' +
            '    }\n' +
            '        slideIndex++;\n' +
            '        if (slideIndex > slides.length) {slideIndex = 1}\n' +
            '        for (i = 0; i < dots.length; i++) {\n' +
            '        dots[i].className = dots[i].className.replace(" active", "");\n' +
            '    }\n' +
            '        if (slides[slideIndex - 1] !== undefined) {\n' +
            '            slides[slideIndex-1].style.display = "block";\n' +
            '            dots[slideIndex-1].className += " active";\n' +
            '        }\n' +
            '        \n' +
            '        setTimeout(showSlides, 2200); // Change image every 2.2 seconds\n' +
            '    }\n' +
            '    </script>'))
}

function clearSlider() {
    $('#slideshowArea').empty();
}

export default {
    appendSlider,
    clearSlider
}