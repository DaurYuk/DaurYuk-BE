<div align="center">
  <img src="https://drive.google.com/uc?export=view&id=1FAluquVilJW5e8XKUtnQt-D1YsBr4DxE" alt="DaurYuk Logo"></img>
  <h2 align="center">DaurYuk: Sorting Waste for a Sustainable Future!</h2>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stacks">Tech Stacks</a></li>
        <li><a href="#cloud-architecture">Cloud Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About the Project
DaurYuk is a mobile application that utilizes image classification technology to help users identify waste types and provide information on registered recycling centers and proper disposal methods. By promoting awareness, facilitating access to recycling centers, and fostering a culture of responsible waste management, DaurYuk has the potential to significantly impact environmental conservation efforts in Indonesia. Through collective action and sustainable practices, we can reduce pollution, conserve natural resources, and protect our nation's unique biodiversity for future generations.

### Tech Stacks
For develop robust and highly scalable application, we decided to use these tech stacks below.
- [**Node.js ®**](https://nodejs.org), is the widely popular JavaScript runtime framework that is able to run server-side JavaScript code.
- [**Express.js**](https://expressjs.com), is an robust Node.js web framework for developing API Backend applications
- **Docker**, is a container daemon that utilizes OS-level virtualization or containerization. We utilize Docker to build an OCI-compatible container image for being able to run on containerized environment such as Google Cloud Run.

### Cloud Architecture
We utilize all Google Cloud products to accelerate and serve our application, that is described below.

- **Cloud Run**, is the Google managed compute services that utilizes OCI-compatible containers to serve HTTP requests, this will be used to serve our API application.
- **Google Cloud Storage**, is a data storage stored on Google infrastructures to serve static object files such as images, and more. We utilize Cloud Storage to store our exported TensorFlow.js model and image histories binary.
- **Firestore**, is a document object NoSQL database to store JSON-like (key-value). We utilize Firestore to store our user profile and credentials, detail information about trash detection histories.

The architecture diagram of Google Cloud products are shown below.

![GCloud Products Stack](https://drive.google.com/uc?export=view&id=1RdVBqmL7Pmgawt8utV5ohxHBWoT442HN)

## Getting Started

### Installation
1. Clone the repo with `git` utility
```bash
git clone https://github.com/DaurYuk/DaurYuk-BE.git
```

2. Change your working directory to the project
```bash
cd DaurYuk-BE
```

3. Install all packages required within the project
```bash
npm install
```

4. Create new `.env` file before run the project, where the example can be found in the `.env.example` [here](./.env.example).

4. Run the application by execute the command below
```bash
node index.js
```

### Usage

API endpoints available within this project are accessible and documented at the Postman below.
[https://www.postman.com/dauryuk-c241-ps480/workspace/dauryuk-c241-ps480-workspace](https://www.postman.com/dauryuk-c241-ps480/workspace/dauryuk-c241-ps480-workspace)
