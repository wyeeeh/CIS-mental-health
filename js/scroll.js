document.addEventListener("DOMContentLoaded", function() {
  // Define your array of colors
  var ColorList = ['#FFFFFF','#fff9f3', '#fff3f3'];
  // var ColorList = ['#FFFFFF','#FFF9F9','#ffbe98'];


  // Get the tipbox and underline span
  // var tipbox = document.querySelector('.tipbox');
  var underlineSpan = document.querySelector('#underline');
  var underlineSpan2 = document.querySelector('#underline2');
  var underlineSpan3 = document.querySelector('#underline3');



  // Listen for the scroll event
  window.addEventListener("scroll", function() {
        // Calculate the scroll position as a percentage of the total scrollable height
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        // Determine the index of the current color in the ColorList array
        const colorIndex = Math.floor((ColorList.length - 1) * (scrollPercentage / 100));

        // Interpolate the color based on the current index and the next index
        const color1 = ColorList[colorIndex];
        const color2 = ColorList[colorIndex + 1];

        // Calculate the interpolation percentage within the current color range
        const interpolationPercentage = ((scrollPercentage % (100 / (ColorList.length - 1))) / (100 / (ColorList.length - 1)));

        // Interpolate the color
        const interpolatedColor = interpolateColor(color1, color2, interpolationPercentage, 0.9);

        // Set the background color
        document.body.style.backgroundColor = interpolatedColor;
        // document.getElementById("container").style.backgroundColor = interpolatedColor;

        // select by class name "main-container"
        // 获取所有具有 "main-container" 类名的元素
        var elements = document.getElementsByClassName("chart-container main-container");

        // 遍历所有元素并修改颜色
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = interpolatedColor;
            }

    // // Start the underline animation

    // Check if the scroll position is within the range of the tipbox
    if (scrollPercentage >= 32 && scrollPercentage <= 100) {
      underlineSpan.classList.add('underline');
      console.log(scrollPercentage)
      console.log(underlineSpan);
    } else {
      underlineSpan.classList.remove('underline');
      console.log(scrollPercentage)
      console.log(underlineSpan);
    }


      // Check if the scroll position is within the range of the tipbox
      if (scrollPercentage >= 90 && scrollPercentage <= 200) {
        underlineSpan2.classList.add('underline');
        console.log(scrollPercentage)
        console.log(underlineSpan2);
      } else {
        underlineSpan2.classList.remove('underline');
        console.log(scrollPercentage)
        console.log(underlineSpan2);
      }


            // Check if the scroll position is within the range of the tipbox
    // if (scrollPercentage >= 90 && scrollPercentage <= 200) {
    //   underlineSpan3.classList.add('underline');
    //   console.log(scrollPercentage)
    //   console.log(underlineSpan3);
    // } else {
    //   underlineSpan3.classList.remove('underline');
    //   console.log(scrollPercentage)
    //   console.log(underlineSpan3);
    // }



  });


  

// Function to interpolate between two colors based on a percentage
function interpolateColor(color1, color2, percentage, alpha) {
  const c1 = hexToRgb(color1) || { r: 0, g: 0, b: 0 };
  const c2 = hexToRgb(color2) || { r: 255, g: 255, b: 255 };

  const r = Math.round(c1.r + (c2.r - c1.r) * percentage);
  const g = Math.round(c1.g + (c2.g - c1.g) * percentage);
  const b = Math.round(c1.b + (c2.b - c1.b) * percentage);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Function to convert hex color to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
});