---
date: '2025-07-03'
draft: false
title: 'This Website'
tags: ['all', 'webdev']
---
## Portfolio Website

This site will serve as a repository for case studies on historical events, project documentation, technical concept breakdowns and some "hot takes" I have related to the world of technology and consumer adocacy within the space.

The act of publishing my projects, research, and thoughts in these articles not only makes my ideas and values accessible to curious eyes and ears, but also affords me the opportunity to explore what happened, what is happening, and what is possible.

---

### Why I Chose Hugo

I chose Hugo becayse it's fast, simple, and cheap. 

Articles literally being markdown files while still being able to embed HTML when I want to add images or format tables makes my life a whole lot easier. What you see is what you get; nothing more, nothing less.

As one does when they can't find exactly what they were looking for, I designed this page from the ground up after spending some time with the Hugo documentation. Maybe I'll add a dark/light mode toggle in the future because that seems pretty neat, but I'm just working on the content for now.

---

### Implementation

I built this website from the ground up because none of the available themes suited what I was looking for. 

All of the project files exist within a folder I open up in visual studio code.

I create, edit, proof, the post.

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

In a few minutes, everything will be updated to my Github pages website.

---
### Custom Shortcodes
- Open Link in New Tab
- Test Data Table
- Dynamically Resizing Single Photo
- Photo Carousel


---

### Future Modifications:
- Light/Dark Mode Toggle
- Collapsible Headers in Articles

---
### Test Open Link in New Tab 

{{< newtablink url="https://google.com" text="Google">}}
<br>

---
### Test Data Table - Complete

{{< datatable headers="Header #1, Header #2" >}}
data 1a, data 1b
data 2a, data 2b
data 3a, data 3b
{{< /datatable >}}
<br>

---
### Test Dynamically Resizing Single Photo 

{{< img path="/projects/coffee.jpg" caption="Coffee" alt="Coffee" >}}
<br>

---
### Test Photo Carousel - In Progress

{{< carousel
    "/projects/luca-bravo-O453M2Liufs-unsplash.jpg"
    "/projects/nils-nedel-ONpGBpns3cs-unsplash.jpg"
    "/projects/stefan-stefancik-0wMmxNB6Xzc-unsplash.jpg"
>}}

<div style="text-align: center;">
#1 Photo by <a href="https://unsplash.com/@lucabravo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Luca Bravo</a> on <a href="https://unsplash.com/photos/brown-wooden-boat-moving-towards-the-mountain-O453M2Liufs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
<br>
#2 Photo by <a href="https://unsplash.com/@nilsnedel?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Nils Nedel</a> on <a href="https://unsplash.com/photos/airplane-on-sky-during-golden-hour-ONpGBpns3cs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
<br>
#3 Photo by <a href="https://unsplash.com/@cikstefan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Štefan Štefančík</a> on <a href="https://unsplash.com/photos/man-standing-on-cliff-near-falls-0wMmxNB6Xzc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
</div>
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

Resources:

<div style="padding: 2% 5%">
  {{< youtube 0RKpf3rK57I >}}
</div>


https://gohugo.io

https://pages.github.com
