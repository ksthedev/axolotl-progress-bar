# Axolotl Progress Bars Library

A lightweight, customizable terminal progress bar and spinner library for Node.js. Axolotl provides an intuitive API to visualize asynchronous tasks, file operations, and long-running processes with minimal overhead and high visual clarity.

---

## Features
* **Zero Dependencies:** Pure Node.js implementation using native modules.
* **Smart Rendering:** Efficient terminal updates using ANSI escape codes.
* **Flexible Modes:** Supports both percentage-based bars and indeterminate spinners.
* **Highly Customizable:** Define custom characters, colors, and proportions.
* **ESM Ready:** Fully compatible with modern JavaScript (ES Modules).

---

## Installation

To integrate Axolotl into your project, clone the repository and run the automated installation script. This script deploys the library core to the designated system directory.

1. Clone the repository via Git.
2. Execute the install.js file using Node.js.

Note: The installation script writes to C:/axolotl/pbars/. On Windows systems, please ensure your terminal is running with Administrative Privileges.

---

## Usage Examples

### Asynchronous Progress Bar
Ideal for tracking file operations, downloads, or batch processing where the total scale is known. The user provides a callback that returns the current percentage (0-100).

### Indeterminate Spinner
Best suited for tasks with unknown durations, such as API requests or database queries. The animation continues as long as the provided callback returns a truthy value.

### Simplified Delay Bar
A quick-start method to create a timed progress bar for simulated delays or fixed wait times without manual state management.

---

## API Reference

### Method: asyncbar
The core method for handling dynamic progress. It accepts the bar type, a monitoring callback, scale proportions, terminal width, and an optional configuration object for text and refresh intervals.

### Method: simpbar
A high-level wrapper for the asyncbar method designed to handle simple time-based progress. It calculates percentages automatically based on a specified millisecond delay.

---

## Technical Specifications
The library utilizes a static color mapping system (ANSI) and supports multiple bar configurations, including the "Basic" block-style bar and the high-frequency "Spinner" animation.

## License
This project is open-source. Feel free to modify and distribute as needed.
