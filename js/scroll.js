document.addEventListener("DOMContentLoaded", function() {
  // Define your array of colors
  // var ColorList = ['#FFFFFF','#F5DFF6', '#FFF9F9','#D6ECD5','FFE7CC'];
  var ColorList = ['#FFFFFF','#FFF9F9'];


  // Get the tipbox and underline span
  // var tipbox = document.querySelector('.tipbox');
  var underlineSpan = document.querySelector('#underline');



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
        const interpolatedColor = interpolateColor(color1, color2, interpolationPercentage);

        // Set the background color
        document.body.style.backgroundColor = interpolatedColor;

    // // Start the underline animation

    // Check if the scroll position is within the range of the tipbox
    if (scrollPercentage >= 90 && scrollPercentage <= 200) {
      underlineSpan.classList.add('underline');
      console.log(scrollPercentage)
      console.log(underlineSpan);
    } else {
      underlineSpan.classList.remove('underline');
      console.log(scrollPercentage)
      console.log(underlineSpan);
    }
  });

// Function to interpolate between two colors based on a percentage
function interpolateColor(color1, color2, percentage) {
  const c1 = hexToRgb(color1) || { r: 0, g: 0, b: 0 };
  const c2 = hexToRgb(color2) || { r: 255, g: 255, b: 255 };

  const r = Math.round(c1.r + (c2.r - c1.r) * percentage);
  const g = Math.round(c1.g + (c2.g - c1.g) * percentage);
  const b = Math.round(c1.b + (c2.b - c1.b) * percentage);

  return `rgb(${r}, ${g}, ${b})`;
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