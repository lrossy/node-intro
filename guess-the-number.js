var inquirer = require('inquirer');

var hiddenNumber = Math.floor(Math.random() * 100 + 1);

var questions = [
    {
        type: 'input',
        name: 'guess',
        message: 'What is your guess?',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            if(!valid){
                return 'Please enter a number';
            }
            if(value === hiddenNumber){
                return valid
            }
            else if(value < hiddenNumber){
                return `Number is > ${value}`;
            }
            else{
                return `Number is < ${value}`;
            }
        },
        filter: Number
    }
];

inquirer.prompt(questions).then(function (answers) {
    console.log('\nOYou guessed correctly!:');
});