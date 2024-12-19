function showContent(category) {
    const content = document.getElementById("content");
    console.log("button pressed");
    if (category === 'about-me'){

        content.innerHTML = `<p>About Me</p>`
    } else if (category === 'resume'){
        content.innerHTML = `<p>Resume</p>`
    } else if (category === 'case-studies'){
        content.innerHTML = `<p>Case Studies</p>`
    } else if (category === 'projects'){
        content.innerHTML = `<p>Projects</p>`
    } else if (category === 'concepts-and-technologies'){
        content.innerHTML = `<p>Concepts & Technologies</p>`
    } else if (category === 'browse'){
        content.innerHTML = `<p>Browse</p>`
    }
}


