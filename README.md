Cron Expression Parser

Cron Expression Parser is a utility that parses Cron expressions and outputs the schedule in console. This script is developed using NodeJs, and mocha, chai are used for unit testing.

#Prerequisites:

1. Node.js version 20.10.0. The project is developed and tested with this Node.js version for compatibility.
2. NVM (Node Version Manager) for managing Node.js versions

#Getting Started:

1. Clone the repository (Skip the Step 1 If you have the project as a zipped archive:)
   git clone <repo_name>

2. Navigate to Project Directory
   cd CRON-EXPRESSION-PARSER

3. Install Node.js
   nvm install
   nvm use

This will install and use the Node.js version specified for the project.

3. Install Dependencies
   npm install

4. Make the Script Executable - Before running the project, make sure the main script file is executable. This step is necessary to allow the script to be run directly.
   chmod +x src/cron_parser.js

5. Running Project

   ./src/cron_parser.js "<cron_expression>"

   Replace "<cron_expression>" with your actual cron expression. Ensure you are in the project root directory when executing this command.

6. Running Tests
   npm test

#Usage:

1. To parse a Cron Expression run following command for example

```
./src/cron_parser.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```
