---
date: '2025-07-05'
draft: false
title: 'This Website'
tags: ['all', 'webdev']
---
## Portfolio Website

This site will serve as a repository for case studies on historical events, project documentation, technical concept breakdowns, and some "hot takes" I have related to the world of technology and consumer advocacy within the space.

The act of publishing my projects, research, and thoughts in these articles not only makes my ideas accessible to curious eyes and ears, but also affords me the opportunity to explore what happened, what is happening, and what is possible.

---

## Why I Chose Hugo

I chose Hugo because it's fast, simple, and cheap. 

Articles literally being Markdown files while still being able to add shortcodes and embed HTML when needed makes my life a whole lot easier. What you see is what you get; nothing more, nothing less.

As one does when they can't find exactly what they were looking for, I designed this page from the ground up after spending some time with the Hugo documentation, YouTube, and a few LLMs.

---

## Implementation

All of the project files exist within a folder I open up in Visual Studio Code. I draft, edit, proofread, and post.

New Article: 

```bash 
hugo new content parent-folder/article.md
``` 

Refresh All Elements: 

```bash
hugo --cleanDestinationDir
```

Add All Changes: 
```bash
git add -A
```
Commit Those Changes: 
```bash
git commit -m "update"
```
Push Those Changes: 
```bash
git push
```

In a few minutes, everything will be updated on my GitHub pages website.

---
## A Note on AI

Did I use AI in the development of this site? For sure, but I have reviewed and know what every single line of code does. It was especially useful when developing the shortcodes shown below.

Though when it comes to the articles, I write those. I'll sometimes do preliminary research with LLMs to provide a starting point, but after that, it's that dusty 'ol thing between my ears. As of now, the ability to write, no matter how good or bad I may be right now, is not a skill I am willing to offload to AI. 

---
## Custom Shortcodes
- Open Link in New Tab
- Data Table
- Dynamically Resizing Single Photo
- Photo Carousal
- Code Block
- YouTube with Padding

---
### Test Open Link in New Tab 

{{< newtablink url="https://google.com" text="Google">}}
<br>

---
### Test Data Table

{{< datatable headers="Header #1, Header #2" >}}
data 1a, data 1b
data 2a, data 2b
data 3a, data 3b
{{< /datatable >}}
<br>

---
### Test Dynamically Resizing Single Photo 

{{< img path="/projects/this-website/coffee.jpg" caption="Coffee" alt="Coffee" >}}
{{< credit >}}
    Photo by <a href="https://unsplash.com/@nate_dumlao?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nathan Dumlao</a> on <a href="https://unsplash.com/photos/focus-photography-of-coffee-artwork-r-KfktlyBL0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
{{< /credit >}}
<br>

---
### Test Photo Carousel

{{< imgs
    "/projects/this-website/luca-bravo-O453M2Liufs-unsplash.jpg"
    "/projects/this-website/nils-nedel-ONpGBpns3cs-unsplash.jpg"
    "/projects/this-website/stefan-stefancik-0wMmxNB6Xzc-unsplash.jpg"
>}}

{{< credit >}}
    #1 Photo by <a href="https://unsplash.com/@lucabravo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Luca Bravo</a> on <a href="https://unsplash.com/photos/brown-wooden-boat-moving-towards-the-mountain-O453M2Liufs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
    <br>
    #2 Photo by <a href="https://unsplash.com/@nilsnedel?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Nils Nedel</a> on <a href="https://unsplash.com/photos/airplane-on-sky-during-golden-hour-ONpGBpns3cs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
    <br>
    #3 Photo by <a href="https://unsplash.com/@cikstefan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Štefan Štefančík</a> on <a href="https://unsplash.com/photos/man-standing-on-cliff-near-falls-0wMmxNB6Xzc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
{{< /credit >}}
<br>

---
### Test Code Block 


{{< code lang="C++" >}}
// This is to hit the right edge for the horizontal scroll bar to appear because it is invisible before then.

#include <iostream>
using namespace std;

int main() {
    int n, t1 = 0, t2 = 1, nextTerm = 0;

    cout << "Enter the number of terms: ";
    cin >> n;

    cout << "Fibonacci Series: ";

    for (int i = 1; i <= n; ++i) {
        // Prints the first two terms.
        if(i == 1) {
            cout << t1 << ", ";
            continue;
        }
        if(i == 2) {
            cout << t2 << ", ";
            continue;
        }
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
        
        cout << nextTerm << ", ";
    }
    return 0;
}
{{< /code >}}

<br>

---

The time is now to start creating with all the knowledge we have consumed.

If you're looking to spin up a website like this, perfection is the enemy of progress so stop thinking and go do it!

---

### Potential Future Modifications:
- Light/Dark Mode Toggle
- Collapsible Headers in Articles

---

### Resources:

<div class="standardPadding">
  {{< youtube 0RKpf3rK57I >}}
</div>

https://gohugo.io

https://pages.github.com
