# Node CLI for Creating Images Using OpenAI API DALL-E

Welcome to the Node CLI project for creating images using the OpenAI API DALL-E. This project allows users to generate images via a command-line interface by leveraging OpenAI's DALL-E model.

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Development](#development)
- [License](#license)


## Usage
### Linux/macOS
To create an image, use the following command:

```bash
export OPENAI_API_KEY=your-openai-api-key
npx aimage --prompt "A description of the image you want to generate"
```

### Windows
For Windows, use the set command to set the environment variable:

```bash
set OPENAI_API_KEY=your-openai-api-key
npx aimage --prompt "A description of the image you want to generate"
```

## Configuration
Ensure you set the environment variable `OPENAI_API_KEY` with your OpenAI API key.

### Example

```bash
export OPENAI_API_KEY=your-openai-api-key
npx aimage --prompt "A futuristic cityscape at sunset"
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- OpenAI API Key

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/node-cli-dalle.git
   cd node-cli-dalle


## Contributing
We welcome contributions! Please follow these steps to contribute:

* Fork the repository.
* Create a new branch (`git checkout -b feature/your-feature-name`).
* Commit your changes (`git commit -m 'Add some feature'`).
* Push to the branch (`git push origin feature/your-feature-name`).
* Open a pull request.

Please ensure your code adheres to our coding standards and passes all tests.

## Development

```
yarn
# npm isntall
yarn dev
#npm run dev
```

```
node dist/index.js
```


## License

This project is licensed under the MIT License. See the [LICENSE] file for details.

