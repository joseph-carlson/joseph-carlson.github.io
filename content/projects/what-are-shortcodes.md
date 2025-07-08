---
date: ''
draft: true
title: 'What Are Shortcodes?'
tags: ['all', 'null']
---

Shortcodes are templates that reside in the "/layouts/shortcodes" directory, which cam be invoked to easily embed media within pages.

To see what each of these look like, check out {{< newtablink url="/projects/this-website/" text="this page">}} where an example for each of this is shown.

---

## New Tab Link Embedding Shortcode
{{< code lang="html" >}}
<a href="{{- .Get "url" -}}" target="_blank" rel="noopener noreferrer">
  <!-- gets the url parameter for link
      "_blank" opens in new tab
      "noopener noreferrer" is a security measure -->
  {{- .Get "text" -}} <!-- gets the text parameter for what will be shown-->
</a>
{{< /code >}}


This allows me to write...

{{< img path="/projects/shortcodes/newtablink-shortcode.png" alt="HMTL Code Snippet" >}}

Instead of writing this...

{{< img path="/projects/shortcodes/newtablink-html.png" alt="HMTL Code Snippet" >}}

Now even though in this instance, it only saves me a few characters, the concept scales remarkably well for more complex structures.

---

## Data Table Embedding Shortcode

{{< code lang="html" >}}
<table class="datatable">
  <thead>
    <tr>
      {{- range (split (.Get "headers") ",") -}} 
      <!-- iterates through the headers with "," delimiter -->
        <th>&nbsp{{- . | htmlEscape -}}&nbsp</th> 
        <!-- adds that text to a table header buffered with a space on each side
              then escapes to parent element table context -->
      {{- end -}}
    </tr>
  </thead>
  <tbody>
    {{- $rows := split (.Inner | chomp | replaceRE "\r" "") "\n" -}}
    <!-- iterates through the rows with new line "\n" delimeter
          replaceRE runs a regular expression to remove all carriage returns "\r" 
          in case of Windows-style line endings "\r\n" 
          unix-based systems do not include the carriage return -->
      {{- range $rows -}}   <!-- loops over each element in the current row -->
        {{- if ne . "" -}}  <!-- skips empty strings -->
          <tr>            <!-- opens row for non-empty lines -->
            {{- range (split . ",") -}}                  <!-- splits with comma delimeter for columns-->
              <td>&nbsp{{- . | htmlEscape -}}&nbsp</td>  <!-- adds the table data buffered with a space on each side
                                                            and escapes to parent element context -->
            {{- end -}} <!-- table data loop end -->
          </tr>
        {{- end -}} <!-- table row loop end  -->
    {{- end -}} <!-- windows new line correction end -->
  </tbody> 
</table>

<style> /* renders table cell borders */
  .datatable * { border: 1px solid gray; }
</style>
{{< /code >}}

## Code Embedding Shortcode

{{< code lang="html" >}}
<div style="padding: 0% 2%;"> <!-- applies padding to buffer code from edge of page -->
  
  {{- $lang := .Get "lang" | default "text" -}} <!-- pulls the lang parameter and defaults to text if not present -->
  
  <div class="code-block"
    style="border:1px solid grey; 
              border-radius:1rem; 
              overflow: hidden; "> 
              <!-- applies background and bounds the outer-mode code box -->

    <div style="display:flex; 
                justify-content:space-between; 
                align-items:center; 
                background:#a8a8a8; 
                padding:0.5rem 1rem; 
                font-size:0.9em;">
                <!-- style for header -->
      
      <span style="color:rgb(0, 0, 0); 
                      background-color: rgb(229, 229, 229);
                      padding: 0.25rem 0.5rem;
                      border-radius: 0.25rem;
                      font-weight: bold;"
                      >{{- $lang | upper -}}
                      <!-- adds and applies style to the language label in top left -->
      </span>
      <button onclick="(function(btn){
                const code = btn.closest('.code-block').querySelector('pre code');
                // selects the closest element that has class code-block
                // then search for code element that is a descendent of a pre element
                navigator.clipboard.writeText(code.textContent).then(function(){
                  btn.textContent = 'Copied!';
                  setTimeout(function(){ btn.textContent = 'Copy'; }, 2000);
                }); // copies the text to clipboard and temporarily changes Copy to Copies!
              })(this)"
        >Copy</button> 

    </div> <!-- closes 3rd nested div -->

    <!-- body with syntax highlighting and horizontal scroll -->
    <div class="code-body"
          style="overflow-x: auto; 
                  padding: 0rem 0.5rem; 
                  background-color: rgb(0, 50, 50);">
          {{- highlight .Inner $lang -}} 
          <!-- adds text between opening and closing shortcode tags with lang utilizing native shortcode for syntax highlighting -->
    </div> <!-- closes code-body div-->

  </div> <!-- closes code-block div -->

  <style> /* matches RGB background color of code-body for full coverage */
    .code-body * { background-color: rgb(0, 50, 50); }
  </style>

</div> <!-- closes top level div for padding -->

{{< /code >}}


## Image Embedding Shortcode

{{< code lang="html" >}}
<div class="standardPadding" style="text-align: center; max-width: 100%; height: auto;"> 
  <!-- wrapper div to apply class and style -->
  {{- with .Get "caption" -}} <!-- checks to see if a caption been passed through -->
    <h3 class="caption">{{- . -}}:</h3> <!-- adds the caption followed by a semicolon if present -->
  {{- end -}} <!-- ends the caption check -->
  <div style="max-width: 1000px;">
    <img
      src="{{- .Get "path" -}}" 
      alt="{{- .Get "alt" -}}"
      loading="lazy"
      style="display: block; max-width: 100%; max-height: 80vh; width: auto; height: auto; margin-left: auto; margin-right: auto;"> 
      <!-- grabs the path and alt text when the image is unable to load from parameters
            sets the loading as lazy - will defer image download until near the viewport
            applies style to dynamically resize image within parent container and viewport -->
    </div>
</div>
{{< /code >}}

---

## Multiple Image Embedding Shortcode

{{< code lang="html" >}}
{{- $images := .Params -}}  <!-- assign the passed in parameters to a variable -->

<div class="carousel standardPadding"> <!-- wrapper class to apply style -->

  <div class="carousel-controls"> <!-- wrapper class for controls -->
    <button class="carousel-prev" aria-label="Previous slide">‹</button> <!-- creates the previous button element -->
    <span class="carousel-label"></span> <!-- creates a span where Javascript can inject index of current image  (x / y) -->
    <button class="carousel-next" aria-label="Next slide">›</button> <!-- creates the previous button element -->
  </div>

  <div class="carousel-inner"> <!-- wrapper class for image array -->
    {{- range $i, $img := $images -}} <!-- iterate through all passed in images -->
      <img
        src="{{- $img -}}" 
        class="carousel-item {{ if eq $i 0 }}active{{ end }}" 
        alt="Slide {{ add $i 1 }}"/> 
        <!-- add image html element 
              src pulls the path of the image with root in static folder 
              every photo is in carousel-item class 
              the first photo (index 0) is in the active class 
          -->
    {{- end -}} <!-- ends loop over images -->
  </div>
  
</div>

<style>

  .carousel {
    text-align: center;
  }

  .carousel-inner {
    display: inline-block; /* centers the active image */
  }

  .carousel-item {
    display: none;        /* hides all but the selected image */
    max-width: 100%;      /* the image can occupy no more than 100% of the parent container #narrowOnDesktop */
    max-height: 70vh;     /* the image can occupy no more than 70% of the viewport height */
    width: auto;          /* retains aspect ratio before the max-width has been reached */
    height: auto;         /* retains aspect ratio before the max-height has been reached */
  } 

  .carousel-item.active {
    display: block;       /* changes from display: none to block, making visible the active image */
  }

  .carousel-controls {
    margin: 0.5rem auto;  /* top, left/right, bottom */
  }

  .carousel-controls button,
  .carousel-label {
    vertical-align: middle;         /* vertical centers elements  */
    margin: 1rem 0.5rem 0rem;       /* adds margin: top/botton left/right */
  }

  .carousel-controls button {
    background: rgba(0,0,0,0.5);  /* background color of buttons */
    color: #fff;                  /* text color in buttons */
    font-size: 1.5rem;              /* text size in buttons */
    padding: 0.5rem 1rem;           /* padding between character and edge of button: top/botton left/right */
    cursor: pointer;                /* changes cursor to pointer icon on hover */
    border-radius: 0.25rem;         /* round off the edges of the boxes */
  }

  .carousel-label {
    font-weight: bold;         /* makes the text bold - x/y */
  }

</style>

<script>

  (function(){  // starts an IIFE (immediately invoked function expression)
                // prevented from leaking into global scope
    const carousel = document.currentScript.parentNode;         // reference to root carousel container
    const items = carousel.querySelectorAll('.carousel-item');  // using the above const to grab container for images
    const label = carousel.querySelector('.carousel-label');    // using the above const to grab container for navigation
    let index = 0;  // sets the default image to the first

    function show(i) {
      index = (i + items.length) % items.length;            // changes index and enables wrap around navigation
      items.forEach(el => el.classList.remove('active'));   // loops through active image to mark all as inactive
      items[index].classList.add('active');                 // marks previously calculated index as active
      label.textContent = `${index+1}/${items.length}`;     // updates the image index label
    }

    carousel.querySelector('.carousel-prev')  
      .addEventListener('click', () => show(index - 1));  // adds event listener to change image index on click
    carousel.querySelector('.carousel-next')
      .addEventListener('click', () => show(index + 1)); // adds event listener to change image index on click

    show(0); // makes the first image visible on first load

  })(); // closing IIFE

</script>
{{< /code >}}

<br>