const start = 0;
const finish = 1000;

function isPrimeNumber(number) {
    if (number < 2) {
        return false;
    }

    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

function printPrimes(start, finish) {
    for (let number = start; number <= finish; number++) {
        if (isPrimeNumber(number)) {
            console.log(number);
        }
    }
}

printPrimes(start, finish);

