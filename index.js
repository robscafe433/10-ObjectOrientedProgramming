const fs = require("fs");
const inquirer = require("inquirer").default; // Updated import

// Function to generate SVG content
function generateSVG(text, textColor, shape, shapeColor) {
    let shapeSVG = "";

    // Create shape based on user input
    switch (shape) {
        case "circle":
            shapeSVG = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
            break;
        case "triangle":
            shapeSVG = `<polygon points="150,20 200,180 100,180" fill="${shapeColor}" />`;
            break;
        case "square":
            shapeSVG = `<rect x="70" y="20" width="160" height="160" fill="${shapeColor}" />`;
            break;
        default:
            break;
    }

    return `
           <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
               ${shapeSVG}
               <text x="150" y="125" font-size="40" text-anchor="middle" fill="${textColor}">${text}</text>
           </svg>
       `;
}

// Prompt user for input
inquirer
    .prompt([
        {
            type: "input",
            name: "text",
            message: "Enter up to three characters for the logo:",
            validate: (input) =>
                input.length <= 3 ||
                "Text must be up to three characters long.",
        },
        {
            type: "input",
            name: "textColor",
            message: "Enter the text color (keyword or hexadecimal):",
        },
        {
            type: "list",
            name: "shape",
            message: "Choose a shape for the logo:",
            choices: ["circle", "triangle", "square"],
        },
        {
            type: "input",
            name: "shapeColor",
            message: "Enter the shape color (keyword or hexadecimal):",
        },
    ])
    .then((answers) => {
        const { text, textColor, shape, shapeColor } = answers;
        const svgContent = generateSVG(text, textColor, shape, shapeColor);

        // Write SVG to file
        fs.writeFileSync("logo.svg", svgContent);
        console.log("Generated logo.svg");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
