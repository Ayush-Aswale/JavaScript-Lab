function findMinMax() {
    // Get the input element and its value
    var inputEl = document.getElementById("numbersInput");
    var input = inputEl.value.trim();

    var resultDiv = document.getElementById("result");

    // Handle empty input
    if (input === "") {
        resultDiv.style.display = "block";
        resultDiv.style.background = "#fdecea";
        resultDiv.style.color = "#b71c1c";
        resultDiv.innerHTML = "⚠️ Please enter some numbers separated by commas.";
        return;
    }

    // Split by comma and trim each part
    var parts = input.split(",");
    var numbers = [];

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i].trim();

        // Skip empty entries (e.g., from trailing or double commas)
        if (part === "") {
            continue;
        }

        var num = Number(part);

        // Validate: must be a finite number
        if (isNaN(num)) {
            resultDiv.style.display = "block";
            resultDiv.style.background = "#fdecea";
            resultDiv.style.color = "#b71c1c";
            resultDiv.innerHTML =
                "❌ Invalid input: <strong>" + part + "</strong> is not a number.";
            return;
        }

        numbers.push(num);
    }

    // If no valid numbers remain
    if (numbers.length === 0) {
        resultDiv.style.display = "block";
        resultDiv.style.background = "#fdecea";
        resultDiv.style.color = "#b71c1c";
        resultDiv.innerHTML = "⚠️ Please enter valid numbers separated by commas.";
        return;
    }

    // Find max and min
    var max = numbers[0];
    var min = numbers[0];

    for (var i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }

    // Show the result
    resultDiv.style.display = "block";
    resultDiv.style.background = "#f0fdf4";
    resultDiv.style.color = "#1b5e20";
    resultDiv.innerHTML =
        "Maximum: <strong>" + max + "</strong><br>Minimum: <strong>" + min +
        "</strong>";
}
