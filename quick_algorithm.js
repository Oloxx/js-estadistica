const fs = require('fs');
const seedrandom = require('seedrandom');

// Algoritmes d'ordenació

// Selection Sort
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
}

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

// Insertion Sort
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
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

// Heap Sort
function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
}

// Counting Sort
function countingSort(arr, maxValue) {
    const count = new Array(maxValue + 1).fill(0);
    arr.forEach(num => count[num]++);
    let idx = 0;
    for (let i = 0; i <= maxValue; i++) {
        while (count[i] > 0) {
            arr[idx++] = i;
            count[i]--;
        }
    }
}

// Radix Sort
function countingSortRadix(arr, exp) {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    arr.forEach(num => count[Math.floor(num / exp) % 10]++);
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
        const num = arr[i];
        output[count[Math.floor(num / exp) % 10] - 1] = num;
        count[Math.floor(num / exp) % 10]--;
    }
    for (let i = 0; i < n; i++) arr[i] = output[i];
}

function radixSort(arr) {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) countingSortRadix(arr, exp);
}

// Bucket Sort
function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);
    arr.forEach(num => buckets[Math.floor((num - min) / bucketSize)].push(num));
    let idx = 0;
    buckets.forEach(bucket => {
        bucket.sort((a, b) => a - b);
        bucket.forEach(num => arr[idx++] = num);
    });
}

// Funció per mesurar el temps de cada algorisme
function measureSortAlgorithm(algorithm, arr) {
    const start = Date.now();
    algorithm(arr);
    const end = Date.now();
    return (end - start) / 1000;
}

// Executa l'experiment amb cada algorisme
function runExperiments(n, seed) {
    const rng = seedrandom(seed);
    const data = Array.from({ length: n }, () => Math.floor(rng() * 10000));

    return {
        Seed: seed,
        SelectionSort: measureSortAlgorithm(selectionSort, [...data]),
        BubbleSort: measureSortAlgorithm(bubbleSort, [...data]),
        InsertionSort: measureSortAlgorithm(insertionSort, [...data]),
        MergeSort: measureSortAlgorithm(arr => mergeSort(arr), [...data]),
        QuickSort: measureSortAlgorithm(arr => quickSort(arr), [...data]),
        HeapSort: measureSortAlgorithm(heapSort, [...data]),
        CountingSort: measureSortAlgorithm(arr => countingSort(arr, 9999), [...data]),
        RadixSort: measureSortAlgorithm(radixSort, [...data]),
        BucketSort: measureSortAlgorithm(bucketSort, [...data])
    };
}

// Configuració de l'experiment
const n = 1000;
const seed = 1234;
const resultats = runExperiments(n, seed);

// Desa els resultats en un fitxer JSON
fs.writeFileSync('resultats.json', JSON.stringify(resultats, null, 2));
console.log("Resultats guardats a resultats.json");
