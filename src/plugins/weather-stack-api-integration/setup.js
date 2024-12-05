const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisify readline question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
    try {
        console.log('\n=== WeatherStack API Setup ===\n');
        console.log('This setup will configure your WeatherStack API credentials.');
        console.log('You can get your API key from: https://weatherstack.com/\n');

        // Prompt for API key
        const apiKey = await question('Please enter your WeatherStack API key: ');

        if (!apiKey.trim()) {
            throw new Error('API key is required');
        }

        // Define the environment variable
        const envVariable = `WEATHERSTACK_API_KEY=${apiKey.trim()}`;

        // Get the path to the root .env file
        const envPath = path.join(process.cwd(), '.env');

        // Check if .env exists and read it
        let envContent = '';
        try {
            envContent = fs.readFileSync(envPath, 'utf8');
        } catch (error) {
            // File doesn't exist, will create new one
        }

        // Check if WEATHERSTACK_API_KEY already exists
        if (envContent.includes('WEATHERSTACK_API_KEY=')) {
            // Replace existing line
            envContent = envContent.replace(
                /WEATHERSTACK_API_KEY=.*/,
                envVariable
            );
        } else {
            // Add new line
            envContent = envContent.trim();
            envContent = envContent + (envContent ? '\n' : '') + envVariable + '\n';
        }

        // Write back to .env file
        fs.writeFileSync(envPath, envContent);

        console.log('\n✅ WeatherStack API key has been successfully added to your .env file!');
        console.log('You can now use the WeatherStack API integration.\n');

    } catch (error) {
        console.error('\n❌ Error during setup:', error.message);
        process.exit(1);
    } finally {
        rl.close();
        process.exit(0);
    }
}

setup();
