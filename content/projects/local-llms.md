---
date: 2025-08-04
draft: false
title: Local LLMs
tags:
  - all
  - ai
---

You can use ChatGPT, Claude, Gemini, Apple Intelligence, or any number of models available on the internet nowadays. Just kidding, definitely not Apple Intelligence. For general queries, there's absolutely nothing wrong with that, but in the back of your mind, you have to wonder where all those chats go. Deleted into the abyss of unknown history, fragments of a memory as they make their own impact on training the next AI model[^1], or stored just in case for a rainy day[^2].

Now I'm not naive. Privacy simply does not exist in our modern world except for very few exceptions where the brightest minds went to great lengths to cover their tracks. If they can't track your IP because the endless YouTube NordVPN ads buried themselves into your subconscious, there are numerous known and unknown mechanisms that can be employed to rebuild your digital footprint.

The good news is that they can't track what is run locally on your device (as far as we know). The better news is that some really smart people made our lives easy by developing user-friendly tools to run AI models locally on your device. Because of this, powerful hardware is critical for smooth operation. The performance bottleneck with most of these models is the VRAM (memory available to the GPU). 

To do this, we will be using two tools:
- Ollama (backend running the models)
- Open WebUI (self-hosted user-interface)

---
## {{< newtablink url="https://ollama.com/" text="Ollama">}}

To install Ollama, navigate to https://ollama.com/download to download and install the app for your platform.

Since I'm running MacOS, I downloaded the dmg file and dropped it into the Applications folder. 

If you're on another platform, I trust you know how to install an app.

{{< code lang="txt" >}}
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

{{< newtablink url="https://docs.openwebui.com/security/" text="Security Policy" >}}for curious minds.

This is where the magic happens. After all, even though I can run all the Ollama models from the terminal, that's a pain and I really don't want to do that. 

Since I have Ollama and Docker installed on my device, this command will pull the Open WebUI Docker image from the GitHub Container Registry. Now this is a sizable download, so I would advise you do this at home and not at a coffee shop, which throttles your connection. Not that I would know...

{{< code lang="zsh" >}}
docker pull ghcr.io/open-webui/open-webui:main
{{< /code >}}

Next, this command will run that previously downloaded container with the default settings. It will also include volume mapping to ensure persistent data storage.
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

When run, that Docker container is running on local port 3000, which can be accessed at http://localhost:3000 through the web browser of your choice.


Remember, updating software is important...
{{< code lang="zsh" >}}
docker rm -f open-webui
docker pull ghcr.io/open-webui/open-webui:main
{{< /code >}}

---

{{< img path="/projects/local-llms/Terminal Ollama.png" caption="Old UI" alt="Running Ollama in Terminal">}}

{{< img path="/projects/local-llms/Open WebUI.png" caption="New UI" alt="Running Ollama in Terminal">}}

[^1]: https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance

[^2]: https://openai.com/index/response-to-nyt-data-demands/