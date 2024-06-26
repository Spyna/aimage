# Node CLI for Creating Images Using OpenAI API DALL-E

Welcome to the Node CLI project for creating images using the OpenAI API DALL-E. This project allows users to generate images via a command-line interface by leveraging OpenAI's DALL-E model.

## Table of Contents

- [Usage](#usage)
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

### Parameters

```shell
Usage: aimage [options]

Options:
  -V, --version           output the version number
  -s, --size <size>       Size of the image to generate: 256x256 | 512x512 | 1024x1024 | 1792x1024 | 1024x1792 (default: "1024x1024")
  -m, --model <model>     The model to use: dall-e-3 / dall-e-2 (default: "dall-e-3")
  --f, --folder <folder>  Saves the generated image in the specified folder (default: "./images")
  -h, --help              output usage information


```
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
yarn dev
```

```
node dist/index.js
```