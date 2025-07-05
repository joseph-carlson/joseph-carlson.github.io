---
date: ''
draft: false
title: 'Local LLMs'
tags: ['all', 'AI']
---

Now you can use ChatGPT, or Claude, or Gemeni, or Apple Intelligence. Just kidding, definitely not Apple Intelligence. For general queries, there's absolutely nothing wrong with that, but in the back of your mind, you have to wonder where all your chat logs go. Deleted into the abysse of unknown history, fragments of a memory as they make their own impact of the next AI model, or stored just in case for a rainy day.

How I'm not naive, privacy simply does not exist in the mordern world except for very few exceptions where people took exceptional efforts of cover their tracks. If they can't track your IP because the YouTube Nord VPN ads buried themselves into your subconscious, there are numerous known ad unknown mechanisms that can be employed to rebuild your digital footprint.

The good news is that they can't track what is run locally on your device (in most cases). The better news, some really smart people made our lives easy developing user friendly tools and platforms to run AI models locally on your device. Because of this, hardware is critical for smooth operation, and even high end software is not capable of running most of the large models Big Tech are employing. 

To do this, we will be using a some tools.
- Ollama (backend running the models)
- Open WebUI (front end self-hosted AI platform)

---
## {{< newtablink url="https://ollama.com/" text="Ollama">}}

To install Ollama, navigate to https://ollama.com/download to download and install this app for your platform.

Since I'm running MacOS, all that has to do is download the dmg and drop that into the applications folder.


{{< code lang="zsh" >}}
josephcarlson@Josephs-MacBook-Pro ~ % ollama --version        
ollama version is 0.9.5
josephcarlson@Josephs-MacBook-Pro ~ % ollama --help
Large language model runner

Usage:
  ollama [flags]
  ollama [command]

Available Commands:
  serve       Start ollama
  create      Create a model from a Modelfile
  show        Show information for a model
  run         Run a model
  stop        Stop a running model
  pull        Pull a model from a registry
  push        Push a model to a registry
  list        List models
  ps          List running models
  cp          Copy a model
  rm          Remove a model
  help        Help about any command

Flags:
  -h, --help      help for ollama
  -v, --version   Show version information

Use "ollama [command] --help" for more information about a command.
josephcarlson@Josephs-MacBook-Pro ~ % ollama list  
NAME                    ID              SIZE      MODIFIED     
deepseek-r1:latest      0a8c26691023    4.7 GB    4 months ago    
mistral-small:latest    d095cd553b04    12 GB     8 months ago    

{{< /code >}}

---
## {{< newtablink url="https://docs.openwebui.com/" text="Open WebUI" >}}

This is where the magic happens. After all, even though I can run all the Ollama models from the command prompt, that's a pain and I really don't want to do that. 

Since I have Ollama and Docker installed on my device, this command will pull the Open WebUI Docker image from the GitHub Container Registry. Now this is a sizable download, so I would advise you do this at home and not at a coffee shop which throttles your connection. Not that I would know...

{{< code lang="zsh" >}}
docker pull ghcr.io/open-webui/open-webui:main
{{< /code >}}

Next, this command will run that previously downloaded container with the default settings. It will also include volume mapping to ensure persistant data storage.
{{< code lang="zsh" >}}
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
{{< /code >}}

If you are using Windows with an Nvidia GPU, this command adds '--gpus all' to the previous command.
{{< code lang="zsh" >}}
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
{{< /code >}}

Lastly, if you're like me, running this in single-user mode to disable login, use this command to set the WEBUI_AUTH environment variable to False.
{{< code lang="zsh" >}}
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
{{< /code >}}

When run, that docker container is running on local port 3000, which can be accessed at http://localhost:3000 through the web browser of your choice.


Remember, updating software is important. 
{{< code lang="zsh" >}}
docker rm -f open-webui
docker pull ghcr.io/open-webui/open-webui:main
{{< /code >}}

---

{{< img path="/projects/Terminal Ollama.png" caption="Old UI" alt="Running Ollama in Terminal">}}

{{< img path="/projects/Open WebUI.png" caption="New UI" alt="Running Ollama in Terminal">}}