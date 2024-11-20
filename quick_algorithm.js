const fs = require('fs');
const os = require('os');
const seedrandom = require('seedrandom');

// Algoritmes d'ordenació

// Bubble Sort
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

// Merge Sort
function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

// Quick Sort
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function measureSortAlgorithm(algorithm, arr) {
    const start = process.hrtime();
    algorithm(arr);
    const [seconds, nanoseconds] = process.hrtime(start);
    const elapsedTime = seconds + nanoseconds / 1e6;
    return elapsedTime;
}

function generateData(n, level, rng) {
    const data = Array.from({ length: n }, () => Math.floor(rng() * 10000));
    switch (level) {
        case "Totalment ordenat":
        case "Totalment desordenat":
            return data;
        case "Parcialment ordenat":
            const sortedPart = data.slice(0, Math.floor(n * 0.8)).sort((a, b) => a - b);
            const randomPart = data.slice(Math.floor(n * 0.8));
            return sortedPart.concat(randomPart);
        default:
            return data;
    }
}

function runExperiments(seeds, n, levels, repeticions) {
    const results = [];
    const ramTotal = os.totalmem() / (1024 * 1024 * 1024);
    const cpuInfo = os.cpus()[0].model;

    for (let i = 0; i < repeticions; i++) {
        seeds.forEach(seed => {
            const rng = seedrandom(seed);
            levels.forEach(level => {
                n.forEach(length => {
                    const data = generateData(length, level, rng);
                    const algorithms = {
                        QuickSort: arr => quickSort(arr),
                        BubbleSort: arr => bubbleSort(arr),
                        MergeSort: arr => mergeSort(arr)
                    };

                    Object.keys(algorithms).forEach(algName => {
                        const elapsedTime = measureSortAlgorithm(algorithms[algName], data);
                        results.push({
                            Seed: seed,
                            Algorisme: algName,
                            Mida: length,
                            Nivell_ordenacio: level,
                            Temps: elapsedTime.toFixed(6),
                            RAM: ramTotal.toFixed(2),
                            CPU: cpuInfo,
                            Llenguatge: "JavaScript"
                        });
                    });
                });
            })
        });
    }

    return results;
}


const n = [50, 100, 200, 500, 1000];
const seeds = [1234, 5678, 911, 777];
const levels = ["Totalment ordenat", "Totalment desordenat", "Parcialment ordenat"];
const repeticions = 10;

const results = runExperiments(seeds, n, levels, repeticions);

fs.writeFileSync('resultats.json', JSON.stringify(results, null, 2));
console.log("Resultats guardats a resultats.json");
