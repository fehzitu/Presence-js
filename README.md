## Presence-js 🎮
A customizable Discord Rich Presence manager built with JavaScript. Configure your activity, manage accumulated time, and preserve your presence settings across sessions.

## About 📖
Presence-js is an experimental project designed to make Discord Rich Presence customizable and persistent.

The goal is to create a lightweight application that reads activity settings from a JSON file, manages accumulated session time, and automatically restores the previous state when the Discord client becomes available again.

The project is being developed with a shared JavaScript core and platform-specific integrations for Windows, Linux, and Android through Termux.

## Features ✨
- 🎨 Customizable Rich Presence settings.
- ⚙️ JSON-based configuration.
- ⏱️ Accumulated session time tracking.
- 💾 Persistent state storage.
- 🔄 Automatic reconnection when supported.
- 🖥️ Platform-specific integrations.
- 🐧 Windows and Linux support planned.
- 📱 Android and Termux support under investigation.
- 🧩 Modular architecture with a shared core.
- 📚 Built as a hands-on JavaScript learning project.

«Note: Features are under development. Rich Presence publication depends on a supported Discord integration. The desktop RPC interface is not automatically available to the Android Discord client.»

## Technologies 🛠️
- Javascript
- Node.js
- Discord RPC
- JSON
- Node.js built-in modules

## Project Structure 📂
```text
Presence-js/
├── src/
│   ├── core/
│   │   ├── timer.js
│   │   ├── storage.js
│   │   └── config.js
│   ├── presence/
│   │   ├── activity.js
│   │   └── rpc.js
│   └── index.js
├── data/
│   └── presence.json
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## How It Works 🔍
Presence-js is designed around a shared core and platform-specific integrations.

1. Load activity settings from a JSON configuration file.
2. Restore the previously accumulated session time.
3. Initialize the appropriate platform integration.
4. Connect to the Discord client when supported.
5. Publish the configured Rich Presence.
6. Pause the session timer when the Discord connection is lost.
7. Persist the application state.
8. Restore the previous state when the connection becomes available again.

The application will be designed to save state periodically, reducing the risk of losing accumulated time if the process terminates unexpectedly.

## Configuration ⚙️
Presence settings will be managed through a JSON file.

## Planned configuration options include:
- Application ID.
- Activity details and state.
- Image keys and tooltips.
- Accumulated session time.
- Automatic reconnection.
- Save intervals.
- Platform-specific settings.

The configuration format will evolve as development progresses.

## Getting Started 🚀
- "Node.js" (https://nodejs.org/)
- npm
- A Discord application created through the "Discord Developer Portal" (https://discord.com/developers/applications)

## Installation
```shell
git clone [repo-link]
cd [repo-name]
npm install
```

## Running the Project
Startup commands and configuration instructions will be added as the initial implementation becomes available.

## Platform Support 💻
Windows | Linux | Android (Termux)

The core logic is intended to be shared across platforms, while operating-system-specific functionality will be implemented in separate modules.

## Project Goals 🎯
- Learn and apply Javascript and Node.js concepts.
- Understand Discord Rich Presence integration.
- Implement persistent application state.
- Practice modular software architecture.
- Handle connections, disconnections, and recovery.
- Explore cross-platform development.
- Build a maintainable and extensible open-source project.

## Limitations ⚠️
Presence-js will rely on supported Discord integrations and the capabilities available on each platform.

The desktop RPC interface requires a compatible Discord desktop client. Running the application in Termux does not, by itself, enable Rich Presence publication through the Android Discord client.

Presence-js will not use self-bots or unauthorized automation of Discord user accounts.

## License 📄
This project is licensed under the MIT License. See the "LICENSE" file for details.
