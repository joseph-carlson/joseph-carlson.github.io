---
date: 2025-08-01
draft: false
title: This Website
tags:
  - all
---

<br>
<br>

This website is a central repository for case studies, project documentation, and anything else I find interesting enough to share. No, it won't be perfect, but it's a start.

---

## Why I Chose Hugo

Flexible. Fast. Simple. Cheap.

Hugo is a free and open-source static site generator developed in Go, which can be used to host websites on GitHub Pages for free. All the content for the site is developed and stored in Markdown files. I can create shortcuts to add media and embed HTML wherever I see fit. Let's just say, this suits my needs far better than another platform which starts with Word and ends with Press.

---

## Implementation

This site is entirely contained within my public "joseph-carlson.github.io" repository. While I decided to deploy on GitHub Pages, there are several alternative methods to choose from: {{< newtablink url="https://gohugo.io/host-and-deploy/" text="Host and Deploy Hugo" >}}

None of the publicly available themes had exactly what I was looking for, so I built my own from the ground up with a little help from the Hugo documentation, ChatGPT, and a few YouTube videos. This also has the added benefit of limiting supply chain vulnerabilities... 

In terms of the day-to-day, these are all the commands I use for the local testing and deployment of new content:

<br>

Refresh All Elements
```zsh
hugo --cleanDestinationDir
```
View on localhost:1313
```zsh
hugo server --disableFastRender
```

Add All Changes 
```zsh
git add -A
```
Commit Those Changes
```zsh
git commit -m "update-comment"
```
Push Those Changes
```zsh
git push
```

<br>

---
## A Note on AI

While I did use LLMs such as ChatGPT in the development of this site, I reviewed every line of code to know exactly what each does. It was especially useful in the development of the shortcodes (custom templates invoked to insert elements on the page) shown below.

The articles, though, are a different story. I’ll do preliminary research with LLMs to brainstorm ideas and gain some momentum. After that, it’s that dusty ‘ol thing between my ears. To me, offloading my ability to write coherently and ultimately think critically is not something I’m willing to give up.

---
## Custom Shortcodes
- Open Link in New Tab
- Data Table
- Dynamically Resizing Single Photo
- Photo Carousal
- Code Block

---
### Test: Open Link in New Tab 

{{< newtablink url="https://google.com" text="Google">}}
<br>

---
### Test: Data Table

{{< datatable headers="Header #1, Header #2" >}}
data 1a, data 1b
data 2a, data 2b
data 3a, data 3b
{{< /datatable >}}
<br>

---
### Test: Dynamically Resizing Single Photo 

{{< img path="/projects/this-website/coffee.jpg" caption="Coffee" alt="Coffee" >}}
{{< credit >}}
    Photo by <a href="https://unsplash.com/@nate_dumlao?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nathan Dumlao</a> on <a href="https://unsplash.com/photos/focus-photography-of-coffee-artwork-r-KfktlyBL0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
{{< /credit >}}
<br>

---
### Test: Photo Carousel

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
### Test: Code Block 


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

### Potential Future Modifications:
- Light/Dark Mode Toggle
- Collapsible Headers within Articles

---

### Resources:

<div class="standardPadding">
  {{< youtube 0RKpf3rK57I >}}
</div>

https://gohugo.io

https://pages.github.com